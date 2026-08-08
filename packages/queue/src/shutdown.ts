export interface CloseableResource {
  close(): Promise<unknown>;
}

/**
 * Drain BullMQ workers and close queue connections during container updates.
 * A bounded deadline prevents Docker from leaving a wedged process behind.
 */
export function installGracefulShutdown(
  service: string,
  resources: CloseableResource[],
  timeoutMs = 30_000
): void {
  let shuttingDown = false;

  const shutdown = async (signal: NodeJS.Signals): Promise<void> => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(JSON.stringify({ level: "info", msg: `${service} shutting down`, signal }));

    const deadline = setTimeout(() => {
      console.error(
        JSON.stringify({ level: "error", msg: `${service} shutdown deadline exceeded` })
      );
      process.exit(1);
    }, timeoutMs);
    deadline.unref();

    const results = await Promise.allSettled(resources.map((resource) => resource.close()));
    clearTimeout(deadline);
    const failures = results.filter((result) => result.status === "rejected");
    if (failures.length > 0) {
      console.error(
        JSON.stringify({
          level: "error",
          msg: `${service} failed to close ${failures.length} resource(s)`,
        })
      );
      process.exit(1);
    }
    process.exit(0);
  };

  process.once("SIGTERM", () => void shutdown("SIGTERM"));
  process.once("SIGINT", () => void shutdown("SIGINT"));
}
