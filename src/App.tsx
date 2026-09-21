import { useState } from 'react';
import type { 
  CoffeeRecipe, 
  Customer, 
  VesselType, 
  IngredientType, 
  ToppingType 
} from './types/coffee';
import { COFFEE_RECIPES, CUSTOMERS } from './data/coffeeRecipes';
import { CupVisualizer } from './components/CupVisualizer';
import { BrewWorkstation } from './components/BrewWorkstation';
import { BaristaGrimoire } from './components/BaristaGrimoire';
import { OrderSlip } from './components/OrderSlip';
import { AmbientBackdrop } from './components/AmbientBackdrop';
import type { LightingMode } from './components/AmbientBackdrop';
import { ServeResultModal } from './components/ServeResultModal';
import { sounds } from './utils/soundEngine';
import { BookOpen } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation & Game State
  const [activeCustomer, setActiveCustomer] = useState<Customer | null>(CUSTOMERS[0]);
  const [isFreeBrew, setIsFreeBrew] = useState<boolean>(false);
  const [activeRecipe, setActiveRecipe] = useState<CoffeeRecipe | null>(
    COFFEE_RECIPES.find((r) => r.id === CUSTOMERS[0].orderDrinkId) || null
  );

  // Brewing Station State
  const [vessel, setVessel] = useState<VesselType | null>('classic_mug');
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);
  const [topping, setTopping] = useState<ToppingType>('none');

  // Modals & Atmosphere
  const [isGrimoireOpen, setIsGrimoireOpen] = useState<boolean>(false);
  const [isServeModalOpen, setIsServeModalOpen] = useState<boolean>(false);
  const [lighting, setLighting] = useState<LightingMode>('rainy');
  const [drinksServedCount, setDrinksServedCount] = useState<number>(0);

  // Customer Selection
  const handleSelectCustomer = (c: Customer) => {
    setActiveCustomer(c);
    setIsFreeBrew(false);
    const targetRecipe = COFFEE_RECIPES.find((r) => r.id === c.orderDrinkId) || null;
    setActiveRecipe(targetRecipe);
    // Reset workstation for new order
    setIngredients([]);
    setTopping('none');
    if (targetRecipe) {
      setVessel(targetRecipe.vessel);
    }
  };

  // Free Brew Sandbox Mode
  const handleSelectFreeBrew = () => {
    setIsFreeBrew(true);
    setActiveCustomer(null);
    setActiveRecipe(null);
    setIngredients([]);
    setTopping('none');
    setVessel('classic_mug');
  };

  // Select Recipe from Grimoire
  const handleSelectRecipeToBrew = (recipe: CoffeeRecipe) => {
    setActiveRecipe(recipe);
    setIsFreeBrew(false);
    // Check if any customer matches this recipe, else custom order
    const matchCust = CUSTOMERS.find((c) => c.orderDrinkId === recipe.id);
    setActiveCustomer(matchCust || null);
    setVessel(recipe.vessel);
    setIngredients([]);
    setTopping('none');
  };

  // Workstation Actions
  const handleAddIngredient = (ing: IngredientType) => {
    setIngredients((prev) => [...prev, ing]);
  };

  const handleResetBrew = () => {
    setIngredients([]);
    setTopping('none');
  };

  const handleServe = () => {
    sounds.playBellChime();
    setIsServeModalOpen(true);
    setDrinksServedCount((prev) => prev + 1);
  };

  const handleNextCustomer = () => {
    if (!activeCustomer) {
      handleSelectCustomer(CUSTOMERS[0]);
      return;
    }
    const currIndex = CUSTOMERS.findIndex((c) => c.id === activeCustomer.id);
    const nextIndex = (currIndex + 1) % CUSTOMERS.length;
    handleSelectCustomer(CUSTOMERS[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-[#24150e] text-[#fbf6ee] flex flex-col items-center px-3 sm:px-6 py-6 transition-colors duration-700">
      
      {/* Outer Cozy Container */}
      <div className="w-full max-w-6xl flex flex-col">
        
        {/* AMBIENT BACKDROP WITH RAINDROPS & CONTROLS */}
        <AmbientBackdrop lighting={lighting} onSetLighting={setLighting} />

        {/* TOP BAR / QUICK STATS */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#2d1a12] p-3.5 rounded-2xl border border-[#4a2b1d] shadow-lg mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#522d1c] flex items-center justify-center text-xl shadow-inner border border-[#6b3d27]">
              ☕
            </div>
            <div>
              <h2 className="font-cozy text-sm font-bold text-[#faf0e1]">
                Komorebi Barista Counter
              </h2>
              <div className="flex items-center gap-2 text-xs font-cozy text-[#a8826b]">
                <span>Served: <strong>{drinksServedCount} cups</strong></span>
                <span>•</span>
                <span>Weather: <strong className="capitalize text-sky-300">{lighting}</strong></span>
              </div>
            </div>
          </div>

          {/* Grimoire Floating Trigger Button */}
          <button
            onClick={() => {
              sounds.playPaperRustle();
              setIsGrimoireOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-[#593524] hover:bg-[#73432d] text-[#fff6eb] font-cozy text-xs font-bold border border-[#78462f] shadow-pixel flex items-center gap-2 transition-transform active:translate-y-0.5"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>Open Barista Grimoire (12 Recipes & Pixel Art)</span>
          </button>
        </div>

        {/* ORDER CLOTHESLINE / TICKETS */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="font-pixel text-[11px] uppercase tracking-wider text-[#b88c74]">
              Customer Order Line
            </span>
            <span className="text-xs font-cozy text-[#8f6a54]">
              Click a ticket to begin brewing
            </span>
          </div>
          <OrderSlip
            activeCustomer={activeCustomer}
            onSelectCustomer={handleSelectCustomer}
            onSelectFreeBrew={handleSelectFreeBrew}
            isFreeBrew={isFreeBrew}
          />
        </div>

        {/* MAIN BREWING WORKSPACE (2 Columns on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: THE COUNTER & LIVE CUP VISUALIZER */}
          <div className="lg:col-span-5 bg-[#301c13] rounded-3xl p-5 border-2 border-[#4d2d1f] shadow-2xl flex flex-col items-center justify-between relative overflow-hidden">
            {/* Wooden Counter Surface Backdrop */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#20110a] to-[#3a2015] border-t-4 border-[#522e1e] pointer-events-none" />

            {/* Header info */}
            <div className="w-full flex justify-between items-center z-10 mb-2">
              <span className="font-pixel text-[11px] uppercase tracking-wider text-[#9e7660]">
                Brewing Counter
              </span>
              {activeRecipe && (
                <span className="text-[10px] font-pixel text-amber-300 bg-[#422517] px-2 py-0.5 rounded-md border border-[#593420]">
                  {activeRecipe.difficulty}
                </span>
              )}
            </div>

            {/* Live Interactive Cup Graphic */}
            <div className="w-full z-10">
              <CupVisualizer
                vessel={vessel}
                ingredients={ingredients}
                topping={topping}
                recipe={activeRecipe}
              />
            </div>

            {/* Quick Recipe Anatomy Bar if Active */}
            {activeRecipe && (
              <div className="w-full z-10 mt-3 pt-3 border-t border-[#472a1d]">
                <div className="flex justify-between text-[10px] font-cozy text-[#9c7760] mb-1">
                  <span>Target Ratio Anatomy</span>
                  <span>{activeRecipe.temperature}</span>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden flex border border-[#543222]">
                  {activeRecipe.layers.map((l, i) => (
                    <div
                      key={i}
                      style={{ width: `${l.ratio}%`, backgroundColor: l.color }}
                      className="h-full"
                      title={`${l.label}: ${l.ratio}%`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: TACTILE DYNAMIC WORKSTATION */}
          <div className="lg:col-span-7">
            <BrewWorkstation
              recipe={activeRecipe}
              vessel={vessel}
              ingredients={ingredients}
              topping={topping}
              onSelectVessel={setVessel}
              onAddIngredient={handleAddIngredient}
              onSetTopping={setTopping}
              onResetBrew={handleResetBrew}
              onServeDrink={handleServe}
              onOpenGrimoire={() => setIsGrimoireOpen(true)}
            />
          </div>

        </div>

        {/* COZY FOOTER */}
        <footer className="mt-12 py-6 text-center text-xs font-cozy text-[#7d5c48] border-t border-[#3b2216] flex flex-col items-center gap-1">
          <p>Komorebi Café &bull; A Cozy Sensory Coffee Experience &bull; Made with React &amp; Web Audio API</p>
          <p className="text-[11px] text-[#634838]">12 Authentic Coffees &bull; Procedural Rain Ambiance &bull; Pixel Art Icons</p>
        </footer>

      </div>

      {/* BARISTA RECIPE CODEX (GRIMOIRE) MODAL */}
      <BaristaGrimoire
        isOpen={isGrimoireOpen}
        onClose={() => setIsGrimoireOpen(false)}
        onSelectRecipeToBrew={handleSelectRecipeToBrew}
        activeRecipeId={activeRecipe?.id}
      />

      {/* SERVE RESULT & TASTING REVIEW MODAL */}
      <ServeResultModal
        isOpen={isServeModalOpen}
        onClose={() => setIsServeModalOpen(false)}
        customer={activeCustomer}
        recipe={activeRecipe}
        vessel={vessel}
        ingredients={ingredients}
        topping={topping}
        onNextCustomer={handleNextCustomer}
        onOpenGrimoire={() => setIsGrimoireOpen(true)}
      />

    </div>
  );
};

export default App;
