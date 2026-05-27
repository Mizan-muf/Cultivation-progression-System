import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCampaignStore } from '../store/campaignStore';
import { ResourceBar } from '../components/ResourceBar';
import {
  getMaxHP, getMaxQI, getMaxStrain, getEffectiveMaxHP, getEffectiveMaxQI,
  getStrainStage, REALM_NAMES, RANK_LABELS, SE_AWARDS, formatSE,
  getSEThresholdForRank,
} from '../lib/gameFormulas';
import type { Character, SEAwardType, Realm, Technique, Beast } from '../lib/types';

const PROF_LABELS: Record<string, string> = {
  alchemy: 'Alchemy', weaponRefining: 'Weapon Ref.', arrayMaster: 'Array',
  talismanCrafting: 'Talisman', beastTaming: 'Beast Taming',
};

function CharacterCard({ char, campaignId }: { char: Character; campaignId: string }) {
  const navigate = useNavigate();
  const { setHP, setQI, setStrain, awardSE, attemptTribulation } = useCampaignStore();
  const [showTrib, setShowTrib] = useState(false);
  const [tribResult, setTribResult] = useState<{ roll: number; dc: number; success: boolean; strainChange: number } | null>(null);

  const maxStrain = getMaxStrain(char.realm);
  const strainStage = getStrainStage(char.strainCurrent, maxStrain);
  const effHP = getEffectiveMaxHP(char.con, char.realm, char.rank, char.strainCurrent);
  const effQI = getEffectiveMaxQI(char.spi, char.realm, char.rank, char.strainCurrent);
  const seThreshold = getSEThresholdForRank(char.realm, char.rank);

  const STRAIN_COLORS: Record<string, string> = {
    clear: '#44dd77', strained: '#ffaa00', overloaded: '#ff8800', critical: '#ff4444', death: '#ff0000',
  };

  function doTribulation() {
    const result = attemptTribulation(campaignId, char.id);
    setTribResult(result);
    setShowTrib(false);
  }

  return (
    <div style={{
      background: '#1a1a1a', border: '1px solid #2e2e2e',
      padding: 16, display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Link to={`/campaign/${campaignId}/character/${char.id}`}
            style={{ color: '#00ffcc', fontSize: 15, display: 'block', marginBottom: 2 }}>
            {char.name}
          </Link>
          <div style={{ color: '#555', fontSize: 11 }}>{char.playerName} · {char.spiritRoot.name}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#e8e8e8', fontSize: 12 }}>{REALM_NAMES[char.realm]}</div>
          <div style={{ color: '#888', fontSize: 11 }}>{RANK_LABELS[char.rank]}</div>
        </div>
      </div>

      <div>
        <ResourceBar label="HP" current={char.hpCurrent} max={effHP} color="var(--hp)"
          onSet={v => setHP(campaignId, char.id, v)} />
        <ResourceBar label="QI" current={char.qiCurrent} max={effQI} color="var(--qi)"
          onSet={v => setQI(campaignId, char.id, v)} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
          <span style={{ color: STRAIN_COLORS[strainStage] }}>STRAIN [{strainStage.toUpperCase()}]</span>
          <span>{char.strainCurrent} / {maxStrain}</span>
        </div>
        <input type="range" min={0} max={maxStrain} value={char.strainCurrent}
          onChange={e => setStrain(campaignId, char.id, parseInt(e.target.value))}
          style={{ width: '100%', accentColor: STRAIN_COLORS[strainStage] }} />
      </div>

      <div style={{ fontSize: 11, color: '#555' }}>
        SE: {formatSE(char.se)} {seThreshold ? `/ ${formatSE(seThreshold)}` : '(Peak)'}
        {char.attributePoints > 0 && (
          <span style={{ color: '#ffaa00', marginLeft: 8 }}>· {char.attributePoints} attr pts</span>
        )}
      </div>

      {tribResult && (
        <div style={{
          background: tribResult.success ? '#001a08' : '#1a0000',
          border: `1px solid ${tribResult.success ? '#44dd77' : '#ff4444'}`,
          padding: '8px 12px', fontSize: 12,
        }}>
          Tribulation: Rolled {tribResult.roll} vs DC {tribResult.dc} — {' '}
          <strong style={{ color: tribResult.success ? '#44dd77' : '#ff4444' }}>
            {tribResult.success ? 'SUCCESS' : 'FAILURE'}
          </strong>
          {' '} (Strain {tribResult.strainChange >= 0 ? '+' : ''}{tribResult.strainChange})
          <button className="small icon-btn" onClick={() => setTribResult(null)} style={{ float: 'right' }}>✕</button>
        </div>
      )}

      <div style={{ display: 'flex', gap: 6 }}>
        <button className="small" onClick={() => navigate(`/campaign/${campaignId}/character/${char.id}`)}>
          Sheet
        </button>
        {char.rank === 'peak' && char.realm < 8 && (
          <button className="small warning-text"
            onClick={() => { setShowTrib(true); setTribResult(null); }}
            style={{ border: '1px solid #ffaa00', color: '#ffaa00', background: 'transparent' }}>
            Tribulation
          </button>
        )}
        {showTrib && (
          <button className="small primary" onClick={doTribulation}>Confirm Roll</button>
        )}
      </div>
    </div>
  );
}

function TechniqueCreator({ campaignId, onClose }: { campaignId: string; onClose: () => void }) {
  const { addTechnique } = useCampaignStore();
  const [name, setName] = useState('');
  const [realm, setRealm] = useState<Realm>(1);
  const [rank, setRank] = useState('early');
  const [type, setType] = useState('martial');
  const [apCost, setApCost] = useState<1|2|3>(1);
  const [qiCost, setQiCost] = useState(0);
  const [strainCost, setStrainCost] = useState(0);
  const [damageFormula, setDamageFormula] = useState('');
  const [effect, setEffect] = useState('');
  const [elementReq, setElementReq] = useState('');
  const [forbidden, setForbidden] = useState(false);
  const [notes, setNotes] = useState('');

  function handleSave() {
    if (!name.trim()) return;
    addTechnique(campaignId, {
      name, realm, rank: rank as any, type: type as any,
      apCost, qiCost, strainCost, damageFormula, effect,
      elementRequirement: elementReq, isForbidden: forbidden, notes,
    });
    onClose();
  }

  return (
    <div style={{ background: '#181818', border: '1px solid #333', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ margin: 0 }}>NEW TECHNIQUE CARD</h3>
        <button className="icon-btn" onClick={onClose}>✕</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="grid2">
          <div>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>NAME *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Technique name" />
          </div>
          <div>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>TYPE</label>
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="martial">Martial</option>
              <option value="spiritual">Spiritual</option>
              <option value="movement">Movement</option>
              <option value="utility">Utility</option>
            </select>
          </div>
        </div>
        <div className="grid3">
          <div>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>REALM</label>
            <select value={realm} onChange={e => setRealm(parseInt(e.target.value) as Realm)}>
              {[1,2,3,4,5,6,7,8].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>RANK</label>
            <select value={rank} onChange={e => setRank(e.target.value)}>
              <option value="early">Early</option>
              <option value="mid">Mid</option>
              <option value="late">Late</option>
              <option value="peak">Peak</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>AP COST</label>
            <select value={apCost} onChange={e => setApCost(parseInt(e.target.value) as 1|2|3)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
        </div>
        <div className="grid2">
          <div>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>QI COST</label>
            <input type="number" min={0} value={qiCost} onChange={e => setQiCost(parseInt(e.target.value)||0)} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>STRAIN COST (0 = normal)</label>
            <input type="number" min={0} value={strainCost} onChange={e => setStrainCost(parseInt(e.target.value)||0)} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>DAMAGE FORMULA</label>
          <input value={damageFormula} onChange={e => setDamageFormula(e.target.value)} placeholder="e.g. 3×STR mod, 2d8, 4×SPI mod+1d6" />
        </div>
        <div>
          <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>EFFECT</label>
          <textarea value={effect} onChange={e => setEffect(e.target.value)} placeholder="Describe the technique's effect..." rows={3} />
        </div>
        <div className="grid2">
          <div>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>ELEMENT REQUIREMENT</label>
            <input value={elementReq} onChange={e => setElementReq(e.target.value)} placeholder="e.g. Fire, Lightning (or leave blank)" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 20 }}>
            <input type="checkbox" id="forbidden" checked={forbidden} onChange={e => setForbidden(e.target.checked)} style={{ width: 'auto' }} />
            <label htmlFor="forbidden" style={{ fontSize: 12, color: '#ff8888' }}>Forbidden / Cursed</label>
          </div>
        </div>
        <div>
          <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>NOTES</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} placeholder="Design notes, alignment reference..." />
        </div>
        <button className="primary" onClick={handleSave} disabled={!name.trim()}>Save Technique</button>
      </div>
    </div>
  );
}

function AssignTechniquePanel({ campaignId, onClose }: { campaignId: string; onClose: () => void }) {
  const { getCampaign, learnTechnique } = useCampaignStore();
  const campaign = getCampaign(campaignId);
  const [selectedChar, setSelectedChar] = useState('');
  const [selectedTech, setSelectedTech] = useState('');

  if (!campaign) return null;

  const players = campaign.characters.filter(c => !c.isNPC);
  const char = players.find(c => c.id === selectedChar);
  const availableTechs = campaign.techniques.filter(t =>
    !char || (t.realm <= char.realm && !char.techniques.find(ct => ct.id === t.id))
  );

  return (
    <div style={{ background: '#181818', border: '1px solid #333', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ margin: 0 }}>ASSIGN TECHNIQUE</h3>
        <button className="icon-btn" onClick={onClose}>✕</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>CHARACTER</label>
          <select value={selectedChar} onChange={e => setSelectedChar(e.target.value)}>
            <option value="">Select character...</option>
            {players.map(c => <option key={c.id} value={c.id}>{c.name} (R{c.realm} {c.rank})</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>TECHNIQUE</label>
          <select value={selectedTech} onChange={e => setSelectedTech(e.target.value)}>
            <option value="">Select technique...</option>
            {availableTechs.map(t => <option key={t.id} value={t.id}>{t.name} (R{t.realm} {t.type})</option>)}
          </select>
        </div>
        <button className="primary"
          disabled={!selectedChar || !selectedTech}
          onClick={() => { learnTechnique(campaignId, selectedChar, selectedTech); onClose(); }}>
          Assign Technique
        </button>
      </div>
    </div>
  );
}

function BeastCreator({ campaignId, onClose }: { campaignId: string; onClose: () => void }) {
  const { addBeast } = useCampaignStore();
  const [name, setName] = useState('');
  const [realm, setRealm] = useState<Realm>(1);
  const [beastType, setBeastType] = useState('');
  const [description, setDescription] = useState('');
  const [str, setStr] = useState(5);
  const [agi, setAgi] = useState(5);
  const [con, setCon] = useState(5);
  const [spi, setSpi] = useState(5);
  const [int, setInt] = useState(5);
  const [crm, setCrm] = useState(5);
  const [wildAbilities, setWildAbilities] = useState('');
  const [tamedAbilities, setTamedAbilities] = useState('');
  const [tamingDC, setTamingDC] = useState(15);
  const [lootTable, setLootTable] = useState('');
  const [mountStats, setMountStats] = useState('');
  const [weaknesses, setWeaknesses] = useState('');
  const [resistances, setResistances] = useState('');

  function handleSave() {
    if (!name.trim()) return;
    addBeast(campaignId, {
      name, realm, beastType, description,
      str, agi, con, spi, int, crm,
      wildAbilities, tamedAbilities, tamingDC,
      lootTable, mountStats, weaknesses, resistances,
    });
    onClose();
  }

  const attrFields: [string, number, (v: number) => void][] = [
    ['STR', str, setStr], ['AGI', agi, setAgi], ['CON', con, setCon],
    ['SPI', spi, setSpi], ['INT', int, setInt], ['CRM', crm, setCrm],
  ];

  return (
    <div style={{ background: '#181818', border: '1px solid #333', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ margin: 0 }}>NEW BEAST CARD</h3>
        <button className="icon-btn" onClick={onClose}>✕</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Identity */}
        <div className="grid2">
          <div>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>NAME *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Beast name" />
          </div>
          <div>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>BEAST TYPE</label>
            <input value={beastType} onChange={e => setBeastType(e.target.value)} placeholder="Demonic, Spiritual, Ancient…" />
          </div>
        </div>
        <div className="grid2">
          <div>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>REALM</label>
            <select value={realm} onChange={e => setRealm(parseInt(e.target.value) as Realm)}>
              {([1,2,3,4,5,6,7,8] as Realm[]).map(r => (
                <option key={r} value={r}>{REALM_NAMES[r]}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>TAMING DC</label>
            <input type="number" min={1} max={30} value={tamingDC}
              onChange={e => setTamingDC(parseInt(e.target.value) || 15)} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>DESCRIPTION</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Appearance, habitat, lore…" rows={2} />
        </div>

        {/* Attributes */}
        <div>
          <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 8 }}>ATTRIBUTES</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
            {attrFields.map(([label, val, setter]) => (
              <div key={label}>
                <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>{label}</label>
                <input type="number" min={1} max={20} value={val}
                  onChange={e => setter(parseInt(e.target.value) || 1)} />
              </div>
            ))}
          </div>
        </div>

        {/* Abilities */}
        <div className="grid2">
          <div>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>WILD ABILITIES</label>
            <textarea value={wildAbilities} onChange={e => setWildAbilities(e.target.value)}
              placeholder="Abilities when hostile / untamed…" rows={3} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>TAMED ABILITIES</label>
            <textarea value={tamedAbilities} onChange={e => setTamedAbilities(e.target.value)}
              placeholder="Abilities as a companion…" rows={3} />
          </div>
        </div>

        {/* Combat properties */}
        <div className="grid2">
          <div>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>WEAKNESSES</label>
            <input value={weaknesses} onChange={e => setWeaknesses(e.target.value)}
              placeholder="e.g. Fire ×2, Holy" />
          </div>
          <div>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>RESISTANCES</label>
            <input value={resistances} onChange={e => setResistances(e.target.value)}
              placeholder="e.g. Poison immune, Cold ×0.5" />
          </div>
        </div>

        {/* Utility */}
        <div className="grid2">
          <div>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>LOOT / DROP TABLE</label>
            <textarea value={lootTable} onChange={e => setLootTable(e.target.value)}
              placeholder="Materials dropped on death…" rows={2} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>MOUNT STATS</label>
            <textarea value={mountStats} onChange={e => setMountStats(e.target.value)}
              placeholder="Speed bonus, travel modifier… (leave blank if not a mount)" rows={2} />
          </div>
        </div>

        <button className="primary" onClick={handleSave} disabled={!name.trim()}>Save Beast</button>
      </div>
    </div>
  );
}

function BeastCard({ beast }: { beast: Beast }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      background: '#181818', border: '1px solid #2a2a2a',
      marginBottom: 8, fontSize: 12,
    }}>
      {/* Header row — always visible */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 14px', cursor: 'pointer',
      }} onClick={() => setExpanded(e => !e)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#00ffcc', fontSize: 13 }}>{beast.name}</span>
          {beast.beastType && (
            <span style={{ color: '#555', fontSize: 11 }}>{beast.beastType}</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: '#888', fontSize: 11 }}>{REALM_NAMES[beast.realm as Realm]}</span>
          <span style={{ color: '#ffaa00', fontSize: 11 }}>DC {beast.tamingDC}</span>
          <span style={{ color: '#444', fontSize: 11 }}>{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {/* Expanded two-panel detail */}
      {expanded && (
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 0, borderTop: '1px solid #242424',
        }}>
          {/* Left panel: lore */}
          <div style={{ padding: '12px 14px', borderRight: '1px solid #242424' }}>
            {beast.description && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: '#444', marginBottom: 4, letterSpacing: 1 }}>DESCRIPTION</div>
                <div style={{ color: '#888', lineHeight: 1.6 }}>{beast.description}</div>
              </div>
            )}
            {beast.lootTable && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: '#444', marginBottom: 4, letterSpacing: 1 }}>LOOT / DROPS</div>
                <div style={{ color: '#888', lineHeight: 1.6 }}>{beast.lootTable}</div>
              </div>
            )}
            {beast.mountStats && (
              <div>
                <div style={{ fontSize: 10, color: '#444', marginBottom: 4, letterSpacing: 1 }}>MOUNT STATS</div>
                <div style={{ color: '#3399ff', lineHeight: 1.6 }}>{beast.mountStats}</div>
              </div>
            )}
          </div>

          {/* Right panel: mechanics */}
          <div style={{ padding: '12px 14px' }}>
            {/* Attributes */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: '#444', marginBottom: 6, letterSpacing: 1 }}>ATTRIBUTES</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4, textAlign: 'center' }}>
                {(['str', 'agi', 'con', 'spi', 'int', 'crm'] as const).map(attr => (
                  <div key={attr}>
                    <div style={{ color: '#444', fontSize: 10 }}>{attr.toUpperCase()}</div>
                    <div style={{ color: '#ccc' }}>{beast[attr]}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Taming */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: '#444', marginBottom: 4, letterSpacing: 1 }}>TAMING</div>
              <div style={{ color: '#888', fontSize: 11, lineHeight: 1.6 }}>
                DC <span style={{ color: '#ffaa00' }}>{beast.tamingDC}</span>
                {' · '}Req. Realm ≥ <span style={{ color: '#ffaa00' }}>{REALM_NAMES[beast.realm as Realm]}</span>
                {' · '}Beast Taming Rank ≥ <span style={{ color: '#ffaa00' }}>{Math.ceil(beast.realm / 2)}</span>
                <br />
                <span style={{ color: '#555' }}>Weaken to ≤10% HP, then roll 1d20 + CRM mod</span>
              </div>
            </div>

            {/* Weaknesses / Resistances */}
            {(beast.weaknesses || beast.resistances) && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: '#444', marginBottom: 4, letterSpacing: 1 }}>COMBAT PROPERTIES</div>
                {beast.weaknesses && (
                  <div style={{ fontSize: 11, lineHeight: 1.6 }}>
                    <span style={{ color: '#555' }}>Weak: </span>
                    <span style={{ color: '#ff6666' }}>{beast.weaknesses}</span>
                  </div>
                )}
                {beast.resistances && (
                  <div style={{ fontSize: 11, lineHeight: 1.6 }}>
                    <span style={{ color: '#555' }}>Resist: </span>
                    <span style={{ color: '#44cc88' }}>{beast.resistances}</span>
                  </div>
                )}
              </div>
            )}

            {/* Wild Abilities */}
            {beast.wildAbilities && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: '#444', marginBottom: 4, letterSpacing: 1 }}>WILD ABILITIES</div>
                <div style={{ color: '#ff9966', lineHeight: 1.6, fontSize: 11 }}>{beast.wildAbilities}</div>
              </div>
            )}

            {/* Tamed Abilities */}
            {beast.tamedAbilities && (
              <div>
                <div style={{ fontSize: 10, color: '#44cc88', marginBottom: 4, letterSpacing: 1 }}>TAMED ABILITIES</div>
                <div style={{ color: '#88ddaa', lineHeight: 1.6, fontSize: 11 }}>{beast.tamedAbilities}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function GMDashboard() {
  const { id: campaignId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCampaign, awardSE, updateCampaignNotes } = useCampaignStore();
  const campaign = getCampaign(campaignId!);

  const [tab, setTab] = useState<'party' | 'library' | 'notes'>('party');
  const [seType, setSEType] = useState<SEAwardType>('minor');
  const [seCustom, setSECustom] = useState(0);
  const [seTarget, setSETarget] = useState<'all' | string>('all');
  const [notification, setNotification] = useState('');
  const [showTechCreator, setShowTechCreator] = useState(false);
  const [showAssignPanel, setShowAssignPanel] = useState(false);
  const [showBeastCreator, setShowBeastCreator] = useState(false);

  if (!campaign) {
    return <div style={{ padding: 24, color: '#555' }}>Campaign not found.</div>;
  }

  function notify(msg: string) {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  }

  function handleAwardSE() {
    const targets = seTarget === 'all' ? [] : [seTarget];
    awardSE(campaignId!, targets, seType, seType === 'custom' ? seCustom : undefined);
    notify(`SE awarded (${seType}).`);
  }

  const players = campaign.characters.filter(c => !c.isNPC);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {notification && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          background: '#001a14', borderBottom: '1px solid #00ffcc',
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
        <button className="icon-btn" onClick={() => navigate('/')}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#00ffcc', fontSize: 16 }}>{campaign.name}</div>
          <div style={{ color: '#555', fontSize: 11 }}>GM Dashboard · Code: <strong style={{ letterSpacing: 2 }}>{campaign.sessionCode}</strong></div>
        </div>
        <button className="small" onClick={() => navigate(`/campaign/${campaignId}/combat`)}>
          ⚔ Combat
        </button>
        <button className="small primary" onClick={() => navigate(`/campaign/${campaignId}/create`)}>
          + Character
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar: SE Award */}
        <div style={{ width: 240, borderRight: '1px solid #2e2e2e', padding: 16, flexShrink: 0 }}>
          <h3>AWARD SPIRIT ENERGY</h3>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 6 }}>TARGET</label>
            <select value={seTarget} onChange={e => setSETarget(e.target.value)}>
              <option value="all">All Players</option>
              {players.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 6 }}>AWARD TYPE</label>
            {(['minor', 'major', 'milestone', 'custom'] as SEAwardType[]).map(t => (
              <label key={t} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 0', cursor: 'pointer', fontSize: 12,
                color: seType === t ? '#00ffcc' : '#888',
              }}>
                <input type="radio" name="seType" checked={seType === t} onChange={() => setSEType(t)}
                  style={{ width: 'auto', accentColor: '#00ffcc' }} />
                <span>{t.toUpperCase()}</span>
                {t !== 'custom' && (
                  <span style={{ marginLeft: 'auto', color: '#555', fontSize: 11 }}>
                    {seTarget === 'all'
                      ? `~${formatSE(SE_AWARDS[1][t])}`
                      : formatSE(SE_AWARDS[players.find(p => p.id === seTarget)?.realm ?? 1][t])}
                  </span>
                )}
              </label>
            ))}
          </div>

          {seType === 'custom' && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, color: '#666', display: 'block', marginBottom: 4 }}>AMOUNT</label>
              <input type="number" min={0} value={seCustom} onChange={e => setSECustom(parseInt(e.target.value)||0)} />
            </div>
          )}

          <button className="primary" onClick={handleAwardSE} style={{ width: '100%' }}>
            Award SE
          </button>

          <hr className="divider" />

          <div style={{ fontSize: 11, color: '#555', lineHeight: 1.6 }}>
            SE is multiplied by each character's Spirit Root bonus before being applied. Rank advances auto-trigger at thresholds.
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          <div style={{ borderBottom: '1px solid #2e2e2e', marginBottom: 20 }}>
            {(['party', 'library', 'notes'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  background: 'transparent',
                  borderTop: 'none', borderLeft: 'none', borderRight: 'none',
                  borderBottom: tab === t ? '2px solid #00ffcc' : '2px solid transparent',
                  color: tab === t ? '#00ffcc' : '#555',
                  padding: '8px 16px', fontSize: 12, letterSpacing: 1, marginRight: 8,
                }}
              >
                {t === 'party' ? 'PARTY' : t === 'library' ? 'GM LIBRARY' : 'NOTES'}
              </button>
            ))}
          </div>

          {tab === 'party' && (
            <div>
              {players.length === 0 ? (
                <div style={{ color: '#444', padding: '40px 0', textAlign: 'center' }}>
                  No player characters yet.{' '}
                  <button className="small primary" onClick={() => navigate(`/campaign/${campaignId}/create`)}>
                    Create First Character
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                  {players.map(char => (
                    <CharacterCard key={char.id} char={char} campaignId={campaignId!} />
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'library' && (
            <div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                <button onClick={() => { setShowTechCreator(!showTechCreator); setShowAssignPanel(false); setShowBeastCreator(false); }}>
                  {showTechCreator ? '✕ Close' : '+ New Technique'}
                </button>
                <button onClick={() => { setShowAssignPanel(!showAssignPanel); setShowTechCreator(false); setShowBeastCreator(false); }}>
                  {showAssignPanel ? '✕ Close' : '→ Assign Technique'}
                </button>
                <button onClick={() => { setShowBeastCreator(!showBeastCreator); setShowTechCreator(false); setShowAssignPanel(false); }}>
                  {showBeastCreator ? '✕ Close' : '+ New Beast'}
                </button>
              </div>

              {showTechCreator && (
                <div style={{ marginBottom: 20 }}>
                  <TechniqueCreator campaignId={campaignId!} onClose={() => setShowTechCreator(false)} />
                </div>
              )}
              {showAssignPanel && (
                <div style={{ marginBottom: 20 }}>
                  <AssignTechniquePanel campaignId={campaignId!} onClose={() => setShowAssignPanel(false)} />
                </div>
              )}
              {showBeastCreator && (
                <div style={{ marginBottom: 20 }}>
                  <BeastCreator campaignId={campaignId!} onClose={() => setShowBeastCreator(false)} />
                </div>
              )}

              <h3>TECHNIQUE LIBRARY ({campaign.techniques.length})</h3>
              {campaign.techniques.length === 0 ? (
                <div style={{ color: '#444', fontSize: 12 }}>No techniques created yet.</div>
              ) : (
                campaign.techniques.map(t => (
                  <div key={t.id} style={{
                    background: '#181818', border: '1px solid #2a2a2a',
                    padding: '10px 14px', marginBottom: 6,
                    display: 'grid', gridTemplateColumns: '1fr 40px 60px 60px 60px 120px',
                    alignItems: 'center', gap: 8, fontSize: 12,
                  }}>
                    <div>
                      <span style={{ color: '#00ffcc' }}>{t.name}</span>
                      {t.isForbidden && <span style={{ color: '#ff4444', fontSize: 10, marginLeft: 6 }}>[FORBIDDEN]</span>}
                      {t.elementRequirement && <span style={{ color: '#ffaa00', fontSize: 10, marginLeft: 6 }}>[{t.elementRequirement}]</span>}
                      <div style={{ color: '#555', fontSize: 11, marginTop: 2 }}>{t.effect}</div>
                    </div>
                    <div style={{ textAlign: 'center', color: '#999' }}>{t.apCost}AP</div>
                    <div style={{ textAlign: 'center', color: '#3366cc' }}>{t.qiCost} Qi</div>
                    <div style={{ textAlign: 'center', color: t.strainCost > 0 ? '#ff4444' : '#444' }}>{t.strainCost} Strain</div>
                    <div style={{ textAlign: 'center', color: '#555' }}>R{t.realm} {t.rank}</div>
                    <div style={{ textAlign: 'center', color: '#555' }}>{t.type}</div>
                  </div>
                ))
              )}
              <h3 style={{ marginTop: 28 }}>BEAST LIBRARY ({campaign.beasts.length})</h3>
              {campaign.beasts.length === 0 ? (
                <div style={{ color: '#444', fontSize: 12 }}>No beasts created yet.</div>
              ) : (
                campaign.beasts.map(b => <BeastCard key={b.id} beast={b} />)
              )}
            </div>
          )}

          {tab === 'notes' && (
            <div>
              <h3>CAMPAIGN NOTES</h3>
              <textarea
                value={campaign.campaignNotes}
                onChange={e => updateCampaignNotes(campaignId!, e.target.value)}
                placeholder="Session notes, plot threads, world lore, NPC details..."
                rows={20}
                style={{ width: '100%' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
