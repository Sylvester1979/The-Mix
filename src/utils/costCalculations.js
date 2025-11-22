/**
 * Cost calculation utilities for e-liquid mixing
 */

import { round } from './calculations';

/**
 * Calculate the cost per ml of a booster
 * @param {number} price - Price of the booster
 * @param {number} volumeMl - Volume in ml
 * @returns {number} - Cost per ml
 */
export const calculateBoosterCostPerMl = (price, volumeMl) => {
  if (!price || !volumeMl) return 0;
  return round(price / volumeMl, 3);
};

/**
 * Calculate the cost per ml of a flavor
 * @param {number} price - Price of the flavor bottle
 * @param {number} volumeMl - Volume in ml
 * @returns {number} - Cost per ml
 */
export const calculateFlavorCostPerMl = (price, volumeMl) => {
  if (!price || !volumeMl) return 0;
  return round(price / volumeMl, 3);
};

/**
 * Calculate total cost of a mix
 * @param {Object} params
 * @param {number} params.flavorMl - Flavor amount used in ml
 * @param {number} params.flavorPrice - Flavor bottle price
 * @param {number} params.flavorBottleVolume - Flavor bottle volume in ml
 * @param {number} params.boosterCount - Number of boosters used
 * @param {number} params.boosterPrice - Price per booster
 * @param {number} params.basePgMl - PG base amount in ml
 * @param {number} params.baseVgMl - VG base amount in ml
 * @param {number} params.basePgPricePerLiter - PG base price per liter
 * @param {number} params.baseVgPricePerLiter - VG base price per liter
 * @returns {Object} - Cost breakdown
 */
export function calculateMixCost({
  flavorMl = 0,
  flavorPrice = 0,
  flavorBottleVolume = 0,
  boosterCount = 0,
  boosterPrice = 0,
  basePgMl = 0,
  baseVgMl = 0,
  basePgPricePerLiter = 0,
  baseVgPricePerLiter = 0
}) {
  // Flavor cost
  const flavorCostPerMl = flavorBottleVolume > 0 ? flavorPrice / flavorBottleVolume : 0;
  const flavorCost = flavorMl * flavorCostPerMl;

  // Booster cost (whole units)
  const boosterCost = boosterCount * boosterPrice;

  // Base costs (convert liter price to ml)
  const pgCostPerMl = basePgPricePerLiter / 1000;
  const vgCostPerMl = baseVgPricePerLiter / 1000;
  const basePgCost = basePgMl * pgCostPerMl;
  const baseVgCost = baseVgMl * vgCostPerMl;

  const totalCost = flavorCost + boosterCost + basePgCost + baseVgCost;
  const totalMl = flavorMl + (boosterCount * 10) + basePgMl + baseVgMl;
  const costPerMl = totalMl > 0 ? totalCost / totalMl : 0;

  return {
    flavorCost: round(flavorCost, 2),
    boosterCost: round(boosterCost, 2),
    basePgCost: round(basePgCost, 2),
    baseVgCost: round(baseVgCost, 2),
    totalCost: round(totalCost, 2),
    costPerMl: round(costPerMl, 3),
    // Per 10ml for easy comparison
    costPer10ml: round(costPerMl * 10, 2)
  };
}

/**
 * Format price for display
 * @param {number} price - Price value
 * @param {string} currency - Currency symbol (default: euro)
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price, currency = '\u20AC') => {
  if (price === null || price === undefined || isNaN(price)) return '-';
  return `${round(price, 2).toFixed(2)}${currency}`;
};

/**
 * Format cost per ml for display
 * @param {number} costPerMl - Cost per ml value
 * @returns {string} - Formatted string
 */
export const formatCostPerMl = (costPerMl) => {
  if (!costPerMl || costPerMl === 0) return '-';
  return `${round(costPerMl, 3).toFixed(3)}\u20AC/ml`;
};
