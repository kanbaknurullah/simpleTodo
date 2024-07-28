import express from "express";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todo";
import {authenticateToken} from '../middleware/auth';

const router = express.Router();

router.post("/todo", authenticateToken, createTodo);
router.get("/todos", authenticateToken, getTodos);
router.put("/update_todo/:id", authenticateToken, updateTodo);
router.delete("/delete_todo/:id", authenticateToken, deleteTodo);

export default router;