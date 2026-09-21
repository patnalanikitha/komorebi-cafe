import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { Customer, CoffeeRecipe, VesselType, IngredientType, ToppingType } from '../types/coffee';
import { COFFEE_RECIPES } from '../data/coffeeRecipes';
import { sounds } from '../utils/soundEngine';
import { Star, ArrowRight } from 'lucide-react';

interface ServeResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
  recipe: CoffeeRecipe | null;
  vessel: VesselType | null;
  ingredients: IngredientType[];
  topping: ToppingType;
  onNextCustomer: () => void;
  onOpenGrimoire: () => void;
}

export const ServeResultModal: React.FC<ServeResultModalProps> = ({
  isOpen,
  onClose,
  customer,
  recipe,
  vessel,
  ingredients,
  topping,
  onNextCustomer,
  onOpenGrimoire,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger festive cozy confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#c97838', '#fce7cb', '#a85d3b', '#738c69', '#d9a879'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Determine accuracy score
  let stars = 5;
  let feedbackMessage = '';
  let isPerfect = true;

  if (customer) {
    const targetRecipe = COFFEE_RECIPES.find((r) => r.id === customer.orderDrinkId);

    if (targetRecipe) {
      // Check vessel
      const vesselMatch = targetRecipe.vessel === vessel;
      // Check expected ingredients
      const hasAllIngredients = targetRecipe.expectedOrder.every((ing) => ingredients.includes(ing));
      // Check order of operations (e.g. for Americano vs Long Black, or Affogato ice cream first)
      let orderMatch = true;
      if (targetRecipe.id === 'long_black') {
        const waterIndex = ingredients.indexOf('hot_water');
        const espressoIndex = ingredients.indexOf('espresso_shot');
        if (waterIndex > espressoIndex && espressoIndex !== -1) {
          orderMatch = false; // Hot water wasn't poured first!
        }
      } else if (targetRecipe.id === 'affogato') {
        const gelatoIndex = ingredients.indexOf('vanilla_gelato');
        const espressoIndex = ingredients.indexOf('espresso_shot');
        if (espressoIndex < gelatoIndex && gelatoIndex !== -1) {
          orderMatch = false; // Gelato scoop wasn't placed first!
        }
      }

      if (vesselMatch && hasAllIngredients && orderMatch) {
        stars = 5;
        feedbackMessage = customer.successQuote;
        isPerfect = true;
      } else if (hasAllIngredients) {
        stars = 4;
        feedbackMessage = `“Delicious flavors! Though traditionally, ${targetRecipe.name} is best in a ${targetRecipe.vessel.replace('_', ' ')} with the classic step sequence!”`;
        isPerfect = false;
      } else {
        stars = 3;
        feedbackMessage = `“This is an adventurous custom brew! It hits the spot, even if a few ${targetRecipe.name} ingredients were substituted.”`;
        isPerfect = false;
      }
    }
  } else {
    // Free brew sandbox evaluation
    stars = 5;
    feedbackMessage = `“A delightful artisanal creation! Balanced aromas, beautiful layering, and genuine barista flair.”`;
    isPerfect = true;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      {/* Postcard Container */}
      <div className="relative w-full max-w-lg bg-[#faf3e6] rounded-3xl p-6 shadow-2xl border-4 border-[#523020] text-[#2e180f] overflow-hidden">
        
        {/* Postcard Vintage Postage Stamp in Corner */}
        <div className="absolute top-5 right-5 w-16 h-20 border-2 border-dashed border-[#8f5e42] rounded-lg p-1 bg-[#fffcf5] shadow-sm flex flex-col items-center justify-center text-center rotate-3">
          <span className="text-xl">☕</span>
          <span className="text-[8px] font-pixel text-[#8a5739] mt-0.5">KOMOREBI</span>
          <span className="text-[7px] font-pixel text-[#5c341e]">POSTAGE</span>
        </div>

        {/* Customer Header */}
        <div className="flex items-center gap-3 mb-4">
          {customer ? (
            <>
              <div 
                className="w-14 h-14 rounded-2xl bg-[#28150d] p-1 shadow-md border-2 border-[#4d2d1f] flex-shrink-0"
                dangerouslySetInnerHTML={{ __html: customer.avatarPixel }}
              />
              <div>
                <span className="text-[10px] font-pixel text-[#8f5c3b] uppercase tracking-wider">
                  Tasting Review From
                </span>
                <h3 className="font-cozy text-xl font-bold text-[#2e180f] flex items-center gap-1.5">
                  {customer.name}
                  <span className="text-xs font-normal text-[#7a533c]">({customer.title})</span>
                </h3>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-800 text-white flex items-center justify-center text-2xl shadow-md">
                ✨
              </div>
              <div>
                <span className="text-[10px] font-pixel text-[#8f5c3b] uppercase tracking-wider">
                  Sandbox Recipe Evaluator
                </span>
                <h3 className="font-cozy text-xl font-bold text-[#2e180f]">
                  {recipe ? recipe.name : 'Artisan Free Brew'}
                </h3>
              </div>
            </div>
          )}
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 transition-all ${
                i < stars ? 'text-amber-500 fill-amber-400' : 'text-[#d6c4ae]'
              }`}
            />
          ))}
          <span className="ml-2 font-pixel text-xs text-[#734a31] font-bold">
            {stars}/5 STARS
          </span>
        </div>

        {/* Customer Review Quote */}
        <div className="bg-[#f0e4d0] p-4 rounded-2xl border border-[#d6beaa] mb-4">
          <p className="font-handwriting text-lg text-[#3b1f13] leading-snug">
            {feedbackMessage}
          </p>
        </div>

        {/* Unlocked Reward Badge if Perfect */}
        {customer && isPerfect && (
          <div className="bg-[#e8d7be] p-3 rounded-xl border border-[#c4ab8e] flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-emerald-800 text-emerald-200 flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
              🏆
            </div>
            <div>
              <span className="text-[9px] font-pixel text-emerald-800 font-bold uppercase tracking-wider block">
                Recipe Perfection Stamp Unlocked!
              </span>
              <p className="font-cozy text-xs text-[#452718]">
                Earned: <strong>{customer.unlockReward}</strong>
              </p>
            </div>
          </div>
        )}

        {/* Recipe ingredients summary */}
        <div className="text-xs font-cozy text-[#6e4832] mb-5 flex flex-wrap gap-1.5 items-center">
          <span className="font-semibold text-[#45291b]">Served in:</span>
          <span className="bg-[#e8d7bf] px-2 py-0.5 rounded-md">
            {vessel?.replace('_', ' ')}
          </span>
          <span className="font-semibold text-[#45291b] ml-1">Ingredients:</span>
          {ingredients.map((ing, idx) => (
            <span key={idx} className="bg-[#e8d7bf] px-2 py-0.5 rounded-md">
              {ing.replace(/_/g, ' ')}
            </span>
          ))}
          {topping !== 'none' && (
            <span className="bg-[#dfc4a4] text-[#4a2b18] px-2 py-0.5 rounded-md font-semibold">
              + {topping.replace(/_/g, ' ')}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#dfcbb7]">
          <button
            onClick={() => {
              sounds.playPaperRustle();
              onOpenGrimoire();
              onClose();
            }}
            className="flex-1 py-3 px-3 rounded-xl bg-[#e3d1bc] hover:bg-[#d6c0a8] text-[#422515] font-cozy text-xs font-bold border border-[#bfa58b] flex items-center justify-center gap-1.5 transition-all"
          >
            <span>📖</span>
            Study in Grimoire
          </button>

          <button
            onClick={() => {
              sounds.playCupClink();
              onNextCustomer();
              onClose();
            }}
            className="flex-1 py-3 px-3 rounded-xl bg-[#593422] hover:bg-[#73422b] text-[#faf1e3] font-cozy text-xs font-bold shadow-pixel flex items-center justify-center gap-1.5 transition-transform active:translate-y-0.5"
          >
            <span>Next Customer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
