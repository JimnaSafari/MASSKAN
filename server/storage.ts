import { 
  users, properties, marketplaceItems, movingServices,
  type User, type InsertUser, type Property, type MarketplaceItem, type MovingService 
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Properties
  getProperties(type?: string): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  
  // Marketplace items
  getMarketplaceItems(): Promise<MarketplaceItem[]>;
  getMarketplaceItem(id: string): Promise<MarketplaceItem | undefined>;
  
  // Moving services
  getMovingServices(): Promise<MovingService[]>;
  getMovingService(id: string): Promise<MovingService | undefined>;
}

import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Properties
  async getProperties(type?: string): Promise<Property[]> {
    if (type) {
      return await db.select().from(properties).where(eq(properties.type, type));
    }
    return await db.select().from(properties);
  }

  async getProperty(id: string): Promise<Property | undefined> {
    const result = await db.select().from(properties).where(eq(properties.id, id));
    return result[0];
  }

  // Marketplace items
  async getMarketplaceItems(): Promise<MarketplaceItem[]> {
    return await db.select().from(marketplaceItems);
  }

  async getMarketplaceItem(id: string): Promise<MarketplaceItem | undefined> {
    const result = await db.select().from(marketplaceItems).where(eq(marketplaceItems.id, id));
    return result[0];
  }

  // Moving services
  async getMovingServices(): Promise<MovingService[]> {
    return await db.select().from(movingServices);
  }

  async getMovingService(id: string): Promise<MovingService | undefined> {
    const result = await db.select().from(movingServices).where(eq(movingServices.id, id));
    return result[0];
  }
}

// For backward compatibility during migration
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Placeholder implementations for new methods
  async getProperties(): Promise<Property[]> { return []; }
  async getProperty(): Promise<Property | undefined> { return undefined; }
  async getMarketplaceItems(): Promise<MarketplaceItem[]> { return []; }
  async getMarketplaceItem(): Promise<MarketplaceItem | undefined> { return undefined; }
  async getMovingServices(): Promise<MovingService[]> { return []; }
  async getMovingService(): Promise<MovingService | undefined> { return undefined; }
}

export const storage = new DatabaseStorage();
