import { StreamClient } from "@stream-io/node-sdk"
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.STREAMIO_API_KEY
const secretKey = process.env.STREAMIO_SECRET_KEY

// Initialize a global the Stream Video Client
const client = new StreamClient(apiKey, secretKey)

export default client
