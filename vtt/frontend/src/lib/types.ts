export type Rank = 'early' | 'mid' | 'late' | 'peak';
export type Realm = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type ProfessionName = 'alchemy' | 'weaponRefining' | 'arrayMaster' | 'talismanCrafting' | 'beastTaming';
export type TechniqueType = 'martial' | 'spiritual' | 'movement' | 'utility';
export type BindingType = 'blood' | 'soul' | 'life' | 'contract';
export type QiMode = 'cultivator' | 'charges';
export type StrainStage = 'clear' | 'strained' | 'overloaded' | 'critical' | 'death';
export type SEAwardType = 'minor' | 'major' | 'milestone' | 'custom';

export interface WheelTier {
  weight: number;
  color: string;
  label: string;
}

export interface WheelItem {
  id: string;
  name: string;
  desc: string;
  tier: WheelTier;
  hasSub?: boolean;
  subItems?: WheelItem[];
}

export interface SpiritRootItem extends WheelItem {
  grade: 1 | 2 | 3 | 4 | 5;
  expMultiplier: number;
  breakthroughDCMod: number;
}

export interface PhysiqueItem extends WheelItem {}

export interface Technique {
  id: string;
  name: string;
  realm: Realm;
  rank: Rank;
  type: TechniqueType;
  apCost: 1 | 2 | 3;
  qiCost: number;
  strainCost: number;
  damageFormula: string;
  effect: string;
  elementRequirement: string;
  isForbidden: boolean;
  notes: string;
}

export interface Ultimate {
  id: string;
  name: string;
  qiCost: number;
  strainCost: number;
  duration: string;
  cooldown: string;
  description: string;
}

export interface PassiveSkill {
  id: string;
  name: string;
  effect: string;
}

export interface MagicTreasure {
  id: string;
  name: string;
  realm: Realm;
  bindingType: BindingType;
  qiMode: QiMode;
  qiCost: number;
  chargesMax: number;
  strainCost: number;
  passiveBonus: string;
  activeEffect: string;
  rechargeCondition: string;
  notes: string;
}

export interface CharacterTreasure {
  treasure: MagicTreasure;
  bindingType: BindingType;
  slotIndex: number;
  chargesCurrent: number;
}

export interface CraftingRecipe {
  id: string;
  name: string;
  profession: ProfessionName;
  realm: Realm;
  dc: number;
  duCostBase: number;
  materials: string;
  outputItem: string;
  critFailConsequence: string;
  notes: string;
}

export interface Beast {
  id: string;
  name: string;
  realm: Realm;
  beastType: string;
  description: string;
  str: number;
  agi: number;
  con: number;
  spi: number;
  int: number;
  crm: number;
  wildAbilities: string;
  tamedAbilities: string;
  tamingDC: number;
  lootTable: string;
  mountStats: string;
  weaknesses: string;
  resistances: string;
}

export interface Character {
  id: string;
  campaignId: string;
  playerName: string;
  name: string;
  daoistTitle: string;
  sect: string;
  path: string;
  isNPC: boolean;
  npcType: 'enemy' | 'ally' | 'neutral' | null;

  realm: Realm;
  rank: Rank;
  se: number;
  attributePoints: number;

  str: number;
  agi: number;
  con: number;
  spi: number;
  int: number;
  crm: number;

  hpCurrent: number;
  qiCurrent: number;
  strainCurrent: number;

  spiritRoot: SpiritRootItem;
  physique: PhysiqueItem;
  subRoot: SpiritRootItem | null;

  cultivationTechniqueName: string;
  cultivationTechniqueEffect: string;

  techniques: Technique[];
  ultimates: Ultimate[];
  passiveSkills: PassiveSkill[];

  professions: Record<ProfessionName, number>;
  treasures: CharacterTreasure[];

  notes: string;
  inventory: string;
}

export interface Combatant {
  id: string;
  characterId: string | null;
  name: string;
  initiative: number;
  hpCurrent: number;
  hpMax: number;
  qiCurrent: number;
  qiMax: number;
  strainCurrent: number;
  strainMax: number;
  apRemaining: number;
  statusEffects: string[];
  isCurrentTurn: boolean;
}

export interface CombatEncounter {
  id: string;
  round: number;
  status: 'setup' | 'active' | 'ended';
  combatants: Combatant[];
  activeCombatantIndex: number;
}

export interface StoryNode {
  id: string;
  nodeType: 'character' | 'location' | 'event' | 'item' | 'npc' | 'faction' | 'arc';
  title: string;
  content: string;
  x: number;
  y: number;
  linkedEntityId: string | null;
  color: string;
}

export interface StoryEdge {
  id: string;
  sourceId: string;
  targetId: string;
  label: string;
}

export interface DowntimeAction {
  id: string;
  characterId: string;
  actionType: 'learn_technique' | 'switch_cultivation' | 'craft' | 'rest';
  duTotal: number;
  duRemaining: number;
  targetId: string | null;
  targetName: string;
  status: 'queued' | 'rolling' | 'complete' | 'failed';
  rollResult: number | null;
  dc: number;
}

export interface Campaign {
  id: string;
  sessionCode: string;
  name: string;
  gmToken: string;
  characters: Character[];
  techniques: Technique[];
  treasures: MagicTreasure[];
  recipes: CraftingRecipe[];
  beasts: Beast[];
  combat: CombatEncounter | null;
  storyNodes: StoryNode[];
  storyEdges: StoryEdge[];
  downtimeActions: DowntimeAction[];
  campaignNotes: string;
  downtimeWeek: number;
  createdAt: string;
}
