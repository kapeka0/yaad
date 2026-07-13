export const dynamic = "force-dynamic";

import { AssetFilters } from "@/components/asset-filters";
import { AssetsTable } from "@/components/assets-table";
import { db } from "@/lib/db";
import { programs, technologies } from "@yaad/db";
import { Suspense } from "react";

async function getPlatforms(): Promise<string[]> {
  const rows = await db()
    .selectDistinct({ platform: programs.platform })
    .from(programs);
  return rows.map((r) => r.platform).sort();
}

async function getTechnologies(): Promise<string[]> {
  const rows = await db()
    .selectDistinct({ name: technologies.name })
    .from(technologies)
    .orderBy(technologies.name);
  return rows.map((r) => r.name);
}

async function getPrograms(): Promise<{ id: number; name: string }[]> {
  const rows = await db()
    .selectDistinct({ id: programs.id, name: programs.name })
    .from(programs)
    .orderBy(programs.name);
  return rows;
}

export default async function HomePage() {
  const [platforms, techs, progs] = await Promise.all([
    getPlatforms(),
    getTechnologies(),
    getPrograms(),
  ]);

  return (
    <div className="space-y-4">
      <div className="border-b border-border pb-4">
        <h1 className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          yaad / assets
        </h1>
      </div>
      <Suspense>
        <AssetFilters
          platforms={platforms}
          technologies={techs}
          programs={progs.map((p) => p.name)}
        />
        <AssetsTable />
      </Suspense>
    </div>
  );
}
