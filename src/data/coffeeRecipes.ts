import type { CoffeeRecipe, Customer } from '../types/coffee';

export const COFFEE_RECIPES: CoffeeRecipe[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    italianName: 'Caffè Espresso',
    shortDesc: 'A single, concentrated shot of pure coffee with a golden crema crown.',
    fullRecipe: 'Finely ground dark-roast coffee beans extracted under 9 bars of pressure for 25-30 seconds. Produces a thick, aromatic, syrupy elixir topped with hazelnut-colored crema.',
    flavorProfile: ['Intense', 'Caramelized', 'Syrupy Crema'],
    vessel: 'demitasse',
    expectedOrder: ['espresso_shot'],
    layers: [
      { color: '#2d1810', label: 'Dark Coffee Body', ratio: 75, ingredient: 'espresso_shot' },
      { color: '#d48a37', label: 'Golden Crema', ratio: 25, ingredient: 'espresso_shot' }
    ],
    steps: [
      {
        stepNumber: 1,
        tool: 'cup',
        title: 'Place Demitasse Cup',
        detail: 'Set a warm, thick-walled porcelain demitasse cup onto the espresso tray.',
        actionText: 'Place Demitasse'
      },
      {
        stepNumber: 2,
        tool: 'espresso_machine',
        title: 'Pull Single Shot',
        detail: 'Tamp 18g finely ground beans, lock portafilter, and pull a 30ml single shot.',
        actionText: 'Extract Espresso Shot',
        ingredientResult: 'espresso_shot'
      }
    ],
    difficulty: 'Cozy & Easy',
    temperature: 'Hot',
    accentColor: '#d48a37',
    pixelIconSvg: `
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full pixel-render">
        <!-- Cup Body -->
        <rect x="7" y="14" width="14" height="12" fill="#FAF6EE"/>
        <rect x="8" y="26" width="12" height="2" fill="#E8DFD0"/>
        <!-- Handle -->
        <rect x="21" y="16" width="4" height="8" rx="2" fill="#FAF6EE"/>
        <rect x="22" y="18" width="2" height="4" fill="#261814"/>
        <!-- Saucer -->
        <rect x="4" y="27" width="20" height="3" rx="1" fill="#E8DFD0"/>
        <!-- Espresso Liquid -->
        <rect x="8" y="18" width="12" height="7" fill="#3D1E10"/>
        <!-- Golden Crema -->
        <rect x="8" y="15" width="12" height="3" fill="#D98A32"/>
        <rect x="10" y="16" width="4" height="1" fill="#F4B76A"/>
        <!-- Steam -->
        <rect x="11" y="9" width="2" height="3" fill="#D98A32" opacity="0.6"/>
        <rect x="15" y="7" width="2" height="4" fill="#D98A32" opacity="0.6"/>
      </svg>
    `
  },
  {
    id: 'black_coffee',
    name: 'Black Coffee',
    italianName: 'Drip / Filter Coffee',
    shortDesc: 'Standard drip-brewed coffee served plain without milk or sugar.',
    fullRecipe: 'Medium-coarse roasted beans slowly brewed through hot water filtration. Delivers a clean, nuanced body highlighting delicate floral and nutty flavor notes.',
    flavorProfile: ['Crisp', 'Nutty', 'Light Acidic', 'Comforting'],
    vessel: 'classic_mug',
    expectedOrder: ['drip_coffee'],
    layers: [
      { color: '#311b13', label: 'Drip Filtered Coffee', ratio: 95, ingredient: 'drip_coffee' }
    ],
    steps: [
      {
        stepNumber: 1,
        tool: 'cup',
        title: 'Place Classic Mug',
        detail: 'Select your favorite warm ceramic mug.',
        actionText: 'Place Ceramic Mug'
      },
      {
        stepNumber: 2,
        tool: 'drip_filter',
        title: 'Slow Drip Pour',
        detail: 'Pour 93°C water in gentle concentric circles over freshly ground beans.',
        actionText: 'Brew Drip Coffee',
        ingredientResult: 'drip_coffee'
      }
    ],
    difficulty: 'Cozy & Easy',
    temperature: 'Hot',
    accentColor: '#8a5238',
    pixelIconSvg: `
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full pixel-render">
        <!-- Big Mug Body -->
        <rect x="6" y="10" width="16" height="17" fill="#E2725B"/>
        <rect x="7" y="27" width="14" height="2" fill="#B3533F"/>
        <!-- Handle -->
        <rect x="22" y="13" width="5" height="11" rx="2" fill="#E2725B"/>
        <rect x="23" y="16" width="3" height="5" fill="#261814"/>
        <!-- Dark Liquid -->
        <rect x="7" y="12" width="14" height="14" fill="#2E170F"/>
        <!-- Steam -->
        <rect x="10" y="5" width="2" height="4" fill="#E8DFD0" opacity="0.6"/>
        <rect x="14" y="3" width="2" height="5" fill="#E8DFD0" opacity="0.6"/>
        <rect x="18" y="6" width="2" height="3" fill="#E8DFD0" opacity="0.6"/>
      </svg>
    `
  },
  {
    id: 'americano',
    name: 'Americano',
    italianName: 'Caffè Americano',
    shortDesc: 'An espresso shot diluted with hot water for a smoother, milder flavor.',
    fullRecipe: 'Originating during WWII when American soldiers diluted Italian espresso to match drip coffee. Pull espresso shot first, then top with steaming hot water to open up the aromatics.',
    flavorProfile: ['Smooth', 'Mellow Roast', 'Balanced'],
    vessel: 'classic_mug',
    expectedOrder: ['espresso_shot', 'hot_water'],
    layers: [
      { color: '#3d2015', label: 'Espresso Base', ratio: 35, ingredient: 'espresso_shot' },
      { color: '#573322', label: 'Hot Water Dilution', ratio: 65, ingredient: 'hot_water' }
    ],
    steps: [
      {
        stepNumber: 1,
        tool: 'cup',
        title: 'Place Ceramic Mug',
        detail: 'Set the mug under the portafilter spout.',
        actionText: 'Place Mug'
      },
      {
        stepNumber: 2,
        tool: 'espresso_machine',
        title: 'Pull Espresso Shot First',
        detail: 'Extract a bold single or double espresso directly into the mug.',
        actionText: 'Pull Espresso Shot',
        ingredientResult: 'espresso_shot'
      },
      {
        stepNumber: 3,
        tool: 'kettle',
        title: 'Add Steaming Hot Water',
        detail: 'Pour fresh hot water (around 150ml) to gently dilute the intense espresso.',
        actionText: 'Pour Hot Water',
        ingredientResult: 'hot_water'
      }
    ],
    difficulty: 'Cozy & Easy',
    temperature: 'Hot',
    accentColor: '#965a3e',
    pixelIconSvg: `
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full pixel-render">
        <!-- Ceramic Mug -->
        <rect x="6" y="11" width="16" height="16" fill="#D9C7B2"/>
        <rect x="7" y="27" width="14" height="2" fill="#BFAF9B"/>
        <!-- Handle -->
        <rect x="22" y="13" width="5" height="11" rx="2" fill="#D9C7B2"/>
        <rect x="23" y="16" width="3" height="5" fill="#261814"/>
        <!-- Liquid: diluted top, darker base -->
        <rect x="7" y="13" width="14" height="9" fill="#5E3725"/>
        <rect x="7" y="22" width="14" height="5" fill="#381D12"/>
        <!-- Water ripples -->
        <rect x="9" y="14" width="4" height="1" fill="#875338"/>
        <!-- Steam -->
        <rect x="11" y="6" width="2" height="4" fill="#FAF6EE" opacity="0.6"/>
        <rect x="15" y="4" width="2" height="5" fill="#FAF6EE" opacity="0.6"/>
      </svg>
    `
  },
  {
    id: 'long_black',
    name: 'Long Black',
    italianName: 'Australasian Long Black',
    shortDesc: 'Espresso poured over hot water to preserve the creamy, unbroken crema on top.',
    fullRecipe: 'Beloved in Australia and New Zealand. Hot water is added first to the cup, and a fresh double shot of espresso is gently pulled right on top so the delicate crema remains floating intact.',
    flavorProfile: ['Robust', 'Velvety Crema', 'Unbroken Aroma'],
    vessel: 'classic_mug',
    expectedOrder: ['hot_water', 'espresso_shot'],
    layers: [
      { color: '#522f1f', label: 'Hot Water Foundation', ratio: 65, ingredient: 'hot_water' },
      { color: '#381c10', label: 'Floating Espresso Body', ratio: 20, ingredient: 'espresso_shot' },
      { color: '#d48a37', label: 'Intact Golden Crema', ratio: 15, ingredient: 'espresso_shot' }
    ],
    steps: [
      {
        stepNumber: 1,
        tool: 'cup',
        title: 'Place Ceramic Cup',
        detail: 'Set cup ready for water first.',
        actionText: 'Place Cup'
      },
      {
        stepNumber: 2,
        tool: 'kettle',
        title: 'Pour Hot Water First!',
        detail: 'Crucial step: fill 2/3 of the cup with hot water BEFORE pulling coffee.',
        actionText: 'Pour Hot Water First',
        ingredientResult: 'hot_water'
      },
      {
        stepNumber: 3,
        tool: 'espresso_machine',
        title: 'Pull Espresso Directly Over Water',
        detail: 'Gently extract the double shot over the water so the golden crema floats atop.',
        actionText: 'Extract Espresso on Top',
        ingredientResult: 'espresso_shot'
      }
    ],
    difficulty: 'Artisan',
    temperature: 'Hot',
    accentColor: '#c47d31',
    pixelIconSvg: `
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full pixel-render">
        <!-- Cup -->
        <rect x="6" y="11" width="16" height="16" fill="#3D5A5B"/>
        <rect x="7" y="27" width="14" height="2" fill="#2A3E3F"/>
        <!-- Handle -->
        <rect x="22" y="13" width="5" height="11" rx="2" fill="#3D5A5B"/>
        <rect x="23" y="16" width="3" height="5" fill="#261814"/>
        <!-- Water bottom, dark espresso middle, golden crema top -->
        <rect x="7" y="20" width="14" height="7" fill="#4A291A"/>
        <rect x="7" y="16" width="14" height="4" fill="#2E160D"/>
        <rect x="7" y="13" width="14" height="3" fill="#D48A37"/>
        <rect x="10" y="14" width="4" height="1" fill="#F4B76A"/>
        <!-- Steam -->
        <rect x="12" y="5" width="2" height="5" fill="#FAF6EE" opacity="0.6"/>
      </svg>
    `
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    italianName: 'Caffè Cappuccino',
    shortDesc: 'Equal parts espresso, steamed milk, and thick airy milk foam.',
    fullRecipe: 'The historic holy trinity of coffee: exactly 1/3 espresso, 1/3 silky steamed milk, and 1/3 pillow-like microfoam dome, crowned with a dusting of bittersweet cocoa powder.',
    flavorProfile: ['Creamy', 'Balanced', 'Foamy Cloud', 'Cocoa Notes'],
    vessel: 'classic_mug',
    expectedOrder: ['espresso_shot', 'steamed_milk', 'thick_foam'],
    expectedTopping: 'cocoa_dust',
    layers: [
      { color: '#381c10', label: '1/3 Espresso Shot', ratio: 33, ingredient: 'espresso_shot' },
      { color: '#d9a879', label: '1/3 Steamed Milk', ratio: 33, ingredient: 'steamed_milk' },
      { color: '#fcf8f0', label: '1/3 Thick Milk Foam', ratio: 34, ingredient: 'thick_foam' }
    ],
    steps: [
      {
        stepNumber: 1,
        tool: 'cup',
        title: 'Place Wide Rim Cup',
        detail: 'Wide bowl mug allows the foam dome to rise naturally.',
        actionText: 'Place Cup'
      },
      {
        stepNumber: 2,
        tool: 'espresso_machine',
        title: 'Extract Rich Espresso',
        detail: 'Pull a single or double shot as the base.',
        actionText: 'Pull Espresso',
        ingredientResult: 'espresso_shot'
      },
      {
        stepNumber: 3,
        tool: 'steam_wand',
        title: 'Aerated Steamed Milk',
        detail: 'Steam milk with high aeration to produce dense, stiff foam bubbles.',
        actionText: 'Pour Steamed Milk',
        ingredientResult: 'steamed_milk'
      },
      {
        stepNumber: 4,
        tool: 'steam_wand',
        title: 'Spoon Thick Foam Dome',
        detail: 'Spoon a thick, cloud-like foam cushion across the entire surface.',
        actionText: 'Add Thick Foam',
        ingredientResult: 'thick_foam'
      },
      {
        stepNumber: 5,
        tool: 'garnish',
        title: 'Cocoa Dusting',
        detail: 'Dust a light blanket of organic cocoa powder on the pillowy foam.',
        actionText: 'Dust Cocoa',
        toppingResult: 'cocoa_dust'
      }
    ],
    difficulty: 'Artisan',
    temperature: 'Hot',
    accentColor: '#cfa278',
    pixelIconSvg: `
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full pixel-render">
        <!-- Cup -->
        <rect x="6" y="13" width="16" height="14" fill="#C8A27A"/>
        <rect x="7" y="27" width="14" height="2" fill="#A8825C"/>
        <!-- Handle -->
        <rect x="22" y="15" width="5" height="10" rx="2" fill="#C8A27A"/>
        <rect x="23" y="17" width="3" height="5" fill="#261814"/>
        <!-- Espresso Base -->
        <rect x="7" y="22" width="14" height="5" fill="#3D1D10"/>
        <!-- Steamed Milk -->
        <rect x="7" y="16" width="14" height="6" fill="#D6AA7E"/>
        <!-- Foam Mound (Bulging slightly) -->
        <rect x="6" y="10" width="16" height="6" rx="2" fill="#FFFDF9"/>
        <!-- Cocoa specks -->
        <rect x="9" y="11" width="2" height="1" fill="#4B2816"/>
        <rect x="14" y="12" width="2" height="1" fill="#4B2816"/>
        <rect x="17" y="11" width="1" height="1" fill="#4B2816"/>
        <rect x="12" y="13" width="1" height="1" fill="#4B2816"/>
      </svg>
    `
  },
  {
    id: 'latte',
    name: 'Latte (Caffè Latte)',
    italianName: 'Caffè Latte',
    shortDesc: 'One shot of espresso with abundant steamed milk and a light foam cap.',
    fullRecipe: 'The gentlest and creamiest classic: 1 part espresso blended with 4 parts silky steamed milk, finished with a whisper-thin layer of microfoam, ideal for delicate latte art.',
    flavorProfile: ['Milky', 'Sweet Butter', 'Velvety', 'Subtle Coffee'],
    vessel: 'classic_mug',
    expectedOrder: ['espresso_shot', 'steamed_milk', 'microfoam'],
    expectedTopping: 'latte_art_fern',
    layers: [
      { color: '#381c10', label: 'Espresso Core', ratio: 20, ingredient: 'espresso_shot' },
      { color: '#dfb78e', label: 'Silky Steamed Milk', ratio: 68, ingredient: 'steamed_milk' },
      { color: '#fff9f0', label: 'Microfoam Cap & Art', ratio: 12, ingredient: 'microfoam' }
    ],
    steps: [
      {
        stepNumber: 1,
        tool: 'cup',
        title: 'Place Large Cup',
        detail: 'Set a spacious 300ml cup to hold plenty of sweet steamed milk.',
        actionText: 'Place Cup'
      },
      {
        stepNumber: 2,
        tool: 'espresso_machine',
        title: 'Pull Espresso Shot',
        detail: 'Single concentrated shot of espresso poured first into the cup.',
        actionText: 'Pull Espresso',
        ingredientResult: 'espresso_shot'
      },
      {
        stepNumber: 3,
        tool: 'steam_wand',
        title: 'Steam Milk to 65°C',
        detail: 'Gentle swirl creates smooth textured milk with micro-bubbles.',
        actionText: 'Pour Steamed Milk',
        ingredientResult: 'steamed_milk'
      },
      {
        stepNumber: 4,
        tool: 'steam_wand',
        title: 'Pour Thin Microfoam Cap',
        detail: 'Top with a thin 5mm layer of silky microfoam.',
        actionText: 'Pour Microfoam Cap',
        ingredientResult: 'microfoam'
      },
      {
        stepNumber: 5,
        tool: 'garnish',
        title: 'Pour Latte Art Fern',
        detail: 'Wiggle the pitcher spout to draw a crisp rosetta/fern in the foam.',
        actionText: 'Draw Latte Art',
        toppingResult: 'latte_art_fern'
      }
    ],
    difficulty: 'Artisan',
    temperature: 'Hot',
    accentColor: '#e0b586',
    pixelIconSvg: `
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full pixel-render">
        <!-- Tall Mug Body -->
        <rect x="7" y="10" width="14" height="17" fill="#E6D3BA"/>
        <rect x="8" y="27" width="12" height="2" fill="#C2AB90"/>
        <!-- Handle -->
        <rect x="21" y="13" width="5" height="11" rx="2" fill="#E6D3BA"/>
        <rect x="22" y="15" width="3" height="6" fill="#261814"/>
        <!-- Milky Liquid -->
        <rect x="8" y="12" width="12" height="15" fill="#DEC09E"/>
        <rect x="8" y="23" width="12" height="4" fill="#B38962"/>
        <!-- White Foam & Art -->
        <rect x="8" y="11" width="12" height="3" fill="#FFFDF7"/>
        <!-- Fern Art Pixel Lines -->
        <rect x="13" y="11" width="2" height="3" fill="#A87548"/>
        <rect x="11" y="12" width="2" height="1" fill="#A87548"/>
        <rect x="15" y="12" width="2" height="1" fill="#A87548"/>
        <!-- Steam -->
        <rect x="12" y="4" width="2" height="5" fill="#FAF6EE" opacity="0.6"/>
      </svg>
    `
  },
  {
    id: 'flat_white',
    name: 'Flat White',
    italianName: 'Flat White',
    shortDesc: 'Double ristretto with velvety microfoam folded smoothly throughout.',
    fullRecipe: 'Born in Melbourne and Auckland. Uses a concentrated double ristretto shot blended with micro-aerated milk, creating a glossy, velvety consistency without stiff froth.',
    flavorProfile: ['Bold Espresso', 'Silky Microfoam', 'Rich Nutty'],
    vessel: 'classic_mug',
    expectedOrder: ['double_espresso', 'microfoam'],
    layers: [
      { color: '#31180d', label: 'Double Ristretto', ratio: 40, ingredient: 'double_espresso' },
      { color: '#c9966b', label: 'Folded Microfoam', ratio: 60, ingredient: 'microfoam' }
    ],
    steps: [
      {
        stepNumber: 1,
        tool: 'cup',
        title: 'Place Tulip Cup',
        detail: 'A smaller 160ml ceramic cup gives the ideal coffee-to-milk ratio.',
        actionText: 'Place Tulip Cup'
      },
      {
        stepNumber: 2,
        tool: 'espresso_machine',
        title: 'Pull Double Ristretto',
        detail: 'Extract a concentrated 40ml double shot with high extraction sweetness.',
        actionText: 'Pull Double Ristretto',
        ingredientResult: 'double_espresso'
      },
      {
        stepNumber: 3,
        tool: 'steam_wand',
        title: 'Fold Velvety Microfoam',
        detail: 'Steam milk with zero large bubbles; pour from high, then drop low to finish.',
        actionText: 'Fold In Microfoam',
        ingredientResult: 'microfoam'
      }
    ],
    difficulty: 'Master Barista',
    temperature: 'Hot',
    accentColor: '#bd8151',
    pixelIconSvg: `
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full pixel-render">
        <!-- Cup -->
        <rect x="6" y="12" width="16" height="15" fill="#69857B"/>
        <rect x="7" y="27" width="14" height="2" fill="#4B635A"/>
        <!-- Handle -->
        <rect x="22" y="14" width="5" height="10" rx="2" fill="#69857B"/>
        <rect x="23" y="16" width="3" height="5" fill="#261814"/>
        <!-- Coffee body & folded microfoam -->
        <rect x="7" y="19" width="14" height="8" fill="#3D1C0F"/>
        <rect x="7" y="14" width="14" height="5" fill="#B8855A"/>
        <!-- Thin flat top layer with crema spot -->
        <rect x="7" y="13" width="14" height="2" fill="#FAF4EB"/>
        <rect x="13" y="13" width="3" height="2" fill="#B8855A"/>
        <!-- Steam -->
        <rect x="14" y="6" width="2" height="5" fill="#FAF6EE" opacity="0.6"/>
      </svg>
    `
  },
  {
    id: 'macchiato',
    name: 'Macchiato',
    italianName: 'Caffè Macchiato',
    shortDesc: 'An espresso shot "marked" with just a small dollop of foamed milk.',
    fullRecipe: 'In Italian, "macchiato" translates to "stained" or "marked". Pull a bold espresso shot and top with a single warm spoonful of dense milk foam to temper the sharpness.',
    flavorProfile: ['Bold Espresso Front', 'Sweet Milk Accent', 'Crema Punch'],
    vessel: 'demitasse',
    expectedOrder: ['espresso_shot', 'thick_foam'],
    layers: [
      { color: '#2b160d', label: 'Intense Espresso Shot', ratio: 80, ingredient: 'espresso_shot' },
      { color: '#fff9f0', label: 'Mark of Dense Foam', ratio: 20, ingredient: 'thick_foam' }
    ],
    steps: [
      {
        stepNumber: 1,
        tool: 'cup',
        title: 'Place Demitasse Cup',
        detail: 'Use a clear glass demitasse to admire the contrast.',
        actionText: 'Place Glass Demitasse'
      },
      {
        stepNumber: 2,
        tool: 'espresso_machine',
        title: 'Extract Dark Espresso',
        detail: 'Pull a single 30ml espresso with thick crema.',
        actionText: 'Pull Espresso',
        ingredientResult: 'espresso_shot'
      },
      {
        stepNumber: 3,
        tool: 'steam_wand',
        title: 'Mark with Foam Dollop',
        detail: 'Spoon a single dollop of velvety milk foam right in the center.',
        actionText: 'Mark with Foam',
        ingredientResult: 'thick_foam'
      }
    ],
    difficulty: 'Cozy & Easy',
    temperature: 'Hot',
    accentColor: '#cf7b38',
    pixelIconSvg: `
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full pixel-render">
        <!-- Glass Demitasse -->
        <rect x="8" y="15" width="12" height="11" fill="#E8DFD0" opacity="0.8"/>
        <rect x="9" y="26" width="10" height="2" fill="#D0C5B4"/>
        <rect x="6" y="27" width="16" height="2" fill="#D0C5B4"/>
        <!-- Handle -->
        <rect x="20" y="17" width="4" height="7" rx="1" fill="#E8DFD0"/>
        <rect x="21" y="19" width="2" height="3" fill="#261814"/>
        <!-- Dark Espresso -->
        <rect x="9" y="18" width="10" height="8" fill="#33180D"/>
        <!-- Crema ring with white foam spot in middle -->
        <rect x="9" y="16" width="10" height="2" fill="#CC7D2F"/>
        <rect x="12" y="15" width="4" height="3" fill="#FFFFFF"/>
        <!-- Steam -->
        <rect x="13" y="9" width="2" height="4" fill="#FAF6EE" opacity="0.6"/>
      </svg>
    `
  },
  {
    id: 'cortado',
    name: 'Cortado',
    italianName: 'Cortado',
    shortDesc: 'Equal parts espresso and warm, steamed milk to balance the strong coffee taste.',
    fullRecipe: 'Originating in Spain and Basque Country, "cortado" means "cut". 1:1 equal balance of espresso cut with warm, lightly textured steamed milk (no heavy foam), served in a small faceted glass.',
    flavorProfile: ['50/50 Balance', 'Warm & Silky', 'Non-Acidic'],
    vessel: 'gibraltar_glass',
    expectedOrder: ['espresso_shot', 'warm_milk'],
    layers: [
      { color: '#33180d', label: '1/2 Espresso', ratio: 50, ingredient: 'espresso_shot' },
      { color: '#cca278', label: '1/2 Warm Steamed Milk', ratio: 50, ingredient: 'warm_milk' }
    ],
    steps: [
      {
        stepNumber: 1,
        tool: 'cup',
        title: 'Place Gibraltar Glass',
        detail: 'Set the iconic 4.5 oz fluted glass on the counter.',
        actionText: 'Place Gibraltar Glass'
      },
      {
        stepNumber: 2,
        tool: 'espresso_machine',
        title: 'Pull Espresso Shot',
        detail: 'Pull fresh 30ml espresso directly into the glass.',
        actionText: 'Pull Espresso',
        ingredientResult: 'espresso_shot'
      },
      {
        stepNumber: 3,
        tool: 'steam_wand',
        title: 'Cut with Equal Warm Milk',
        detail: 'Steam milk gently without stiff froth; pour equal 30ml warm milk to balance.',
        actionText: 'Pour Warm Milk (1:1)',
        ingredientResult: 'warm_milk'
      }
    ],
    difficulty: 'Artisan',
    temperature: 'Warm',
    accentColor: '#ba7744',
    pixelIconSvg: `
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full pixel-render">
        <!-- Fluted Gibraltar Glass -->
        <polygon points="7,12 21,12 18,27 10,27" fill="#C5D3D6" opacity="0.75"/>
        <rect x="9" y="27" width="10" height="2" fill="#A4B4B8"/>
        <!-- Bottom Espresso Half -->
        <polygon points="9,20 19,20 18,26 10,26" fill="#3D1D10"/>
        <!-- Top Milk Half -->
        <polygon points="8,13 20,13 19,20 9,20" fill="#CCA278"/>
        <rect x="8" y="13" width="12" height="1" fill="#E6CDB3"/>
        <!-- Glass Shimmer -->
        <line x1="11" y1="14" x2="11" y2="25" stroke="#FFFFFF" stroke-width="1" opacity="0.5"/>
      </svg>
    `
  },
  {
    id: 'mocha',
    name: 'Mocha (Caffè Mocha)',
    italianName: 'Mocaccino',
    shortDesc: 'A mix of a latte and hot chocolate: espresso, chocolate syrup, and steamed milk.',
    fullRecipe: 'The ultimate indulgent treat. Rich bittersweet cocoa syrup on the bottom, followed by a bold espresso shot, hot steamed milk, and crowned with a generous swirl of whipped cream.',
    flavorProfile: ['Decadent Chocolate', 'Roasted Espresso', 'Whipped Cream'],
    vessel: 'classic_mug',
    expectedOrder: ['chocolate_syrup', 'espresso_shot', 'steamed_milk'],
    expectedTopping: 'whipped_cream',
    layers: [
      { color: '#2b1408', label: 'Dark Chocolate Fudge', ratio: 20, ingredient: 'chocolate_syrup' },
      { color: '#422114', label: 'Espresso Core', ratio: 25, ingredient: 'espresso_shot' },
      { color: '#a8734f', label: 'Steamed Cocoa Milk', ratio: 40, ingredient: 'steamed_milk' },
      { color: '#fff9f0', label: 'Whipped Cream Swirl', ratio: 15, ingredient: 'steamed_milk' }
    ],
    steps: [
      {
        stepNumber: 1,
        tool: 'cup',
        title: 'Place Cozy Mug',
        detail: 'Select a spacious mug to hold all the sweet layers.',
        actionText: 'Place Mug'
      },
      {
        stepNumber: 2,
        tool: 'syrup_pump',
        title: 'Pump Rich Chocolate Syrup',
        detail: 'Dispense 2 pumps of warm Dutch chocolate fudge into the base.',
        actionText: 'Add Chocolate Syrup',
        ingredientResult: 'chocolate_syrup'
      },
      {
        stepNumber: 3,
        tool: 'espresso_machine',
        title: 'Pull Hot Espresso Shot',
        detail: 'The hot espresso melts the rich chocolate into a velvety syrup.',
        actionText: 'Extract Espresso',
        ingredientResult: 'espresso_shot'
      },
      {
        stepNumber: 4,
        tool: 'steam_wand',
        title: 'Pour Hot Steamed Milk',
        detail: 'Pour steamed milk to blend seamlessly with the mocha base.',
        actionText: 'Pour Steamed Milk',
        ingredientResult: 'steamed_milk'
      },
      {
        stepNumber: 5,
        tool: 'garnish',
        title: 'Swirl Whipped Cream',
        detail: 'Crown with a towering cloud of fresh vanilla whipped cream.',
        actionText: 'Add Whipped Cream',
        toppingResult: 'whipped_cream'
      }
    ],
    difficulty: 'Artisan',
    temperature: 'Hot',
    accentColor: '#6e3820',
    pixelIconSvg: `
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full pixel-render">
        <!-- Mug -->
        <rect x="6" y="13" width="16" height="14" fill="#6B3A2A"/>
        <rect x="7" y="27" width="14" height="2" fill="#522B1E"/>
        <rect x="22" y="15" width="5" height="10" rx="2" fill="#6B3A2A"/>
        <rect x="23" y="17" width="3" height="5" fill="#261814"/>
        <!-- Chocolate syrup base -->
        <rect x="7" y="24" width="14" height="3" fill="#241007"/>
        <!-- Espresso mocha blend -->
        <rect x="7" y="15" width="14" height="9" fill="#7D4931"/>
        <!-- Whipped Cream Dome -->
        <rect x="8" y="9" width="12" height="6" rx="3" fill="#FFFDF8"/>
        <rect x="11" y="7" width="6" height="3" rx="1" fill="#FFFDF8"/>
        <!-- Chocolate drizzle over cream -->
        <rect x="10" y="9" width="2" height="4" fill="#3D1A0D"/>
        <rect x="15" y="8" width="2" height="5" fill="#3D1A0D"/>
      </svg>
    `
  },
  {
    id: 'affogato',
    name: 'Affogato',
    italianName: 'Affogato al Caffè',
    shortDesc: 'A dessert style where a hot shot of espresso is poured over vanilla ice cream.',
    fullRecipe: '"Affogato" means "drowned" in Italian. A chilled scoop of artisanal Madagascan vanilla gelato sits in a dessert bowl, slowly melting into a hot, freshly pulled shot of dark espresso.',
    flavorProfile: ['Cold & Hot Contrast', 'Creamy Vanilla Gelato', 'Bittersweet Crema'],
    vessel: 'dessert_bowl',
    expectedOrder: ['vanilla_gelato', 'espresso_shot'],
    expectedTopping: 'chocolate_drizzle',
    layers: [
      { color: '#fff6e0', label: 'Vanilla Gelato Scoop', ratio: 60, ingredient: 'vanilla_gelato' },
      { color: '#381c10', label: 'Drowning Espresso Shot', ratio: 40, ingredient: 'espresso_shot' }
    ],
    steps: [
      {
        stepNumber: 1,
        tool: 'cup',
        title: 'Place Chilled Dessert Glass',
        detail: 'A chilled stem glass keeps the gelato cold.',
        actionText: 'Place Dessert Glass'
      },
      {
        stepNumber: 2,
        tool: 'gelato_scooper',
        title: 'Scoop Vanilla Gelato First',
        detail: 'Place a round scoop of Madagascar vanilla gelato into the center.',
        actionText: 'Scoop Vanilla Gelato',
        ingredientResult: 'vanilla_gelato'
      },
      {
        stepNumber: 3,
        tool: 'espresso_machine',
        title: 'Drown in Fresh Hot Espresso',
        detail: 'Pour a fresh, piping hot single espresso shot directly over the cold gelato.',
        actionText: 'Pour Hot Espresso Over',
        ingredientResult: 'espresso_shot'
      },
      {
        stepNumber: 4,
        tool: 'garnish',
        title: 'Drizzle Bittersweet Chocolate',
        detail: 'Optional Italian touch: a delicate lace of melted dark chocolate.',
        actionText: 'Drizzle Chocolate',
        toppingResult: 'chocolate_drizzle'
      }
    ],
    difficulty: 'Master Barista',
    temperature: 'Hot/Cold Hybrid',
    accentColor: '#e09848',
    pixelIconSvg: `
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full pixel-render">
        <!-- Dessert Footed Glass -->
        <rect x="7" y="14" width="14" height="9" fill="#B9CAD0" opacity="0.7"/>
        <rect x="13" y="23" width="2" height="4" fill="#B9CAD0"/>
        <rect x="10" y="27" width="8" height="2" fill="#9FB4BC"/>
        <!-- Hot Espresso Pool -->
        <rect x="8" y="18" width="12" height="5" fill="#3D1C0F"/>
        <!-- Gelato Scoop Sphere -->
        <circle cx="14" cy="15" r="5" fill="#FFFCE8"/>
        <!-- Drowning espresso drips on ice cream -->
        <rect x="13" y="11" width="2" height="5" fill="#522716"/>
        <rect x="16" y="13" width="1" height="4" fill="#522716"/>
      </svg>
    `
  },
  {
    id: 'cold_brew',
    name: 'Cold Brew',
    italianName: 'Cold Brewed Coffee',
    shortDesc: 'Coarse coffee grounds steeped in cold water for 12 to 24 hours over ice.',
    fullRecipe: 'Crafted with patience: coarse single-origin coffee grounds immersed in cold filtered water for 18 hours. Yields an extraordinarily smooth, naturally sweet, low-acid nectar served over crystal-clear ice.',
    flavorProfile: ['Ultra Smooth', 'Low Acidity', 'Subtle Cocoa', 'Refreshing'],
    vessel: 'glass_tumbler',
    expectedOrder: ['ice_cubes', 'cold_brew_concentrate', 'cold_water'],
    layers: [
      { color: '#8cd3ff', label: 'Slow Clear Ice Cubes', ratio: 30, ingredient: 'ice_cubes' },
      { color: '#211009', label: '18h Cold Brew Nectar', ratio: 60, ingredient: 'cold_brew_concentrate' },
      { color: '#4a2515', label: 'Cold Water Splash', ratio: 10, ingredient: 'cold_water' }
    ],
    steps: [
      {
        stepNumber: 1,
        tool: 'cup',
        title: 'Place Ribbed Tumbler',
        detail: 'Set a heavy-base crystal ribbed tumbler.',
        actionText: 'Place Glass Tumbler'
      },
      {
        stepNumber: 2,
        tool: 'ice_box',
        title: 'Add Crystal Clear Ice Cubes',
        detail: 'Drop large, slow-melting dense ice cubes into the glass.',
        actionText: 'Drop Ice Cubes',
        ingredientResult: 'ice_cubes'
      },
      {
        stepNumber: 3,
        tool: 'drip_filter',
        title: 'Pour 18h Cold Brew Concentrate',
        detail: 'Pour the deeply aromatic, slow-steeped cold brew over the ice.',
        actionText: 'Pour Cold Brew',
        ingredientResult: 'cold_brew_concentrate'
      },
      {
        stepNumber: 4,
        tool: 'kettle',
        title: 'Splash of Chilled Water',
        detail: 'Add a touch of cold water to bring it to perfect drinking strength.',
        actionText: 'Add Chilled Water',
        ingredientResult: 'cold_water'
      }
    ],
    difficulty: 'Cozy & Easy',
    temperature: 'Iced',
    accentColor: '#3c7a89',
    pixelIconSvg: `
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full pixel-render">
        <!-- Tall Glass Tumbler -->
        <rect x="8" y="7" width="12" height="20" rx="1" fill="#CBE5E8" opacity="0.6"/>
        <rect x="9" y="27" width="10" height="2" fill="#9BBFC4"/>
        <!-- Cold Brew Liquid -->
        <rect x="9" y="10" width="10" height="17" fill="#2A140B"/>
        <!-- Floating Ice Cubes -->
        <rect x="10" y="11" width="4" height="4" rx="1" fill="#D7F3F7" opacity="0.85"/>
        <rect x="14" y="15" width="4" height="4" rx="1" fill="#D7F3F7" opacity="0.85"/>
        <rect x="10" y="18" width="4" height="4" rx="1" fill="#D7F3F7" opacity="0.85"/>
        <!-- Condensation droplets -->
        <circle cx="7" cy="14" r="0.75" fill="#E2F7F9"/>
        <circle cx="7" cy="20" r="0.75" fill="#E2F7F9"/>
        <circle cx="21" cy="17" r="0.75" fill="#E2F7F9"/>
      </svg>
    `
  }
];

export const CUSTOMERS: Customer[] = [
  {
    id: 'luna',
    name: 'Luna',
    title: 'The Sleepy Architect',
    avatarPixel: `
      <svg viewBox="0 0 32 32" class="w-full h-full pixel-render">
        <rect x="10" y="8" width="12" height="10" fill="#FFE0BD"/>
        <!-- Brown Bob Hair -->
        <rect x="8" y="6" width="16" height="5" fill="#4A2E1B"/>
        <rect x="7" y="11" width="3" height="8" fill="#4A2E1B"/>
        <rect x="22" y="11" width="3" height="8" fill="#4A2E1B"/>
        <!-- Round Glasses -->
        <rect x="11" y="11" width="4" height="3" fill="#333" fill-opacity="0.2" stroke="#333" stroke-width="1"/>
        <rect x="17" y="11" width="4" height="3" fill="#333" fill-opacity="0.2" stroke="#333" stroke-width="1"/>
        <line x1="15" y1="12" x2="17" y2="12" stroke="#333" stroke-width="1"/>
        <!-- Sleepy smile -->
        <rect x="14" y="15" width="4" height="1" fill="#B36B5A"/>
        <!-- Cozy Sweater -->
        <rect x="8" y="18" width="16" height="10" rx="2" fill="#59705E"/>
        <rect x="11" y="18" width="10" height="2" fill="#FAF6EE"/>
      </svg>
    `,
    vibe: 'Working on blueprint drafts during a thunderstorm',
    orderDrinkId: 'cappuccino',
    dialogueQuote: '“Hello barista... my eyes are so heavy from drafting bridges. Could I get a warm Cappuccino with that lovely thick foam dome?”',
    successQuote: '“Oh, this cocoa dusted foam is pure heaven. My blueprints will be brilliant now. Thank you!”',
    unlockReward: 'Draftsman Brass Compass'
  },
  {
    id: 'sam',
    name: 'Sam',
    title: 'The Rainy Day Reader',
    avatarPixel: `
      <svg viewBox="0 0 32 32" class="w-full h-full pixel-render">
        <rect x="10" y="8" width="12" height="10" fill="#FCD7B0"/>
        <!-- Beanie Hat -->
        <rect x="9" y="5" width="14" height="5" rx="2" fill="#BF573F"/>
        <rect x="8" y="9" width="16" height="2" fill="#99412D"/>
        <!-- Messy curls -->
        <rect x="9" y="11" width="2" height="4" fill="#24140D"/>
        <rect x="21" y="11" width="2" height="4" fill="#24140D"/>
        <!-- Eyes & Smile -->
        <circle cx="13" cy="12" r="1" fill="#24140D"/>
        <circle cx="19" cy="12" r="1" fill="#24140D"/>
        <rect x="14" y="15" width="4" height="1" fill="#99412D"/>
        <!-- Yellow Raincoat -->
        <rect x="8" y="18" width="16" height="10" rx="2" fill="#DDA136"/>
      </svg>
    `,
    vibe: 'Lost in an antique fantasy novel',
    orderDrinkId: 'long_black',
    dialogueQuote: '“A rainy evening calls for an authentic Long Black—remember to pour the hot water first so the golden crema stays on top!”',
    successQuote: '“Look at that unbroken crema! You truly know your craft. This chapter will be exquisite.”',
    unlockReward: 'Antique Bookmark Stamp'
  },
  {
    id: 'milo',
    name: 'Milo',
    title: 'The Cat Enthusiast',
    avatarPixel: `
      <svg viewBox="0 0 32 32" class="w-full h-full pixel-render">
        <rect x="10" y="8" width="12" height="10" fill="#FFE3C9"/>
        <!-- Blonde Hair -->
        <rect x="8" y="6" width="16" height="4" fill="#E6BA6E"/>
        <rect x="7" y="10" width="3" height="5" fill="#E6BA6E"/>
        <!-- Cheerful face & blushing cheeks -->
        <circle cx="13" cy="12" r="1" fill="#3D2619"/>
        <circle cx="19" cy="12" r="1" fill="#3D2619"/>
        <circle cx="11" cy="14" r="1" fill="#FF9EAA"/>
        <circle cx="21" cy="14" r="1" fill="#FF9EAA"/>
        <path d="M14 15 Q16 17 18 15" stroke="#3D2619" stroke-width="1" fill="none"/>
        <!-- Knitted Cardigan with Cat Brooch -->
        <rect x="8" y="18" width="16" height="10" rx="2" fill="#886E9C"/>
        <circle cx="12" cy="22" r="1.5" fill="#FAF6EE"/>
      </svg>
    `,
    vibe: 'Watching raindrops roll down the café window',
    orderDrinkId: 'latte',
    dialogueQuote: '“Hi! Could I please have a velvety Caffè Latte? The more silky milk, the happier I am... and maybe some pretty latte art on top?”',
    successQuote: '“Waaah, the fern rosetta in the foam is gorgeous! It is almost too pretty to drink!”',
    unlockReward: 'Lucky Calico Stamp'
  },
  {
    id: 'elena',
    name: 'Elena',
    title: 'The Jazz Pianist',
    avatarPixel: `
      <svg viewBox="0 0 32 32" class="w-full h-full pixel-render">
        <rect x="10" y="8" width="12" height="10" fill="#E8B589"/>
        <!-- Dark curly updo -->
        <circle cx="16" cy="5" r="4" fill="#1C1410"/>
        <rect x="8" y="8" width="16" height="4" fill="#1C1410"/>
        <!-- Calm expression -->
        <circle cx="13" cy="12" r="1" fill="#1C1410"/>
        <circle cx="19" cy="12" r="1" fill="#1C1410"/>
        <rect x="14" y="15" width="4" height="1" fill="#99412D"/>
        <!-- Burgundy Velvet Jacket -->
        <rect x="8" y="18" width="16" height="10" rx="2" fill="#692837"/>
        <rect x="14" y="18" width="4" height="10" fill="#241418"/>
      </svg>
    `,
    vibe: 'Composing a midnight melody',
    orderDrinkId: 'affogato',
    dialogueQuote: '“Between sets, nothing compares to an Affogato. A scoop of cold artisan vanilla gelato drowned in a hot shot of fresh espresso.”',
    successQuote: '“Bravo! The contrast between the cold vanilla and hot bitter espresso is like a minor chord turning major.”',
    unlockReward: 'Golden Treble Clef'
  },
  {
    id: 'kenji',
    name: 'Kenji',
    title: 'The Roaster Apprentice',
    avatarPixel: `
      <svg viewBox="0 0 32 32" class="w-full h-full pixel-render">
        <rect x="10" y="8" width="12" height="10" fill="#F7D3A6"/>
        <!-- Short dark hair & bandana -->
        <rect x="9" y="5" width="14" height="4" fill="#262626"/>
        <rect x="8" y="8" width="16" height="2" fill="#4B6E70"/>
        <!-- Focused eyes -->
        <rect x="12" y="12" width="2" height="1" fill="#262626"/>
        <rect x="18" y="12" width="2" height="1" fill="#262626"/>
        <rect x="14" y="15" width="4" height="1" fill="#B36244"/>
        <!-- Denim Apron -->
        <rect x="8" y="18" width="16" height="10" fill="#3D5369"/>
        <rect x="13" y="19" width="6" height="7" fill="#8C5C38"/>
      </svg>
    `,
    vibe: 'Testing extraction timings and origins',
    orderDrinkId: 'flat_white',
    dialogueQuote: '“Let’s test your milk steaming mastery. Give me a true Melbourne Flat White—double ristretto with seamless microfoam folded in, no stiff bubbles.”',
    successQuote: '“Spectacular texture. No stiff froth, just liquid silk. You have the touch of a master barista!”',
    unlockReward: 'Barista Tamper Trophy'
  }
];
