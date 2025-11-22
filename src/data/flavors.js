export const FLAVORS = [
  // Halo
  { id: 'halo-tribeca', name: 'Tribeca', brand: 'Halo', volumeMl: 10, pgPercent: 100, recommendedPercent: 25, steepDays: 7, isCustom: false },
  { id: 'halo-turkish', name: 'Turkish Tobacco', brand: 'Halo', volumeMl: 10, pgPercent: 100, recommendedPercent: 25, steepDays: 7, isCustom: false },
  { id: 'halo-torque', name: 'Torque 56', brand: 'Halo', volumeMl: 10, pgPercent: 100, recommendedPercent: 25, steepDays: 7, isCustom: false },
  { id: 'halo-freedom', name: 'Freedom Juice', brand: 'Halo', volumeMl: 10, pgPercent: 100, recommendedPercent: 25, steepDays: 7, isCustom: false },
  { id: 'halo-subzero', name: 'SubZero', brand: 'Halo', volumeMl: 10, pgPercent: 100, recommendedPercent: 25, steepDays: 3, isCustom: false },

  // Philotimo (Flavor Shots format)
  { id: 'phil-virginia', name: 'Καπνός Virginia', brand: 'Philotimo', volumeMl: 30, pgPercent: 100, recommendedPercent: 33, steepDays: 14, isCustom: false },
  { id: 'phil-tribeka', name: 'Τριμπέκα', brand: 'Philotimo', volumeMl: 30, pgPercent: 100, recommendedPercent: 33, steepDays: 10, isCustom: false },
  { id: 'phil-ry4', name: 'RY4', brand: 'Philotimo', volumeMl: 30, pgPercent: 100, recommendedPercent: 33, steepDays: 14, isCustom: false },

  // Natura
  { id: 'nat-mystique', name: 'Mystique', brand: 'Natura', volumeMl: 30, pgPercent: 100, recommendedPercent: 33, steepDays: 7, isCustom: false },

  // Vampire Vape
  { id: 'vv-heisenberg', name: 'Heisenberg', brand: 'Vampire Vape', volumeMl: 10, pgPercent: 100, recommendedPercent: 20, steepDays: 5, isCustom: false },
  { id: 'vv-pinkman', name: 'Pinkman', brand: 'Vampire Vape', volumeMl: 10, pgPercent: 100, recommendedPercent: 20, steepDays: 5, isCustom: false },

  // Capella
  { id: 'cap-vanilla', name: 'Vanilla Custard', brand: 'Capella', volumeMl: 10, pgPercent: 100, recommendedPercent: 8, steepDays: 14, isCustom: false },
  { id: 'cap-strawberry', name: 'Sweet Strawberry', brand: 'Capella', volumeMl: 10, pgPercent: 100, recommendedPercent: 6, steepDays: 3, isCustom: false },
];

export const FLAVORSHOT_PRESETS = [
  { id: 'fs-20-60', name: 'Standard (20/60)', flavorMl: 20, totalMl: 60, flavorPercent: 33 },
  { id: 'fs-15-60', name: 'Economy (15/60)', flavorMl: 15, totalMl: 60, flavorPercent: 25 },
  { id: 'fs-30-60', name: 'Premium (30/60)', flavorMl: 30, totalMl: 60, flavorPercent: 50 },
  { id: 'fs-20-120', name: 'Large Economy (20/120)', flavorMl: 20, totalMl: 120, flavorPercent: 17 },
  { id: 'fs-30-120', name: 'Large Standard (30/120)', flavorMl: 30, totalMl: 120, flavorPercent: 25 },
  { id: 'custom', name: 'Custom', flavorMl: null, totalMl: null, flavorPercent: null },
];

export const getFlavorById = (id) => FLAVORS.find(f => f.id === id);

export const getFlavorsByBrand = (brand) => FLAVORS.filter(f => f.brand === brand);

export const getAllFlavorBrands = () => [...new Set(FLAVORS.map(f => f.brand))];
