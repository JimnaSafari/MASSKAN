import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let client: SupabaseClient | null = null;

if (url && anonKey) {
  client = createClient(url, anonKey);
} else {
  console.warn('Supabase environment variables not found. Please check your .env file.');
}

export function getSupabase(): SupabaseClient | null {
  return client;
}

// Database types
export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  price_type: 'month' | 'night';
  rating: number;
  reviews: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  type: 'rental' | 'airbnb' | 'office';
  featured: boolean;
  managed_by?: 'landlord' | 'agency';
  landlord_name?: string;
  landlord_verified?: boolean;
  agency_name?: string;
  agency_verified?: boolean;
  created_at: string;
  updated_at: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  condition: string;
  location: string;
  image: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface MovingService {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  services: string[];
  price_range: string;
  verified: boolean;
  image: string;
  created_at: string;
  updated_at: string;
}

// Database operations
export async function getProperties(type?: 'rental' | 'airbnb' | 'office', featured?: boolean) {
  const supabase = getSupabase();
  if (!supabase) {
    console.error('Supabase client not initialized');
    return [];
  }

  let query = supabase.from('properties').select('*');
  
  if (type) {
    query = query.eq('type', type);
  }
  
  if (featured !== undefined) {
    query = query.eq('featured', featured);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
  
  return data as Property[];
}

export async function getMarketplaceItems() {
  const supabase = getSupabase();
  if (!supabase) {
    console.error('Supabase client not initialized');
    return [];
  }

  const { data, error } = await supabase
    .from('marketplace_items')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching marketplace items:', error);
    return [];
  }
  
  return data as MarketplaceItem[];
}

export async function getMovingServices() {
  const supabase = getSupabase();
  if (!supabase) {
    console.error('Supabase client not initialized');
    return [];
  }

  const { data, error } = await supabase
    .from('moving_services')
    .select('*')
    .order('rating', { ascending: false });
  
  if (error) {
    console.error('Error fetching moving services:', error);
    return [];
  }
  
  return data as MovingService[];
}
