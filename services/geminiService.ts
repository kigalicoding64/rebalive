
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const keroAssistant = {
  async chat(message: string, history: { role: 'user' | 'model'; content: string }[]) {
    try {
      const chat = ai.models.generateContent({
        model: 'gemini-3-flash-preview',
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

      const response = await chat;
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Muraho! I'm having a little trouble connecting right now. Please try again in a moment.";
    }
  },

  async getRecommendations(userInterests: string[]) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
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
      return JSON.parse(response.text);
    } catch (error) {
      return [];
    }
  }
};
