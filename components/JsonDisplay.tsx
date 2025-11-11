
import React, { useState } from 'react';
import { FiboPrompt } from '../types';
import { Icon } from './Icon';

interface JsonDisplayProps {
  data: FiboPrompt;
}

export const JsonDisplay: React.FC<JsonDisplayProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="relative bg-slate-800 rounded-lg">
       <button 
        onClick={handleCopy}
        className="absolute top-2 right-2 px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded-md transition-colors"
      >
        {copied ? 'Copied!' : 'Copy JSON'}
      </button>
      <pre className="p-4 text-sm text-slate-300 overflow-x-auto">
        <code>{jsonString}</code>
      </pre>
    </div>
  );
};
