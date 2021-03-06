import express from "express";
import {
  authUser,
  getUsers,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  deleteUser,
  createAdmin,
  chnageStatus,
  updateByAdmin,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/admin", protect, admin, createAdmin);
router.get("/all", protect, admin, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.put("/status/:id", protect, admin, chnageStatus);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateByAdmin);

export default router;
