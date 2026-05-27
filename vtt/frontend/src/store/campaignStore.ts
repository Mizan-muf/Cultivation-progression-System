import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Campaign, Character, Technique, MagicTreasure, CraftingRecipe,
  Beast, CombatEncounter, Combatant, StoryNode, StoryEdge,
  DowntimeAction, Realm, Rank, SEAwardType, SpiritRootItem, PhysiqueItem, ProfessionName,
} from '../lib/types';
import {
  getMaxHP, getMaxQI, getMaxStrain, getEffectiveMaxHP, getEffectiveMaxQI,
  getSEThresholdForRank, getNextRank, getQiOverdraftStrain,
  getTribulationFailStrain, getGrievoInjuryStrainFloor, getStrainStage,
  SE_AWARDS, rollD20, REALM_SKILLS,
} from '../lib/gameFormulas';

function genId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function genCode(): string {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export interface CharacterDraft {
  playerName: string;
  name: string;
  daoistTitle: string;
  sect: string;
  path: string;
  spiritRoot: SpiritRootItem;
  subRoot: SpiritRootItem | null;
  physique: PhysiqueItem;
  str: number;
  agi: number;
  con: number;
  spi: number;
  int: number;
  crm: number;
}

interface CampaignState {
  campaigns: Campaign[];
  activeCampaignId: string | null;
  activeCharacterId: string | null;
  gmToken: string | null;

  getCampaign: (id: string) => Campaign | undefined;
  getActiveCampaign: () => Campaign | undefined;
  getCharacter: (campaignId: string, charId: string) => Character | undefined;

  createCampaign: (name: string) => Campaign;
  joinCampaign: (code: string) => Campaign | null;
  setGMToken: (token: string) => void;
  isGM: (campaign: Campaign) => boolean;

  createCharacter: (campaignId: string, draft: CharacterDraft) => Character;
  updateCharacter: (campaignId: string, charId: string, updates: Partial<Character>) => void;
  deleteCharacter: (campaignId: string, charId: string) => void;
  setActiveCharacter: (charId: string | null) => void;

  setHP: (campaignId: string, charId: string, value: number) => void;
  setQI: (campaignId: string, charId: string, value: number) => void;
  setStrain: (campaignId: string, charId: string, value: number) => void;
  useTechnique: (campaignId: string, charId: string, qiCost: number, strainCost: number) => string | null;

  awardSE: (campaignId: string, charIds: string[], type: SEAwardType, customAmount?: number) => void;
  spendAttributePoint: (campaignId: string, charId: string, attr: keyof Pick<Character,'str'|'agi'|'con'|'spi'|'int'|'crm'>) => void;

  attemptTribulation: (campaignId: string, charId: string) => { roll: number; dc: number; success: boolean; strainChange: number };

  addTechnique: (campaignId: string, technique: Omit<Technique, 'id'>) => Technique;
  learnTechnique: (campaignId: string, charId: string, techniqueId: string) => void;
  removeTechniqueFromChar: (campaignId: string, charId: string, techniqueId: string) => void;

  incrementProfessionCraft: (campaignId: string, charId: string, profession: ProfessionName, count?: number) => void;

  addTreasureToLibrary: (campaignId: string, treasure: Omit<MagicTreasure, 'id'>) => MagicTreasure;
  addRecipe: (campaignId: string, recipe: Omit<CraftingRecipe, 'id'>) => CraftingRecipe;
  addBeast: (campaignId: string, beast: Omit<Beast, 'id'>) => Beast;

  startCombat: (campaignId: string, combatants: Omit<Combatant, 'id' | 'isCurrentTurn'>[]) => void;
  endCombat: (campaignId: string) => void;
  nextTurn: (campaignId: string) => void;
  updateCombatant: (campaignId: string, combatantId: string, updates: Partial<Combatant>) => void;

  updateCampaignNotes: (campaignId: string, notes: string) => void;
  addStoryNode: (campaignId: string, node: Omit<StoryNode, 'id'>) => void;
  updateStoryNode: (campaignId: string, nodeId: string, updates: Partial<StoryNode>) => void;
  deleteStoryNode: (campaignId: string, nodeId: string) => void;
  addStoryEdge: (campaignId: string, edge: Omit<StoryEdge, 'id'>) => void;
  deleteStoryEdge: (campaignId: string, edgeId: string) => void;

  addDowntimeAction: (campaignId: string, action: Omit<DowntimeAction, 'id' | 'status' | 'rollResult'>) => void;
  resolveDowntimeAction: (campaignId: string, actionId: string) => { roll: number; dc: number; success: boolean };
}

function mutateCampaign(
  campaigns: Campaign[],
  campaignId: string,
  fn: (c: Campaign) => Campaign,
): Campaign[] {
  return campaigns.map(c => c.id === campaignId ? fn(c) : c);
}

function mutateCharacter(
  campaign: Campaign,
  charId: string,
  fn: (ch: Character) => Character,
): Campaign {
  return { ...campaign, characters: campaign.characters.map(ch => ch.id === charId ? fn(ch) : ch) };
}

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set, get) => ({
      campaigns: [],
      activeCampaignId: null,
      activeCharacterId: null,
      gmToken: null,

      getCampaign: (id) => get().campaigns.find(c => c.id === id),
      getActiveCampaign: () => {
        const { campaigns, activeCampaignId } = get();
        return activeCampaignId ? campaigns.find(c => c.id === activeCampaignId) : undefined;
      },
      getCharacter: (campaignId, charId) =>
        get().campaigns.find(c => c.id === campaignId)?.characters.find(ch => ch.id === charId),

      createCampaign: (name) => {
        const id = genId();
        const code = genCode();
        const gmToken = genId();
        const campaign: Campaign = {
          id, sessionCode: code, name, gmToken,
          characters: [], techniques: [], treasures: [], recipes: [], beasts: [],
          combat: null, storyNodes: [], storyEdges: [], downtimeActions: [],
          campaignNotes: '', downtimeWeek: 1, createdAt: new Date().toISOString(),
        };
        set(s => ({
          campaigns: [...s.campaigns, campaign],
          activeCampaignId: id,
          gmToken,
        }));
        return campaign;
      },

      joinCampaign: (code) => {
        const campaign = get().campaigns.find(c => c.sessionCode === code.toUpperCase());
        if (!campaign) return null;
        set({ activeCampaignId: campaign.id, gmToken: null });
        return campaign;
      },

      setGMToken: (token) => set({ gmToken: token }),

      isGM: (campaign) => get().gmToken === campaign.gmToken,

      createCharacter: (campaignId, draft) => {
        const id = genId();
        const realm: Realm = 1;
        const rank: Rank = 'early';
        const realmSkill = REALM_SKILLS[1];
        const char: Character = {
          id, campaignId,
          playerName: draft.playerName,
          name: draft.name,
          daoistTitle: draft.daoistTitle,
          sect: draft.sect,
          path: draft.path,
          isNPC: false, npcType: null,
          realm, rank,
          se: 0, attributePoints: 0,
          str: draft.str, agi: draft.agi, con: draft.con,
          spi: draft.spi, int: draft.int, crm: draft.crm,
          hpCurrent: getMaxHP(draft.con, realm, rank),
          qiCurrent: getMaxQI(draft.spi, realm, rank),
          strainCurrent: 0,
          spiritRoot: draft.spiritRoot,
          subRoot: draft.subRoot,
          physique: draft.physique,
          cultivationTechniqueName: '',
          cultivationTechniqueEffect: '',
          techniques: [],
          ultimates: [],
          passiveSkills: [
            { id: genId(), name: realmSkill.name, effect: realmSkill.shortDesc },
          ],
          professions: {
            alchemy: 0, weaponRefining: 0, arrayMaster: 0, talismanCrafting: 0, beastTaming: 0,
          },
          treasures: [],
          notes: '', inventory: '',
        };
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => ({
            ...c, characters: [...c.characters, char],
          })),
          activeCharacterId: id,
        }));
        return char;
      },

      updateCharacter: (campaignId, charId, updates) => {
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c =>
            mutateCharacter(c, charId, ch => ({ ...ch, ...updates }))
          ),
        }));
      },

      deleteCharacter: (campaignId, charId) => {
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => ({
            ...c, characters: c.characters.filter(ch => ch.id !== charId),
          })),
        }));
      },

      setActiveCharacter: (charId) => set({ activeCharacterId: charId }),

      setHP: (campaignId, charId, value) => {
        const char = get().getCharacter(campaignId, charId);
        if (!char) return;
        const maxHP = getEffectiveMaxHP(char.con, char.realm, char.rank, char.strainCurrent);
        const clampedHP = Math.max(0, Math.min(maxHP, value));
        let newStrain = char.strainCurrent;
        if (clampedHP <= Math.floor(maxHP * 0.1) && clampedHP > 0) {
          const floor = getGrievoInjuryStrainFloor(char.realm);
          if (newStrain < floor) newStrain = floor;
        }
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c =>
            mutateCharacter(c, charId, ch => ({ ...ch, hpCurrent: clampedHP, strainCurrent: newStrain }))
          ),
        }));
      },

      setQI: (campaignId, charId, value) => {
        const char = get().getCharacter(campaignId, charId);
        if (!char) return;
        const maxQI = getEffectiveMaxQI(char.spi, char.realm, char.rank, char.strainCurrent);
        const clampedQI = Math.max(0, Math.min(maxQI, value));
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c =>
            mutateCharacter(c, charId, ch => ({ ...ch, qiCurrent: clampedQI }))
          ),
        }));
      },

      setStrain: (campaignId, charId, value) => {
        const char = get().getCharacter(campaignId, charId);
        if (!char) return;
        const max = getMaxStrain(char.realm);
        const clamped = Math.max(0, Math.min(max, value));
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c =>
            mutateCharacter(c, charId, ch => ({ ...ch, strainCurrent: clamped }))
          ),
        }));
      },

      useTechnique: (campaignId, charId, qiCost, strainCost) => {
        const char = get().getCharacter(campaignId, charId);
        if (!char) return null;
        const maxStrain = getMaxStrain(char.realm);
        if (char.strainCurrent >= maxStrain) return 'Character is dead (Dao Foundation shattered).';

        let newQI = char.qiCurrent - qiCost;
        let newStrain = char.strainCurrent + strainCost;
        let msg: string | null = null;

        if (newQI < 0) {
          const overdraftStrain = getQiOverdraftStrain(qiCost);
          newStrain += overdraftStrain;
          msg = `Qi overdraft! +${overdraftStrain} Strain.`;
          newQI = 0;
        }
        newStrain = Math.min(newStrain, maxStrain);

        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c =>
            mutateCharacter(c, charId, ch => ({ ...ch, qiCurrent: newQI, strainCurrent: newStrain }))
          ),
        }));
        return msg;
      },

      awardSE: (campaignId, charIds, type, customAmount) => {
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => {
            const targets = charIds.length === 0 ? c.characters.filter(ch => !ch.isNPC) : c.characters.filter(ch => charIds.includes(ch.id));
            const updatedChars = c.characters.map(ch => {
              if (!targets.find(t => t.id === ch.id)) return ch;
              const baseAward = type === 'custom' ? (customAmount ?? 0) : SE_AWARDS[ch.realm][type];
              const award = Math.floor(baseAward * ch.spiritRoot.expMultiplier);
              let newSE = ch.se + award;
              let newRank = ch.rank;
              let newAttributePoints = ch.attributePoints;
              const threshold = getSEThresholdForRank(ch.realm, ch.rank);
              if (threshold !== null && newSE >= threshold) {
                const next = getNextRank(ch.rank);
                if (next) {
                  newRank = next;
                  newAttributePoints += 1;
                }
              }
              return { ...ch, se: newSE, rank: newRank, attributePoints: newAttributePoints };
            });
            return { ...c, characters: updatedChars };
          }),
        }));
      },

      spendAttributePoint: (campaignId, charId, attr) => {
        const char = get().getCharacter(campaignId, charId);
        if (!char || char.attributePoints <= 0) return;
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c =>
            mutateCharacter(c, charId, ch => ({
              ...ch,
              [attr]: ch[attr] + 1,
              attributePoints: ch.attributePoints - 1,
            }))
          ),
        }));
      },

      attemptTribulation: (campaignId, charId) => {
        const char = get().getCharacter(campaignId, charId);
        if (!char) return { roll: 0, dc: 0, success: false, strainChange: 0 };
        const roll = rollD20();
        const spiMod = Math.floor(char.spi / 3);
        const rootMod = char.spiritRoot.breakthroughDCMod;
        const dc = 15 + rootMod;
        const total = roll + spiMod;
        const success = total > dc;
        let strainChange = 0;
        let newRealm = char.realm;
        let newRank: Rank = 'early';
        let newAttributePoints = char.attributePoints;
        const newPassiveSkills = [...char.passiveSkills];
        if (success) {
          if (char.realm < 8) {
            newRealm = (char.realm + 1) as Realm;
            newAttributePoints += 3;
            strainChange = 1;
            const skill = REALM_SKILLS[newRealm];
            if (!newPassiveSkills.find(s => s.name === skill.name)) {
              newPassiveSkills.push({ id: genId(), name: skill.name, effect: skill.shortDesc });
            }
          }
        } else {
          strainChange = getTribulationFailStrain(char.realm);
        }
        const maxStrain = getMaxStrain(success ? newRealm : char.realm);
        const newStrain = Math.min(char.strainCurrent + strainChange, maxStrain);
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c =>
            mutateCharacter(c, charId, ch => ({
              ...ch,
              realm: newRealm as Realm,
              rank: newRank,
              se: 0,
              strainCurrent: newStrain,
              attributePoints: newAttributePoints,
              passiveSkills: newPassiveSkills,
            }))
          ),
        }));
        return { roll, dc, success, strainChange };
      },

      addTechnique: (campaignId, technique) => {
        const id = genId();
        const t: Technique = { ...technique, id } as Technique;
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => ({
            ...c, techniques: [...c.techniques, t],
          })),
        }));
        return t;
      },

      learnTechnique: (campaignId, charId, techniqueId) => {
        const campaign = get().getCampaign(campaignId);
        const technique = campaign?.techniques.find(t => t.id === techniqueId);
        if (!technique) return;
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c =>
            mutateCharacter(c, charId, ch => {
              if (ch.techniques.find(t => t.id === techniqueId)) return ch;
              return { ...ch, techniques: [...ch.techniques, technique] };
            })
          ),
        }));
      },

      removeTechniqueFromChar: (campaignId, charId, techniqueId) => {
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c =>
            mutateCharacter(c, charId, ch => ({
              ...ch, techniques: ch.techniques.filter(t => t.id !== techniqueId),
            }))
          ),
        }));
      },

      addTreasureToLibrary: (campaignId, treasure) => {
        const id = genId();
        const t: MagicTreasure = { ...treasure, id } as MagicTreasure;
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => ({
            ...c, treasures: [...c.treasures, t],
          })),
        }));
        return t;
      },

      addRecipe: (campaignId, recipe) => {
        const id = genId();
        const r: CraftingRecipe = { ...recipe, id } as CraftingRecipe;
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => ({
            ...c, recipes: [...c.recipes, r],
          })),
        }));
        return r;
      },

      incrementProfessionCraft: (campaignId, charId, profession, count = 1) => {
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c =>
            mutateCharacter(c, charId, ch => ({
              ...ch,
              professions: {
                ...ch.professions,
                [profession]: ch.professions[profession] + count,
              },
            }))
          ),
        }));
      },

      addBeast: (campaignId, beast) => {
        const id = genId();
        const b: Beast = { ...beast, id } as Beast;
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => ({
            ...c, beasts: [...c.beasts, b],
          })),
        }));
        return b;
      },

      startCombat: (campaignId, combatants) => {
        const sorted = [...combatants].sort((a, b) => b.initiative - a.initiative);
        const withIds: Combatant[] = sorted.map((cb, i) => ({
          ...cb,
          id: genId(),
          isCurrentTurn: i === 0,
        }));
        const encounter: CombatEncounter = {
          id: genId(), round: 1, status: 'active',
          combatants: withIds, activeCombatantIndex: 0,
        };
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => ({ ...c, combat: encounter })),
        }));
      },

      endCombat: (campaignId) => {
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => ({ ...c, combat: null })),
        }));
      },

      nextTurn: (campaignId) => {
        const campaign = get().getCampaign(campaignId);
        if (!campaign?.combat) return;
        const { combat } = campaign;
        const count = combat.combatants.length;
        const nextIdx = (combat.activeCombatantIndex + 1) % count;
        const newRound = nextIdx === 0 ? combat.round + 1 : combat.round;
        const newCombatants = combat.combatants.map((cb, i) => ({
          ...cb,
          isCurrentTurn: i === nextIdx,
          apRemaining: i === nextIdx ? 3 : cb.apRemaining,
        }));
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => ({
            ...c, combat: { ...combat, round: newRound, activeCombatantIndex: nextIdx, combatants: newCombatants },
          })),
        }));
      },

      updateCombatant: (campaignId, combatantId, updates) => {
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => {
            if (!c.combat) return c;
            return {
              ...c, combat: {
                ...c.combat,
                combatants: c.combat.combatants.map(cb => cb.id === combatantId ? { ...cb, ...updates } : cb),
              },
            };
          }),
        }));
      },

      updateCampaignNotes: (campaignId, notes) => {
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => ({ ...c, campaignNotes: notes })),
        }));
      },

      addStoryNode: (campaignId, node) => {
        const id = genId();
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => ({
            ...c, storyNodes: [...c.storyNodes, { ...node, id }],
          })),
        }));
      },

      updateStoryNode: (campaignId, nodeId, updates) => {
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => ({
            ...c, storyNodes: c.storyNodes.map(n => n.id === nodeId ? { ...n, ...updates } : n),
          })),
        }));
      },

      deleteStoryNode: (campaignId, nodeId) => {
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => ({
            ...c,
            storyNodes: c.storyNodes.filter(n => n.id !== nodeId),
            storyEdges: c.storyEdges.filter(e => e.sourceId !== nodeId && e.targetId !== nodeId),
          })),
        }));
      },

      addStoryEdge: (campaignId, edge) => {
        const id = genId();
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => ({
            ...c, storyEdges: [...c.storyEdges, { ...edge, id }],
          })),
        }));
      },

      deleteStoryEdge: (campaignId, edgeId) => {
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => ({
            ...c, storyEdges: c.storyEdges.filter(e => e.id !== edgeId),
          })),
        }));
      },

      addDowntimeAction: (campaignId, action) => {
        const id = genId();
        const full: DowntimeAction = { ...action, id, status: 'queued', rollResult: null };
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => ({
            ...c, downtimeActions: [...c.downtimeActions, full],
          })),
        }));
      },

      resolveDowntimeAction: (campaignId, actionId) => {
        const campaign = get().getCampaign(campaignId);
        const action = campaign?.downtimeActions.find(a => a.id === actionId);
        if (!action) return { roll: 0, dc: 0, success: false };
        const char = get().getCharacter(campaignId, action.characterId);
        if (!char) return { roll: 0, dc: 0, success: false };
        const roll = rollD20() + Math.floor(char.int / 3);
        const success = roll >= action.dc;
        set(s => ({
          campaigns: mutateCampaign(s.campaigns, campaignId, c => ({
            ...c, downtimeActions: c.downtimeActions.map(a =>
              a.id === actionId
                ? { ...a, rollResult: roll, status: success ? 'complete' : 'failed' }
                : a
            ),
          })),
        }));
        return { roll, dc: action.dc, success };
      },
    }),
    {
      name: 'xanxia-vtt-store',
    }
  )
);
