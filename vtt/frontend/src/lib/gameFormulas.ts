import type { Realm, Rank, StrainStage, SEAwardType } from './types';

export const REALM_NAMES: Record<Realm, string> = {
  1: 'Body Tempering',
  2: 'Qi Condensation',
  3: 'Foundation Establishment',
  4: 'Core Formation',
  5: 'Nascent Soul',
  6: 'Soul Transformation',
  7: 'Void Tribulation',
  8: 'Immortal Ascension',
};

export const RANK_LABELS: Record<Rank, string> = {
  early: 'Early',
  mid: 'Mid',
  late: 'Late',
  peak: 'Peak',
};

const RANK_OFFSETS: Record<Rank, number> = {
  early: 0.0,
  mid: 0.25,
  late: 0.5,
  peak: 0.75,
};

export const RANK_ORDER: Rank[] = ['early', 'mid', 'late', 'peak'];

export function getStage(realm: Realm, rank: Rank): number {
  return realm + RANK_OFFSETS[rank];
}

export function getAttrMod(score: number): number {
  return Math.floor(score / 3);
}

export function getMaxHP(con: number, realm: Realm, rank: Rank): number {
  return Math.floor(con * getStage(realm, rank) + 10);
}

export function getMaxQI(spi: number, realm: Realm, rank: Rank): number {
  return Math.floor(spi * getStage(realm, rank) + 10);
}

export function getMaxStrain(realm: Realm): number {
  if (realm === 8) return 20;
  return 11 + realm;
}

export function getStrainStage(strain: number, maxStrain: number): StrainStage {
  if (strain >= maxStrain) return 'death';
  const pct = strain / maxStrain;
  if (pct > 0.75) return 'critical';
  if (pct > 0.5) return 'overloaded';
  if (pct > 0.25) return 'strained';
  return 'clear';
}

export const STRAIN_PENALTIES: Record<StrainStage, { rollPenalty: number; hpQiReductionPct: number }> = {
  clear:     { rollPenalty: 0,  hpQiReductionPct: 0  },
  strained:  { rollPenalty: -1, hpQiReductionPct: 25 },
  overloaded:{ rollPenalty: -3, hpQiReductionPct: 50 },
  critical:  { rollPenalty: -5, hpQiReductionPct: 75 },
  death:     { rollPenalty: 0,  hpQiReductionPct: 100 },
};

export function getEffectiveMaxHP(con: number, realm: Realm, rank: Rank, strain: number): number {
  const base = getMaxHP(con, realm, rank);
  const stage = getStrainStage(strain, getMaxStrain(realm));
  const { hpQiReductionPct } = STRAIN_PENALTIES[stage];
  return Math.floor(base * (1 - hpQiReductionPct / 100));
}

export function getEffectiveMaxQI(spi: number, realm: Realm, rank: Rank, strain: number): number {
  const base = getMaxQI(spi, realm, rank);
  const stage = getStrainStage(strain, getMaxStrain(realm));
  const { hpQiReductionPct } = STRAIN_PENALTIES[stage];
  return Math.floor(base * (1 - hpQiReductionPct / 100));
}

export function getPhysicalDR(con: number): number {
  return getAttrMod(con);
}

export function getSpiritualDR(spi: number): number {
  return getAttrMod(spi);
}

export function getAttunementSlots(realm: Realm): number {
  if (realm <= 2) return 1;
  if (realm <= 4) return 2;
  if (realm <= 6) return 3;
  if (realm === 7) return 4;
  return 5;
}

export const SE_THRESHOLDS: Record<Realm, { earlyToMid: number; midToLate: number; lateToPeak: number }> = {
  1: { earlyToMid: 400,    midToLate: 900,    lateToPeak: 1_500 },
  2: { earlyToMid: 1_000,  midToLate: 2_200,  lateToPeak: 4_000 },
  3: { earlyToMid: 2_500,  midToLate: 5_500,  lateToPeak: 10_000 },
  4: { earlyToMid: 6_000,  midToLate: 13_000, lateToPeak: 25_000 },
  5: { earlyToMid: 15_000, midToLate: 33_000, lateToPeak: 60_000 },
  6: { earlyToMid: 37_000, midToLate: 82_000, lateToPeak: 150_000 },
  7: { earlyToMid: 90_000, midToLate: 200_000,lateToPeak: 375_000 },
  8: { earlyToMid: 220_000,midToLate: 490_000,lateToPeak: 900_000 },
};

export const SE_AWARDS: Record<Realm, Record<SEAwardType, number>> = {
  1: { minor: 25,     major: 65,     milestone: 100,    custom: 0 },
  2: { minor: 65,     major: 160,    milestone: 250,    custom: 0 },
  3: { minor: 160,    major: 400,    milestone: 625,    custom: 0 },
  4: { minor: 400,    major: 1_000,  milestone: 1_550,  custom: 0 },
  5: { minor: 1_000,  major: 2_500,  milestone: 3_800,  custom: 0 },
  6: { minor: 2_500,  major: 6_200,  milestone: 9_500,  custom: 0 },
  7: { minor: 6_200,  major: 15_500, milestone: 23_500, custom: 0 },
  8: { minor: 15_500, major: 39_000, milestone: 58_000, custom: 0 },
};

export function getSEThresholdForRank(realm: Realm, rank: Rank): number | null {
  if (rank === 'peak') return null;
  const t = SE_THRESHOLDS[realm];
  if (rank === 'early') return t.earlyToMid;
  if (rank === 'mid')   return t.midToLate;
  return t.lateToPeak;
}

export function getNextRank(rank: Rank): Rank | null {
  const idx = RANK_ORDER.indexOf(rank);
  return idx < 3 ? RANK_ORDER[idx + 1] : null;
}

export function getQiOverdraftStrain(qiCost: number): number {
  if (qiCost <= 8)  return 1;
  if (qiCost <= 20) return 2;
  if (qiCost <= 40) return 3;
  if (qiCost <= 65) return 4;
  return 5;
}

export function getTribulationFailStrain(realm: Realm): number {
  if (realm <= 2) return 3;
  if (realm <= 6) return 4;
  return 5;
}

export function getGrievoInjuryStrainFloor(realm: Realm): number {
  if (realm <= 2) return 3;
  if (realm <= 6) return 4;
  return 5;
}

export function getBreakthroughBaseDC(): number {
  return 15;
}

export function getSpiritRootBreakthroughMod(grade: 1 | 2 | 3 | 4 | 5): number {
  const mods: Record<number, number> = { 1: 6, 2: 3, 3: 0, 4: -3, 5: -6 };
  return mods[grade];
}

export function getComprehensionDC(techniqueRealm: Realm): number {
  const dcs: Record<Realm, number> = { 1: 12, 2: 15, 3: 17, 4: 19, 5: 21, 6: 23, 7: 25, 8: 27 };
  return dcs[techniqueRealm];
}

export function getComprehensionDU(techniqueRealm: Realm): number {
  const dus: Record<Realm, number> = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 6, 6: 8, 7: 10, 8: 13 };
  return dus[techniqueRealm];
}

export function getTechniqueSwitchDC(realm: Realm): number {
  return 12 + realm;
}

export const REALM_SKILLS: Record<Realm, { name: string; type: 'Passive' | 'Active'; shortDesc: string; fullDesc: string }> = {
  1: {
    name: 'Tempered Body',
    type: 'Passive',
    shortDesc: '+1 Physical DR. Immune to non-magical environmental hazards.',
    fullDesc: '+1 Physical DR (stacks with all sources). Immune to non-magical environmental hazards — extreme temperatures, rough terrain, altitude impose no penalties. 1 hour of stillness = full rest for non-cultivation purposes.',
  },
  2: {
    name: 'Qi Sense',
    type: 'Passive',
    shortDesc: 'Detect Qi and identify realm of equal/lower cultivators within 30ft.',
    fullDesc: 'Identify realm of any cultivator within 30ft if they are equal or lower realm. Passively detect Qi in objects, locations, and beings within 30ft. Know whether a meditation site carries a favorable Spirit Root environment multiplier.',
  },
  3: {
    name: 'Unshakeable Foundation',
    type: 'Passive',
    shortDesc: 'Tribulation Strain −1. Extended Meditation clears 2 Strain stages.',
    fullDesc: 'Strain from Tribulation failure is reduced by 1 (minimum 1). Extended Meditation clears 2 Strain stages instead of 1.',
  },
  4: {
    name: 'Golden Core Surge',
    type: 'Active',
    shortDesc: 'Free action, 1/session: halve technique Qi cost + 50% damage. Once/downtime: −1 DU on any craft.',
    fullDesc: 'Free action (no AP), 1/session. Before declaring a technique: halve its Qi cost (round down) and +50% damage (round down). Cannot apply to Ultimates. Once per downtime period: −1 DU on any crafting attempt (min 1).',
  },
  5: {
    name: 'Soul Projection',
    type: 'Active',
    shortDesc: '2 AP, 20 Qi, 1/combat: project Nascent Soul as a spiritual avatar for 3 turns.',
    fullDesc: '2 AP, 20 Qi, 1/combat. Project Nascent Soul for 3 turns — moves and uses Spiritual techniques at full stats, immune to Physical attacks, cannot deal physical damage. Physical body is stationary (Physical DR drops to 0). Projection collapses if body takes any damage. Outside combat: sustain for 1 hour at 3 Qi/10min. Scout, pass through non-sealed barriers, observe undetected. 300ft communication range.',
  },
  6: {
    name: 'Unbreakable Will',
    type: 'Passive',
    shortDesc: 'Immune to mental effects. Non-Tribulation Strain −1 per trigger.',
    fullDesc: 'Immune to all mental status effects (fear, charm, confusion, soul attacks). Strain gained from any non-Tribulation source is reduced by 1 (minimum 1 per trigger).',
  },
  7: {
    name: 'Void Step',
    type: 'Active',
    shortDesc: '1 AP, 25 Qi, 1/combat: teleport to any visible location within 60 tiles.',
    fullDesc: '1 AP, 25 Qi, 1/combat. Instant teleport to any visible location within 60 tiles. Cannot be interrupted, bypasses terrain. Outside combat: no tile range limit. Once/day: Void Walk — 5 min meditation + 30 Qi to teleport to any previously visited location within 10 miles.',
  },
  8: {
    name: "Heaven's Authority",
    type: 'Active',
    shortDesc: "3 AP, 50 Qi, 1/session: Suppress lower-realm enemies in 15-tile radius. Passive: no overdraft Strain on non-forbidden techniques.",
    fullDesc: '3 AP, 50 Qi, 1/session. All lower-realm enemies in 15-tile radius: SPI vs DC (12 + your SPI mod) or Suppressed 3 turns (−5 all rolls, no techniques above Realm 6). On save: −2 all rolls for 1 turn. Passive: no Strain from Qi overdraft when casting non-forbidden techniques. Social rolls vs lower-realm: +3. Once/session: binding spiritual edict (compels compliance from Realm 1–3 on failed SPI vs DC 18).',
  },
};

export function rollD20(): number {
  return Math.floor(Math.random() * 20) + 1;
}

export function formatSE(se: number): string {
  if (se >= 1_000_000) return `${(se / 1_000_000).toFixed(1)}M`;
  if (se >= 1_000) return `${(se / 1_000).toFixed(1)}K`;
  return se.toString();
}

const PROFESSION_THRESHOLDS = [10, 100, 200, 500] as const;

export function getProfessionRank(craftCount: number): number {
  for (let i = PROFESSION_THRESHOLDS.length - 1; i >= 0; i--) {
    if (craftCount >= PROFESSION_THRESHOLDS[i]) return i + 1;
  }
  return 0;
}

export function getMaxProfessionRank(realm: number): number {
  return Math.ceil(realm / 2);
}

export function getProfessionNextThreshold(craftCount: number): number | null {
  const rank = getProfessionRank(craftCount);
  return rank < PROFESSION_THRESHOLDS.length ? PROFESSION_THRESHOLDS[rank] : null;
}
