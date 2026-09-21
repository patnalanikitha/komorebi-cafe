import React from 'react';
import type { Customer } from '../types/coffee';
import { CUSTOMERS, COFFEE_RECIPES } from '../data/coffeeRecipes';
import { sounds } from '../utils/soundEngine';
import { Sparkles, Heart } from 'lucide-react';

interface OrderSlipProps {
  activeCustomer: Customer | null;
  onSelectCustomer: (c: Customer) => void;
  onSelectFreeBrew: () => void;
  isFreeBrew: boolean;
}

export const OrderSlip: React.FC<OrderSlipProps> = ({
  activeCustomer,
  onSelectCustomer,
  onSelectFreeBrew,
  isFreeBrew,
}) => {
  const handleTicketClick = (c: Customer) => {
    sounds.playPaperRustle();
    onSelectCustomer(c);
  };

  const handleFreeBrewClick = () => {
    sounds.playCupClink();
    onSelectFreeBrew();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Wooden Hanging Line & Clothespins */}
      <div className="w-full relative py-2 flex items-center justify-between">
        <div className="w-full h-1 bg-[#472c1e] rounded-full shadow-sm relative">
          {/* Wire metallic shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#87553b] to-transparent opacity-60" />
        </div>
      </div>

      {/* Hanging Tickets Carousel */}
      <div className="w-full flex gap-3 overflow-x-auto pb-4 pt-1 px-2 scrollbar-thin">
        {/* Free Brew Sandbox Ticket */}
        <button
          onClick={handleFreeBrewClick}
          className={`flex-shrink-0 w-60 p-3.5 rounded-2xl border-2 transition-all relative text-left shadow-md flex flex-col justify-between ${
            isFreeBrew
              ? 'bg-[#ffeecf] border-amber-500 shadow-pixel scale-[1.02] -translate-y-1'
              : 'bg-[#f4e6d0] hover:bg-[#faeedc] border-[#ccb397]'
          }`}
        >
          {/* Wooden Clothespin */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-6 bg-[#b3774f] rounded-t-sm border border-[#7a4c2e] shadow-sm z-10 flex flex-col items-center justify-center">
            <div className="w-2 h-0.5 bg-[#422615]" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-pixel text-[10px] uppercase tracking-wider text-[#7a4c2e]">
                SANDBOX
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <h4 className="font-cozy text-sm font-bold text-[#2e190f]">
              Free Barista Crafting
            </h4>
            <p className="font-cozy text-xs text-[#6e4932] mt-1 leading-snug">
              Invent your own coffee creations with no rules or strict customer timers.
            </p>
          </div>

          <div className="mt-3 pt-2 border-t border-[#d6beaa] flex items-center justify-between text-[10px] font-cozy text-[#7a4c2e]">
            <span>✨ Infinite Creativity</span>
            <span className="font-bold underline">Open Station</span>
          </div>
        </button>

        {/* Regular Customer Order Tickets */}
        {CUSTOMERS.map((cust) => {
          const isSelected = activeCustomer?.id === cust.id && !isFreeBrew;
          const targetRecipe = COFFEE_RECIPES.find((r) => r.id === cust.orderDrinkId);

          return (
            <button
              key={cust.id}
              onClick={() => handleTicketClick(cust)}
              className={`flex-shrink-0 w-64 p-3.5 rounded-2xl border-2 transition-all relative text-left shadow-md flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#faf0e1] border-[#a86539] shadow-pixel scale-[1.02] -translate-y-1'
                  : 'bg-[#efe0ca] hover:bg-[#f6ead9] border-[#c7b095]'
              }`}
            >
              {/* Wooden Clothespin */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-6 bg-[#a36942] rounded-t-sm border border-[#734324] shadow-sm z-10 flex flex-col items-center justify-center">
                <div className="w-2 h-0.5 bg-[#422615]" />
              </div>

              <div>
                {/* Header with Pixel Avatar */}
                <div className="flex items-center gap-2.5 mb-2">
                  <div 
                    className="w-10 h-10 rounded-xl bg-[#28150d] p-1 flex-shrink-0 shadow-sm border border-[#4d2d1f]"
                    dangerouslySetInnerHTML={{ __html: cust.avatarPixel }}
                  />
                  <div>
                    <h4 className="font-cozy text-sm font-bold text-[#29150c] flex items-center gap-1">
                      {cust.name}
                    </h4>
                    <p className="text-[10px] font-cozy text-[#785139] leading-tight">
                      {cust.title}
                    </p>
                  </div>
                </div>

                {/* Handwritten dialogue quote */}
                <div className="bg-[#fcf7ee] p-2 rounded-xl border border-[#ded0bf] mb-2 font-handwriting text-sm text-[#3b2114] leading-tight">
                  {cust.dialogueQuote}
                </div>

                {/* Order Target Badge */}
                {targetRecipe && (
                  <div className="flex items-center gap-2 bg-[#e6d3bd] p-1.5 rounded-lg border border-[#cfb89f]">
                    <div 
                      className="w-6 h-6 rounded bg-[#24130c] p-0.5 flex-shrink-0"
                      dangerouslySetInnerHTML={{ __html: targetRecipe.pixelIconSvg }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-cozy font-bold text-[#351e12] truncate">
                        {targetRecipe.name}
                      </p>
                      <p className="text-[9px] font-pixel text-[#80553c]">
                        {targetRecipe.temperature}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-3 pt-2 border-t border-[#d9c4b0] flex items-center justify-between text-[10px] font-cozy text-[#633e29]">
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                  Regular Guest
                </span>
                <span className="font-bold underline">
                  {isSelected ? 'Currently Brewing' : 'Take Order'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
