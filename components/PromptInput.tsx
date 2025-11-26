
import React from 'react';
import { Icon } from './Icon';
import { TimeOfDay, Weather, CameraAngle, CameraFov, ArtisticStyle } from '../types';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  timeOfDay: TimeOfDay | 'auto';
  setTimeOfDay: (t: TimeOfDay | 'auto') => void;
  weather: Weather | 'auto';
  setWeather: (w: Weather | 'auto') => void;
  cameraAngle: CameraAngle | 'auto';
  setCameraAngle: (a: CameraAngle | 'auto') => void;
  cameraFov: CameraFov | 'auto';
  setCameraFov: (f: CameraFov | 'auto') => void;
  artisticStyle: ArtisticStyle | 'auto';
  setArtisticStyle: (s: ArtisticStyle | 'auto') => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const examplePrompts = [
  "A lush forest with mist and warm lighting",
  "Futuristic cyberpunk cityscape with neon lights",
  "A medieval castle on a hill with a dragon flying overhead",
  "An ancient, overgrown temple with a glowing artifact inside",
];

const timeOptions: (TimeOfDay | 'auto')[] = ['auto', 'sunrise', 'day', 'sunset', 'night', 'golden hour', 'blue hour'];
const weatherOptions: (Weather | 'auto')[] = ['auto', 'clear', 'misty', 'rainy', 'stormy', 'snowy', 'overcast'];
const angleOptions: (CameraAngle | 'auto')[] = ['auto', 'eye-level', 'low-angle', 'high-angle', 'dutch-angle', 'wide-shot', 'close-up', 'drone-shot'];
const fovOptions: (CameraFov | 'auto')[] = ['auto', 'narrow', 'medium', 'wide', 'ultra-wide'];
const styleOptions: (ArtisticStyle | 'auto')[] = ['auto', 'photorealistic', 'impressionistic', 'cel-shaded', 'concept-art', 'matte-painting', 'cinematic'];

const formatOption = (opt: string) => {
  if (opt === 'auto') return 'Auto (AI Decides)';
  return opt.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const PromptInput: React.FC<PromptInputProps> = ({ 
  prompt, 
  setPrompt, 
  timeOfDay,
  setTimeOfDay,
  weather,
  setWeather,
  cameraAngle,
  setCameraAngle,
  cameraFov,
  setCameraFov,
  artisticStyle,
  setArtisticStyle,
  onSubmit, 
  isLoading 
}) => {
  return (
    <div className="flex flex-col gap-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe a scene with objects, e.g., 'A castle on a hill with a dragon...'"
        className="w-full h-32 p-4 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none transition-shadow resize-none placeholder-slate-500"
        disabled={isLoading}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Time of Day</label>
          <select
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value as TimeOfDay | 'auto')}
            disabled={isLoading}
            className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none text-slate-200"
          >
            {timeOptions.map(opt => (
              <option key={opt} value={opt}>{formatOption(opt)}</option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Weather</label>
          <select
            value={weather}
            onChange={(e) => setWeather(e.target.value as Weather | 'auto')}
            disabled={isLoading}
            className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none text-slate-200"
          >
            {weatherOptions.map(opt => (
              <option key={opt} value={opt}>{formatOption(opt)}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Camera Angle</label>
          <select
            value={cameraAngle}
            onChange={(e) => setCameraAngle(e.target.value as CameraAngle | 'auto')}
            disabled={isLoading}
            className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none text-slate-200"
          >
            {angleOptions.map(opt => (
              <option key={opt} value={opt}>{formatOption(opt)}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Field of View (FOV)</label>
          <select
            value={cameraFov}
            onChange={(e) => setCameraFov(e.target.value as CameraFov | 'auto')}
            disabled={isLoading}
            className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none text-slate-200"
          >
            {fovOptions.map(opt => (
              <option key={opt} value={opt}>{formatOption(opt)}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Artistic Style</label>
          <select
            value={artisticStyle}
            onChange={(e) => setArtisticStyle(e.target.value as ArtisticStyle | 'auto')}
            disabled={isLoading}
            className="w-full p-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none text-slate-200"
          >
            {styleOptions.map(opt => (
              <option key={opt} value={opt}>{formatOption(opt)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-slate-400 self-center mr-2">Examples:</span>
        {examplePrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => !isLoading && setPrompt(p)}
            disabled={isLoading}
            className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded-full transition-colors disabled:opacity-50"
          >
            {p.length > 35 ? `${p.substring(0, 32)}...` : p}
          </button>
        ))}
      </div>
      <button
        onClick={onSubmit}
        disabled={isLoading || !prompt.trim()}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:scale-100"
      >
        <Icon name="wand" className="w-5 h-5" />
        Generate Concepts
      </button>
    </div>
  );
};
