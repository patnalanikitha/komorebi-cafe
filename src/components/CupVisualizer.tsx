import React from 'react';
import type { VesselType, IngredientType, ToppingType, CoffeeRecipe } from '../types/coffee';

interface CupVisualizerProps {
  vessel: VesselType | null;
  ingredients: IngredientType[];
  topping: ToppingType;
  recipe?: CoffeeRecipe | null;
}

export const CupVisualizer: React.FC<CupVisualizerProps> = ({
  vessel,
  ingredients,
  topping,
  recipe,
}) => {
  if (!vessel) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center border-2 border-dashed border-[#5e4336] rounded-2xl bg-[#2a1a14]/60 p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#3d261c] flex items-center justify-center text-3xl mb-3 animate-bounce">
          ☕
        </div>
        <p className="font-cozy text-lg text-[#e6d0bc] font-medium">Counter is Empty</p>
        <p className="font-cozy text-xs text-[#a8826b] max-w-xs mt-1">
          Select a vessel or pick a recipe from the Barista Grimoire to begin crafting your brew.
        </p>
      </div>
    );
  }

  // Calculate liquid fill state
  const hasEspresso = ingredients.includes('espresso_shot') || ingredients.includes('double_espresso');
  const hasDrip = ingredients.includes('drip_coffee');
  const hasWater = ingredients.includes('hot_water') || ingredients.includes('cold_water');
  const hasMilk = ingredients.includes('steamed_milk') || ingredients.includes('warm_milk');
  const hasFoam = ingredients.includes('thick_foam') || ingredients.includes('microfoam');
  const hasChocolate = ingredients.includes('chocolate_syrup');
  const hasIce = ingredients.includes('ice_cubes');
  const hasGelato = ingredients.includes('vanilla_gelato');
  const hasColdBrew = ingredients.includes('cold_brew_concentrate');

  const totalIngredients = ingredients.length;
  const isAffogato = vessel === 'dessert_bowl';
  const isColdBrew = vessel === 'glass_tumbler';
  const isGibraltar = vessel === 'gibraltar_glass';
  const isDemitasse = vessel === 'demitasse';

  // Liquid heights calculation
  const totalVolumeHeight = Math.min(88, totalIngredients * 28 + (hasIce ? 20 : 0) + (hasGelato ? 35 : 0));

  return (
    <div className="relative w-full h-80 flex flex-col items-center justify-end pb-8">
      {/* Steam Particles */}
      {(hasEspresso || hasDrip || hasMilk) && !hasIce && (
        <div className="absolute top-6 flex space-x-3 pointer-events-none z-30">
          <div className="w-2.5 h-10 bg-white/25 rounded-full blur-[2px] animate-steam" />
          <div className="w-2 h-12 bg-white/20 rounded-full blur-[2px] animate-steam-delay" />
          <div className="w-3 h-9 bg-white/25 rounded-full blur-[2px] animate-steam-delay-2" />
        </div>
      )}

      {/* Vessel Container */}
      <div className="relative flex items-end justify-center transition-all duration-500">
        {/* --- DEMITASSE (Espresso, Macchiato) --- */}
        {isDemitasse && (
          <div className="relative flex flex-col items-center">
            {/* Cup */}
            <div className="relative w-28 h-24 bg-gradient-to-b from-[#FAF6EE] to-[#E3D9C9] rounded-b-3xl border-2 border-[#D0C2AE] shadow-pixel overflow-hidden flex flex-col justify-end p-1.5 z-10">
              {/* Rim highlight */}
              <div className="absolute top-0 inset-x-0 h-2 bg-[#FFFDF9] border-b border-[#D0C2AE]/50" />
              
              {/* Liquids inside Demitasse */}
              <div 
                className="w-full rounded-b-2xl transition-all duration-700 overflow-hidden flex flex-col justify-end relative"
                style={{ height: `${totalVolumeHeight}%` }}
              >
                {/* Espresso dark base */}
                {hasEspresso && (
                  <div className="w-full bg-[#351C11] flex-1 flex flex-col justify-end relative">
                    {/* Golden Crema Cap */}
                    <div className="w-full h-4 bg-gradient-to-r from-[#D98A32] via-[#F4B76A] to-[#D98A32] opacity-90 shadow-inner" />
                  </div>
                )}

                {/* Macchiato foam dollop */}
                {hasFoam && (
                  <div className="absolute top-0 inset-x-3 h-5 bg-[#FFFDF7] rounded-full shadow-md flex items-center justify-center">
                    <div className="w-2 h-1 bg-[#D98A32]/40 rounded-full" />
                  </div>
                )}
              </div>
            </div>

            {/* Handle */}
            <div className="absolute -right-5 top-5 w-8 h-12 border-4 border-[#FAF6EE] rounded-r-2xl border-l-0 shadow-sm z-0" />

            {/* Saucer */}
            <div className="w-40 h-4 bg-gradient-to-r from-[#D0C2AE] via-[#FAF6EE] to-[#D0C2AE] rounded-full border border-[#BFAF9B] shadow-pixel-sm -mt-1 z-0" />
          </div>
        )}

        {/* --- GIBRALTAR GLASS (Cortado) --- */}
        {isGibraltar && (
          <div className="relative flex flex-col items-center">
            <div className="relative w-28 h-32 bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-[2px] rounded-b-xl border-2 border-white/40 shadow-pixel overflow-hidden flex flex-col justify-end p-1.5 z-10">
              {/* Glass facet highlights */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/15 pointer-events-none" />
              
              {/* Liquids: 50% Espresso, 50% Warm Milk */}
              <div 
                className="w-full rounded-b-lg transition-all duration-700 overflow-hidden flex flex-col justify-end"
                style={{ height: `${totalVolumeHeight}%` }}
              >
                {/* Milk Layer */}
                {hasMilk && (
                  <div className="w-full h-1/2 bg-gradient-to-b from-[#F2DFCD] to-[#D6B089] flex items-center justify-center border-b border-[#7C4A2D]/30">
                    <span className="text-[10px] font-pixel text-[#54301B]/70 tracking-tighter">1:1 MILK</span>
                  </div>
                )}
                {/* Espresso Layer */}
                {hasEspresso && (
                  <div className="w-full h-1/2 bg-gradient-to-b from-[#4A2515] to-[#2B140B] flex items-center justify-center">
                    <span className="text-[10px] font-pixel text-[#D49867]/70 tracking-tighter">1:1 ESPRESSO</span>
                  </div>
                )}
              </div>
            </div>
            {/* Heavy glass base */}
            <div className="w-24 h-4 bg-white/30 rounded-b-md border border-white/50 -mt-1 shadow-sm" />
          </div>
        )}

        {/* --- DESSERT BOWL (Affogato) --- */}
        {isAffogato && (
          <div className="relative flex flex-col items-center">
            {/* Glass Bowl */}
            <div className="relative w-36 h-28 bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-[2px] rounded-b-full border-2 border-white/40 shadow-pixel flex flex-col justify-end items-center p-2 z-10 overflow-hidden">
              
              {/* Gelato Scoop (Sphere) */}
              {hasGelato && (
                <div className="absolute bottom-5 w-20 h-20 rounded-full bg-gradient-to-br from-[#FFFDF0] via-[#FFF8D6] to-[#E8DCB0] border border-[#DDD0A0] shadow-md flex items-center justify-center z-10">
                  {/* Vanilla bean specks */}
                  <div className="w-1 h-1 bg-[#4A3B2C] rounded-full absolute top-4 left-6 opacity-60" />
                  <div className="w-1 h-1 bg-[#4A3B2C] rounded-full absolute bottom-5 right-7 opacity-60" />
                  <div className="w-0.5 h-0.5 bg-[#4A3B2C] rounded-full absolute top-8 right-5 opacity-70" />
                </div>
              )}

              {/* Drowning Espresso Pool */}
              {hasEspresso && (
                <div 
                  className="w-full bg-gradient-to-t from-[#261208] via-[#4A2414] to-[#733F23] rounded-b-full transition-all duration-700 opacity-90 z-20 flex items-center justify-center overflow-hidden"
                  style={{ height: hasGelato ? '45%' : '75%' }}
                >
                  <div className="w-full h-1.5 bg-[#D98A32]/70 top-0 absolute" />
                </div>
              )}

              {/* Chocolate drizzle garnish */}
              {topping === 'chocolate_drizzle' && (
                <div className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center">
                  <div className="w-16 h-1 bg-[#241007] rotate-12 rounded-full mb-1 opacity-90" />
                  <div className="w-20 h-1.5 bg-[#241007] -rotate-6 rounded-full mb-1 opacity-90" />
                  <div className="w-12 h-1 bg-[#241007] rotate-45 rounded-full opacity-90" />
                </div>
              )}
            </div>

            {/* Glass Stem & Foot */}
            <div className="w-4 h-6 bg-white/40 border-x border-white/50 z-0" />
            <div className="w-24 h-3 bg-white/40 rounded-full border border-white/50 shadow-pixel-sm z-0" />
          </div>
        )}

        {/* --- GLASS TUMBLER (Cold Brew) --- */}
        {isColdBrew && (
          <div className="relative flex flex-col items-center">
            <div className="relative w-32 h-44 bg-gradient-to-b from-cyan-100/20 to-cyan-200/10 backdrop-blur-[2px] rounded-b-2xl border-2 border-cyan-100/40 shadow-pixel overflow-hidden flex flex-col justify-end p-2 z-10">
              {/* Ribbed glass texture lines */}
              <div className="absolute inset-0 flex justify-around opacity-20 pointer-events-none">
                <div className="w-0.5 h-full bg-white" />
                <div className="w-0.5 h-full bg-white" />
                <div className="w-0.5 h-full bg-white" />
              </div>

              {/* Floating Ice Cubes */}
              {hasIce && (
                <div className="absolute inset-0 p-3 flex flex-wrap justify-around items-center z-20 pointer-events-none">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-white/90 to-cyan-100/60 border border-white/70 shadow-sm rotate-12" />
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-white/80 to-cyan-100/50 border border-white/70 shadow-sm -rotate-6 mt-6" />
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-white/85 to-cyan-100/55 border border-white/70 shadow-sm rotate-45 mt-2" />
                </div>
              )}

              {/* Liquid */}
              <div 
                className="w-full rounded-b-xl transition-all duration-700 overflow-hidden flex flex-col justify-end relative z-10"
                style={{ height: `${totalVolumeHeight}%` }}
              >
                {hasColdBrew && (
                  <div className="w-full h-full bg-gradient-to-t from-[#1C0D07] via-[#351B0F] to-[#5C321C] opacity-90 flex items-center justify-center">
                    <span className="text-[10px] font-pixel text-cyan-200/50">18h COLD BREW</span>
                  </div>
                )}
                {hasWater && !hasColdBrew && (
                  <div className="w-full h-full bg-cyan-200/30" />
                )}
              </div>
            </div>
            {/* Thick heavy base */}
            <div className="w-28 h-4 bg-cyan-100/30 rounded-b-lg border border-cyan-100/50 -mt-1 shadow-sm" />
          </div>
        )}

        {/* --- CLASSIC CERAMIC MUG (Black Coffee, Americano, Long Black, Cappuccino, Latte, Flat White, Mocha) --- */}
        {vessel === 'classic_mug' && (
          <div className="relative flex flex-col items-center">
            {/* Ceramic Mug Body */}
            <div className="relative w-36 h-36 bg-gradient-to-b from-[#F5EDE1] via-[#E8DCCB] to-[#D4C3AC] rounded-b-[2rem] border-2 border-[#C2AD94] shadow-pixel overflow-hidden flex flex-col justify-end p-2 z-10">
              
              {/* Cozy Cafe Stamp on Mug */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 opacity-35 pointer-events-none text-center">
                <span className="text-xl">☕</span>
                <p className="text-[8px] font-pixel uppercase tracking-widest text-[#5C3C2C]">KOMOREBI</p>
              </div>

              {/* Liquid Stack */}
              <div 
                className="w-full rounded-b-[1.75rem] transition-all duration-700 overflow-hidden flex flex-col justify-end relative z-10 shadow-inner"
                style={{ height: `${totalVolumeHeight}%` }}
              >
                {/* 1. Chocolate Layer (Mocha) */}
                {hasChocolate && (
                  <div className="w-full h-7 bg-[#210E05] flex items-center justify-center border-t border-[#3D1E0E]">
                    <span className="text-[9px] font-pixel text-[#8C5238]">DUTCH FUDGE</span>
                  </div>
                )}

                {/* 2. Water / Drip Base (Americano, Long Black, Black Coffee) */}
                {hasDrip && (
                  <div className="w-full flex-1 bg-gradient-to-t from-[#24120A] to-[#452416] flex items-center justify-center">
                    <span className="text-[9px] font-pixel text-[#A66E53]">DRIP COFFEE</span>
                  </div>
                )}

                {hasWater && (
                  <div className="w-full flex-1 bg-gradient-to-t from-[#361E14] to-[#5C3524] flex items-center justify-center">
                    <span className="text-[9px] font-pixel text-[#BFA088]">HOT WATER</span>
                  </div>
                )}

                {/* 3. Espresso Core */}
                {hasEspresso && !hasDrip && (
                  <div className="w-full flex-1 bg-gradient-to-t from-[#2B140A] via-[#3D1E10] to-[#542B18] flex items-center justify-center">
                    <span className="text-[9px] font-pixel text-[#D49867]">ESPRESSO</span>
                  </div>
                )}

                {/* 4. Steamed Milk / Warm Milk */}
                {hasMilk && (
                  <div className="w-full flex-1 bg-gradient-to-t from-[#D4A373] via-[#E2BA92] to-[#EED4B9] flex items-center justify-center border-t border-[#8A522E]/20">
                    <span className="text-[9px] font-pixel text-[#6E4226]">STEAMED MILK</span>
                  </div>
                )}

                {/* 5. Foam Caps */}
                {hasFoam && (
                  <div className="w-full h-8 bg-gradient-to-b from-[#FFFDF9] to-[#F5ECE0] rounded-t-md shadow-sm flex items-center justify-center relative border-t border-[#EBD6C1]">
                    {/* Latte Art: Fern */}
                    {topping === 'latte_art_fern' && (
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-1 bg-[#9C653B] rounded-full" />
                        <div className="w-12 h-1.5 bg-[#9C653B] rounded-full my-0.5" />
                        <div className="w-6 h-1 bg-[#9C653B] rounded-full" />
                      </div>
                    )}
                    {/* Cocoa Dust */}
                    {topping === 'cocoa_dust' && (
                      <div className="flex space-x-1.5 opacity-80">
                        <div className="w-1.5 h-1.5 bg-[#4A2511] rounded-full" />
                        <div className="w-2 h-2 bg-[#4A2511] rounded-full -mt-1" />
                        <div className="w-1.5 h-1.5 bg-[#4A2511] rounded-full" />
                      </div>
                    )}
                  </div>
                )}

                {/* Whipped Cream Swirl (Mocha) */}
                {topping === 'whipped_cream' && (
                  <div className="w-full h-10 bg-gradient-to-t from-[#FFFDF8] to-white rounded-t-2xl shadow-md flex items-center justify-center border-t-2 border-[#EBD4BE]">
                    <span className="text-sm">🍦</span>
                  </div>
                )}
              </div>
            </div>

            {/* Mug Handle */}
            <div className="absolute -right-6 top-7 w-10 h-20 border-4 border-[#F5EDE1] rounded-r-3xl border-l-0 shadow-sm z-0" />

            {/* Shadow under mug */}
            <div className="w-32 h-4 bg-[#1A100B]/60 rounded-full blur-[3px] -mt-2 z-0" />
          </div>
        )}
      </div>

      {/* Beverage Tag & Progress */}
      <div className="mt-4 flex flex-col items-center">
        {recipe ? (
          <div className="flex items-center space-x-2 bg-[#332018] px-3.5 py-1.5 rounded-full border border-[#523528] shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-cozy text-sm font-semibold text-[#f0ded0]">{recipe.name}</span>
            <span className="text-xs text-[#a37c67]">({recipe.temperature})</span>
          </div>
        ) : (
          <div className="bg-[#332018] px-3 py-1 rounded-full border border-[#523528]">
            <span className="font-cozy text-xs text-[#a37c67]">Free Crafting Sandbox</span>
          </div>
        )}

        {/* Current Ingredient Chips */}
        <div className="flex flex-wrap gap-1.5 justify-center mt-2 max-w-sm">
          {ingredients.map((ing, i) => (
            <span key={i} className="text-[10px] font-cozy bg-[#3d271e] text-[#dfc5b2] px-2 py-0.5 rounded-md border border-[#54362a]">
              +{ing.replace(/_/g, ' ')}
            </span>
          ))}
          {topping !== 'none' && (
            <span className="text-[10px] font-cozy bg-[#523422] text-[#ffdfc2] px-2 py-0.5 rounded-md border border-[#754a32]">
              ✨ {topping.replace(/_/g, ' ')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
