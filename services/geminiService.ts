
import { GoogleGenAI, Type } from "@google/genai";

// Guideline: Create a new GoogleGenAI instance right before making an API call 
// to ensure it always uses the most up-to-date API key.

export const keroAssistant = {
  async chat(message: string, history: { role: 'user' | 'model'; content: string }[]) {
    // Initializing instance inside the method for dynamic key support
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          ...history.map(h => ({ 
            role: h.role === 'user' ? 'user' : 'model', 
            parts: [{ text: h.content }] 
          })),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: `You are Kero, the official AI assistant of RebaLive RW. 
          RebaLive is Rwanda's premier multimedia platform for video, music, news, and creator content.
          Your tone should be helpful, culturally aware of Rwanda, and professional. 
          You can speak Kinyarwanda, English, and French.
          Assist users in finding content, explaining how credits work (1 RWF = 1 Credit), or summarizing news.
          Current context: RebaLive RW features premium movies, creator uploads, Spotify-style music, and news from IGIHE/KigaliToday style publishers.`,
        }
      });

      // Access .text property directly (not a function)
      return response.text || "Muraho! I encountered an empty response. How can I help you otherwise?";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Muraho! I'm having a little trouble connecting right now. Please try again in a moment.";
    }
  },

  async getRecommendations(userInterests: string[]) {
    // Initializing instance inside the method for dynamic key support
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Based on these interests in Rwanda: ${userInterests.join(', ')}, suggest 3 types of content categories (e.g., Traditional Dance, Kigali Tech Scene, Coffee Farming Documentaries).`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                reason: { type: Type.STRING }
              },
              required: ["category", "reason"]
            }
          }
        }
      });
      // Access .text property directly
      return JSON.parse(response.text || "[]");
    } catch (error) {
      return [];
    }
  }
};
