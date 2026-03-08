import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function runMigrations(connectionString: string): Promise<void> {
  const client = postgres(connectionString, { max: 1 });
  const db = drizzle(client);

  const migrationsFolder = join(__dirname, "../migrations");

  await migrate(db, { migrationsFolder });
  await client.end();
}
