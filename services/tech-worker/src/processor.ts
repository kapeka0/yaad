import type { Db } from "@yaad/db";
import { technologies, assetTechnologies } from "@yaad/db";
import type { DetectTechnologyJob } from "@yaad/queue";
import { detectTechnologies } from "./client.js";

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
        .values({ name: tech.name, version: tech.version })
        .onConflictDoNothing()
        .returning();

      // If onConflictDoNothing returned nothing, fetch the existing row
      const techId = technology?.id ?? await (async () => {
        const existing = await db.query.technologies.findFirst({
          where: (t, { and, eq }) => and(eq(t.name, tech.name), eq(t.version, tech.version)),
        });
        return existing?.id;
      })();

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
