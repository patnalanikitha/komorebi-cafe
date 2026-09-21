import React, { useState } from 'react';
import type { CoffeeRecipe } from '../types/coffee';
import { COFFEE_RECIPES } from '../data/coffeeRecipes';
import { X, Sparkles, Coffee, Thermometer } from 'lucide-react';
import { sounds } from '../utils/soundEngine';

interface BaristaGrimoireProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecipeToBrew: (recipe: CoffeeRecipe) => void;
  activeRecipeId?: string | null;
}

export const BaristaGrimoire: React.FC<BaristaGrimoireProps> = ({
  isOpen,
  onClose,
  onSelectRecipeToBrew,
  activeRecipeId,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<CoffeeRecipe>(
    () => COFFEE_RECIPES.find((r) => r.id === activeRecipeId) || COFFEE_RECIPES[0]
  );
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');

  if (!isOpen) return null;

  const filtered = filterDifficulty === 'All'
    ? COFFEE_RECIPES
    : COFFEE_RECIPES.filter((r) => r.difficulty === filterDifficulty);

  const handleSelect = (r: CoffeeRecipe) => {
    sounds.playPaperRustle();
    setSelectedRecipe(r);
  };

  const handleStartBrew = (r: CoffeeRecipe) => {
    sounds.playBellChime();
    onSelectRecipeToBrew(r);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      {/* Book Container */}
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#331f16] rounded-3xl p-3 shadow-2xl border-4 border-[#573525] flex flex-col overflow-hidden">
        
        {/* Book Header / Spine */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#26160f] rounded-2xl border border-[#44281b] mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#613b28] flex items-center justify-center text-xl text-amber-200 shadow-inner">
              📖
            </div>
            <div>
              <h2 className="font-cozy text-xl font-bold text-[#faf0e1] flex items-center gap-2">
                Barista's Grimoire & Recipe Codex
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-300 border border-amber-700/50 font-pixel">
                  12 CLASSICS
                </span>
              </h2>
              <p className="font-cozy text-xs text-[#a37f68]">
                Master traditional ratios, authentic layer anatomy, and pixelated beverage art.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playCupClink();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-[#422518] hover:bg-[#5c3422] text-[#e0c9b7] flex items-center justify-center border border-[#5e3825] transition-all hover:scale-105"
            title="Close Book"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Book Pages (2 Column Layout on Desktop) */}
        <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden rounded-2xl bg-[#faf5eb] text-[#2c1810] p-4 shadow-inner border border-[#d6c4ae]">
          
          {/* LEFT PAGE: Coffee Index List */}
          <div className="w-full md:w-5/12 flex flex-col border-b md:border-b-0 md:border-r border-[#ded0be] pr-0 md:pr-4 overflow-hidden">
            {/* Filter pills */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#e8dac8]">
              <span className="font-pixel text-[11px] uppercase tracking-wider text-[#7d5641]">
                Beverage Catalog
              </span>
              <div className="flex gap-1">
                {['All', 'Cozy & Easy', 'Artisan', 'Master Barista'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setFilterDifficulty(diff)}
                    className={`text-[10px] font-cozy px-2 py-0.5 rounded-full transition-all ${
                      filterDifficulty === diff
                        ? 'bg-[#5c3725] text-white font-medium shadow-sm'
                        : 'bg-[#ede1d1] text-[#6d4934] hover:bg-[#e2d2be]'
                    }`}
                  >
                    {diff === 'All' ? 'All' : diff.replace(' Barista', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filtered.map((recipe) => {
                const isSelected = selectedRecipe.id === recipe.id;
                return (
                  <button
                    key={recipe.id}
                    onClick={() => handleSelect(recipe)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-3 border ${
                      isSelected
                        ? 'bg-[#eedbc5] border-[#a8754b] shadow-pixel-sm scale-[1.01]'
                        : 'bg-[#f5ede1] hover:bg-[#efe3d3] border-[#e0d0bc]'
                    }`}
                  >
                    {/* Pixel Art Icon Preview */}
                    <div 
                      className="w-11 h-11 rounded-lg bg-[#2e1911] p-1 flex-shrink-0 shadow-sm border border-[#4d2d20] flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: recipe.pixelIconSvg }}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-cozy text-sm font-bold text-[#351e13] truncate">
                          {recipe.name}
                        </h4>
                        <span className="text-[9px] font-pixel px-1.5 py-0.5 rounded bg-[#e3d1bc] text-[#663d27]">
                          {recipe.temperature}
                        </span>
                      </div>
                      <p className="font-cozy text-xs text-[#70523f] line-clamp-1 mt-0.5">
                        {recipe.shortDesc}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-[#9c572a] animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT PAGE: In-Depth Recipe Codex */}
          <div className="w-full md:w-7/12 flex flex-col pl-0 md:pl-2 overflow-y-auto pr-2">
            {/* Header with big pixel badge and title */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#f2e7d7] border border-[#ddcbba] mb-4">
              {/* Big Pixel Icon Card */}
              <div className="relative group">
                <div 
                  className="w-20 h-20 rounded-2xl bg-[#28150e] p-2 shadow-pixel border-2 border-[#522f1f] flex items-center justify-center flex-shrink-0"
                  dangerouslySetInnerHTML={{ __html: selectedRecipe.pixelIconSvg }}
                />
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white font-pixel text-[9px] px-1.5 py-0.5 rounded shadow-sm">
                  PIXEL
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-cozy text-2xl font-bold text-[#2b170e]">
                    {selectedRecipe.name}
                  </h3>
                  {selectedRecipe.italianName && (
                    <span className="italic font-cozy text-xs text-[#8c624b]">
                      "{selectedRecipe.italianName}"
                    </span>
                  )}
                </div>

                <p className="font-cozy text-xs text-[#5c3e2e] mt-1 leading-relaxed">
                  {selectedRecipe.shortDesc}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  <span className="text-[10px] font-cozy font-medium px-2 py-0.5 rounded-md bg-[#e4d3bf] text-[#4f2f1d] flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-amber-600" />
                    {selectedRecipe.temperature}
                  </span>
                  <span className="text-[10px] font-cozy font-medium px-2 py-0.5 rounded-md bg-[#e4d3bf] text-[#4f2f1d] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    {selectedRecipe.difficulty}
                  </span>
                  <span className="text-[10px] font-cozy font-medium px-2 py-0.5 rounded-md bg-[#e4d3bf] text-[#4f2f1d] flex items-center gap-1">
                    <Coffee className="w-3 h-3 text-amber-600" />
                    {selectedRecipe.vessel.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Flavor Profile Tags */}
            <div className="mb-4">
              <span className="text-[11px] font-pixel text-[#78513b] uppercase tracking-wider block mb-1.5">
                Tasting Notes
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedRecipe.flavorProfile.map((tag, idx) => (
                  <span key={idx} className="text-xs font-cozy bg-[#eddcc8] text-[#54321d] px-2.5 py-1 rounded-full border border-[#d6beaa]">
                    ☕ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Anatomy & Ratio Stack */}
            <div className="mb-4 p-3 rounded-xl bg-[#ede2d2] border border-[#d6c4ae]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-pixel text-[#6e4631] uppercase tracking-wider">
                  Beverage Layer Ratios
                </span>
                <span className="text-[10px] font-cozy text-[#8c6750]">
                  Stacked Top to Bottom
                </span>
              </div>
              
              {/* Stacked Progress Bar */}
              <div className="w-full h-7 rounded-lg overflow-hidden flex border border-[#bfa993] shadow-inner mb-2.5">
                {selectedRecipe.layers.map((layer, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${layer.ratio}%`, backgroundColor: layer.color }}
                    className="h-full flex items-center justify-center text-white text-[9px] font-pixel font-bold px-1 overflow-hidden truncate transition-all"
                    title={`${layer.label}: ${layer.ratio}%`}
                  >
                    {layer.ratio >= 20 ? `${layer.ratio}%` : ''}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-1.5">
                {selectedRecipe.layers.map((layer, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-cozy text-[#4f3221]">
                    <span 
                      className="w-3 h-3 rounded-sm flex-shrink-0 border border-black/20" 
                      style={{ backgroundColor: layer.color }} 
                    />
                    <span className="truncate">{layer.label} ({layer.ratio}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Authentic Recipe Description */}
            <div className="mb-4 p-3 rounded-xl bg-[#faf5eb] border border-[#ded0be]">
              <span className="text-[11px] font-pixel text-[#6e4631] uppercase tracking-wider block mb-1.5">
                Barista Preparation Guide
              </span>
              <p className="font-cozy text-xs text-[#3a2215] leading-relaxed">
                {selectedRecipe.fullRecipe}
              </p>
            </div>

            {/* Step-by-Step Flow */}
            <div className="mb-5">
              <span className="text-[11px] font-pixel text-[#6e4631] uppercase tracking-wider block mb-2">
                Step-by-Step Sequence ({selectedRecipe.steps.length} Steps)
              </span>
              <div className="space-y-2">
                {selectedRecipe.steps.map((step) => (
                  <div 
                    key={step.stepNumber}
                    className="flex items-start gap-3 p-2.5 rounded-xl bg-[#f2e7d7] border border-[#dfcfbd]"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#5c3725] text-white flex items-center justify-center text-xs font-pixel flex-shrink-0 shadow-sm">
                      {step.stepNumber}
                    </div>
                    <div>
                      <h5 className="font-cozy text-xs font-bold text-[#2e190f]">
                        {step.title}
                      </h5>
                      <p className="font-cozy text-[11px] text-[#634533] mt-0.5">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar: Brew this drink */}
            <div className="mt-auto pt-2 border-t border-[#dfcfbd] flex justify-end">
              <button
                onClick={() => handleStartBrew(selectedRecipe)}
                className="w-full py-3 px-5 rounded-xl bg-[#593422] hover:bg-[#70422b] text-[#fbf5ed] font-cozy text-sm font-semibold shadow-pixel flex items-center justify-center gap-2 transition-transform active:translate-y-0.5"
              >
                <span>☕</span>
                Brew "{selectedRecipe.name}" on the Counter
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
