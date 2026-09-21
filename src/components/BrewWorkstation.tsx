import React, { useState } from 'react';
import type { 
  CoffeeRecipe, 
  VesselType, 
  IngredientType, 
  ToppingType 
} from '../types/coffee';
import { sounds } from '../utils/soundEngine';
import { 
  Sparkles, 
  RotateCcw, 
  Bell, 
  Info, 
  Check, 
  HelpCircle 
} from 'lucide-react';

interface BrewWorkstationProps {
  recipe: CoffeeRecipe | null;
  vessel: VesselType | null;
  ingredients: IngredientType[];
  topping: ToppingType;
  onSelectVessel: (v: VesselType) => void;
  onAddIngredient: (ing: IngredientType) => void;
  onSetTopping: (top: ToppingType) => void;
  onResetBrew: () => void;
  onServeDrink: () => void;
  onOpenGrimoire: () => void;
}

export const BrewWorkstation: React.FC<BrewWorkstationProps> = ({
  recipe,
  vessel,
  ingredients,
  topping,
  onSelectVessel,
  onAddIngredient,
  onSetTopping,
  onResetBrew,
  onServeDrink,
  onOpenGrimoire,
}) => {
  const [selectedMilkType, setSelectedMilkType] = useState<'Whole' | 'Oat' | 'Almond'>('Oat');
  const [showRecipeHint, setShowRecipeHint] = useState<boolean>(false);

  // Determine current step if recipe is active
  let currentStepIndex = 0;
  if (recipe) {
    if (!vessel) {
      currentStepIndex = 0;
    } else {
      // Find how many steps have been satisfied
      currentStepIndex = 1 + ingredients.length + (topping !== 'none' ? 1 : 0);
      if (currentStepIndex >= recipe.steps.length) {
        currentStepIndex = recipe.steps.length - 1;
      }
    }
  }

  const currentStep = recipe ? recipe.steps[currentStepIndex] : null;

  // Handle actions with authentic sound feedback
  const handleVesselPick = (v: VesselType) => {
    sounds.playCupClink();
    onSelectVessel(v);
  };

  const handleEspressoPull = (isDouble = false) => {
    sounds.playEspressoPull();
    onAddIngredient(isDouble ? 'double_espresso' : 'espresso_shot');
  };

  const handlePourWater = (isCold = false) => {
    sounds.playPour();
    onAddIngredient(isCold ? 'cold_water' : 'hot_water');
  };

  const handleDripBrew = () => {
    sounds.playPour();
    onAddIngredient('drip_coffee');
  };

  const handleSteamMilk = (isWarmOnly = false, isMicro = false) => {
    sounds.playSteamWand();
    if (isWarmOnly) {
      onAddIngredient('warm_milk');
    } else if (isMicro) {
      onAddIngredient('microfoam');
    } else {
      onAddIngredient('steamed_milk');
    }
  };

  const handleAddThickFoam = () => {
    sounds.playSteamWand();
    onAddIngredient('thick_foam');
  };

  const handleScoopGelato = () => {
    sounds.playDrop();
    onAddIngredient('vanilla_gelato');
  };

  const handleDropIce = () => {
    sounds.playDrop();
    onAddIngredient('ice_cubes');
  };

  const handlePourColdBrew = () => {
    sounds.playPour();
    onAddIngredient('cold_brew_concentrate');
  };

  const handlePumpChocolate = () => {
    sounds.playDrop();
    onAddIngredient('chocolate_syrup');
  };

  const handleGarnish = (t: ToppingType) => {
    sounds.playDrop();
    onSetTopping(t);
  };

  return (
    <div className="w-full bg-[#2a1710] rounded-3xl p-5 border-2 border-[#45281c] shadow-2xl flex flex-col gap-4">
      
      {/* Current Step Banner (if targeted recipe) */}
      {recipe ? (
        <div className="bg-[#3b2318] p-3.5 rounded-2xl border border-[#543424] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#7a482e] text-[#ffe6d4] font-pixel text-xs flex items-center justify-center shadow-inner">
              {currentStepIndex + 1}/{recipe.steps.length}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cozy text-xs text-[#d19c7d] uppercase tracking-wider font-semibold">
                  Recipe Target: {recipe.name}
                </span>
                <button
                  onClick={() => setShowRecipeHint(!showRecipeHint)}
                  className="text-[#e2b89d] hover:text-white transition-colors"
                  title="Toggle Recipe Hint"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="font-cozy text-sm font-bold text-[#faf1e3]">
                {currentStep ? currentStep.title : 'Ready to Serve!'}
              </p>
              {currentStep && (
                <p className="font-cozy text-xs text-[#b8957e] mt-0.5">
                  {currentStep.detail}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onOpenGrimoire}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#4a2a1c] hover:bg-[#5e3523] text-[#e8d2c0] text-xs font-cozy border border-[#633a28] transition-all"
          >
            <span>📖</span>
            Recipe Card
          </button>
        </div>
      ) : (
        <div className="bg-[#382015] px-4 py-2.5 rounded-2xl border border-[#4d2d1f] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-cozy text-xs text-[#dfc3af]">
              <strong>Free Brew Mode:</strong> Experiment with any combinations, vessels, and toppings freely.
            </span>
          </div>
          <button
            onClick={onOpenGrimoire}
            className="text-xs font-cozy text-amber-300 underline hover:text-amber-200"
          >
            Pick a Recipe
          </button>
        </div>
      )}

      {/* Step Hint Drawer */}
      {showRecipeHint && recipe && (
        <div className="bg-[#24130b] p-3 rounded-xl border border-[#522f1d] text-xs font-cozy text-[#d9beaa] flex items-start gap-2 animate-fade-in">
          <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300">Barista Tip:</strong> {recipe.fullRecipe}
          </div>
        </div>
      )}

      {/* WORKSTATION SHELVES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* SHELF 1: VESSEL SELECTION */}
        <div className="bg-[#331c12] p-3.5 rounded-2xl border border-[#4a2b1d] flex flex-col">
          <div className="flex justify-between items-center mb-2.5">
            <span className="font-pixel text-[11px] uppercase tracking-wider text-[#b88c74]">
              1. Choose Vessel
            </span>
            {vessel && (
              <span className="font-cozy text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <Check className="w-3 h-3" /> Selected
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'demitasse' as VesselType, label: 'Demitasse', icon: '☕', sub: 'Espresso / Macchiato' },
              { id: 'classic_mug' as VesselType, label: 'Classic Mug', icon: '🍵', sub: 'Latte / Cap / Drip' },
              { id: 'gibraltar_glass' as VesselType, label: 'Gibraltar', icon: '🥃', sub: 'Cortado (1:1)' },
              { id: 'dessert_bowl' as VesselType, label: 'Dessert Glass', icon: '🍨', sub: 'Affogato' },
              { id: 'glass_tumbler' as VesselType, label: 'Ribbed Glass', icon: '🥤', sub: 'Cold Brew' },
            ].map((cup) => (
              <button
                key={cup.id}
                onClick={() => handleVesselPick(cup.id)}
                className={`p-2 rounded-xl text-left border transition-all flex flex-col items-center justify-center text-center ${
                  vessel === cup.id
                    ? 'bg-[#5e3725] border-amber-500 shadow-pixel-sm scale-105'
                    : 'bg-[#28150d] hover:bg-[#3d2215] border-[#422518]'
                }`}
              >
                <span className="text-xl mb-1">{cup.icon}</span>
                <span className="font-cozy text-xs font-bold text-[#f7ede1] leading-tight">
                  {cup.label}
                </span>
                <span className="text-[9px] font-cozy text-[#a8826b] line-clamp-1 mt-0.5">
                  {cup.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* SHELF 2: EXTRACTION & HOT WATER */}
        <div className="bg-[#331c12] p-3.5 rounded-2xl border border-[#4a2b1d] flex flex-col">
          <span className="font-pixel text-[11px] uppercase tracking-wider text-[#b88c74] mb-2.5">
            2. Extraction & Water
          </span>

          <div className="grid grid-cols-2 gap-2 flex-1">
            {/* Single Espresso */}
            <button
              onClick={() => handleEspressoPull(false)}
              className="p-2.5 rounded-xl bg-[#28150d] hover:bg-[#3d2215] active:scale-95 border border-[#422518] flex items-center gap-2 text-left transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[#5c2f1b] flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                ☕
              </div>
              <div>
                <h5 className="font-cozy text-xs font-bold text-[#faf0e3]">Single Espresso</h5>
                <p className="text-[10px] font-cozy text-[#9c7760]">30ml pure shot + crema</p>
              </div>
            </button>

            {/* Double Ristretto */}
            <button
              onClick={() => handleEspressoPull(true)}
              className="p-2.5 rounded-xl bg-[#28150d] hover:bg-[#3d2215] active:scale-95 border border-[#422518] flex items-center gap-2 text-left transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[#421d0e] flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                ☕☕
              </div>
              <div>
                <h5 className="font-cozy text-xs font-bold text-[#faf0e3]">Double Ristretto</h5>
                <p className="text-[10px] font-cozy text-[#9c7760]">Flat White / Bold base</p>
              </div>
            </button>

            {/* Hot Water Kettle */}
            <button
              onClick={() => handlePourWater(false)}
              className="p-2.5 rounded-xl bg-[#28150d] hover:bg-[#3d2215] active:scale-95 border border-[#422518] flex items-center gap-2 text-left transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[#27464d] flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                🫖
              </div>
              <div>
                <h5 className="font-cozy text-xs font-bold text-[#faf0e3]">Hot Water (93°C)</h5>
                <p className="text-[10px] font-cozy text-[#9c7760]">Americano & Long Black</p>
              </div>
            </button>

            {/* Drip Filter */}
            <button
              onClick={handleDripBrew}
              className="p-2.5 rounded-xl bg-[#28150d] hover:bg-[#3d2215] active:scale-95 border border-[#422518] flex items-center gap-2 text-left transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[#5e3827] flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                💧
              </div>
              <div>
                <h5 className="font-cozy text-xs font-bold text-[#faf0e3]">Drip Pour-Over</h5>
                <p className="text-[10px] font-cozy text-[#9c7760]">Pure Black Coffee</p>
              </div>
            </button>
          </div>
        </div>

        {/* SHELF 3: STEAM WAND & MILK BAR */}
        <div className="bg-[#331c12] p-3.5 rounded-2xl border border-[#4a2b1d] flex flex-col">
          <div className="flex items-center justify-between gap-1 mb-2.5">
            <span className="font-pixel text-[10px] uppercase tracking-wider text-[#b88c74] whitespace-nowrap">
              3. Steam Wand & Milk
            </span>
            {/* Milk type toggles */}
            <div className="flex gap-1 bg-[#24130b] p-0.5 rounded-lg border border-[#422518]">
              {(['Oat', 'Whole', 'Almond'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMilkType(m)}
                  className={`text-[9px] font-cozy px-1.5 py-0.5 rounded ${
                    selectedMilkType === m ? 'bg-[#5e3725] text-white font-semibold' : 'text-[#a3806a]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Silky Steamed Milk */}
            <button
              onClick={() => handleSteamMilk(false, false)}
              className="p-2.5 rounded-xl bg-[#28150d] hover:bg-[#3d2215] active:scale-95 border border-[#422518] flex items-center gap-2 text-left transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[#73513a] flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                🥛
              </div>
              <div>
                <h5 className="font-cozy text-xs font-bold text-[#faf0e3]">Steamed Milk</h5>
                <p className="text-[10px] font-cozy text-[#9c7760]">Latte & Cappuccino</p>
              </div>
            </button>

            {/* Velvety Microfoam */}
            <button
              onClick={() => handleSteamMilk(false, true)}
              className="p-2.5 rounded-xl bg-[#28150d] hover:bg-[#3d2215] active:scale-95 border border-[#422518] flex items-center gap-2 text-left transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[#8c6549] flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                ✨
              </div>
              <div>
                <h5 className="font-cozy text-xs font-bold text-[#faf0e3]">Microfoam</h5>
                <p className="text-[10px] font-cozy text-[#9c7760]">Flat White silk texture</p>
              </div>
            </button>

            {/* Equal Warm Milk (Cortado) */}
            <button
              onClick={() => handleSteamMilk(true, false)}
              className="p-2.5 rounded-xl bg-[#28150d] hover:bg-[#3d2215] active:scale-95 border border-[#422518] flex items-center gap-2 text-left transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[#66402a] flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                ⚖️
              </div>
              <div>
                <h5 className="font-cozy text-xs font-bold text-[#faf0e3]">Warm Milk (1:1)</h5>
                <p className="text-[10px] font-cozy text-[#9c7760]">Cortado equal cut</p>
              </div>
            </button>

            {/* Thick Foam Cushion */}
            <button
              onClick={handleAddThickFoam}
              className="p-2.5 rounded-xl bg-[#28150d] hover:bg-[#3d2215] active:scale-95 border border-[#422518] flex items-center gap-2 text-left transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[#966b4d] flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                ☁️
              </div>
              <div>
                <h5 className="font-cozy text-xs font-bold text-[#faf0e3]">Thick Foam Dome</h5>
                <p className="text-[10px] font-cozy text-[#9c7760]">Cappuccino & Macchiato</p>
              </div>
            </button>
          </div>
        </div>

        {/* SHELF 4: ARTISAN SPECIALTIES & GARNISH */}
        <div className="bg-[#331c12] p-3.5 rounded-2xl border border-[#4a2b1d] flex flex-col">
          <span className="font-pixel text-[11px] uppercase tracking-wider text-[#b88c74] mb-2.5">
            4. Artisan Specialties & Toppings
          </span>

          <div className="grid grid-cols-2 gap-2">
            {/* Vanilla Gelato Scoop */}
            <button
              onClick={handleScoopGelato}
              className="p-2.5 rounded-xl bg-[#28150d] hover:bg-[#3d2215] active:scale-95 border border-[#422518] flex items-center gap-2 text-left transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[#8f825e] flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                🍨
              </div>
              <div>
                <h5 className="font-cozy text-xs font-bold text-[#faf0e3]">Vanilla Gelato</h5>
                <p className="text-[10px] font-cozy text-[#9c7760]">Affogato dessert scoop</p>
              </div>
            </button>

            {/* Slow Ice Cubes */}
            <button
              onClick={handleDropIce}
              className="p-2.5 rounded-xl bg-[#28150d] hover:bg-[#3d2215] active:scale-95 border border-[#422518] flex items-center gap-2 text-left transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[#274b52] flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                🧊
              </div>
              <div>
                <h5 className="font-cozy text-xs font-bold text-[#faf0e3]">Clear Ice Cubes</h5>
                <p className="text-[10px] font-cozy text-[#9c7760]">Cold Brew base</p>
              </div>
            </button>

            {/* 18h Cold Brew Nectar */}
            <button
              onClick={handlePourColdBrew}
              className="p-2.5 rounded-xl bg-[#28150d] hover:bg-[#3d2215] active:scale-95 border border-[#422518] flex items-center gap-2 text-left transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1f1008] flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                🏺
              </div>
              <div>
                <h5 className="font-cozy text-xs font-bold text-[#faf0e3]">Cold Brew Nectar</h5>
                <p className="text-[10px] font-cozy text-[#9c7760]">18h slow steeped</p>
              </div>
            </button>

            {/* Chocolate Fudge Syrup */}
            <button
              onClick={handlePumpChocolate}
              className="p-2.5 rounded-xl bg-[#28150d] hover:bg-[#3d2215] active:scale-95 border border-[#422518] flex items-center gap-2 text-left transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[#381608] flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                🍫
              </div>
              <div>
                <h5 className="font-cozy text-xs font-bold text-[#faf0e3]">Chocolate Syrup</h5>
                <p className="text-[10px] font-cozy text-[#9c7760]">Mocha base pump</p>
              </div>
            </button>
          </div>

          {/* Garnish Row */}
          <div className="mt-2.5 pt-2 border-t border-[#45281a] flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-pixel text-[#9e7660]">Garnish & Art:</span>
              {topping !== 'none' && (
                <button
                  onClick={() => onSetTopping('none')}
                  className="text-[10px] font-cozy text-amber-400/80 hover:text-amber-300 underline"
                >
                  Clear ({topping.replace(/_/g, ' ')})
                </button>
              )}
            </div>
            <div className="grid grid-cols-4 gap-1.5 w-full">
              {[
                { type: 'cocoa_dust' as ToppingType, label: 'Cocoa', icon: '🌰' },
                { type: 'latte_art_fern' as ToppingType, label: 'Fern Art', icon: '🌿' },
                { type: 'whipped_cream' as ToppingType, label: 'Cream', icon: '🧁' },
                { type: 'chocolate_drizzle' as ToppingType, label: 'Drizzle', icon: '🍫' },
              ].map((g) => (
                <button
                  key={g.type}
                  onClick={() => handleGarnish(g.type)}
                  className={`py-1.5 px-1 rounded-xl text-[11px] font-cozy border transition-all flex items-center justify-center gap-1 min-w-0 ${
                    topping === g.type
                      ? 'bg-[#613622] text-amber-300 border-amber-500 font-bold shadow-pixel-sm'
                      : 'bg-[#24130b] hover:bg-[#381f13] text-[#cfb6a3] border-[#3b2014]'
                  }`}
                  title={g.label}
                >
                  <span className="text-xs flex-shrink-0">{g.icon}</span>
                  <span className="truncate">{g.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER ACTIONS: DUMP & SERVE */}
      <div className="flex items-center justify-between pt-2 border-t border-[#472a1d]">
        <button
          onClick={() => {
            sounds.playCupClink();
            onResetBrew();
          }}
          className="px-4 py-2.5 rounded-xl bg-[#361c12] hover:bg-[#4a281b] text-[#c9a38b] text-xs font-cozy border border-[#522f20] flex items-center gap-1.5 transition-all active:scale-95"
          title="Dump and clean cup"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Dump & Reset Counter
        </button>

        <button
          onClick={onServeDrink}
          disabled={!vessel || ingredients.length === 0}
          className={`px-6 py-3 rounded-2xl font-cozy text-sm font-bold shadow-pixel flex items-center gap-2.5 transition-all ${
            vessel && ingredients.length > 0
              ? 'bg-[#c97838] hover:bg-[#df8a48] active:translate-y-0.5 text-[#fffaf2] cursor-pointer'
              : 'bg-[#40271c] text-[#7a5542] cursor-not-allowed border border-[#523325]'
          }`}
        >
          <Bell className="w-4 h-4 animate-bounce" />
          Ring Service Bell & Serve Drink 🔔
        </button>
      </div>

    </div>
  );
};
