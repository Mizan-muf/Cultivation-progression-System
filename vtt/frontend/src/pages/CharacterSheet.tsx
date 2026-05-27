import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCampaignStore } from '../store/campaignStore';
import { ResourceBar } from '../components/ResourceBar';
import {
  getAttrMod, getMaxHP, getMaxQI, getMaxStrain, getEffectiveMaxHP, getEffectiveMaxQI,
  getStrainStage, getAttunementSlots, REALM_NAMES, RANK_LABELS, STRAIN_PENALTIES,
  getSEThresholdForRank, formatSE, REALM_SKILLS,
  getProfessionRank, getMaxProfessionRank, getProfessionNextThreshold,
} from '../lib/gameFormulas';
import type { Technique, Realm, ProfessionName } from '../lib/types';

const STRAIN_COLORS: Record<string, string> = {
  clear: '#44dd77',
  strained: '#ffaa00',
  overloaded: '#ff8800',
  critical: '#ff4444',
  death: '#880000',
};

const TECHNIQUE_TYPE_COLORS: Record<string, string> = {
  martial: '#cc6600',
  spiritual: '#3366cc',
  movement: '#339966',
  utility: '#666688',
};

function AttrBlock({ label, value }: { label: string; value: number }) {
  const mod = getAttrMod(value);
  return (
    <div style={{
      background: '#181818', border: '1px solid #2a2a2a',
      padding: '10px 8px', textAlign: 'center',
    }}>
      <div style={{ color: '#555', fontSize: 10, letterSpacing: 1, marginBottom: 4 }}>{label}</div>
      <div style={{ color: '#fff', fontSize: 22 }}>{value}</div>
      <div style={{ color: '#666', fontSize: 11 }}>{mod >= 0 ? '+' : ''}{mod}</div>
    </div>
  );
}

function TechniqueRow({ tech, onUse }: { tech: Technique; onUse: () => void }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 60px 60px 60px 80px',
      gap: 8, alignItems: 'center',
      padding: '8px 10px',
      background: '#181818', border: '1px solid #2a2a2a',
      marginBottom: 4,
    }}>
      <div>
        <div style={{ fontSize: 13, marginBottom: 2 }}>
          <span style={{ color: TECHNIQUE_TYPE_COLORS[tech.type] || '#999', marginRight: 8, fontSize: 10 }}>
            [{tech.type.toUpperCase()}]
          </span>
          {tech.name}
          {tech.isForbidden && <span style={{ color: '#ff4444', fontSize: 10, marginLeft: 6 }}>[FORBIDDEN]</span>}
        </div>
        <div style={{ color: '#555', fontSize: 11 }}>{tech.effect}</div>
      </div>
      <div style={{ textAlign: 'center', fontSize: 12 }}>
        <div style={{ color: '#555', fontSize: 10 }}>AP</div>
        <div>{tech.apCost}</div>
      </div>
      <div style={{ textAlign: 'center', fontSize: 12 }}>
        <div style={{ color: '#555', fontSize: 10 }}>QI</div>
        <div style={{ color: '#3366cc' }}>{tech.qiCost}</div>
      </div>
      <div style={{ textAlign: 'center', fontSize: 12 }}>
        <div style={{ color: '#555', fontSize: 10 }}>STRAIN</div>
        <div style={{ color: tech.strainCost > 0 ? '#ff4444' : '#555' }}>{tech.strainCost}</div>
      </div>
      <button className="small primary" onClick={onUse}>USE</button>
    </div>
  );
}

export function CharacterSheet() {
  const { id: campaignId, charId } = useParams<{ id: string; charId: string }>();
  const navigate = useNavigate();
  const { getCampaign, setHP, setQI, setStrain, useTechnique, spendAttributePoint, updateCharacter, incrementProfessionCraft } = useCampaignStore();

  const campaign = getCampaign(campaignId!);
  const char = campaign?.characters.find(c => c.id === charId);

  const [activeTab, setActiveTab] = useState<'combat' | 'skills' | 'crafting' | 'notes'>('combat');
  const [notification, setNotification] = useState<string | null>(null);
  const [editingCultivation, setEditingCultivation] = useState(false);
  const [cultName, setCultName] = useState('');
  const [cultEffect, setCultEffect] = useState('');

  if (!char) {
    return (
      <div style={{ padding: 24, color: '#555' }}>
        Character not found.{' '}
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const maxStrain = getMaxStrain(char.realm);
  const strainStage = getStrainStage(char.strainCurrent, maxStrain);
  const strainPenalties = STRAIN_PENALTIES[strainStage];
  const effectiveMaxHP = getEffectiveMaxHP(char.con, char.realm, char.rank, char.strainCurrent);
  const effectiveMaxQI = getEffectiveMaxQI(char.spi, char.realm, char.rank, char.strainCurrent);
  const baseMaxHP = getMaxHP(char.con, char.realm, char.rank);
  const baseMaxQI = getMaxQI(char.spi, char.realm, char.rank);
  const sePeak = getSEThresholdForRank(char.realm, char.rank);
  const slots = getAttunementSlots(char.realm);
  const physDR = getAttrMod(char.con) + (char.realm >= 1 ? 1 : 0);
  const spirDR = getAttrMod(char.spi);

  function notify(msg: string) {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  }

  function handleUseTechnique(tech: Technique) {
    if (!char) return;
    const msg = useTechnique(campaignId!, char.id, tech.qiCost, tech.strainCost);
    if (msg) notify(msg);
    else notify(`Used ${tech.name} — ${tech.qiCost} Qi spent.`);
  }

  const martialTechs = char.techniques.filter(t => t.type === 'martial');
  const spiritTechs = char.techniques.filter(t => t.type === 'spiritual');
  const moveTechs = char.techniques.filter(t => t.type === 'movement');
  const utilTechs = char.techniques.filter(t => t.type === 'utility');

  const displayRoot = char.subRoot ?? char.spiritRoot;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Notification banner */}
      {notification && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          background: '#001a14', border: '1px solid #00ffcc',
          padding: '10px 24px', zIndex: 100,
          color: '#00ffcc', fontSize: 13, textAlign: 'center',
        }}>
          {notification}
        </div>
      )}

      {/* Topbar */}
      <div style={{
        background: '#141414', borderBottom: '1px solid #2e2e2e',
        padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <button className="icon-btn" onClick={() => navigate(-1)}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#00ffcc', fontSize: 16, fontWeight: 'bold' }}>
            {char.name}
            {char.daoistTitle && <span style={{ color: '#555', fontSize: 12, marginLeft: 10 }}>{char.daoistTitle}</span>}
          </div>
          <div style={{ color: '#555', fontSize: 11 }}>
            {char.sect && `${char.sect} · `}{char.playerName}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#00ffcc', fontSize: 13 }}>
            {REALM_NAMES[char.realm]} — {RANK_LABELS[char.rank]}
          </div>
          {char.attributePoints > 0 && (
            <div style={{ color: '#ffaa00', fontSize: 11 }}>
              {char.attributePoints} attr point{char.attributePoints > 1 ? 's' : ''} available
            </div>
          )}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left panel */}
        <div style={{ width: 280, borderRight: '1px solid #2e2e2e', padding: 16, overflowY: 'auto', flexShrink: 0 }}>

          {/* Resources */}
          <div style={{ marginBottom: 20 }}>
            <ResourceBar
              label="HP"
              current={char.hpCurrent}
              max={effectiveMaxHP}
              color="var(--hp)"
              onSet={v => setHP(campaignId!, char.id, v)}
            />
            <ResourceBar
              label="QI"
              current={char.qiCurrent}
              max={effectiveMaxQI}
              color="var(--qi)"
              onSet={v => setQI(campaignId!, char.id, v)}
            />
            <ResourceBar
              label={`STRAIN [${strainStage.toUpperCase()}]`}
              current={char.strainCurrent}
              max={maxStrain}
              color={STRAIN_COLORS[strainStage] || '#cc6600'}
              onSet={v => setStrain(campaignId!, char.id, v)}
            />
            {strainStage !== 'clear' && strainStage !== 'death' && (
              <div style={{
                fontSize: 11, color: STRAIN_COLORS[strainStage],
                border: `1px solid ${STRAIN_COLORS[strainStage]}`,
                padding: '4px 8px', marginTop: 4,
              }}>
                {strainPenalties.rollPenalty} all rolls · −{strainPenalties.hpQiReductionPct}% Max HP/Qi
              </div>
            )}
            {strainStage === 'death' && (
              <div style={{ fontSize: 12, color: '#ff0000', border: '1px solid #ff0000', padding: '6px 8px', marginTop: 4 }}>
                ⚠ DAO FOUNDATION SHATTERED — CHARACTER DEAD
              </div>
            )}
          </div>

          {/* Strain penalties info */}
          {strainPenalties.hpQiReductionPct > 0 && (
            <div style={{ marginBottom: 20, fontSize: 11, color: '#555' }}>
              Base Max HP: {baseMaxHP} → Effective: {effectiveMaxHP}<br/>
              Base Max Qi: {baseMaxQI} → Effective: {effectiveMaxQI}
            </div>
          )}

          {/* SE Progress */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 11 }}>
              <span style={{ color: '#666', letterSpacing: 1 }}>SPIRIT ENERGY</span>
              <span style={{ color: '#ddd' }}>
                {formatSE(char.se)} {sePeak ? `/ ${formatSE(sePeak)}` : '/ PEAK'}
              </span>
            </div>
            {sePeak ? (
              <div style={{ background: '#111', border: '1px solid #2e2e2e', height: 8 }}>
                <div style={{
                  width: `${Math.min(1, char.se / sePeak) * 100}%`,
                  height: '100%', background: '#5533aa',
                }} />
              </div>
            ) : (
              <div style={{ fontSize: 11, color: '#555' }}>Peak — Tribulation required</div>
            )}
            <div style={{ fontSize: 11, color: '#555', marginTop: 4 }}>
              ×{char.spiritRoot.expMultiplier} SE multiplier
            </div>
          </div>

          {/* Combat stats */}
          <div style={{ marginBottom: 20 }}>
            <h3>COMBAT</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
              <div style={{ background: '#181818', border: '1px solid #2a2a2a', padding: '8px' }}>
                <div style={{ color: '#555', fontSize: 10 }}>INITIATIVE</div>
                <div style={{ color: '#00ffcc', fontSize: 16 }}>{char.agi}</div>
                <div style={{ color: '#555', fontSize: 10 }}>AGI score</div>
              </div>
              <div style={{ background: '#181818', border: '1px solid #2a2a2a', padding: '8px' }}>
                <div style={{ color: '#555', fontSize: 10 }}>AP / TURN</div>
                <div style={{ color: '#00ffcc', fontSize: 16 }}>3</div>
              </div>
              <div style={{ background: '#181818', border: '1px solid #2a2a2a', padding: '8px' }}>
                <div style={{ color: '#555', fontSize: 10 }}>PHYS DR</div>
                <div style={{ color: '#cc6600', fontSize: 16 }}>{physDR}</div>
                <div style={{ color: '#555', fontSize: 10 }}>CON mod{char.realm >= 1 ? ' +1 (Realm 1)' : ''}</div>
              </div>
              <div style={{ background: '#181818', border: '1px solid #2a2a2a', padding: '8px' }}>
                <div style={{ color: '#555', fontSize: 10 }}>SPIR DR</div>
                <div style={{ color: '#3366cc', fontSize: 16 }}>{spirDR}</div>
                <div style={{ color: '#555', fontSize: 10 }}>SPI mod</div>
              </div>
            </div>
          </div>

          {/* Innate info */}
          <div>
            <h3>INNATE</h3>
            <div style={{ fontSize: 12, marginBottom: 8 }}>
              <div style={{ color: '#555', fontSize: 10, marginBottom: 2 }}>SPIRIT ROOT</div>
              <div style={{ color: '#00ffcc' }}>{displayRoot.name}</div>
              <div style={{ color: '#555', fontSize: 11 }}>{displayRoot.tier.label}</div>
            </div>
            <div style={{ fontSize: 12 }}>
              <div style={{ color: '#555', fontSize: 10, marginBottom: 2 }}>PHYSIQUE</div>
              <div style={{ color: '#00ffcc' }}>{char.physique.name}</div>
              <div style={{ color: '#555', fontSize: 11 }}>{char.physique.tier.label}</div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>

          {/* Attributes */}
          <div style={{ marginBottom: 20 }}>
            <div className="section-header">
              <h2 style={{ margin: 0 }}>CORE ATTRIBUTES</h2>
              {char.attributePoints > 0 && (
                <span style={{ color: '#ffaa00', fontSize: 12 }}>{char.attributePoints} to spend</span>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
              {(['str','agi','con','spi','int','crm'] as const).map(attr => (
                <div key={attr} onClick={() => {
                  if (char.attributePoints > 0) spendAttributePoint(campaignId!, char.id, attr);
                }} style={{ cursor: char.attributePoints > 0 ? 'pointer' : 'default' }}>
                  <AttrBlock
                    label={attr.toUpperCase()}
                    value={char[attr]}
                  />
                  {char.attributePoints > 0 && (
                    <div style={{ textAlign: 'center', fontSize: 10, color: '#00b38a', marginTop: 2 }}>+1</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ borderBottom: '1px solid #2e2e2e', marginBottom: 16 }}>
            {(['combat', 'skills', 'crafting', 'notes'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{
                  background: 'transparent',
                  borderTop: 'none', borderLeft: 'none', borderRight: 'none',
                  borderBottom: activeTab === tab ? '2px solid #00ffcc' : '2px solid transparent',
                  color: activeTab === tab ? '#00ffcc' : '#555',
                  padding: '8px 16px', fontSize: 12, letterSpacing: 1,
                  marginRight: 8,
                }}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Combat tab */}
          {activeTab === 'combat' && (
            <div>
              {/* Cultivation Technique */}
              <div style={{ marginBottom: 20 }}>
                <div className="section-header">
                  <h3 style={{ margin: 0 }}>PRIMARY CULTIVATION TECHNIQUE</h3>
                  <button className="small" onClick={() => {
                    setEditingCultivation(!editingCultivation);
                    setCultName(char.cultivationTechniqueName);
                    setCultEffect(char.cultivationTechniqueEffect);
                  }}>
                    {editingCultivation ? 'Cancel' : 'Edit'}
                  </button>
                </div>
                {editingCultivation ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <input value={cultName} onChange={e => setCultName(e.target.value)} placeholder="Technique name..." />
                    <textarea value={cultEffect} onChange={e => setCultEffect(e.target.value)} placeholder="Passive effect..." rows={2} />
                    <button className="small primary" onClick={() => {
                      updateCharacter(campaignId!, char.id, {
                        cultivationTechniqueName: cultName,
                        cultivationTechniqueEffect: cultEffect,
                      });
                      setEditingCultivation(false);
                    }}>Save</button>
                  </div>
                ) : char.cultivationTechniqueName ? (
                  <div style={{ background: '#181818', border: '1px solid #2a2a2a', padding: '10px 12px' }}>
                    <div style={{ color: '#00ffcc', marginBottom: 4 }}>{char.cultivationTechniqueName}</div>
                    <div style={{ color: '#888', fontSize: 12 }}>{char.cultivationTechniqueEffect}</div>
                  </div>
                ) : (
                  <div style={{ color: '#555', fontSize: 12 }}>No cultivation technique set. Click Edit to add one.</div>
                )}
              </div>

              {/* Ultimates */}
              {char.ultimates.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div className="section-header"><h3 style={{ margin: 0 }}>ULTIMATE ABILITIES</h3></div>
                  {char.ultimates.map(ult => (
                    <div key={ult.id} style={{
                      background: '#1a0d1a', border: '1px solid #4a204a',
                      padding: '10px 12px', marginBottom: 8,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ color: '#cc66cc', fontSize: 14 }}>{ult.name}</span>
                        <span style={{ fontSize: 11, color: '#666' }}>{ult.cooldown}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 16, fontSize: 12, marginBottom: 6 }}>
                        <span><span style={{ color: '#555' }}>Qi: </span><span style={{ color: '#3366cc' }}>{ult.qiCost}</span></span>
                        <span><span style={{ color: '#555' }}>Strain: </span><span style={{ color: '#ff4444' }}>{ult.strainCost}</span></span>
                        <span><span style={{ color: '#555' }}>Duration: </span>{ult.duration}</span>
                      </div>
                      <div style={{ color: '#888', fontSize: 12 }}>{ult.description}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Martial Techniques */}
              {martialTechs.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <h3>MARTIAL / WEAPON TECHNIQUES</h3>
                  {martialTechs.map(t => <TechniqueRow key={t.id} tech={t} onUse={() => handleUseTechnique(t)} />)}
                </div>
              )}

              {/* Spiritual Spells */}
              {spiritTechs.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <h3>SPIRITUAL SPELLS</h3>
                  {spiritTechs.map(t => <TechniqueRow key={t.id} tech={t} onUse={() => handleUseTechnique(t)} />)}
                </div>
              )}

              {/* Movement */}
              {moveTechs.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <h3>MOVEMENT TECHNIQUES</h3>
                  {moveTechs.map(t => <TechniqueRow key={t.id} tech={t} onUse={() => handleUseTechnique(t)} />)}
                </div>
              )}

              {/* Utility */}
              {utilTechs.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <h3>UTILITY TECHNIQUES</h3>
                  {utilTechs.map(t => <TechniqueRow key={t.id} tech={t} onUse={() => handleUseTechnique(t)} />)}
                </div>
              )}

              {char.techniques.length === 0 && (
                <div style={{ color: '#444', fontSize: 13, padding: '20px 0' }}>
                  No techniques learned yet. Ask your GM to assign techniques to your character.
                </div>
              )}
            </div>
          )}

          {/* Skills tab */}
          {activeTab === 'skills' && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <div className="section-header"><h3 style={{ margin: 0 }}>PASSIVE SKILLS & REALM ABILITIES</h3></div>
                {char.passiveSkills.map(skill => (
                  <div key={skill.id} style={{
                    background: '#181818', border: '1px solid #2a2a2a',
                    padding: '10px 12px', marginBottom: 6,
                    display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12,
                  }}>
                    <div style={{ color: '#00ffcc', fontSize: 13 }}>{skill.name}</div>
                    <div style={{ color: '#888', fontSize: 12 }}>{skill.effect}</div>
                  </div>
                ))}
                {char.passiveSkills.length === 0 && (
                  <div style={{ color: '#444', fontSize: 12 }}>No passive skills yet.</div>
                )}
              </div>
              <div>
                <div className="section-header">
                  <h3 style={{ margin: 0 }}>REALM SKILL REFERENCE</h3>
                </div>
                {[1,2,3,4,5,6,7,8].map(r => {
                  const skill = REALM_SKILLS[r as Realm];
                  const unlocked = char.realm >= r;
                  return (
                    <div key={r} style={{
                      background: unlocked ? '#181818' : '#141414',
                      border: `1px solid ${unlocked ? '#2a2a2a' : '#1a1a1a'}`,
                      padding: '8px 12px', marginBottom: 4,
                      opacity: unlocked ? 1 : 0.4,
                    }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 4 }}>
                        <span style={{ color: '#555', fontSize: 11 }}>R{r}</span>
                        <span style={{ color: unlocked ? '#00ffcc' : '#666', fontSize: 13 }}>{skill.name}</span>
                        <span className="tag" style={{ fontSize: 10 }}>{skill.type}</span>
                      </div>
                      <div style={{ color: '#666', fontSize: 11 }}>{skill.shortDesc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Crafting tab */}
          {activeTab === 'crafting' && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <div className="section-header"><h3 style={{ margin: 0 }}>LIFE PROFESSIONS</h3></div>
                {([
                  ['alchemy', 'Alchemy', 'INT', 'Pills, potions, elixirs'],
                  ['weaponRefining', 'Weapon Refining', 'STR', 'Weapons, armor, artifacts'],
                  ['arrayMaster', 'Array Master', 'SPI', 'Formations, traps, arrays'],
                  ['talismanCrafting', 'Talisman Crafting', 'AGI', 'Scrolls, paper talismans'],
                  ['beastTaming', 'Beast Taming', 'CRM', 'Contracted beasts, mounts'],
                ] as const).map(([key, label, stat, output]) => {
                  const craftCount = char.professions[key as ProfessionName];
                  const rank = getProfessionRank(craftCount);
                  const maxRank = getMaxProfessionRank(char.realm);
                  const nextThreshold = getProfessionNextThreshold(craftCount);
                  const atRealmCap = rank >= maxRank && rank < 4;
                  const atMax = rank === 4;
                  return (
                    <div key={key} style={{
                      display: 'grid', gridTemplateColumns: '150px 90px 50px 1fr 44px',
                      alignItems: 'center', gap: 10,
                      padding: '10px 12px', background: '#181818', border: '1px solid #2a2a2a', marginBottom: 4,
                    }}>
                      <div style={{ color: '#e8e8e8', fontSize: 13 }}>{label}</div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{
                          background: '#111', border: `1px solid ${rank > 0 ? '#333' : '#222'}`,
                          padding: '3px 6px',
                          color: atMax ? '#ffaa00' : rank > 0 ? '#00ffcc' : '#444',
                          fontSize: 13, marginBottom: 2,
                        }}>
                          {rank > 0 ? `Rank ${rank}` : 'Untrained'}
                          {atMax && ' ★'}
                        </div>
                        <div style={{ fontSize: 10, color: '#444' }}>
                          {atMax
                            ? `${craftCount} crafts`
                            : atRealmCap
                            ? <span style={{ color: '#ff8800' }}>Cap (R{maxRank})</span>
                            : `${craftCount} / ${nextThreshold}`}
                        </div>
                      </div>
                      <div style={{ color: '#ffaa00', fontSize: 12, textAlign: 'center' }}>{stat}</div>
                      <div style={{ color: '#555', fontSize: 11 }}>{output}</div>
                      <button
                        className="small"
                        disabled={atMax || atRealmCap}
                        title={atRealmCap ? `Need Realm ${maxRank * 2 - 1} to advance beyond Rank ${maxRank}` : 'Log one successful craft'}
                        onClick={() => incrementProfessionCraft(campaignId!, char.id, key as ProfessionName)}
                        style={{ fontSize: 11, padding: '4px 0' }}
                      >
                        +1
                      </button>
                    </div>
                  );
                })}
              </div>
              <div>
                <div className="section-header">
                  <h3 style={{ margin: 0 }}>MAGIC TREASURES</h3>
                  <span style={{ fontSize: 12, color: '#555' }}>
                    {char.treasures.length} / {slots} slots
                  </span>
                </div>
                {char.treasures.map((ct, i) => (
                  <div key={i} style={{
                    background: '#1a1508', border: '1px solid #4a3a10',
                    padding: '10px 12px', marginBottom: 6,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ color: '#ffaa00', fontSize: 14 }}>{ct.treasure.name}</span>
                      <span style={{ fontSize: 11, color: '#555' }}>Slot {ct.slotIndex + 1} — {ct.bindingType}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 16, fontSize: 12, marginBottom: 4 }}>
                      <span><span style={{ color: '#555' }}>Realm: </span>{ct.treasure.realm}</span>
                      <span><span style={{ color: '#555' }}>Qi: </span>{ct.treasure.qiMode === 'charges' ? `${ct.chargesCurrent}/${ct.treasure.chargesMax} charges` : `${ct.treasure.qiCost} Qi`}</span>
                    </div>
                    {ct.treasure.passiveBonus && <div style={{ color: '#888', fontSize: 12 }}>Passive: {ct.treasure.passiveBonus}</div>}
                    {ct.treasure.activeEffect && <div style={{ color: '#aaa', fontSize: 12 }}>Active: {ct.treasure.activeEffect}</div>}
                  </div>
                ))}
                {char.treasures.length === 0 && (
                  <div style={{ color: '#444', fontSize: 12 }}>No magic treasures attuned. ({slots} slot{slots > 1 ? 's' : ''} available)</div>
                )}
              </div>
            </div>
          )}

          {/* Notes tab */}
          {activeTab === 'notes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <h3>INVENTORY / MAGIC TREASURES (FREEFORM)</h3>
                <textarea
                  value={char.inventory}
                  onChange={e => updateCharacter(campaignId!, char.id, { inventory: e.target.value })}
                  placeholder="List items, materials, pills, and other possessions..."
                  rows={6}
                />
              </div>
              <div>
                <h3>CHARACTER NOTES</h3>
                <textarea
                  value={char.notes}
                  onChange={e => updateCharacter(campaignId!, char.id, { notes: e.target.value })}
                  placeholder="Background, goals, secrets, relationships..."
                  rows={8}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
