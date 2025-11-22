/**
 * Στρογγυλοποίηση σε συγκεκριμένα δεκαδικά ψηφία
 */
export const round = (value, decimals = 2) => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Forward Calculation: Έχω υλικά → Τι βγαίνει
 * @param {Object} params
 * @param {number} params.flavorMl - Ποσότητα αρώματος σε ml
 * @param {number} params.flavorPgPercent - Ποσοστό PG στο άρωμα (συνήθως 100)
 * @param {number} params.boosterCount - Αριθμός boosters
 * @param {number} params.boosterVolume - Όγκος κάθε booster σε ml
 * @param {number} params.boosterNicotine - Νικοτίνη booster σε mg/ml
 * @param {number} params.boosterPgPercent - Ποσοστό PG στο booster
 * @param {number} params.basePgMl - Καθαρή βάση PG σε ml
 * @param {number} params.baseVgMl - Καθαρή βάση VG σε ml
 */
export function calculateForward({
  flavorMl = 0,
  flavorPgPercent = 100,
  boosterCount = 0,
  boosterVolume = 10,
  boosterNicotine = 20,
  boosterPgPercent = 50,
  basePgMl = 0,
  baseVgMl = 0
}) {
  const boosterTotalMl = boosterCount * boosterVolume;
  const totalMl = flavorMl + boosterTotalMl + basePgMl + baseVgMl;

  if (totalMl === 0) {
    return {
      totalMl: 0,
      nicotineMgMl: 0,
      pgPercent: 0,
      vgPercent: 0,
      flavorPercent: 0,
      breakdown: {
        pgFromFlavor: 0,
        pgFromBooster: 0,
        pgFromBase: 0,
        vgFromBooster: 0,
        vgFromBase: 0
      }
    };
  }

  // PG από κάθε πηγή
  const pgFromFlavor = flavorMl * (flavorPgPercent / 100);
  const pgFromBooster = boosterTotalMl * (boosterPgPercent / 100);
  const pgFromBase = basePgMl;
  const totalPg = pgFromFlavor + pgFromBooster + pgFromBase;

  // VG από κάθε πηγή
  const vgFromBooster = boosterTotalMl * ((100 - boosterPgPercent) / 100);
  const vgFromBase = baseVgMl;
  const totalVg = vgFromBooster + vgFromBase;

  // Νικοτίνη
  const totalNicotine = boosterTotalMl * boosterNicotine;
  const nicotineMgMl = totalNicotine / totalMl;

  return {
    totalMl: round(totalMl, 1),
    nicotineMgMl: round(nicotineMgMl, 2),
    pgPercent: round((totalPg / totalMl) * 100, 1),
    vgPercent: round((totalVg / totalMl) * 100, 1),
    flavorPercent: round((flavorMl / totalMl) * 100, 1),
    breakdown: {
      pgFromFlavor: round(pgFromFlavor, 2),
      pgFromBooster: round(pgFromBooster, 2),
      pgFromBase: round(pgFromBase, 2),
      vgFromBooster: round(vgFromBooster, 2),
      vgFromBase: round(vgFromBase, 2)
    }
  };
}

/**
 * Backward Calculation: Θέλω αποτέλεσμα → Τι χρειάζομαι
 * @param {Object} params
 * @param {number} params.targetMl - Επιθυμητός τελικός όγκος
 * @param {number} params.targetNicotine - Επιθυμητή νικοτίνη mg/ml
 * @param {number} params.targetPgPercent - Επιθυμητό ποσοστό PG
 * @param {number} params.flavorMl - Διαθέσιμη ποσότητα αρώματος
 * @param {number} params.flavorPgPercent - Ποσοστό PG στο άρωμα
 * @param {number} params.boosterVolume - Όγκος κάθε booster
 * @param {number} params.boosterNicotine - Νικοτίνη booster
 * @param {number} params.boosterPgPercent - Ποσοστό PG στο booster
 * @param {boolean} params.roundBoosters - Στρογγυλοποίηση σε ακέραια boosters
 */
export function calculateBackward({
  targetMl = 60,
  targetNicotine = 6,
  targetPgPercent = 50,
  flavorMl = 20,
  flavorPgPercent = 100,
  boosterVolume = 10,
  boosterNicotine = 20,
  boosterPgPercent = 50,
  roundBoosters = true
}) {
  const warnings = [];
  const targetVgPercent = 100 - targetPgPercent;

  // Βήμα 1: Υπολογισμός boosters για νικοτίνη
  const totalNicotineNeeded = targetMl * targetNicotine;
  const nicotinePerBooster = boosterVolume * boosterNicotine;

  let boosterCount = nicotinePerBooster > 0
    ? totalNicotineNeeded / nicotinePerBooster
    : 0;

  if (roundBoosters && boosterCount > 0) {
    boosterCount = Math.round(boosterCount);
  }

  const boosterTotalMl = boosterCount * boosterVolume;

  // Βήμα 2: Υπολογισμός PG/VG
  const pgFromFlavor = flavorMl * (flavorPgPercent / 100);
  const pgFromBooster = boosterTotalMl * (boosterPgPercent / 100);
  const vgFromBooster = boosterTotalMl * ((100 - boosterPgPercent) / 100);

  const targetPgMl = targetMl * (targetPgPercent / 100);
  const targetVgMl = targetMl * (targetVgPercent / 100);

  let basePgNeeded = targetPgMl - pgFromFlavor - pgFromBooster;
  let baseVgNeeded = targetVgMl - vgFromBooster;

  // Έλεγχος αρνητικών τιμών (impossible scenario)
  if (basePgNeeded < 0) {
    warnings.push('Το PG από τα υπόλοιπα συστατικά υπερβαίνει τον στόχο');
    basePgNeeded = 0;
  }
  if (baseVgNeeded < 0) {
    warnings.push('Το VG από τα boosters υπερβαίνει τον στόχο');
    baseVgNeeded = 0;
  }

  // Βήμα 3: Υπολογισμός πραγματικού τελικού
  const actualTotalMl = flavorMl + boosterTotalMl + basePgNeeded + baseVgNeeded;
  const actualNicotine = actualTotalMl > 0
    ? (boosterTotalMl * boosterNicotine) / actualTotalMl
    : 0;
  const actualPgPercent = actualTotalMl > 0
    ? ((pgFromFlavor + pgFromBooster + basePgNeeded) / actualTotalMl) * 100
    : 0;
  const actualVgPercent = actualTotalMl > 0
    ? ((vgFromBooster + baseVgNeeded) / actualTotalMl) * 100
    : 0;

  // Έλεγχος αποκλίσεων
  const nicDiff = Math.abs(actualNicotine - targetNicotine);
  if (nicDiff > 0.5) {
    warnings.push(`Η νικοτίνη αποκλίνει κατά ${round(nicDiff, 2)} mg/ml`);
  }

  const pgDiff = Math.abs(actualPgPercent - targetPgPercent);
  if (pgDiff > 5) {
    warnings.push(`Το PG/VG αποκλίνει κατά ${round(pgDiff, 1)}%`);
  }

  return {
    boosterCount,
    boosterTotalMl: round(boosterTotalMl, 1),
    basePgMl: round(basePgNeeded, 1),
    baseVgMl: round(baseVgNeeded, 1),
    result: {
      totalMl: round(actualTotalMl, 1),
      nicotineMgMl: round(actualNicotine, 2),
      pgPercent: round(actualPgPercent, 1),
      vgPercent: round(actualVgPercent, 1),
      flavorPercent: round((flavorMl / actualTotalMl) * 100, 1)
    },
    warnings
  };
}

/**
 * Υπολογισμός για διάφορες επιλογές boosters
 */
export function calculateBoosterOptions({
  targetMl,
  targetNicotine,
  targetPgPercent,
  flavorMl,
  flavorPgPercent,
  boosterVolume,
  boosterNicotine,
  boosterPgPercent
}) {
  const exactBoosters = (targetMl * targetNicotine) / (boosterVolume * boosterNicotine);
  const options = [];

  for (let b = Math.max(0, Math.floor(exactBoosters) - 1);
       b <= Math.ceil(exactBoosters) + 1;
       b++) {
    const calc = calculateBackward({
      targetMl,
      targetNicotine,
      targetPgPercent,
      flavorMl,
      flavorPgPercent,
      boosterVolume,
      boosterNicotine,
      boosterPgPercent,
      roundBoosters: false
    });

    // Recalculate with specific booster count
    const boosterTotalMl = b * boosterVolume;
    const pgFromFlavor = flavorMl * (flavorPgPercent / 100);
    const pgFromBooster = boosterTotalMl * (boosterPgPercent / 100);
    const vgFromBooster = boosterTotalMl * ((100 - boosterPgPercent) / 100);

    const targetPgMl = targetMl * (targetPgPercent / 100);
    const targetVgMl = targetMl * ((100 - targetPgPercent) / 100);

    const basePgNeeded = Math.max(0, targetPgMl - pgFromFlavor - pgFromBooster);
    const baseVgNeeded = Math.max(0, targetVgMl - vgFromBooster);

    const actualTotalMl = flavorMl + boosterTotalMl + basePgNeeded + baseVgNeeded;
    const actualNicotine = actualTotalMl > 0
      ? (boosterTotalMl * boosterNicotine) / actualTotalMl
      : 0;

    options.push({
      boosterCount: b,
      nicotineMgMl: round(actualNicotine, 2),
      totalMl: round(actualTotalMl, 1),
      basePgMl: round(basePgNeeded, 1),
      baseVgMl: round(baseVgNeeded, 1),
      diffFromTarget: round(Math.abs(actualNicotine - targetNicotine), 2)
    });
  }

  return options.sort((a, b) => a.diffFromTarget - b.diffFromTarget);
}
