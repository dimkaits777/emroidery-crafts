import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DEFAULT_AFFILIATE_URL = "https://www.creativefabrica.com/search/ref/20531415/?query=mother&type=Embroidery";

export function getAffiliateUrl(url?: string) {
  if (!url || url.trim() === "") {
    return DEFAULT_AFFILIATE_URL;
  }
  return url;
}

export function extractCategory(title: string): string {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("floral") || lowerTitle.includes("flower") || lowerTitle.includes("rose") || lowerTitle.includes("daisy") || lowerTitle.includes("sunflower") || lowerTitle.includes("tulip") || lowerTitle.includes("bloom") || lowerTitle.includes("botanical") || lowerTitle.includes("leaf") || lowerTitle.includes("leaves")) return "Floral";
  if (lowerTitle.includes("grandma") || lowerTitle.includes("grammy") || lowerTitle.includes("nana") || lowerTitle.includes("mimi") || lowerTitle.includes("gigi") || lowerTitle.includes("nanny") || lowerTitle.includes("memaw") || lowerTitle.includes("abuela")) return "For Grandmas";
  if (lowerTitle.includes("dog") || lowerTitle.includes("cat") || lowerTitle.includes("pet") || lowerTitle.includes("paw") || lowerTitle.includes("kitten") || lowerTitle.includes("puppy")) return "Pet Moms";
  if (lowerTitle.includes("animal") || lowerTitle.includes("bear") || lowerTitle.includes("elephant") || lowerTitle.includes("giraffe") || lowerTitle.includes("dinosaur") || lowerTitle.includes("bird") || lowerTitle.includes("duck") || lowerTitle.includes("whale") || lowerTitle.includes("bunny") || lowerTitle.includes("koala")) return "Animals";
  if (lowerTitle.includes("funny") || lowerTitle.includes("shit list") || lowerTitle.includes("drama") || lowerTitle.includes("bad words") || lowerTitle.includes("chaos") || lowerTitle.includes("tired") || lowerTitle.includes("messy bun")) return "Funny";
  if (lowerTitle.includes("sports") || lowerTitle.includes("baseball") || lowerTitle.includes("football") || lowerTitle.includes("basketball") || lowerTitle.includes("softball") || lowerTitle.includes("tennis") || lowerTitle.includes("gymnastics")) return "Sports";
  if (lowerTitle.includes("1st") || lowerTitle.includes("first") || lowerTitle.includes("new mom") || lowerTitle.includes("loading") || lowerTitle.includes("pregnant") || lowerTitle.includes("pregnancy")) return "New Mom";
  if (lowerTitle.includes("modern") || lowerTitle.includes("abstract") || lowerTitle.includes("minimalist") || lowerTitle.includes("geometric") || lowerTitle.includes("boho") || lowerTitle.includes("line art")) return "Modern & Abstract";
  if (lowerTitle.includes("quote") || lowerTitle.includes("phrase") || lowerTitle.includes("saying") || lowerTitle.includes("lettering") || lowerTitle.includes("text") || lowerTitle.includes("words")) return "Quotes & Sayings";
  if (lowerTitle.includes("heart") || lowerTitle.includes("love")) return "Hearts & Love";
  return "Other";
}
