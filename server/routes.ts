import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Game score routes
  app.get("/api/scores/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const score = await storage.getGameScore(userId);
      if (!score) {
        return res.status(404).json({ message: "Score not found" });
      }
      
      res.json(score);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  app.post("/api/scores/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const scoreSchema = z.object({
        wins: z.number().optional(),
        losses: z.number().optional(),
        draws: z.number().optional()
      });
      
      const validData = scoreSchema.parse(req.body);
      const updatedScore = await storage.updateGameScore(userId, validData);
      
      res.json(updatedScore);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
