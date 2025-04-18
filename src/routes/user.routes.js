import express from "express";
import {
  addUser,
  addExpert,
  removeUser,
  getUser,
  updateUser,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", addUser);

router.post("/expert", addExpert);

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.put("/:id", updateUser);

router.delete("/:id", removeUser);

export default router;
