import type { SpiritRootItem, WheelTier } from './types';

const TIERS: Record<string, WheelTier> = {
  MORTAL:   { weight: 120, color: '#3a3a3a', label: 'Tier 7 — Mortal' },
  TRI:      { weight: 80,  color: '#454b4d', label: 'Tier 6 — Tri-Element' },
  DUAL:     { weight: 40,  color: '#4d5c41', label: 'Tier 5 — Dual' },
  PURE:     { weight: 15,  color: '#41525c', label: 'Tier 4 — Pure' },
  MUTATED:  { weight: 5,   color: '#5c415b', label: 'Tier 3 — Mutated' },
  HEAVENLY: { weight: 2,   color: '#7a6835', label: 'Tier 2 — Heavenly' },
  APEX:     { weight: 1,   color: '#731f1f', label: 'Tier 1 — Apex / Mythic' },
};

const quadCombos: SpiritRootItem[] = [
  { id: 'q1', name: 'Fire-Water-Wood-Metal', desc: 'Lacks Earth. Slightly unbalanced four-element root.', tier: TIERS.MORTAL, grade: 4, expMultiplier: 1.25, breakthroughDCMod: -3 },
  { id: 'q2', name: 'Fire-Water-Wood-Earth', desc: 'Lacks Metal. Slightly unbalanced four-element root.', tier: TIERS.MORTAL, grade: 4, expMultiplier: 1.25, breakthroughDCMod: -3 },
  { id: 'q3', name: 'Fire-Water-Metal-Earth', desc: 'Lacks Wood. Slightly unbalanced four-element root.', tier: TIERS.MORTAL, grade: 4, expMultiplier: 1.25, breakthroughDCMod: -3 },
  { id: 'q4', name: 'Fire-Wood-Metal-Earth', desc: 'Lacks Water. Slightly unbalanced four-element root.', tier: TIERS.MORTAL, grade: 4, expMultiplier: 1.25, breakthroughDCMod: -3 },
  { id: 'q5', name: 'Water-Wood-Metal-Earth', desc: 'Lacks Fire. Slightly unbalanced four-element root.', tier: TIERS.MORTAL, grade: 4, expMultiplier: 1.25, breakthroughDCMod: -3 },
];

const triCombos: SpiritRootItem[] = [
  { id: 'tr1', name: 'Fire-Water-Wood',   desc: 'Average absorption; minor elemental conflict.',            tier: TIERS.TRI, grade: 3, expMultiplier: 1.5, breakthroughDCMod: 0 },
  { id: 'tr2', name: 'Fire-Water-Metal',  desc: 'Average absorption; highly volatile.',                     tier: TIERS.TRI, grade: 3, expMultiplier: 1.5, breakthroughDCMod: 0 },
  { id: 'tr3', name: 'Fire-Water-Earth',  desc: 'Average absorption; thermal and fluid mix.',               tier: TIERS.TRI, grade: 3, expMultiplier: 1.5, breakthroughDCMod: 0 },
  { id: 'tr4', name: 'Fire-Wood-Metal',   desc: 'Average absorption; aggressive cultivation.',              tier: TIERS.TRI, grade: 3, expMultiplier: 1.5, breakthroughDCMod: 0 },
  { id: 'tr5', name: 'Fire-Wood-Earth',   desc: 'Average absorption; natural cycle promotes stable growth.',tier: TIERS.TRI, grade: 3, expMultiplier: 1.5, breakthroughDCMod: 0 },
  { id: 'tr6', name: 'Fire-Metal-Earth',  desc: 'Average absorption; structural and heat focus.',           tier: TIERS.TRI, grade: 3, expMultiplier: 1.5, breakthroughDCMod: 0 },
  { id: 'tr7', name: 'Water-Wood-Metal',  desc: 'Average absorption; smooth cyclic energy.',                tier: TIERS.TRI, grade: 3, expMultiplier: 1.5, breakthroughDCMod: 0 },
  { id: 'tr8', name: 'Water-Wood-Earth',  desc: 'Average absorption; high vitality focus.',                 tier: TIERS.TRI, grade: 3, expMultiplier: 1.5, breakthroughDCMod: 0 },
  { id: 'tr9', name: 'Water-Metal-Earth', desc: 'Average absorption; defensive cyclic energy.',             tier: TIERS.TRI, grade: 3, expMultiplier: 1.5, breakthroughDCMod: 0 },
  { id: 'tr10',name: 'Wood-Metal-Earth',  desc: 'Average absorption; physically grounding.',                tier: TIERS.TRI, grade: 3, expMultiplier: 1.5, breakthroughDCMod: 0 },
];

const dualCombos: SpiritRootItem[] = [
  { id: 'd1', name: 'Fire-Water Dual',  desc: 'Clashing elements; volatile Qi.',                          tier: TIERS.DUAL, grade: 2, expMultiplier: 1.75, breakthroughDCMod: 3 },
  { id: 'd2', name: 'Fire-Wood Dual',   desc: 'Wood fuels Fire; strong offensive Qi.',                    tier: TIERS.DUAL, grade: 2, expMultiplier: 1.75, breakthroughDCMod: 3 },
  { id: 'd3', name: 'Fire-Metal Dual',  desc: 'Fire refines Metal; good for forging.',                    tier: TIERS.DUAL, grade: 2, expMultiplier: 1.75, breakthroughDCMod: 3 },
  { id: 'd4', name: 'Fire-Earth Dual',  desc: 'High affinity for geothermal and magmatic Qi.',            tier: TIERS.DUAL, grade: 2, expMultiplier: 1.75, breakthroughDCMod: 3 },
  { id: 'd5', name: 'Water-Wood Dual',  desc: 'Water nourishes Wood; high healing.',                      tier: TIERS.DUAL, grade: 2, expMultiplier: 1.75, breakthroughDCMod: 3 },
  { id: 'd6', name: 'Water-Metal Dual', desc: 'High affinity for conductive and fluid Qi.',               tier: TIERS.DUAL, grade: 2, expMultiplier: 1.75, breakthroughDCMod: 3 },
  { id: 'd7', name: 'Water-Earth Dual', desc: 'Earth contains Water; stable but stagnant.',               tier: TIERS.DUAL, grade: 2, expMultiplier: 1.75, breakthroughDCMod: 3 },
  { id: 'd8', name: 'Wood-Metal Dual',  desc: 'Metal cuts Wood; internal conflict.',                      tier: TIERS.DUAL, grade: 2, expMultiplier: 1.75, breakthroughDCMod: 3 },
  { id: 'd9', name: 'Wood-Earth Dual',  desc: 'High affinity for terrestrial and plant-based Qi.',        tier: TIERS.DUAL, grade: 2, expMultiplier: 1.75, breakthroughDCMod: 3 },
  { id: 'd10',name: 'Metal-Earth Dual', desc: 'Earth produces Metal; supreme defense.',                   tier: TIERS.DUAL, grade: 2, expMultiplier: 1.75, breakthroughDCMod: 3 },
];

export const SPIRIT_ROOTS: SpiritRootItem[] = [
  { id: 'sr_mortal5', name: 'Mortal Five-Element',  desc: 'Balanced but extremely slow absorption of all five primary elements.', tier: TIERS.MORTAL, grade: 5, expMultiplier: 1.0,  breakthroughDCMod: -6 },
  { id: 'sr_mortal4', name: 'Mortal Four-Element',  desc: 'Contains 4 elements. Rolling combination...', tier: TIERS.MORTAL, grade: 4, expMultiplier: 1.25, breakthroughDCMod: -3, hasSub: true, subItems: quadCombos },

  { id: 'sr_tri',     name: 'Tri-Element Root',     desc: 'Contains 3 elements. Rolling combination...', tier: TIERS.TRI,    grade: 3, expMultiplier: 1.5,  breakthroughDCMod:  0, hasSub: true, subItems: triCombos },
  { id: 'sr_dual',    name: 'Dual Root',             desc: 'Contains 2 elements. Rolling combination...', tier: TIERS.DUAL,   grade: 2, expMultiplier: 1.75, breakthroughDCMod:  3, hasSub: true, subItems: dualCombos },

  { id: 'sr_pfire',   name: 'Pure Fire',   desc: 'Exceptional absorption of ambient heat and yang-aligned Qi.',         tier: TIERS.PURE, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_pwater',  name: 'Pure Water',  desc: 'Exceptional absorption of fluid and yin-aligned Qi.',                 tier: TIERS.PURE, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_pwood',   name: 'Pure Wood',   desc: 'Exceptional absorption of life and natural Qi.',                      tier: TIERS.PURE, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_pmetal',  name: 'Pure Metal',  desc: 'Exceptional absorption of mineral and structural Qi.',                tier: TIERS.PURE, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_pearth',  name: 'Pure Earth',  desc: 'Exceptional absorption of gravitational and tectonic Qi.',            tier: TIERS.PURE, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },

  { id: 'sr_mice',    name: 'Mutated Ice',       desc: 'Derived from Water; grants freezing and thermal reduction properties.',   tier: TIERS.MUTATED, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_mlightning',name:'Mutated Lightning', desc: 'Derived from Fire/Metal; grants high-speed plasma manipulation.',        tier: TIERS.MUTATED, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_mwind',   name: 'Mutated Wind',      desc: 'Derived from Wood/Water; grants atmospheric and pressure manipulation.',  tier: TIERS.MUTATED, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_mblood',  name: 'Mutated Blood',     desc: 'Grants manipulation of biological fluids and life-force theft.',          tier: TIERS.MUTATED, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_mpoison', name: 'Mutated Poison',    desc: 'Grants the ability to synthesize and resist lethal toxins.',              tier: TIERS.MUTATED, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_myin',    name: 'Mutated Yin',       desc: 'Absolute affinity for negative, spectral, and lunar energies.',           tier: TIERS.MUTATED, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_myang',   name: 'Mutated Yang',      desc: 'Absolute affinity for positive, solar, and vitality energies.',           tier: TIERS.MUTATED, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },

  { id: 'sr_hfire',   name: 'Heavenly Fire',  desc: 'Apex fire affinity; immune to standard thermal damage.',           tier: TIERS.HEAVENLY, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_hwater',  name: 'Heavenly Water', desc: 'Apex water affinity; command over all aquatic forces.',            tier: TIERS.HEAVENLY, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_hwood',   name: 'Heavenly Wood',  desc: 'Apex wood affinity; instant cellular regeneration capabilities.',  tier: TIERS.HEAVENLY, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_hmetal',  name: 'Heavenly Metal', desc: 'Apex metal affinity; unbreakable weapon synthesis.',               tier: TIERS.HEAVENLY, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_hearth',  name: 'Heavenly Earth', desc: 'Apex earth affinity; manipulation of planetary gravity.',          tier: TIERS.HEAVENLY, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },

  { id: 'sr_a1',  name: 'Nine-Heavens Lightning',desc: 'Attracts and absorbs heavenly tribulation strikes.',                        tier: TIERS.APEX, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_a2',  name: 'Netherworld Ice',       desc: 'Freezes spiritual energy and physical matter equally.',                     tier: TIERS.APEX, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_a3',  name: 'Nine-Yin Water',        desc: 'Corrosive fluid affinity that damages souls directly.',                     tier: TIERS.APEX, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_a4',  name: 'Nine-Yang Fire',        desc: 'Searing energy that incinerates ethereal and demonic entities.',            tier: TIERS.APEX, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_a5',  name: 'Abyssal Darkness',      desc: 'Absorbs light, sight, and spiritual sense.',                               tier: TIERS.APEX, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_a6',  name: 'Holy Light',            desc: 'Projects purifying radiance that neutralizes corruption.',                  tier: TIERS.APEX, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_a7',  name: 'Star-fall Root',        desc: 'Draws Qi directly from astral bodies rather than the earth.',              tier: TIERS.APEX, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_a8',  name: 'Void-Space',            desc: 'Innate comprehension of spatial rifts and teleportation.',                 tier: TIERS.APEX, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_a9',  name: 'Temporal-Time',         desc: 'Innate comprehension of chronomancy and localized time dilation.',         tier: TIERS.APEX, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_a10', name: 'Chaos Creation',        desc: 'Ability to synthesize physical matter from raw Spiritual Qi.',             tier: TIERS.APEX, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_a11', name: 'Primordial Destruction',desc: 'Ability to reduce physical matter into raw, volatile energy.',             tier: TIERS.APEX, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_a12', name: 'Karmic Thread',         desc: 'Grants perception of cause-and-effect linkages between entities.',         tier: TIERS.APEX, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_a13', name: 'Reincarnation',         desc: 'Retains partial skill mastery from past lives upon death.',                tier: TIERS.APEX, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_a14', name: 'Myriad Illusion',       desc: 'Projects sensory alterations indistinguishable from reality.',            tier: TIERS.APEX, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_a15', name: 'Slaughter Dao',         desc: 'Converts killing intent and fatalities into permanent cultivation experience.', tier: TIERS.APEX, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
  { id: 'sr_a16', name: 'Primal Chaos Soul Root',desc: 'Merges all elemental affinities into unfiltered base reality energy.',    tier: TIERS.APEX, grade: 1, expMultiplier: 2.0, breakthroughDCMod: 6 },
];

export const GRADE_LABELS: Record<number, string> = {
  1: 'Pure (Heavenly)',
  2: 'Dual',
  3: 'True (3-Element)',
  4: 'Spurious',
  5: 'Mortal (5-Element)',
};
