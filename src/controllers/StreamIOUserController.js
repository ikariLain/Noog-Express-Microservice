import { CreateStreamIOUser } from "../services/StreamIOVideoUserService.js";


export const createUser = async (req, res) => {
  const userRequest = req.body;

  if (
    !userRequest ||
    !userRequest.id ||
    !userRequest.username ||
    !userRequest.image ||
    userRequest.role !== "user"
  ) {
    return res.status(400).json({ error: "Invalid user request" });
  }

  try {
    const newUser = await CreateStreamIOUser(userRequest);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Failed to make a user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};