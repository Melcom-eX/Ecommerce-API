import { IUser } from "../models/User"; // Assuming you have an IUser interface for User model

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Add user property to the Request type
    }
  }
}
