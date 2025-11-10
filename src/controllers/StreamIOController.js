import {createStreamIOVideoCallById, startaGruppCallStreamIOById,
    deleteStreamIOVideoCallById, leaveCall, endCall} from "../services/StreamIOService.js";
import { AppError, notFoundError, validationError} from "../middlewares/errorHandler.js";

export const createOrGetCall = async (requestAnimationFrame, res) => {
    const  {callId} = requestAnimationFrame.params;
    const {type} = requestAnimationFrame.body;

    if (!callId) {
      throw validationError("call id is required");
    }
    if (!type) {
      throw validationError("call type is required");
    }

    const call = await createStreamIOVideoCallById(callId, type);

    if(!call) {
      throw new AppError("Failed to create or retrieve the call", 500);
    }

    res.status(201).json({callId, groupType, call: call.toJson?.() ?? null});

};

export const startGroupCall = async (req, res) => {
  const { callId } = req.params;
  const { groupType = "group" } = req.body;

   if (!callId) {
      throw validationError("call id is required");
    }

  const call = await startaGruppCallStreamIOById(callId, groupType);

  if (!call) {
    throw new AppError("Failed to start group call", 500);
  }

  res.status(201).json({ callId, groupType, call: call.toJSON?.() ?? null });
};

export const hardDeleteCall = async (req, res) => {
  const { callId } = req.params;

  if (!callId) {
    throw validationError("call id is required");
  }

  await deleteStreamIOVideoCallById(callId);

  if (!result) {
    throw notFoundError("Call not found or already deleted");
  }

  res.status(204).send(); 
};

export const removeParticipant = async (req, res) => {
  const { callId } = req.params;
  const { userId } = req.body;

  if (!callId) {
    throw validationError("call id is required");
  }
  if (!userId) {
    throw validationError("user id is required");
  }

  await leaveCall(callId, userId);

  res.status(200).json({ callId, userId, left: true });
};

export const endCallForAll = async (req, res) => {
  const { callId } = req.params;

  if (!callId) {
    throw validationError("call id is required");
  }
  await endCall(callId);
  
  res.status(200).json({ callId, ended: true });
};