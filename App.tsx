
import React, { useState, useCallback } from 'react';
import { PromptInput } from './components/PromptInput';
import { JsonDisplay } from './components/JsonDisplay';
import { ImageGallery } from './components/ImageGallery';
import { Loader } from './components/Loader';
import { Icon } from './components/Icon';
import { generateFiboJsonPrompt, generateImagesFromPrompt } from './services/geminiService';
import { FiboPrompt, GenerationState, TimeOfDay, Weather, CameraAngle, CameraFov, ArtisticStyle } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay | 'auto'>('auto');
  const [weather, setWeather] = useState<Weather | 'auto'>('auto');
  const [cameraAngle, setCameraAngle] = useState<CameraAngle | 'auto'>('auto');
  const [cameraFov, setCameraFov] = useState<CameraFov | 'auto'>('auto');
  const [artisticStyle, setArtisticStyle] = useState<ArtisticStyle | 'auto'>('auto');
  
  const [generationState, setGenerationState] = useState<GenerationState>(GenerationState.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [generatedJson, setGeneratedJson] = useState<FiboPrompt | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const isLoading = generationState === GenerationState.GENERATING_JSON || generationState === GenerationState.GENERATING_IMAGES;

  const handleSubmit = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setGenerationState(GenerationState.GENERATING_JSON);
    setError(null);
    setGeneratedJson(null);
    setGeneratedImages([]);

    try {
      // Step 1: Generate JSON blueprint
      const fiboPrompt = await generateFiboJsonPrompt(prompt, { 
        timeOfDay, 
        weather,
        cameraAngle,
        cameraFov,
        artisticStyle
      });
      setGeneratedJson(fiboPrompt);

      // Step 2: Generate Images
      setGenerationState(GenerationState.GENERATING_IMAGES);
      const images = await generateImagesFromPrompt(fiboPrompt.finalPrompt, fiboPrompt.rendering.aspectRatio);
      setGeneratedImages(images);

      setGenerationState(GenerationState.DONE);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
      setGenerationState(GenerationState.ERROR);
    }
  }, [prompt, timeOfDay, weather, cameraAngle, cameraFov, artisticStyle, isLoading]);
  
  const getLoaderMessage = () => {
    switch (generationState) {
      case GenerationState.GENERATING_JSON:
        return 'Translating your vision into a blueprint...';
      case GenerationState.GENERATING_IMAGES:
        return 'Crafting image variations... This can take a moment.';
      default:
        return 'Loading...';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
            STAR ART AI ASSISTANT
          </h1>
          <p className="mt-2 text-slate-400 max-w-2xl mx-auto">
            Describe a scene and watch as AI translates your words into a detailed JSON blueprint and generates stunning visual concepts.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-6">
             <h2 className="text-2xl font-semibold text-slate-100 flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center bg-sky-500/20 text-sky-400 rounded-full">1</span>
              Describe Your Scene
            </h2>
            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              timeOfDay={timeOfDay}
              setTimeOfDay={setTimeOfDay}
              weather={weather}
              setWeather={setWeather}
              cameraAngle={cameraAngle}
              setCameraAngle={setCameraAngle}
              cameraFov={cameraFov}
              setCameraFov={setCameraFov}
              artisticStyle={artisticStyle}
              setArtisticStyle={setArtisticStyle}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg flex items-start gap-3">
                <Icon name="error" className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold">Generation Failed</h3>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {isLoading ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <Loader message={getLoaderMessage()} />
              </div>
            ) : (
              <>
                {generatedJson && (
                  <div className="flex flex-col gap-4">
                     <h2 className="text-2xl font-semibold text-slate-100 flex items-center gap-3">
                        <Icon name="code" className="w-6 h-6 text-slate-400"/>
                        JSON Blueprint
                     </h2>
                    <JsonDisplay data={generatedJson} />
                  </div>
                )}
                {generatedImages.length > 0 && (
                   <div className="flex flex-col gap-4">
                     <h2 className="text-2xl font-semibold text-slate-100 flex items-center gap-3">
                        <Icon name="image" className="w-6 h-6 text-slate-400"/>
                        Generated Concepts
                     </h2>
                     <ImageGallery images={generatedImages} />
                   </div>
                )}
                {!isLoading && !generatedJson && !error && (
                   <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg p-8 text-center">
                        <Icon name="image" className="w-16 h-16 text-slate-600 mb-4"/>
                        <h3 className="text-xl font-semibold text-slate-300">Your creations will appear here</h3>
                        <p className="text-slate-500 mt-1">Enter a description to get started.</p>
                   </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
