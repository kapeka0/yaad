"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { resolveIconUrl, resolveTechnologyIcon } from "@/lib/technology-icons";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useState } from "react";

interface Tech {
  id: number;
  name: string;
  version: string;
  icon: string;
}

const ICON_BASE =
  process.env.NEXT_PUBLIC_ICON_BASE_URL ??
  "https://zrqvcicitadfkaaklgmg.supabase.co/storage/v1/object/public/tech-icons/";
const MAX_VISIBLE = 5;

function TechIcon({ tech }: { tech: Tech }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const icon = resolveTechnologyIcon(tech.name, tech.icon);
  const primarySrc = resolveIconUrl(icon, ICON_BASE);
  const localFallbackSrc = tech.icon
    ? resolveIconUrl(tech.icon, "/icons/")
    : "";
  const cultivateFallbackSrc = tech.icon
    ? `/api/technology-icons/${encodeURIComponent(tech.icon)}`
    : "";
  const sources = [primarySrc, localFallbackSrc, cultivateFallbackSrc].filter(
    (source, index, allSources): source is string =>
      Boolean(source) && allSources.indexOf(source) === index,
  );
  const src = sources[sourceIndex];
  const label = `${tech.name}${tech.version ? ` ${tech.version}` : ""}`;

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <span className="inline-flex shrink-0 items-center justify-center">
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={tech.name}
              width={16}
              height={16}
              loading="lazy"
              decoding="async"
              className="size-4 rounded-sm object-contain"
              onError={() => setSourceIndex((current) => current + 1)}
            />
          ) : (
            <Avatar className="size-4 rounded-sm">
              <AvatarFallback className="rounded-sm text-[9px] font-bold">
                {tech.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="z-50 rounded bg-foreground px-2 py-1 font-mono text-[10px] text-background"
          sideOffset={4}
        >
          {label}
          <Tooltip.Arrow className="fill-foreground" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export function TechIcons({ techs }: { techs: Tech[] }) {
  if (!techs.length) {
    return <span className="text-xs text-muted-foreground">—</span>;
  }

  const sorted = [...techs].sort(
    (a, b) =>
      Number(Boolean(resolveTechnologyIcon(b.name, b.icon))) -
      Number(Boolean(resolveTechnologyIcon(a.name, a.icon))),
  );
  const visible = sorted.slice(0, MAX_VISIBLE);
  const rest = sorted.slice(MAX_VISIBLE);

  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="flex flex-wrap items-center gap-1">
        {visible.map((tech) => (
          <TechIcon key={`${tech.id}:${tech.icon}`} tech={tech} />
        ))}
        {rest.length > 0 && (
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span className="cursor-default font-mono text-[9px] text-muted-foreground">
                +{rest.length}
              </span>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="z-50 max-w-[200px] rounded bg-foreground px-2 py-1 font-mono text-[10px] text-background"
                sideOffset={4}
              >
                {rest.map((tech) => tech.name).join(", ")}
                <Tooltip.Arrow className="fill-foreground" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        )}
      </div>
    </Tooltip.Provider>
  );
}
