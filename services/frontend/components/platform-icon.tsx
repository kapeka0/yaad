const PLATFORM_ICONS: Readonly<Record<string, string>> = {
  hackerone: "/icons/HackerOne.svg",
  bugcrowd: "/icons/Bugcrowd.svg",
  intigriti: "/icons/Intigriti.svg",
  yeswehack: "https://github.com/yeswehack.png?size=64",
  private: "/icons/HSTS.svg",
};

export function PlatformIcon({ platform }: { platform: string }) {
  const normalizedPlatform = platform.trim().toLowerCase();
  const src = PLATFORM_ICONS[normalizedPlatform];

  if (!src) {
    return (
      <span
        className="inline-flex size-4 shrink-0 items-center justify-center rounded-sm bg-muted text-[9px] font-bold text-muted-foreground"
        title={platform}
        aria-label={platform}
      >
        {platform.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${platform} logo`}
      title={platform}
      width={16}
      height={16}
      loading="lazy"
      decoding="async"
      className={`size-4 shrink-0 rounded-sm object-contain ${
        normalizedPlatform === "hackerone" ? "dark:invert" : ""
      }`}
    />
  );
}
