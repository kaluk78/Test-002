// src/utils/AuthUtils.ts
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// 🔒 PLACEHOLDER_SECRET - replace with env config
const SECRET_KEY = "PLACEHOLDER_SECRET";

// Mock: Replace with secure random salt rounds later
const SALT_ROUNDS = 10;

export const AuthUtils = {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  },

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  },

  generateToken(payload: any): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" }); // PLACEHOLDER EXPIRATION
  },

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (e) {
      return null;
    }
  },
};
