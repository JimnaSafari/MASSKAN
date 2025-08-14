// Database types (moved from supabase.ts)
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

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  user_type: 'tenant' | 'landlord' | 'agent' | 'mover' | 'buyer' | 'seller';
  verified: boolean;
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

// API functions
export async function getProperties(type?: string): Promise<Property[]> {
  const url = type ? `/api/properties?type=${type}` : '/api/properties';
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

export async function getProperty(id: string): Promise<Property> {
  const response = await fetch(`/api/properties/${id}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

export async function getMarketplaceItems(): Promise<MarketplaceItem[]> {
  const response = await fetch('/api/marketplace-items');
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

export async function getMarketplaceItem(id: string): Promise<MarketplaceItem> {
  const response = await fetch(`/api/marketplace-items/${id}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

export async function getMovingServices(): Promise<MovingService[]> {
  const response = await fetch('/api/moving-services');
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

export async function getMovingService(id: string): Promise<MovingService> {
  const response = await fetch(`/api/moving-services/${id}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

// Auth stub functions (to be replaced with full auth system later)
export const signIn = async (email: string, password: string): Promise<User> => {
  // Stub implementation - in a real app, this would authenticate with the server
  console.log('Auth stub: Sign in attempted for', email);
  const user: User = {
    id: '1',
    email,
    created_at: new Date().toISOString()
  };
  localStorage.setItem('auth_user', JSON.stringify(user));
  return user;
};

export const signUp = async (email: string, password: string, userData: Partial<UserProfile>): Promise<User> => {
  // Stub implementation - in a real app, this would create an account
  console.log('Auth stub: Sign up attempted for', email, userData);
  const user: User = {
    id: '1',
    email,
    created_at: new Date().toISOString()
  };
  localStorage.setItem('auth_user', JSON.stringify(user));
  return user;
};

export const getCurrentUser = async (): Promise<User | null> => {
  // Stub implementation - check localStorage
  const stored = localStorage.getItem('auth_user');
  return stored ? JSON.parse(stored) : null;
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  // Stub implementation - return a mock profile
  return {
    id: userId,
    full_name: 'Demo User',
    phone: '+254700000000',
    user_type: 'tenant',
    verified: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
};

export const signOut = async (): Promise<void> => {
  localStorage.removeItem('auth_user');
};