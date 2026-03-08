import type { RedisOptions } from "bullmq";

export function getRedisOptions(redisUrl: string): RedisOptions {
  const url = new URL(redisUrl);
  return {
    host: url.hostname,
    port: url.port ? parseInt(url.port, 10) : 6379,
    password: url.password || undefined,
    username: url.username || undefined,
    db: url.pathname && url.pathname !== "/" ? parseInt(url.pathname.slice(1), 10) : 0,
    maxRetriesPerRequest: null,
  };
}
