
import { GoogleGenAI, Type } from "@google/genai";
import { FiboPrompt } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fiboPromptSchema = {
  type: Type.OBJECT,
  properties: {
    scene: {
      type: Type.OBJECT,
      properties: {
        environment: { type: Type.STRING, description: "The primary setting, e.g., 'forest', 'city', 'desert'." },
        subjects: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of key subjects, objects, or characters in the scene. e.g., ['castle', 'dragon', 'knight']" },
        timeOfDay: { type: Type.STRING, enum: ['sunrise', 'day', 'sunset', 'night', 'golden hour', 'blue hour'] },
        weather: { type: Type.STRING, enum: ['clear', 'misty', 'rainy', 'stormy', 'snowy', 'overcast'] },
      },
      required: ["environment", "subjects", "timeOfDay", "weather"]
    },
    camera: {
      type: Type.OBJECT,
      properties: {
        angle: { type: Type.STRING, enum: ['eye-level', 'low-angle', 'high-angle', 'dutch-angle', 'wide-shot', 'close-up', 'drone-shot'] },
        fov: { type: Type.STRING, enum: ['narrow', 'medium', 'wide', 'ultra-wide'] },
      },
      required: ["angle", "fov"]
    },
    style: {
      type: Type.OBJECT,
      properties: {
        artisticStyle: { type: Type.STRING, enum: ['photorealistic', 'impressionistic', 'cel-shaded', 'concept-art', 'matte-painting', 'cinematic'] },
        lighting: { type: Type.STRING, enum: ['dramatic', 'soft', 'flat', 'rim-lighting', 'neon', 'volumetric'] },
        palette: { type: Type.STRING, enum: ['warm', 'cool', 'vibrant', 'monochromatic', 'pastel', 'muted'] },
      },
       required: ["artisticStyle", "lighting", "palette"]
    },
    rendering: {
      type: Type.OBJECT,
      properties: {
        effects: { type: Type.ARRAY, items: { type: Type.STRING }, description: "e.g., ['hdr', '16-bit color', 'atmospheric haze']" },
        aspectRatio: { type: Type.STRING, enum: ['16:9', '9:16', '1:1', '4:3', '3:4'] },
      },
       required: ["effects", "aspectRatio"]
    },
    finalPrompt: {
      type: Type.STRING,
      description: "A detailed, descriptive final prompt for the image generator, synthesizing all other parameters into a cohesive sentence."
    },
  },
  required: ["scene", "camera", "style", "rendering", "finalPrompt"]
};

export const generateFiboJsonPrompt = async (
  description: string,
  options?: { 
    timeOfDay?: string; 
    weather?: string;
    cameraAngle?: string;
    cameraFov?: string;
    artisticStyle?: string;
  }
): Promise<FiboPrompt> => {
  try {
    let promptText = `Translate the following scene description into a structured JSON object that conforms to the provided schema. Act as a professional concept art director. Identify key subjects or objects from the description and list them in the 'subjects' array. The finalPrompt should be a rich, single-sentence description for an image generator that incorporates all elements.\n\nScene: "${description}"`;

    if (options?.timeOfDay && options.timeOfDay !== 'auto') {
      promptText += `\nConstraint: Set scene.timeOfDay to '${options.timeOfDay}'.`;
    }
    
    if (options?.weather && options.weather !== 'auto') {
      promptText += `\nConstraint: Set scene.weather to '${options.weather}'.`;
    }

    if (options?.cameraAngle && options.cameraAngle !== 'auto') {
      promptText += `\nConstraint: Set camera.angle to '${options.cameraAngle}'.`;
    }

    if (options?.cameraFov && options.cameraFov !== 'auto') {
      promptText += `\nConstraint: Set camera.fov to '${options.cameraFov}'.`;
    }

    if (options?.artisticStyle && options.artisticStyle !== 'auto') {
      promptText += `\nConstraint: Set style.artisticStyle to '${options.artisticStyle}'.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: fiboPromptSchema,
      },
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as FiboPrompt;
  } catch (error) {
    console.error("Error generating JSON prompt:", error);
    throw new Error("Failed to generate the creative blueprint. The AI might be having an off day.");
  }
};


export const generateImagesFromPrompt = async (prompt: string, aspectRatio: string): Promise<string[]> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 4,
                outputMimeType: 'image/jpeg',
                aspectRatio: aspectRatio as "1:1" | "16:9" | "9:16" | "4:3" | "3:4",
            },
        });

        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error("The AI failed to generate any images. Try a different prompt.");
        }

        return response.generatedImages.map(img => `data:image/jpeg;base64,${img.image.imageBytes}`);
    } catch (error) {
        console.error("Error generating images:", error);
        throw new Error("Failed to generate images. Please check your prompt and try again.");
    }
};
