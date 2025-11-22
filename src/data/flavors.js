// Flavor profile tags for filtering
export const FLAVOR_PROFILES = {
  tobacco: { id: 'tobacco', name: 'Καπνός', icon: 'Cigarette', color: 'amber' },
  fruity: { id: 'fruity', name: 'Φρούτα', icon: 'Apple', color: 'red' },
  dessert: { id: 'dessert', name: 'Επιδόρπιο', icon: 'Cake', color: 'pink' },
  menthol: { id: 'menthol', name: 'Μέντα', icon: 'Snowflake', color: 'cyan' },
  beverage: { id: 'beverage', name: 'Ρόφημα', icon: 'Coffee', color: 'brown' },
  candy: { id: 'candy', name: 'Καραμέλα', icon: 'Candy', color: 'purple' },
  cream: { id: 'cream', name: 'Κρέμα', icon: 'Milk', color: 'yellow' },
  nuts: { id: 'nuts', name: 'Ξηροί καρποί', icon: 'Nut', color: 'orange' },
  bakery: { id: 'bakery', name: 'Αρτοποιήματα', icon: 'Croissant', color: 'amber' },
};

export const FLAVORS = [
  // Halo
  { id: 'halo-tribeca', name: 'Tribeca', brand: 'Halo', volumeMl: 10, pgPercent: 100, recommendedPercent: 25, steepDays: 7, isCustom: false, profiles: ['tobacco', 'cream', 'candy'] },
  { id: 'halo-turkish', name: 'Turkish Tobacco', brand: 'Halo', volumeMl: 10, pgPercent: 100, recommendedPercent: 25, steepDays: 7, isCustom: false, profiles: ['tobacco'] },
  { id: 'halo-torque', name: 'Torque 56', brand: 'Halo', volumeMl: 10, pgPercent: 100, recommendedPercent: 25, steepDays: 7, isCustom: false, profiles: ['tobacco'] },
  { id: 'halo-freedom', name: 'Freedom Juice', brand: 'Halo', volumeMl: 10, pgPercent: 100, recommendedPercent: 25, steepDays: 7, isCustom: false, profiles: ['tobacco', 'cream'] },
  { id: 'halo-subzero', name: 'SubZero', brand: 'Halo', volumeMl: 10, pgPercent: 100, recommendedPercent: 25, steepDays: 3, isCustom: false, profiles: ['menthol'] },

  // Philotimo (Flavor Shots format)
  { id: 'phil-virginia', name: 'Καπνός Virginia', brand: 'Philotimo', volumeMl: 30, pgPercent: 100, recommendedPercent: 33, steepDays: 14, isCustom: false, profiles: ['tobacco'] },
  { id: 'phil-tribeka', name: 'Τριμπέκα', brand: 'Philotimo', volumeMl: 30, pgPercent: 100, recommendedPercent: 33, steepDays: 10, isCustom: false, profiles: ['tobacco', 'cream', 'candy'] },
  { id: 'phil-ry4', name: 'RY4', brand: 'Philotimo', volumeMl: 30, pgPercent: 100, recommendedPercent: 33, steepDays: 14, isCustom: false, profiles: ['tobacco', 'cream', 'candy'] },

  // Natura
  { id: 'nat-mystique', name: 'Mystique', brand: 'Natura', volumeMl: 30, pgPercent: 100, recommendedPercent: 33, steepDays: 7, isCustom: false, profiles: ['fruity', 'menthol'] },

  // Vampire Vape
  { id: 'vv-heisenberg', name: 'Heisenberg', brand: 'Vampire Vape', volumeMl: 10, pgPercent: 100, recommendedPercent: 20, steepDays: 5, isCustom: false, profiles: ['fruity', 'menthol', 'candy'] },
  { id: 'vv-pinkman', name: 'Pinkman', brand: 'Vampire Vape', volumeMl: 10, pgPercent: 100, recommendedPercent: 20, steepDays: 5, isCustom: false, profiles: ['fruity', 'candy'] },

  // Capella
  { id: 'cap-vanilla', name: 'Vanilla Custard', brand: 'Capella', volumeMl: 10, pgPercent: 100, recommendedPercent: 8, steepDays: 14, isCustom: false, profiles: ['cream', 'dessert'] },
  { id: 'cap-strawberry', name: 'Sweet Strawberry', brand: 'Capella', volumeMl: 10, pgPercent: 100, recommendedPercent: 6, steepDays: 3, isCustom: false, profiles: ['fruity'] },

  // Tasty Clouds (Greece)
  { id: 'tc-ursula', name: 'Ursula', brand: 'Tasty Clouds', volumeMl: 12, pgPercent: 100, recommendedPercent: 20, steepDays: 5, isCustom: false, profiles: ['fruity', 'menthol'] },
  { id: 'tc-ursula-cream', name: 'Ursula Cream', brand: 'Tasty Clouds', volumeMl: 12, pgPercent: 100, recommendedPercent: 20, steepDays: 5, isCustom: false, profiles: ['fruity', 'cream'] },
  { id: 'tc-buddha-bacco', name: 'Buddha Bacco', brand: 'Tasty Clouds', volumeMl: 12, pgPercent: 100, recommendedPercent: 20, steepDays: 7, isCustom: false, profiles: ['tobacco', 'nuts'] },

  // Five Pawns (USA Premium)
  { id: 'fp-gambit', name: 'Gambit', brand: 'Five Pawns', volumeMl: 30, pgPercent: 50, recommendedPercent: 100, steepDays: 0, isCustom: false, profiles: ['bakery', 'cream', 'fruity'] },
  { id: 'fp-grandmaster', name: 'Grandmaster', brand: 'Five Pawns', volumeMl: 30, pgPercent: 50, recommendedPercent: 100, steepDays: 0, isCustom: false, profiles: ['nuts', 'cream', 'candy'] },
  { id: 'fp-bowdens-mate', name: 'Bowden\'s Mate', brand: 'Five Pawns', volumeMl: 30, pgPercent: 50, recommendedPercent: 100, steepDays: 0, isCustom: false, profiles: ['dessert', 'cream', 'menthol'] },
  { id: 'fp-castle-long', name: 'Castle Long', brand: 'Five Pawns', volumeMl: 30, pgPercent: 50, recommendedPercent: 100, steepDays: 0, isCustom: false, profiles: ['nuts', 'cream', 'candy'] },
  { id: 'fp-black-flag', name: 'Black Flag Risen', brand: 'Five Pawns', volumeMl: 30, pgPercent: 50, recommendedPercent: 100, steepDays: 0, isCustom: false, profiles: ['tobacco', 'cream'] },
  { id: 'fp-elo-tobacco', name: 'Elo Tobacco', brand: 'Five Pawns', volumeMl: 30, pgPercent: 50, recommendedPercent: 100, steepDays: 0, isCustom: false, profiles: ['tobacco'] },
  { id: 'fp-royal-tobacco', name: 'Royal Tobacco', brand: 'Five Pawns', volumeMl: 30, pgPercent: 50, recommendedPercent: 100, steepDays: 0, isCustom: false, profiles: ['tobacco', 'nuts'] },

  // Steam Train (Greece)
  { id: 'st-express', name: 'Express', brand: 'Steam Train', volumeMl: 24, pgPercent: 100, recommendedPercent: 20, steepDays: 7, isCustom: false, profiles: ['tobacco', 'cream'] },
  { id: 'st-destination', name: 'Destination', brand: 'Steam Train', volumeMl: 30, pgPercent: 100, recommendedPercent: 25, steepDays: 7, isCustom: false, profiles: ['tobacco', 'nuts'] },
  { id: 'st-gold-rush', name: 'Gold Rush', brand: 'Steam Train', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 7, isCustom: false, profiles: ['tobacco', 'candy'] },
  { id: 'st-derail', name: 'Derail', brand: 'Steam Train', volumeMl: 30, pgPercent: 100, recommendedPercent: 25, steepDays: 5, isCustom: false, profiles: ['fruity', 'menthol'] },
  { id: 'st-one-way-ticket', name: 'One Way Ticket', brand: 'Steam Train', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 10, isCustom: false, profiles: ['tobacco', 'cream', 'nuts'] },
  { id: 'st-choo-choo', name: 'Choo Choo', brand: 'Steam Train', volumeMl: 30, pgPercent: 100, recommendedPercent: 25, steepDays: 7, isCustom: false, profiles: ['dessert', 'cream'] },
  { id: 'st-timekeeper', name: 'Timekeeper', brand: 'Steam Train', volumeMl: 24, pgPercent: 100, recommendedPercent: 20, steepDays: 7, isCustom: false, profiles: ['tobacco', 'nuts', 'cream'] },
  { id: 'st-journey', name: 'Journey', brand: 'Steam Train', volumeMl: 30, pgPercent: 100, recommendedPercent: 25, steepDays: 7, isCustom: false, profiles: ['tobacco', 'cream'] },

  // Dinner Lady (UK)
  { id: 'dl-lemon-tart', name: 'Lemon Tart', brand: 'Dinner Lady', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 5, isCustom: false, profiles: ['dessert', 'bakery', 'fruity'] },
  { id: 'dl-watermelon-slices', name: 'Watermelon Slices', brand: 'Dinner Lady', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 3, isCustom: false, profiles: ['fruity', 'candy'] },
  { id: 'dl-strawberry-macaroon', name: 'Strawberry Macaroon', brand: 'Dinner Lady', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 7, isCustom: false, profiles: ['dessert', 'fruity', 'cream'] },
  { id: 'dl-blackberry-crumble', name: 'Blackberry Crumble', brand: 'Dinner Lady', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 7, isCustom: false, profiles: ['dessert', 'fruity', 'bakery'] },
  { id: 'dl-purple-rain', name: 'Purple Rain', brand: 'Dinner Lady', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 5, isCustom: false, profiles: ['fruity', 'candy'] },
  { id: 'dl-peach-ice', name: 'Peach Ice', brand: 'Dinner Lady', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 3, isCustom: false, profiles: ['fruity', 'menthol'] },
  { id: 'dl-tropic-thunder', name: 'Tropic Thunder', brand: 'Dinner Lady', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 3, isCustom: false, profiles: ['fruity'] },
  { id: 'dl-mango-ice', name: 'Mango Ice', brand: 'Dinner Lady', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 3, isCustom: false, profiles: ['fruity', 'menthol'] },
  { id: 'dl-vanilla-cream', name: 'Vanilla Cream', brand: 'Dinner Lady', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 7, isCustom: false, profiles: ['cream', 'dessert'] },
  { id: 'dl-tobacco-vanilla', name: 'Tobacco Vanilla', brand: 'Dinner Lady', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 10, isCustom: false, profiles: ['tobacco', 'cream'] },

  // Omerta (Greece)
  { id: 'om-gusto-tobacco-nuts', name: 'Gusto Tobacco Nuts', brand: 'Omerta', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 10, isCustom: false, profiles: ['tobacco', 'nuts'] },
  { id: 'om-vendetta-revenge', name: 'Vendetta Revenge', brand: 'Omerta', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 7, isCustom: false, profiles: ['fruity', 'candy'] },
  { id: 'om-spleen', name: 'Spleen', brand: 'Omerta', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 5, isCustom: false, profiles: ['fruity', 'menthol'] },
  { id: 'om-mojito', name: 'Mojito', brand: 'Omerta', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 3, isCustom: false, profiles: ['beverage', 'menthol', 'fruity'] },
  { id: 'om-apple-pie', name: 'Apple Pie', brand: 'Omerta', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 7, isCustom: false, profiles: ['dessert', 'bakery', 'fruity'] },
  { id: 'om-chocolate-donut', name: 'Chocolate Donut', brand: 'Omerta', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 7, isCustom: false, profiles: ['dessert', 'bakery'] },
  { id: 'om-bisha', name: 'Bisha Premium', brand: 'Omerta', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 7, isCustom: false, profiles: ['tobacco', 'cream'] },
  { id: 'om-carat', name: 'Carat Premium', brand: 'Omerta', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 7, isCustom: false, profiles: ['tobacco', 'nuts'] },

  // Bombo (Spain)
  { id: 'bombo-aldonza', name: 'Aldonza Reserva', brand: 'Bombo', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 14, isCustom: false, profiles: ['tobacco', 'cream', 'nuts'] },
  { id: 'bombo-dulcinea', name: 'Dulcinea', brand: 'Bombo', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 10, isCustom: false, profiles: ['dessert', 'cream'] },
  { id: 'bombo-holy-cream', name: 'Holy Cream', brand: 'Bombo', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 10, isCustom: false, profiles: ['cream', 'dessert'] },
  { id: 'bombo-sherpa', name: 'Sherpa', brand: 'Bombo', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 7, isCustom: false, profiles: ['tobacco', 'menthol'] },
  { id: 'bombo-trubio', name: 'Trubio', brand: 'Bombo', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 14, isCustom: false, profiles: ['tobacco', 'cream'] },
  { id: 'bombo-torquemada', name: 'Torquemada', brand: 'Bombo', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 14, isCustom: false, profiles: ['tobacco', 'nuts', 'cream'] },
  { id: 'bombo-vulcania', name: 'Vulcania', brand: 'Bombo', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 10, isCustom: false, profiles: ['tobacco', 'cream'] },
  { id: 'bombo-afrodita', name: 'Afrodita', brand: 'Bombo', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 5, isCustom: false, profiles: ['fruity', 'cream'] },
  { id: 'bombo-vorona', name: 'Vorona', brand: 'Bombo', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 10, isCustom: false, profiles: ['tobacco', 'nuts'] },
  { id: 'bombo-watermelon-mojito', name: 'Watermelon Mojito', brand: 'Bombo', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 3, isCustom: false, profiles: ['fruity', 'beverage', 'menthol'] },
  { id: 'bombo-pina-colada', name: 'Piña Colada', brand: 'Bombo', volumeMl: 20, pgPercent: 100, recommendedPercent: 33, steepDays: 5, isCustom: false, profiles: ['fruity', 'beverage', 'cream'] },
];

export const FLAVORSHOT_PRESETS = [
  { id: 'fs-20-60', name: 'Standard (20/60)', flavorMl: 20, totalMl: 60, flavorPercent: 33 },
  { id: 'fs-15-60', name: 'Economy (15/60)', flavorMl: 15, totalMl: 60, flavorPercent: 25 },
  { id: 'fs-30-60', name: 'Premium (30/60)', flavorMl: 30, totalMl: 60, flavorPercent: 50 },
  { id: 'fs-20-120', name: 'Large Economy (20/120)', flavorMl: 20, totalMl: 120, flavorPercent: 17 },
  { id: 'fs-30-120', name: 'Large Standard (30/120)', flavorMl: 30, totalMl: 120, flavorPercent: 25 },
  { id: 'fs-24-120', name: 'Steam Train (24/120)', flavorMl: 24, totalMl: 120, flavorPercent: 20 },
  { id: 'fs-12-60', name: 'Tasty Clouds (12/60)', flavorMl: 12, totalMl: 60, flavorPercent: 20 },
  { id: 'custom', name: 'Custom', flavorMl: null, totalMl: null, flavorPercent: null },
];

export const getFlavorById = (id) => FLAVORS.find(f => f.id === id);

export const getFlavorsByBrand = (brand) => FLAVORS.filter(f => f.brand === brand);

export const getAllFlavorBrands = () => [...new Set(FLAVORS.map(f => f.brand))];

export const getFlavorsByProfile = (profileId) => FLAVORS.filter(f => f.profiles?.includes(profileId));

export const getAllProfiles = () => Object.values(FLAVOR_PROFILES);

export const getProfileById = (id) => FLAVOR_PROFILES[id];
