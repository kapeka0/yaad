const BASE_URL =
  "https://raw.githubusercontent.com/arkadiyt/bounty-targets-data/main/data";

const PLATFORMS = [
  "hackerone",
  "bugcrowd",
  "intigriti",
  "yeswehack",
  "federacy",
] as const;

export type Platform = (typeof PLATFORMS)[number];

export async function fetchPlatformData(platform: Platform): Promise<unknown> {
  const url = `${BASE_URL}/${platform}_data.json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${platform}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export { PLATFORMS };
