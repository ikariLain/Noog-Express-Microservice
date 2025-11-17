import client from "../StreamIOClient.js"

// Function to create or get a StreamIO video call by ID
export async function  createStreamIOVideoCallById( callId, callType = "default", createdBy ) {
  const call = client.video.call(callType, callId)
  await call.getOrCreate({
    data:{
      created_by_id: createdBy || "admin"
    }
  });
  return call;
}
// Start a group call
export async function startaGruppCallStreamIOById(callId, grupptype = "group") {
    const call = client.video.call(grupptype, callId)

    await call.getOrCreate()

    return call
}
// Delete a call
export async function deleteStreamIOVideoCallById(callId, callType = "default") {
  const call = client.video.call(callType, callId);

  //Hard delete
  //All data associated with the call will be permanently removed and cannot be recovered.
  await call.delete({ hard: true })

  return true
}
// Remove participant from call
export async function leaveCall(callId,callType = "default") {
 const call = client.video.call(callType, callId);

  await call.removeParticipant(userId)

  return true
}

//For admin rights
export async function endCall(CallId, callType = "default") {
  const call = client.video.call(callType, callId);

  await call.end()

  return true
}

//Join call
export async function JoinCall(callId, userId, Username, callType = "default") {
  try {
    const call = client.video.call(callType, callId);

  await call.addParticipant({
    user_id: userId,
    user_name: Username
  });

   return call;

  } catch (error) {
    console.error("Error joining StreamIO call:", error);
    throw error;
  }






}

