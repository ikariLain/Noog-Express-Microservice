import express from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { createUser } from "../controllers/StreamIOUserController.js";

const router = express.Router();

/**
 * @openapi
 * /api/StreamIOVideoCall/users:
 *   post:
 *     summary: Create a Stream IO user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "user-123"
 *               username:
 *                 type: string
 *                 example: "JohnDoe"
 *               image:
 *                 type: string
 *                 example: "https://example.com/avatar.png"
 *               role:
 *                 type: string
 *                 enum: ["user"]
 *                 example: "user"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 image:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Invalid user request
 *       500:
 *         description: Failed to create user
 */
router.post("/users", asyncHandler(createUser));

export default router;
