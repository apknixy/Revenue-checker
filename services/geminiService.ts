
import { GoogleGenAI } from "@google/genai";
import { CalculationInput, CalculationResult } from "../types";

export async function getOptimizationTips(input: CalculationInput, results: CalculationResult): Promise<string> {
  // Fix: Initialize GoogleGenAI inside the function as per best practices
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const prompt = `
      Act as a high-level ad revenue consultant. 
      The user is running a ${input.platform} on the network "${input.adNetwork}".
      Details:
      - Niche: ${input.niche}
      - Region: ${input.region}
      - Monthly Traffic: ${input.monthlyTraffic.toLocaleString()} impressions
      - Traffic Source: ${input.trafficSource}
      - Current Ad Format: ${input.adFormat}
      - Estimated Monthly Earnings: $${results.monthly.toFixed(2)}
      
      Provide 3-4 professional, actionable tips to increase their RPM or revenue. 
      Focus on ad placement, platform-specific strategies, and potential network switches. 
      Keep it concise and professional. Use markdown.
    `;

    // Using ai.models.generateContent directly with model name and prompt
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.9
      }
    });

    // Access .text property directly (not a method)
    return response.text || "Could not generate optimization tips at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Optimization engine is currently unavailable. Please try again later.";
  }
}
