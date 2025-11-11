export interface FiboPrompt {
  scene: {
    environment: string;
    subjects: string[];
    timeOfDay: 'sunrise' | 'day' | 'sunset' | 'night' | 'golden hour' | 'blue hour';
    weather: 'clear' | 'misty' | 'rainy' | 'stormy' | 'snowy' | 'overcast';
  };
  camera: {
    angle: 'eye-level' | 'low-angle' | 'high-angle' | 'dutch-angle' | 'wide-shot' | 'close-up' | 'drone-shot';
    fov: 'narrow' | 'medium' | 'wide' | 'ultra-wide';
  };
  style: {
    artisticStyle: 'photorealistic' | 'impressionistic' | 'cel-shaded' | 'concept-art' | 'matte-painting' | 'cinematic';
    lighting: 'dramatic' | 'soft' | 'flat' | 'rim-lighting' | 'neon' | 'volumetric';
    palette: 'warm' | 'cool' | 'vibrant' | 'monochromatic' | 'pastel' | 'muted';
  };
  rendering: {
    effects: string[]; // e.g., ["hdr", "16-bit color", "atmospheric haze", "lens flare"]
    aspectRatio: '16:9' | '9:16' | '1:1' | '4:3' | '3:4';
  };
  finalPrompt: string;
}

export enum GenerationState {
  IDLE = 'IDLE',
  GENERATING_JSON = 'GENERATING_JSON',
  GENERATING_IMAGES = 'GENERATING_IMAGES',
  DONE = 'DONE',
  ERROR = 'ERROR',
}