import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Properties routes
  app.get("/api/properties", async (req, res) => {
    try {
      const { type } = req.query;
      const properties = await storage.getProperties(type as string);
      res.json(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const property = await storage.getProperty(req.params.id);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      console.error("Error fetching property:", error);
      res.status(500).json({ error: "Failed to fetch property" });
    }
  });

  // Marketplace items routes
  app.get("/api/marketplace-items", async (req, res) => {
    try {
      const items = await storage.getMarketplaceItems();
      res.json(items);
    } catch (error) {
      console.error("Error fetching marketplace items:", error);
      res.status(500).json({ error: "Failed to fetch marketplace items" });
    }
  });

  app.get("/api/marketplace-items/:id", async (req, res) => {
    try {
      const item = await storage.getMarketplaceItem(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Marketplace item not found" });
      }
      res.json(item);
    } catch (error) {
      console.error("Error fetching marketplace item:", error);
      res.status(500).json({ error: "Failed to fetch marketplace item" });
    }
  });

  // Moving services routes
  app.get("/api/moving-services", async (req, res) => {
    try {
      const services = await storage.getMovingServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching moving services:", error);
      res.status(500).json({ error: "Failed to fetch moving services" });
    }
  });

  app.get("/api/moving-services/:id", async (req, res) => {
    try {
      const service = await storage.getMovingService(req.params.id);
      if (!service) {
        return res.status(404).json({ error: "Moving service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error("Error fetching moving service:", error);
      res.status(500).json({ error: "Failed to fetch moving service" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
