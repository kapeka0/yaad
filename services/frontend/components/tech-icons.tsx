"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useState } from "react";

interface Tech {
  id: number;
  name: string;
  version: string;
  icon: string;
}

const ICON_BASE = process.env.NEXT_PUBLIC_ICON_BASE_URL ?? "/icons/";
const MAX_VISIBLE = 5;

function TechIcon({ tech }: { tech: Tech }) {
  const [imgFailed, setImgFailed] = useState(false);
  const src = ICON_BASE && tech.icon ? `${ICON_BASE}${tech.icon}` : "";
  const label = `${tech.name}${tech.version ? ` ${tech.version}` : ""}`;

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="inline-flex items-center justify-center shrink-0">
            {src && !imgFailed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={tech.name}
                className="w-4 h-4 object-contain rounded-sm"
                onError={() => setImgFailed(true)}
              />
            ) : (
              <Avatar className="w-4 h-4 rounded-sm">
                <AvatarFallback className="text-[9px] font-bold rounded-sm">
                  {tech.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 px-2 py-1 text-[10px] rounded bg-foreground text-background font-mono"
            sideOffset={4}
          >
            {label}
            <Tooltip.Arrow className="fill-foreground" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export function TechIcons({ techs }: { techs: Tech[] }) {
  if (!techs.length)
    return <span className="text-muted-foreground text-xs">—</span>;

  const sorted = [...techs].sort((a, b) => (b.icon ? 1 : 0) - (a.icon ? 1 : 0));
  const visible = sorted.slice(0, MAX_VISIBLE);
  const rest = sorted.slice(MAX_VISIBLE);

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {visible.map((t) => (
        <TechIcon key={t.id} tech={t} />
      ))}
      {rest.length > 0 && (
        <Tooltip.Provider delayDuration={200}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span className="text-[9px] text-muted-foreground font-mono cursor-default">
                +{rest.length}
              </span>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="z-50 px-2 py-1 text-[10px] rounded bg-foreground text-background font-mono max-w-[200px]"
                sideOffset={4}
              >
                {rest.map((t) => t.name).join(", ")}
                <Tooltip.Arrow className="fill-foreground" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
    </div>
  );
}
