import type { NormalizedProgram, NormalizedScope } from "@yaad/types";
import type { Platform } from "./fetcher.js";

function isWildcard(asset: string): boolean {
  return asset.startsWith("*.");
}

function normalizeScope(asset: string, type: string, inScope: boolean): NormalizedScope {
  return {
    asset,
    type,
    wildcard: isWildcard(asset),
    inScope,
  };
}

// HackerOne format
function parseHackerOne(data: unknown): NormalizedProgram[] {
  const programs = data as Array<{
    name: string;
    url?: string;
    offers_bounties?: boolean;
    targets?: {
      in_scope?: Array<{ asset_identifier: string; asset_type: string }>;
      out_of_scope?: Array<{ asset_identifier: string; asset_type: string }>;
    };
  }>;

  return programs.map((p) => ({
    programName: p.name,
    platform: "hackerone",
    url: p.url,
    offersReward: p.offers_bounties ?? true,
    scopes: [
      ...(p.targets?.in_scope ?? []).map((s) =>
        normalizeScope(s.asset_identifier, s.asset_type, true)
      ),
      ...(p.targets?.out_of_scope ?? []).map((s) =>
        normalizeScope(s.asset_identifier, s.asset_type, false)
      ),
    ],
  }));
}

// Bugcrowd format
function parseBugcrowd(data: unknown): NormalizedProgram[] {
  const programs = data as Array<{
    name: string;
    url?: string;
    offers_bounties?: boolean;
    targets?: {
      in_scope?: Array<{ target: string; type: string }>;
      out_of_scope?: Array<{ target: string; type: string }>;
    };
  }>;

  return programs.map((p) => ({
    programName: p.name,
    platform: "bugcrowd",
    url: p.url,
    offersReward: p.offers_bounties ?? true,
    scopes: [
      ...(p.targets?.in_scope ?? []).map((s) =>
        normalizeScope(s.target, s.type, true)
      ),
      ...(p.targets?.out_of_scope ?? []).map((s) =>
        normalizeScope(s.target, s.type, false)
      ),
    ],
  }));
}

// Intigriti format
function parseIntigriti(data: unknown): NormalizedProgram[] {
  const programs = data as Array<{
    name: string;
    url?: string;
    offers_bounties?: boolean;
    targets?: {
      in_scope?: Array<{ endpoint: string; type: string }>;
      out_of_scope?: Array<{ endpoint: string; type: string }>;
    };
  }>;

  return programs.map((p) => ({
    programName: p.name,
    platform: "intigriti",
    url: p.url,
    offersReward: p.offers_bounties ?? true,
    scopes: [
      ...(p.targets?.in_scope ?? []).map((s) =>
        normalizeScope(s.endpoint, s.type, true)
      ),
      ...(p.targets?.out_of_scope ?? []).map((s) =>
        normalizeScope(s.endpoint, s.type, false)
      ),
    ],
  }));
}

// YesWeHack format
function parseYesWeHack(data: unknown): NormalizedProgram[] {
  const programs = data as Array<{
    id: string;
    name: string;
    max_bounty?: number;
    targets?: {
      in_scope?: Array<{ target: string; type: string }>;
      out_of_scope?: Array<{ target: string; type: string }>;
    };
  }>;

  return programs.map((p) => ({
    programName: p.name,
    platform: "yeswehack",
    url: `https://yeswehack.com/programs/${encodeURIComponent(p.id)}`,
    offersReward: (p.max_bounty ?? 0) > 0,
    scopes: [
      ...(p.targets?.in_scope ?? []).map((s) =>
        normalizeScope(s.target, s.type, true)
      ),
      ...(p.targets?.out_of_scope ?? []).map((s) =>
        normalizeScope(s.target, s.type, false)
      ),
    ],
  }));
}

// Federacy format
function parseFederacy(data: unknown): NormalizedProgram[] {
  const programs = data as Array<{
    name: string;
    url?: string;
    offers_awards?: boolean;
    targets?: {
      in_scope?: Array<{ target: string; type: string }>;
      out_of_scope?: Array<{ target: string; type: string }>;
    };
  }>;

  return programs.map((p) => ({
    programName: p.name,
    platform: "federacy",
    url: p.url,
    offersReward: p.offers_awards ?? true,
    scopes: [
      ...(p.targets?.in_scope ?? []).map((s) =>
        normalizeScope(s.target, s.type, true)
      ),
      ...(p.targets?.out_of_scope ?? []).map((s) =>
        normalizeScope(s.target, s.type, false)
      ),
    ],
  }));
}

const PARSERS: Record<Platform, (data: unknown) => NormalizedProgram[]> = {
  hackerone: parseHackerOne,
  bugcrowd: parseBugcrowd,
  intigriti: parseIntigriti,
  yeswehack: parseYesWeHack,
  federacy: parseFederacy,
};

export function parsePlatformData(platform: Platform, data: unknown): NormalizedProgram[] {
  return PARSERS[platform](data);
}
