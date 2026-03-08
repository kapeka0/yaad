export async function getSubdomainsFromPDCP(
  domain: string,
  apiKey: string
): Promise<string[]> {
  const subdomains: string[] = [];
  let page = 1;
  const limit = 100;

  while (true) {
    const url = `https://api.projectdiscovery.io/v1/domain/associated?domain=${encodeURIComponent(domain)}&raw=true&limit=${limit}&page=${page}`;
    const res = await fetch(url, {
      headers: { "X-Api-Key": apiKey },
    });

    if (!res.ok) {
      console.error(
        JSON.stringify({ level: "warn", msg: `PDCP request failed: ${res.status}`, domain })
      );
      break;
    }

    const data = (await res.json()) as { domains?: string[]; data?: string[] };
    const items = data.domains ?? data.data ?? [];

    if (items.length === 0) break;

    subdomains.push(...items);

    if (items.length < limit) break;
    page++;
  }

  return subdomains;
}
