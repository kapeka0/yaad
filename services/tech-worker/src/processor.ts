import type { Db } from "@yaad/db";
import { technologies, assetTechnologies } from "@yaad/db";
import type { DetectTechnologyJob } from "@yaad/queue";
import { detectTechnologies } from "./client.js";
import { sql } from "drizzle-orm";

export async function processDetectTechnology(
  job: { data: DetectTechnologyJob },
  db: Db,
  cultivateApiUrl: string,
  confidenceThreshold: number
): Promise<void> {
  const { url, assetId } = job.data;

  console.log(JSON.stringify({ level: "info", msg: `Detecting technologies for ${url}` }));

  const detected = await detectTechnologies(cultivateApiUrl, url, confidenceThreshold);

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
      console.error(
        JSON.stringify({ level: "warn", msg: `Failed to upsert tech ${tech.name}`, error: String(err) })
      );
    }
  }
}
