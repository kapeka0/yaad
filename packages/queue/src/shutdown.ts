export interface CloseableResource {
  close(): Promise<unknown>;
}

/** Drain resources in dependency order while still attempting every close. */
export async function closeResourcesInOrder(
  resources: CloseableResource[],
): Promise<unknown[]> {
  const failures: unknown[] = [];
  for (const resource of resources) {
    try {
      await resource.close();
    } catch (error) {
      failures.push(error);
    }
  }
  return failures;
}

/**
 * Drain BullMQ workers and close queue connections during container updates.
 * A bounded deadline prevents Docker from leaving a wedged process behind.
 */
export function installGracefulShutdown(
  service: string,
  resources: CloseableResource[],
  timeoutMs = 65_000
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

    // Callers pass the BullMQ Worker first and its producer Queues after it.
    // Close them in that order: Worker.close() drains the active processor,
    // which may still need the producer queues to publish its final fan-out.
    const failures = await closeResourcesInOrder(resources);
    clearTimeout(deadline);
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
