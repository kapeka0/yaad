const TECHNOLOGY_ICON_ALIASES: Readonly<Record<string, string>> = {
  hsts: "HSTS.svg",
  "amazon cloudfront": "Amazon Cloudfront.svg",
  "google tag manager": "Google Tag Manager.svg",
  cloudflare: "CloudFlare.svg",
  "http/3": "HTTP3.svg",
  java: "Java.svg",
  "amazon s3": "Amazon S3.svg",
  "cloudflare bot management": "CloudFlare.svg",
  nginx: "Nginx.svg",
  webpack: "Webpack.svg",
  react: "React.svg",
  "adobe experience manager": "Adobe Experience Manager Franklin.svg",
  imperva: "Imperva.svg",
  azure: "Azure.svg",
  "microsoft asp.net": "Microsoft ASP.NET.svg",
  akamai: "Akamai.svg",
  "apache http server": "Apache.svg",
  php: "PHP.svg",
  "azure front door": "Azure.svg",
  envoy: "Envoy.svg",
  jquery: "jQuery.svg",
  "node.js": "Node.js.svg",
  mysql: "MySQL.svg",
  bootstrap: "Bootstrap.svg",
  express: "Express.svg",
  "google cloud": "Google Cloud.svg",
  "amazon elb": "Amazon ELB.svg",
  "google cloud cdn": "Google Cloud.svg",
  wordpress: "WordPress.svg",
  unpkg: "Unpkg.svg",
  "next.js": "Next.js.svg",
  basic: "Basic Authentication.svg",
  "wp rocket": "WP Rocket.svg",
  "azure edge network": "Azure.svg",
  kinsta: "Kinsta.svg",
  slick: "Slick.svg",
  stimulus: "Stimulus.svg",
  angularjs: "AngularJS.svg",
  "azure monitor": "Azure.svg",
  "underscore.js": "Underscore.js.svg",
  "yoast seo": "Yoast SEO.svg",
  trustarc: "https://github.com/trustarc.png?size=64",
  "materialize css": "https://github.com/materializecss.png?size=64",
  render: "Render.svg",
  sucuri: "https://github.com/Sucuri.png?size=64",
  "socket.io": "Socket.io.svg",
  readme: "ReadMe.svg",
  tealium: "https://github.com/Tealium.png?size=64",
  zipkin: "https://github.com/openzipkin.png?size=64",
  ketch: "https://github.com/ketch-com.png?size=64",
  "klarna checkout": "Klarna.svg",
  absorb: "Absorb.svg",
  frontpage: "Microsoft.svg",
  "authorize.net": "authorize.net.svg",
};

const VERSION_SUFFIX = /:\d+(?:\.\d+)*(?:[-+._][\w.-]+)?$/;

export function resolveTechnologyIcon(name: string, detectedIcon: string): string {
  const icon = detectedIcon.trim();
  if (icon) return icon;

  const normalizedName = name.trim().toLowerCase().replace(VERSION_SUFFIX, "");
  const alias = TECHNOLOGY_ICON_ALIASES[normalizedName] ?? "";
  if (!alias || /^https?:\/\//i.test(alias) || alias.startsWith("/")) return alias;
  return `/icons/${alias}`;
}

export function resolveIconUrl(icon: string, baseUrl: string): string {
  if (!icon) return "";
  if (/^https?:\/\//i.test(icon) || icon.startsWith("/")) return icon;

  const base = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return encodeURI(`${base}${icon}`);
}
