import client from "../StreamIOClient.js"

// Function to create a StreamIO user
export async function CreateStreamIOUser( userRequest) {
try {
    // Skicka userRequest som array
    const result = await client.upsertUsers([userRequest]);

    // Logga resultatet för att se exakt vad som returneras
    console.log("Result from upsertUsers:", result);

    // Anpassa returnering beroende på strukturen
    return result; // eller result.users[0] om det är en array inuti objekt
  } catch (error) {
    console.error("Error creating StreamIO user:", error);
    throw error; // kasta vidare så controller kan hantera
  }

}