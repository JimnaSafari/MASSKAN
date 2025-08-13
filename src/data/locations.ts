export type TownInfo = {
  name: string;
  image: string; // Representative image URL for the town
};

export type CountyLocations = Record<string, TownInfo[]>;

// Counties and towns with curated Unsplash images
export const locationData: CountyLocations = {
  Nairobi: [
    { name: "Nairobi City, Nairobi", image: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1200&auto=format&fit=crop" },
    { name: "Westlands, Nairobi", image: "https://images.unsplash.com/photo-1533514114760-4389f572ae99?w=1200&auto=format&fit=crop" },
    { name: "Kilimani, Nairobi", image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&auto=format&fit=crop" },
    { name: "Karen, Nairobi", image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200&auto=format&fit=crop" },
    { name: "Kileleshwa, Nairobi", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&auto=format&fit=crop" },
    { name: "South B, Nairobi", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&auto=format&fit=crop" },
    { name: "Kasarani, Nairobi", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop" },
    { name: "Runda, Nairobi", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop" },
    { name: "Muthaiga, Nairobi", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop" },
    { name: "Dagoretti, Nairobi", image: "https://images.unsplash.com/photo-1582582621959-48d5024f00c5?w=1200&auto=format&fit=crop" },
    { name: "Embakasi, Nairobi", image: "https://images.unsplash.com/photo-1544986581-efac024faf62?w=1200&auto=format&fit=crop" },
    { name: "Lang'ata, Nairobi", image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1200&auto=format&fit=crop" },
    { name: "Kibra, Nairobi", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&auto=format&fit=crop" },
    { name: "Kamukunji, Nairobi", image: "https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200&auto=format&fit=crop" },
    { name: "Makadara, Nairobi", image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=1200&auto=format&fit=crop" },
    { name: "Mathare, Nairobi", image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&auto=format&fit=crop" },
    { name: "Njiru, Nairobi", image: "https://images.unsplash.com/photo-1529165981561-8c5ae80d40a5?w=1200&auto=format&fit=crop" },
    { name: "Starehe, Nairobi", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop" },
  ],
  Embu: [
    { name: "Embu Town, Embu", image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&auto=format&fit=crop" },
    { name: "Runyenjes, Embu", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop" },
    { name: "Siakago, Embu", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop" },
  ],
  "Tharaka-Nithi": [
    { name: "Chuka, Tharaka-Nithi", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop" },
  ],
  Meru: [
    { name: "Meru Town, Meru", image: "https://images.unsplash.com/photo-1582582621959-48d5024f00c5?w=1200&auto=format&fit=crop" },
    { name: "Nkubu, Meru", image: "https://images.unsplash.com/photo-1544986581-efac024faf62?w=1200&auto=format&fit=crop" },
  ],
  Kirinyaga: [
    { name: "Kerugoya, Kirinyaga", image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1200&auto=format&fit=crop" },
  ],
  Nyeri: [
    { name: "Nyeri Town, Nyeri", image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=1200&auto=format&fit=crop" },
    { name: "Othaya, Nyeri", image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&auto=format&fit=crop" },
  ],
  Laikipia: [
    { name: "Nanyuki, Laikipia", image: "https://images.unsplash.com/photo-1529165981561-8c5ae80d40a5?w=1200&auto=format&fit=crop" },
    { name: "Nyahururu, Laikipia", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop" },
  ],
  "Murang’a": [
    { name: "Murang'a Town, Murang'a", image: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?w=1200&auto=format&fit=crop" },
    { name: "Maragua, Murang'a", image: "https://images.unsplash.com/photo-1455906876003-298dd8c44ec8?w=1200&auto=format&fit=crop" },
  ],
};

export const allCounties = Object.keys(locationData);

export function townsForCounty(county?: string): TownInfo[] {
  if (!county) return Object.values(locationData).flat();
  return locationData[county] ?? [];
}
