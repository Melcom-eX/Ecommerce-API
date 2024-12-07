import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cron from "node-cron";
import rateLimit from "express-rate-limit";
import userRoutes from "./components/user/user.routes";
import authRoutes from "./components/auth/auth.routes";
import categoryRoutes from "./components/category/category.routes";
import productRoutes from "./components/product/product.routes";
import cartRoutes from "./components/cart/cart.routes";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Provide a fallback port in case PORT is undefined

// Set up the rate limiter to allow 100 requests per hour
const limiter = rateLimit({
  max: 100, // 100 requests
  windowMs: 60 * 60 * 1000, // 1 hour
  message:
    "We have received too many requests from this IP. Please try again after one hour.",
});

// Middleware setup
app.use(
  cors({
    origin: process.env.ALLOWED_URL || "*", // Your frontend URL, default to *
    methods: "*",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", async (req: Request, res: Response) => {
  res.json({ success: true, message: "Backend Connected Successfully" });
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/carts", cartRoutes);

//cronjob for the server to not sleep
cron.schedule("* * * * *", () => {
  console.log("This message logs every 60 seconds");
});

// Start server and connect to the database
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
