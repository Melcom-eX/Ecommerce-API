import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      [key: string]: any; // Add other user properties if needed
    };
  }
}
