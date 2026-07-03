import * as zlib from "node:zlib";
import { promisify } from "node:util";

export type Compression = "zstd" | "gzip";

// Node added zstd to zlib in v22.15 / v23.8. Detect at runtime and fall back to
// gzip on older runtimes so the worker still functions everywhere.
const hasZstd =
  typeof (zlib as unknown as { zstdCompress?: unknown }).zstdCompress === "function";

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const zstdCompress = hasZstd ? promisify((zlib as any).zstdCompress) : null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const zstdDecompress = hasZstd ? promisify((zlib as any).zstdDecompress) : null;

export const preferredCompression: Compression = hasZstd ? "zstd" : "gzip";

export async function compress(
  data: Buffer
): Promise<{ buffer: Buffer; algo: Compression }> {
  if (zstdCompress) {
    const buffer = (await zstdCompress(data)) as Buffer;
    return { buffer, algo: "zstd" };
  }
  const buffer = (await gzip(data, { level: 9 })) as Buffer;
  return { buffer, algo: "gzip" };
}

export async function decompress(
  data: Buffer,
  algo: Compression
): Promise<Buffer> {
  if (algo === "zstd") {
    if (!zstdDecompress) {
      throw new Error(
        "Blob is zstd-compressed but this runtime lacks zstd support (needs Node >= 22.15)"
      );
    }
    return (await zstdDecompress(data)) as Buffer;
  }
  return (await gunzip(data)) as Buffer;
}
