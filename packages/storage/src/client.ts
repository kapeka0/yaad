import { Client as MinioClient } from "minio";
import { createHash } from "node:crypto";
import { compress, decompress, type Compression } from "./compress.js";

export interface StorageConfig {
  endpoint: string; // host:port, e.g. "minio:9000"
  accessKey: string;
  secretKey: string;
  bucket: string;
  useSSL?: boolean;
}

export interface PutBlobResult {
  sha256: string;
  storageKey: string;
  compression: Compression;
  sizeBytes: number; // original, uncompressed
  storedBytes: number; // compressed bytes actually written
  deduped: boolean; // true if an identical object already existed
}

/**
 * Content-addressable object store for JS bodies.
 *
 * Objects are keyed by the sha256 of their *uncompressed* content and stored
 * compressed (zstd, gzip fallback). Because the key is the content hash,
 * identical bundles seen across many subdomains are stored exactly once.
 */
export class BlobStore {
  private client: MinioClient;
  private bucket: string;
  private ready: Promise<void> | null = null;

  constructor(private config: StorageConfig) {
    const [host, portStr] = config.endpoint.split(":");
    this.client = new MinioClient({
      endPoint: host,
      port: portStr ? parseInt(portStr, 10) : config.useSSL ? 443 : 80,
      useSSL: config.useSSL ?? false,
      accessKey: config.accessKey,
      secretKey: config.secretKey,
    });
    this.bucket = config.bucket;
  }

  private async ensureBucket(): Promise<void> {
    if (this.ready) return this.ready;
    const attempt = (async () => {
      const exists = await this.client.bucketExists(this.bucket).catch(() => false);
      if (!exists) {
        // makeBucket races are fine — swallow "already owned by you".
        await this.client.makeBucket(this.bucket).catch((err: unknown) => {
          const code = (err as { code?: string })?.code;
          if (code !== "BucketAlreadyOwnedByYou" && code !== "BucketAlreadyExists") throw err;
        });
      }
    })();
    // Only cache success; on failure (e.g. MinIO not up yet) allow a later retry.
    attempt.catch(() => {
      this.ready = null;
    });
    this.ready = attempt;
    return attempt;
  }

  static hash(data: Buffer): string {
    return createHash("sha256").update(data).digest("hex");
  }

  private static keyFor(sha256: string): string {
    // Shard by first 2 bytes to keep the bucket listing manageable.
    return `js/${sha256.slice(0, 2)}/${sha256.slice(2, 4)}/${sha256}`;
  }

  async put(data: Buffer): Promise<PutBlobResult> {
    await this.ensureBucket();
    const sha256 = BlobStore.hash(data);
    const storageKey = BlobStore.keyFor(sha256);

    // Dedup: if the object already exists, skip re-uploading.
    const existing = await this.stat(storageKey);
    if (existing) {
      return {
        sha256,
        storageKey,
        compression: (existing.metaData?.["compression"] as Compression) ?? "zstd",
        sizeBytes: data.length,
        storedBytes: existing.size,
        deduped: true,
      };
    }

    const { buffer, algo } = await compress(data);
    await this.client.putObject(this.bucket, storageKey, buffer, buffer.length, {
      "Content-Type": "application/octet-stream",
      compression: algo,
      "original-size": String(data.length),
    });

    return {
      sha256,
      storageKey,
      compression: algo,
      sizeBytes: data.length,
      storedBytes: buffer.length,
      deduped: false,
    };
  }

  private async stat(key: string): Promise<{ size: number; metaData?: Record<string, string> } | null> {
    try {
      const s = await this.client.statObject(this.bucket, key);
      return { size: s.size, metaData: s.metaData as Record<string, string> };
    } catch {
      return null;
    }
  }

  async get(storageKey: string, compression: Compression): Promise<Buffer> {
    await this.ensureBucket();
    const stream = await this.client.getObject(this.bucket, storageKey);
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk as Buffer);
    }
    return decompress(Buffer.concat(chunks), compression);
  }
}
