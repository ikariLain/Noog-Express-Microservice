import {
  createStreamIOVideoCallById,
  startaGruppCallStreamIOById,
  deleteStreamIOVideoCallById,
  leaveCall,
  endCall} from "../services/StreamIOService.js";
import {
  AppError,
  notFoundError,
  validationError
} from "../middlewares/errorHandler.js";

export const createOrGetCall = async (req, res) => {
    const  {callId} = req.params;
    const {callType ="default"} = req.body;

    if (!callId) {
      throw validationError("call id is required");
    }
    if (!callType) {
      throw validationError("call type is required");
    }

    const call = await createStreamIOVideoCallById(callId, callType);

    if(!call) {
      throw new AppError("Failed to create or retrieve the call", 500);
    }

    res.status(201).json({
      callId,
       callType,
      call: call.toJson?.() ?? null});

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

  res.status(201).json({
    callId,
    groupType,
    call: call.toJSON?.() ?? null });
};

// Hard delete call
export const hardDeleteCall = async (req, res) => {
  const { callId } = req.params;

  if (!callId) {
    throw validationError("call id is required");
  }

  const deleted = await deleteStreamIOVideoCallById(callId);

  if (!deleted) {
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

export const JoinCall = async (req, res) => {
  const { callId } = req.params;
  const { userId, Username, callType = "default" } = req.body;
  if (!callId) {
    throw validationError("call id is required");
  }
  if (!userId) {
    throw validationError("user id is required");
  }
  if (!Username) {
    throw validationError("username is required");
  }
  const call = await JoinCall(callId, userId, Username, callType);

  if (!call) {
    throw new AppError("Failed to join call", 500);
  }
  res.status(200).json({
    callId,
    userId,
    Username,
    call: call.toJSON?.() ?? null });
};