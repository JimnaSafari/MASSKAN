export type PageKey = "rentals" | "office" | "marketplace" | "airbnb" | "movers";

export type PageImageConfig = {
  /** Candidate filenames (in public/images/<page>/) to try for the hero background, in priority order */
  heroCandidates?: string[];
  /** Optional additional images to expose for the page (e.g., galleries) */
  gallery?: string[];
};

const FALLBACKS: Record<PageKey, string> = {
  rentals: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&auto=format&fit=crop&q=80",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&auto=format&fit=crop&q=80",
  marketplace: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=2000&auto=format&fit=crop&q=80",
  airbnb: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=2000&auto=format&fit=crop&q=80",
  movers: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=2000&auto=format&fit=crop&q=80",
};

// Default filenames we will attempt, in order
const DEFAULT_HERO_CANDIDATES = [
  "hero.webp",
  "hero.jpg",
  "hero.png",
  "banner.webp",
  "banner.jpg",
  "banner.png",
  "cover.webp",
  "cover.jpg",
  "cover.png",
];

// Per-page overrides (customize freely)
export const PAGE_IMAGE_CONFIG: Partial<Record<PageKey, PageImageConfig>> = {
  // Example customizations (uncomment and edit as desired):
  // rentals: { heroCandidates: ["rentals-hero.webp", "rentals-hero.jpg"], gallery: ["1.jpg", "2.jpg"] },
  // office: { heroCandidates: ["office-hero.jpg"] },
};

function getPublicUrl(page: PageKey, filename: string): string {
  return `/images/${page}/${filename}`;
}

function getHeroCandidates(page: PageKey): string[] {
  const custom = PAGE_IMAGE_CONFIG[page]?.heroCandidates ?? [];
  return [...custom, ...DEFAULT_HERO_CANDIDATES];
}

export function getHeroImageLayers(page: PageKey): string[] {
  return getHeroCandidates(page).map((name) => getPublicUrl(page, name));
}

/**
 * Returns the CSS background property string with a gradient overlay and image.
 */
export function heroBackgroundCss(page: PageKey, gradient = "linear-gradient(135deg, hsl(var(--primary) / 0.75), hsl(var(--secondary) / 0.65))"): string {
  const layers = getHeroImageLayers(page);
  const fallbackUrl = FALLBACKS[page];
  // Compose gradient + candidate local URLs (first that exists will render) + remote fallback
  const urls = [...layers.map((u) => `url(${u})`), `url(${fallbackUrl})`].join(", ");
  return `${gradient}, ${urls}`;
}


