import type { PhysiqueItem, WheelTier } from './types';

const TIERS: Record<string, WheelTier> = {
  MORTAL:    { weight: 200, color: '#3a3a3a', label: 'Tier 6 — Mortal' },
  COMMON:    { weight: 50,  color: '#4d5c41', label: 'Tier 5 — Common Art' },
  RARE:      { weight: 15,  color: '#41525c', label: 'Tier 4 — Rare Physique' },
  EPIC:      { weight: 5,   color: '#5c415b', label: 'Tier 3 — Epic Bloodline' },
  LEGENDARY: { weight: 2,   color: '#7a6835', label: 'Tier 2 — Legendary Body' },
  MYTHIC:    { weight: 1,   color: '#731f1f', label: 'Tier 1 — Mythic Bloodline' },
};

export const PHYSIQUES: PhysiqueItem[] = [
  { id: 'ph_mortal', name: 'Mortal Body', desc: 'Standard human physiology. No passive modifiers.', tier: TIERS.MORTAL },

  { id: 'ph_ironbone',  name: 'Iron-Bone',       desc: 'Increases skeletal density; grants flat physical damage reduction.',     tier: TIERS.COMMON },
  { id: 'ph_copperskin',name: 'Copper-Skin',      desc: 'Hardens the epidermis; repels low-tier mortal weapons.',                 tier: TIERS.COMMON },
  { id: 'ph_spiritgather',name:'Spirit-Gathering', desc: 'Passively draws ambient Qi even while unconscious.',                    tier: TIERS.COMMON },

  { id: 'ph_vajra',    name: 'Vajra Indestructible', desc: 'Grants immunity to standard physical stagger and knockbacks.',            tier: TIERS.RARE },
  { id: 'ph_sword',    name: 'Primordial Sword',     desc: 'Converts a portion of biological mass into sword intent.',               tier: TIERS.RARE },
  { id: 'ph_5elem',    name: 'Five-Elements Harmony',desc: 'Automatically balances internal Qi, preventing Qi deviation.',           tier: TIERS.RARE },
  { id: 'ph_phantom',  name: 'Phantom Shadow',       desc: 'Eliminates physical mass during movement; phases through solid matter.', tier: TIERS.RARE },
  { id: 'ph_poison',   name: 'Myriad Poison',        desc: 'Converts ingested toxins into maximum health increases.',                tier: TIERS.RARE },

  { id: 'ph_dragon',   name: 'True Dragon',       desc: 'Grants draconic physical scaling, scales, and roar abilities.',              tier: TIERS.EPIC },
  { id: 'ph_phoenix',  name: 'Heavenly Phoenix',  desc: 'Grants conditional resurrection upon fatal damage.',                         tier: TIERS.EPIC },
  { id: 'ph_crow',     name: 'Golden Crow',       desc: 'Radiates extreme solar heat passively; grants flight capabilities.',         tier: TIERS.EPIC },
  { id: 'ph_tortoise', name: 'Black Tortoise',    desc: 'Maximizes defensive scaling and drastically increases lifespan.',            tier: TIERS.EPIC },
  { id: 'ph_qilin',    name: 'Qilin Bloodline',   desc: 'Emits an aura of auspicious luck and neutralizes local environmental hazards.',tier: TIERS.EPIC },
  { id: 'ph_kunpeng',  name: 'Kunpeng Bloodline', desc: 'Grants dual mastery of aquatic pressure and aerial velocity.',               tier: TIERS.EPIC },
  { id: 'ph_ape',      name: 'Ancient Ape',       desc: 'Multiplies physical damage output during enraged states.',                   tier: TIERS.EPIC },
  { id: 'ph_fox',      name: 'Nine-Tailed Fox',   desc: 'Innate mastery of charm and psychic manipulation.',                          tier: TIERS.EPIC },
  { id: 'ph_asura',    name: 'Asura Bloodline',   desc: 'Physical parameters increase inversely to current health.',                  tier: TIERS.EPIC },
  { id: 'ph_purgatory',name: 'Purgatory Demon',   desc: 'Ignites blood to multiply attack speed and physical damage.',                tier: TIERS.EPIC },

  { id: 'ph_daobody',  name: 'Innate Dao Body',     desc: 'Nullifies elemental resistance penalties; accelerates spell comprehension.',  tier: TIERS.LEGENDARY },
  { id: 'ph_9yin',     name: 'Nine-Yin Calamity',   desc: 'Accumulates lethal yin energy; causes fatal backlash if not vented.',        tier: TIERS.LEGENDARY },
  { id: 'ph_9yang',    name: 'Nine-Yang True',       desc: 'Accumulates extreme yang energy; requires external yin to prevent combustion.',tier: TIERS.LEGENDARY },
  { id: 'ph_hdemon',   name: 'Heavenly Demon',       desc: 'Thrives on negative karma; absorbs demonic Qi without corruption.',          tier: TIERS.LEGENDARY },
  { id: 'ph_supbone',  name: 'Supreme Bone',         desc: 'Contains a fused innate divine ability that scales with the user.',          tier: TIERS.LEGENDARY },
  { id: 'ph_heavypupil',name:'Heavy Pupil',          desc: 'Dual-pupil structure that slows perceived enemy movement speed.',            tier: TIERS.LEGENDARY },
  { id: 'ph_glacial',  name: 'Glacial Jade Bone',    desc: 'Renders the user immune to thermal tracking and emotional manipulation.',    tier: TIERS.LEGENDARY },

  { id: 'ph_desolate', name: 'Desolate Ancient',   desc: 'Multiplies base physical strength but requires exponential Qi to level.',    tier: TIERS.MYTHIC },
  { id: 'ph_starforged',name:'Star-Forged',         desc: 'Body density scales with exposure to starlight.',                            tier: TIERS.MYTHIC },
  { id: 'ph_chaosbell',name: 'Chaos Bell',          desc: 'Resonates to reflect a percentage of incoming physical damage.',             tier: TIERS.MYTHIC },
  { id: 'ph_samsara',  name: 'Samsara Eye',         desc: 'Visual perception extends into the spiritual and past planes.',              tier: TIERS.MYTHIC },
  { id: 'ph_deity',    name: 'Celestial Deity',     desc: 'Emits a suppression aura against lower-tier bloodlines.',                   tier: TIERS.MYTHIC },
  { id: 'ph_void',     name: 'Void Behemoth',       desc: 'Stomach acts as a spatial pocket; devours matter for energy.',              tier: TIERS.MYTHIC },
  { id: 'ph_stardevourer',name:'Star Devourer',     desc: 'Absorbs kinetic energy to fuel spatial jumps.',                             tier: TIERS.MYTHIC },
  { id: 'ph_kraken',   name: 'Deep Sea Kraken',     desc: 'Generates localized high-pressure liquid domains.',                         tier: TIERS.MYTHIC },
  { id: 'ph_immortalpx',name:'Immortal Phoenix',    desc: 'Grants absolute immunity to fire and self-immolation healing.',             tier: TIERS.MYTHIC },
  { id: 'ph_heavendev',name: 'Heaven-Devouring',    desc: 'Bypasses standard digestion; directly assimilates artifacts for permanent stats.', tier: TIERS.MYTHIC },
  { id: 'ph_sunmoon',  name: 'Sun-Moon Dual',       desc: 'Stats shift dynamically depending on the current time of day.',             tier: TIERS.MYTHIC },
  { id: 'ph_calamity', name: 'Calamity Fiend',      desc: 'Draws strength from nearby natural disasters and destruction.',             tier: TIERS.MYTHIC },
  { id: 'ph_emperor',  name: "Emperor's Sovereign", desc: 'Grants absolute command over lower-tier entities and tamed beasts.',        tier: TIERS.MYTHIC },
];
