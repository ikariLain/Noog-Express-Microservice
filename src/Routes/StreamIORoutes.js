import express from "express"
import { asyncHandler } from "../middlewares/asyncHandler.js";
import {
  createOrGetCall,
  startGroupCall,
  hardDeleteCall,
  removeParticipant,
  endCallForAll,
  JoinCall
} from "../controllers/StreamIOController.js";

const router = express.Router()


//Get Stream IO Routes

/**
 * @openapi
 * /api/StreamIOVideoCall/calls/{callId}:
 *   post:
 *     summary: Create or get a Stream IO call
 *     tags: [Calls]
 *     parameters:
 *       - in: path
 *         name: callId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               callType:
 *                 type: string
 *                 example: default
 *     responses:
 *       200:
 *         description: Call created or returned
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

router.post("/calls/:callId", asyncHandler(createOrGetCall));


/**
 * @openapi
 * /api/StreamIOVideoCall/calls/{callId}/group:
 *   post:
 *     summary: Start a group call
 *     tags: [Calls]
 *     parameters:
 *       - in: path
 *         name: callId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Group call started or returned
 *       500:
 *         description: Server error
 */

router.post("/calls/:callId/group", asyncHandler(startGroupCall));

/**
 * @openapi
 * /api/StreamIOVideoCall/calls/{callId}:
 *   delete:
 *     summary: Hard delete a call
 *     tags: [Calls]
 *     parameters:
 *       - in: path
 *         name: callId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete("/calls/:callId", asyncHandler(hardDeleteCall));

/**
 * @openapi
 * /api/StreamIOVideoCall/calls/{callId}/participants:
 *   post:
 *     summary: Remove a participant from a call
 *     tags: [Calls]
 *     parameters:
 *       - in: path
 *         name: callId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId]
 *             properties:
 *               userId:
 *                 type: string
 *                 example: user_123
 *     responses:
 *       200:
 *         description: Participant removed
 */

router.post("/calls/:callId/participants", asyncHandler(removeParticipant));

/**
 * @openapi
 * /api/StreamIOVideoCall/calls/{callId}/end:
 *   post:
 *     summary: End a call for everyone (admin)
 *     tags: [Calls]
 *     parameters:
 *       - in: path
 *         name: callId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Call ended
 */
router.post("/calls/:callId/end", asyncHandler(endCallForAll));

/**
 * @openapi
 * /api/StreamIOVideoCall/calls/{callId}/join:
 *   post:
 *     summary: Join a user to an existing call
 *     tags: [Calls]
 *     parameters:
 *       - in: path
 *         name: callId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - username
 *             properties:
 *               userId:
 *                 type: string
 *                 example: user_123
 *               username:
 *                 type: string
 *                 example: Alice
 *               callType:
 *                 type: string
 *                 example: default
 *     responses:
 *       200:
 *         description: User joined call successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/calls/:callId/join", asyncHandler(JoinCall));

export default router;