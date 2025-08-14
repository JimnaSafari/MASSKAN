import { pgTable, text, serial, integer, boolean, uuid, numeric, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Properties table
export const properties = pgTable("properties", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  price: numeric("price").notNull(),
  price_type: text("price_type").notNull(), // 'month' or 'night'
  rating: numeric("rating").default("0"),
  reviews: integer("reviews").default(0),
  bedrooms: numeric("bedrooms").default("0"),
  bathrooms: numeric("bathrooms").default("0"),
  area: integer("area").default(0),
  image: text("image").notNull(),
  type: text("type").notNull(), // 'rental', 'airbnb', 'office'
  featured: boolean("featured").default(false),
  managed_by: text("managed_by"), // 'landlord' or 'agency'
  landlord_name: text("landlord_name"),
  landlord_verified: boolean("landlord_verified").default(false),
  agency_name: text("agency_name"),
  agency_verified: boolean("agency_verified").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Marketplace items table
export const marketplaceItems = pgTable("marketplace_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  price: numeric("price").notNull(),
  condition: text("condition").notNull(),
  location: text("location").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Moving services table
export const movingServices = pgTable("moving_services", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  rating: numeric("rating").default("0"),
  reviews: integer("reviews").default(0),
  location: text("location").notNull(),
  services: jsonb("services").notNull().default("[]"),
  price_range: text("price_range").notNull(),
  verified: boolean("verified").default(false),
  image: text("image").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// User profiles table
export const userProfiles = pgTable("user_profiles", {
  id: uuid("id").primaryKey(),
  full_name: text("full_name").notNull(),
  phone: text("phone"),
  avatar_url: text("avatar_url"),
  user_type: text("user_type").notNull(), // 'tenant', 'landlord', 'agent', 'mover', 'buyer', 'seller'
  verified: boolean("verified").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Legacy users table (keeping for compatibility)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Schemas for validation
export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertMarketplaceItemSchema = createInsertSchema(marketplaceItems).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertMovingServiceSchema = createInsertSchema(movingServices).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Types
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;

export type MarketplaceItem = typeof marketplaceItems.$inferSelect;
export type InsertMarketplaceItem = z.infer<typeof insertMarketplaceItemSchema>;

export type MovingService = typeof movingServices.$inferSelect;
export type InsertMovingService = z.infer<typeof insertMovingServiceSchema>;

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;