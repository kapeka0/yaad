export interface CultivateApiResponse {
  url: string;
  technologies: CultivateTechnology[];
}

export interface CultivateTechnology {
  name: string;
  version?: string;
  confidence: number;
  categories?: string[];
}

export interface BountyTargetsProgram {
  name: string;
  url?: string;
  targets?: {
    in_scope?: BountyTargetsScope[];
    out_of_scope?: BountyTargetsScope[];
  };
}

export interface BountyTargetsScope {
  asset_identifier: string;
  asset_type: string;
  eligibility?: string;
  instruction?: string;
}

export interface NormalizedScope {
  asset: string;
  type: string;
  wildcard: boolean;
  inScope: boolean;
}

export interface NormalizedProgram {
  programName: string;
  platform: string;
  scopes: NormalizedScope[];
}
