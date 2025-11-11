
import React from 'react';

interface LoaderProps {
  message: string;
}

export const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-800/50 rounded-lg">
      <div className="w-12 h-12 border-4 border-t-sky-400 border-slate-600 rounded-full animate-spin"></div>
      <p className="text-slate-300 font-medium">{message}</p>
    </div>
  );
};
