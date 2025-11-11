import client from "../StreamIOClient.js"

// Function to create or get a StreamIO video call by ID
export async function  createStreamIOVideoCallById(callId, callType) {
  const call = client.Call(callId,callType)

  await call.GetOrCreate()

  return call
}

export async function startaGruppCallStreamIOById(callId, grupptype = "group") {
    const call = client.Call(callId, grupptype)

    await call.GetOrCreate()

    return call
}

export async function deleteStreamIOVideoCallById(callId) {
  const call = client.Call(callId)

  //Hard delete
  //All data associated with the call will be permanently removed and cannot be recovered.
  await call.delete({ hard: true })

  return true
}

export async function leaveCall(callId,userId) {
  const call = client.Call(callId)

  await call.removeParticipant(userId)

  return true
}

//For admin rights
export async function endCall(CallId) {
  const call = client.Call(CallId)

  await call.end()

  return true
}

