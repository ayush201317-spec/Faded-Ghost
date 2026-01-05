import { GoogleGenAI, Type } from "@google/genai";
import { PromptFormData } from "../types";
import { SYSTEM_INSTRUCTION_GENERATOR, SYSTEM_INSTRUCTION_CHAT } from "../constants";

// Helper to get client
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key not found");
  return new GoogleGenAI({ apiKey });
};

export const generateSoraPrompt = async (data: PromptFormData): Promise<string> => {
  const ai = getClient();
  
  const userPrompt = `
    Generate a Sora 2 Video Prompt based on these parameters:
    
    Mode: ${data.camera || data.mood ? "Sigma (Advanced)" : "Alpha (Basic)"}
    Core Description: ${data.description}
    Target Duration: ${data.duration} seconds
    Character Type: ${data.characterType === 'cameo' ? "Cameo (User's specific character)" : "Non-Cameo (AI Generated Character)"}
    Visual Style: ${data.style}
    
    ${data.camera ? `Camera Model: ${data.camera}` : ""}
    ${data.mood ? `Mood: ${data.mood}` : ""}
    ${data.cameraAngle ? `Camera Angle: ${data.cameraAngle}` : ""}
    ${data.lighting ? `Lighting details: ${data.lighting}` : ""}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_GENERATOR,
        temperature: 0.7, // Creativity balance
      }
    });

    return response.text || "Failed to generate prompt.";
  } catch (error) {
    console.error("Error generating prompt:", error);
    return "Error: Could not generate prompt. Please check your API key.";
  }
};

export const chatWithQuillbot = async (history: {role: 'user'|'model', text: string}[], newMessage: string) => {
  const ai = getClient();
  
  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_CHAT,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;
  } catch (error) {
    console.error("Chat error:", error);
    return "I'm having trouble connecting right now.";
  }
};
