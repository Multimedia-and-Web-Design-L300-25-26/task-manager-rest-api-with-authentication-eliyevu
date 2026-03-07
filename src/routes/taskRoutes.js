import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createTask, deleteTask, getTasks } from "../controllers/taskController.js";

const taskRoutes = express.Router();

// Apply auth middleware
taskRoutes.use(authMiddleware);

// POST /api/tasks
taskRoutes.post("/", createTask);

// GET /api/tasks
taskRoutes.get("/", getTasks);

// DELETE /api/tasks/:id
taskRoutes.delete("/:id", deleteTask);

export default taskRoutes;