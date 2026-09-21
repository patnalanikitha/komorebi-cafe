export type VesselType = 'demitasse' | 'classic_mug' | 'glass_tumbler' | 'dessert_bowl' | 'gibraltar_glass';

export type IngredientType = 
  | 'espresso_shot'
  | 'double_espresso'
  | 'drip_coffee'
  | 'hot_water'
  | 'cold_water'
  | 'ice_cubes'
  | 'steamed_milk'
  | 'warm_milk'
  | 'thick_foam'
  | 'microfoam'
  | 'chocolate_syrup'
  | 'vanilla_gelato'
  | 'cold_brew_concentrate';

export type ToppingType =
  | 'cocoa_dust'
  | 'cinnamon_heart'
  | 'latte_art_fern'
  | 'whipped_cream'
  | 'chocolate_drizzle'
  | 'none';

export interface LiquidLayer {
  color: string;
  label: string;
  ratio: number; // percentage of cup height
  ingredient: IngredientType;
}

export interface CoffeeStepInstruction {
  stepNumber: number;
  tool: 'cup' | 'espresso_machine' | 'kettle' | 'steam_wand' | 'gelato_scooper' | 'ice_box' | 'syrup_pump' | 'drip_filter' | 'garnish';
  title: string;
  detail: string;
  actionText: string;
  ingredientResult?: IngredientType;
  toppingResult?: ToppingType;
}

export interface CoffeeRecipe {
  id: string;
  name: string;
  italianName?: string;
  shortDesc: string;
  fullRecipe: string;
  flavorProfile: string[];
  vessel: VesselType;
  expectedOrder: IngredientType[];
  expectedTopping?: ToppingType;
  layers: LiquidLayer[];
  steps: CoffeeStepInstruction[];
  difficulty: 'Cozy & Easy' | 'Artisan' | 'Master Barista';
  temperature: 'Hot' | 'Warm' | 'Iced' | 'Hot/Cold Hybrid';
  accentColor: string;
  pixelIconSvg: string; // custom crafted SVG pixel representation
}

export interface Customer {
  id: string;
  name: string;
  title: string;
  avatarPixel: string;
  vibe: string;
  orderDrinkId: string;
  dialogueQuote: string;
  successQuote: string;
  unlockReward: string;
}

export interface ActiveBrew {
  vessel: VesselType | null;
  addedIngredients: IngredientType[];
  topping: ToppingType;
  steamedMilkType: 'Whole Milk' | 'Oat Milk' | 'Almond Milk';
  syrupFlavor: 'Rich Chocolate' | 'Vanilla Bean' | 'Caramel';
  milkTemperature: number; // in °C
}
