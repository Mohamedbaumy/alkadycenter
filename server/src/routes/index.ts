import { Router } from "express";
import authRoutes from "./auth";

const router = Router();

// Use auth routes
router.use("/auth", authRoutes);

// ... other routes can be added here in the future

export default router;
