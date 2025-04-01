import { users, type User, type InsertUser, gameScores, type GameScore, type InsertGameScore } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Game scores
  getGameScore(userId: number): Promise<GameScore | undefined>;
  updateGameScore(userId: number, score: Partial<InsertGameScore>): Promise<GameScore>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private gameScores: Map<number, GameScore>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.gameScores = new Map();
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

  async getGameScore(userId: number): Promise<GameScore | undefined> {
    return this.gameScores.get(userId);
  }

  async updateGameScore(userId: number, score: Partial<InsertGameScore>): Promise<GameScore> {
    const existingScore = this.gameScores.get(userId);
    
    if (existingScore) {
      const updatedScore: GameScore = {
        ...existingScore,
        wins: score.wins !== undefined ? score.wins : existingScore.wins,
        losses: score.losses !== undefined ? score.losses : existingScore.losses,
        draws: score.draws !== undefined ? score.draws : existingScore.draws
      };
      
      this.gameScores.set(userId, updatedScore);
      return updatedScore;
    } else {
      const newScore: GameScore = {
        id: this.currentId++,
        userId,
        wins: score.wins || 0,
        losses: score.losses || 0,
        draws: score.draws || 0
      };
      
      this.gameScores.set(userId, newScore);
      return newScore;
    }
  }
}

export const storage = new MemStorage();
