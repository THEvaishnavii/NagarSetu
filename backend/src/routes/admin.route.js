
import express from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect every route in this router
router.use(requireAuth, requireRole("ADMIN"));

router.get("/ping", (req, res) => {
  res.status(200).json({
    message: "Hello admin",
  });
});

export default router;
