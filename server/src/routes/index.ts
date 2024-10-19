import { Router } from "express";
import authRoutes from "./auth";
import generalRoutes from "./general";
import homeRoutes from "./home";
import facultyRoutes from "./faculty";
import doctorRoutes from "./doctor";
import studentRoutes from "./student";
import { authenticate } from "../middlewares/auth";
const router = Router();

router.use("/auth", authRoutes);
router.use("/", generalRoutes);
router.use("/", homeRoutes);
router.use("/faculty", facultyRoutes);
router.use("/doctor", doctorRoutes);
router.use("/student", studentRoutes);

export default router;
