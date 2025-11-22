export const BOOSTERS = [
  // Hexocell
  { id: 'hex-5050', name: 'nBase Balanced', brand: 'Hexocell', volumeMl: 10, nicotineMgMl: 20, pgPercent: 50, vgPercent: 50, type: 'freebase', isCustom: false },
  { id: 'hex-9010', name: 'nBase Cloud', brand: 'Hexocell', volumeMl: 10, nicotineMgMl: 20, pgPercent: 10, vgPercent: 90, type: 'freebase', isCustom: false },

  // Atmos Lab
  { id: 'atm-balanced', name: 'Balanced', brand: 'Atmos Lab', volumeMl: 10, nicotineMgMl: 20, pgPercent: 50, vgPercent: 50, type: 'freebase', isCustom: false },
  { id: 'atm-thunder', name: 'Thunder (100PG)', brand: 'Atmos Lab', volumeMl: 10, nicotineMgMl: 20, pgPercent: 100, vgPercent: 0, type: 'freebase', isCustom: false },
  { id: 'atm-mist', name: 'Mist (100VG)', brand: 'Atmos Lab', volumeMl: 10, nicotineMgMl: 20, pgPercent: 0, vgPercent: 100, type: 'freebase', isCustom: false },
  { id: 'atm-hybrid', name: 'Salt Hybrid', brand: 'Atmos Lab', volumeMl: 10, nicotineMgMl: 20, pgPercent: 50, vgPercent: 50, type: 'hybrid', isCustom: false },

  // Pink Mule
  { id: 'pm-green', name: 'Green Label', brand: 'Pink Mule', volumeMl: 10, nicotineMgMl: 20, pgPercent: 50, vgPercent: 50, type: 'freebase', isCustom: false },
  { id: 'pm-blue', name: 'Blue Label (100VG)', brand: 'Pink Mule', volumeMl: 10, nicotineMgMl: 20, pgPercent: 0, vgPercent: 100, type: 'freebase', isCustom: false },
  { id: 'pm-red', name: 'Red Label (100PG)', brand: 'Pink Mule', volumeMl: 10, nicotineMgMl: 20, pgPercent: 100, vgPercent: 0, type: 'freebase', isCustom: false },

  // Ripe Vapes
  { id: 'rv-5050', name: 'Nic Booster 50/50', brand: 'Ripe Vapes', volumeMl: 10, nicotineMgMl: 20, pgPercent: 50, vgPercent: 50, type: 'freebase', isCustom: false },
  { id: 'rv-vg', name: 'Nic Booster 100VG', brand: 'Ripe Vapes', volumeMl: 10, nicotineMgMl: 20, pgPercent: 0, vgPercent: 100, type: 'freebase', isCustom: false },

  // FlavourArt
  { id: 'fa-8020', name: 'Booster', brand: 'FlavourArt', volumeMl: 10, nicotineMgMl: 18, pgPercent: 80, vgPercent: 20, type: 'freebase', isCustom: false },

  // Innovation
  { id: 'inn-salt', name: 'Salt Booster', brand: 'Innovation', volumeMl: 10, nicotineMgMl: 20, pgPercent: 50, vgPercent: 50, type: 'salt', isCustom: false },
];

export const getBoosterById = (id) => BOOSTERS.find(b => b.id === id);

export const getBoostersByBrand = (brand) => BOOSTERS.filter(b => b.brand === brand);

export const getAllBrands = () => [...new Set(BOOSTERS.map(b => b.brand))];
