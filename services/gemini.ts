
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

const apiKey = process.env.API_KEY || "";

class GeminiService {
  private ai: any;
  private chat: any;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey });
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const response = await this.chat.sendMessage({ message });
      return response.text || "I'm sorry, I encountered an issue. How can I help you further?";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "An error occurred. Please try again.";
    }
  }

  async *sendMessageStream(message: string) {
    try {
      const result = await this.chat.sendMessageStream({ message });
      for await (const chunk of result) {
        const response = chunk as GenerateContentResponse;
        yield response.text || "";
      }
    } catch (error) {
      console.error("Gemini Stream Error:", error);
      yield "Communication interrupted. Please check your connection.";
    }
  }
}

export const geminiService = new GeminiService();
