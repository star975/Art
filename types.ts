
export type TimeOfDay = 'sunrise' | 'day' | 'sunset' | 'night' | 'golden hour' | 'blue hour';
export type Weather = 'clear' | 'misty' | 'rainy' | 'stormy' | 'snowy' | 'overcast';
export type CameraAngle = 'eye-level' | 'low-angle' | 'high-angle' | 'dutch-angle' | 'wide-shot' | 'close-up' | 'drone-shot';
export type CameraFov = 'narrow' | 'medium' | 'wide' | 'ultra-wide';
export type ArtisticStyle = 'photorealistic' | 'impressionistic' | 'cel-shaded' | 'concept-art' | 'matte-painting' | 'cinematic';

export interface FiboPrompt {
  scene: {
    environment: string;
    subjects: string[];
    timeOfDay: TimeOfDay;
    weather: Weather;
  };
  camera: {
    angle: CameraAngle;
    fov: CameraFov;
  };
  style: {
    artisticStyle: ArtisticStyle;
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
