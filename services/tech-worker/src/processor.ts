import type { Db } from "@yaad/db";
import { technologies, assetTechnologies, assets, scopes } from "@yaad/db";
import type { DetectTechnologyJob } from "@yaad/queue";
import { detectTechnologies } from "./client.js";
import { eq, sql } from "drizzle-orm";

export async function processDetectTechnology(
  job: { data: DetectTechnologyJob },
  db: Db,
  cultivateApiUrl: string,
  confidenceThreshold: number
): Promise<void> {
  const { url, assetId } = job.data;

  const [target] = await db
    .select({ inScope: scopes.inScope })
    .from(assets)
    .innerJoin(scopes, eq(assets.scopeId, scopes.id))
    .where(eq(assets.id, assetId))
    .limit(1);
  if (!target?.inScope) {
    console.log(
      JSON.stringify({ level: "info", msg: "Skipping technology scan outside an active scope", assetId })
    );
    return;
  }

  console.log(JSON.stringify({ level: "info", msg: `Detecting technologies for ${url}` }));

  const detected = await detectTechnologies(cultivateApiUrl, url, confidenceThreshold);
  const failures: string[] = [];

  for (const tech of detected) {
    try {
      const [technology] = await db
        .insert(technologies)
        .values({ name: tech.name, version: tech.version ?? "", icon: tech.icon ?? "" })
        .onConflictDoUpdate({
          target: [technologies.name, technologies.version],
          set: {
            icon: sql`CASE WHEN excluded.icon <> '' THEN excluded.icon ELSE ${technologies.icon} END`,
          },
        })
        .returning();

      const techId = technology?.id;

      if (techId) {
        await db
          .insert(assetTechnologies)
          .values({ assetId, technologyId: techId })
          .onConflictDoNothing();
      }
    } catch (err) {
      failures.push(`${tech.name}: ${String(err)}`);
      console.error(
        JSON.stringify({ level: "warn", msg: `Failed to upsert tech ${tech.name}`, error: String(err) })
      );
    }
  }

  if (failures.length > 0) {
    throw new Error(
      `Failed to persist ${failures.length}/${detected.length} detected technology result(s)`
    );
  }

  // A successful empty detection is still a completed attempt. The scheduler
  // uses this durable success checkpoint to distinguish it from an exhausted
  // or interrupted endpoint fan-out job.
  await db
    .update(assets)
    .set({ lastTechnologyScannedAt: new Date() })
    .where(eq(assets.id, assetId));
}
