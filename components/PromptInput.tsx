
import React from 'react';
import { Icon } from './Icon';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const examplePrompts = [
  "A lush forest at sunrise with mist and warm lighting",
  "Futuristic cyberpunk cityscape with neon lights and rainy weather",
  "A medieval castle on a hill with a dragon flying overhead",
  "An ancient, overgrown temple with a glowing artifact inside",
];

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  return (
    <div className="flex flex-col gap-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe a scene with objects, e.g., 'A castle on a hill with a dragon...'"
        className="w-full h-32 p-4 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none transition-shadow resize-none placeholder-slate-500"
        disabled={isLoading}
      />
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