import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SpinWheel } from '../components/SpinWheel';
import { SPIRIT_ROOTS, GRADE_LABELS } from '../lib/spiritRootData';
import { PHYSIQUES } from '../lib/physiqueData';
import { getMaxHP, getMaxQI, getAttrMod, REALM_NAMES, RANK_LABELS } from '../lib/gameFormulas';
import { useCampaignStore } from '../store/campaignStore';
import type { SpiritRootItem, PhysiqueItem, WheelItem } from '../lib/types';

const ATTRS = ['str', 'agi', 'con', 'spi', 'int', 'crm'] as const;
type Attr = typeof ATTRS[number];
const ATTR_LABELS: Record<Attr, string> = {
  str: 'STR', agi: 'AGI', con: 'CON', spi: 'SPI', int: 'INT', crm: 'CRM',
};
const ATTR_DESCS: Record<Attr, string> = {
  str: 'Melee damage, raw force',
  agi: 'Evasion, speed, initiative',
  con: 'Max HP, physical DR',
  spi: 'Max Qi, spiritual DR, spells',
  int: 'Comprehension, crafting',
  crm: 'Charm, beast taming, social',
};

const TOTAL_POINTS = 20;
const MIN_ATTR = 1;
const MAX_ATTR = 8;

type Step = 1 | 2 | 3 | 4 | 5;

export function CharacterCreation() {
  const { id: campaignId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { createCharacter } = useCampaignStore();

  const [step, setStep] = useState<Step>(1);

  const [playerName, setPlayerName] = useState('');
  const [charName, setCharName] = useState('');
  const [daoistTitle, setDaoistTitle] = useState('');
  const [sect, setSect] = useState('');
  const [path, setPath] = useState('');

  const [spiritRoot, setSpiritRoot] = useState<SpiritRootItem | null>(null);
  const [subRoot, setSubRoot] = useState<SpiritRootItem | null>(null);
  const [showSubWheel, setShowSubWheel] = useState(false);

  const [physique, setPhysique] = useState<PhysiqueItem | null>(null);

  const [attrs, setAttrs] = useState<Record<Attr, number>>({
    str: 1, agi: 1, con: 1, spi: 1, int: 1, crm: 1,
  });
  const spent = Object.values(attrs).reduce((a, b) => a + b, 0);
  const remaining = TOTAL_POINTS - spent;

  function setAttr(attr: Attr, val: number) {
    if (val < MIN_ATTR || val > MAX_ATTR) return;
    const delta = val - attrs[attr];
    if (delta > 0 && remaining <= 0) return;
    setAttrs(prev => ({ ...prev, [attr]: val }));
  }

  function handleSpiritRootResult(item: WheelItem) {
    const root = item as SpiritRootItem;
    setSpiritRoot(root);
    setSubRoot(null);
    if (root.hasSub && root.subItems && root.subItems.length > 0) {
      setShowSubWheel(true);
    } else {
      setShowSubWheel(false);
    }
  }

  function handleSubRootResult(item: WheelItem) {
    setSubRoot(item as SpiritRootItem);
  }

  function handlePhysiqueResult(item: WheelItem) {
    setPhysique(item as PhysiqueItem);
  }

  function canProceedStep1() {
    return playerName.trim() && charName.trim();
  }

  function canProceedStep2() {
    if (!spiritRoot) return false;
    if (spiritRoot.hasSub && !subRoot) return false;
    return true;
  }

  function canProceedStep3() {
    return physique !== null;
  }

  function canProceedStep4() {
    return remaining === 0;
  }

  function handleCreate() {
    if (!campaignId || !spiritRoot || !physique) return;
    const char = createCharacter(campaignId, {
      playerName, name: charName, daoistTitle, sect, path,
      spiritRoot, subRoot,
      physique,
      ...attrs,
    });
    navigate(`/campaign/${campaignId}/character/${char.id}`);
  }

  const steps = [
    { num: 1, label: 'Identity' },
    { num: 2, label: 'Spirit Root' },
    { num: 3, label: 'Physique' },
    { num: 4, label: 'Attributes' },
    { num: 5, label: 'Review' },
  ];

  return (
    <div style={{ minHeight: '100vh', padding: 24 }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ marginBottom: 4 }}>CHARACTER CREATION</h1>
          <div style={{ color: '#555', fontSize: 11, letterSpacing: 1 }}>
            {campaignId ? `Campaign ${campaignId.slice(0, 6).toUpperCase()}` : ''}
          </div>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 32 }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 28, height: 28,
                  border: `1px solid ${step >= s.num ? '#00ffcc' : '#333'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, color: step >= s.num ? '#00ffcc' : '#444',
                  background: step === s.num ? '#001a14' : 'transparent',
                }}>
                  {s.num}
                </div>
                <div style={{ fontSize: 10, color: step >= s.num ? '#999' : '#444', letterSpacing: 1 }}>
                  {s.label.toUpperCase()}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ height: 1, flex: 0.5, background: step > s.num ? '#00b38a' : '#2e2e2e', marginBottom: 22 }} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Identity */}
        {step === 1 && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2>CULTIVATOR IDENTITY</h2>
            <div className="grid2">
              <div>
                <label style={{ fontSize: 11, color: '#666', letterSpacing: 1, display: 'block', marginBottom: 6 }}>
                  PLAYER NAME *
                </label>
                <input value={playerName} onChange={e => setPlayerName(e.target.value)} placeholder="Your name" />
              </div>
              <div>
                <label style={{ fontSize: 11, color: '#666', letterSpacing: 1, display: 'block', marginBottom: 6 }}>
                  CHARACTER NAME *
                </label>
                <input value={charName} onChange={e => setCharName(e.target.value)} placeholder="Cultivator's name" />
              </div>
            </div>
            <div className="grid2">
              <div>
                <label style={{ fontSize: 11, color: '#666', letterSpacing: 1, display: 'block', marginBottom: 6 }}>
                  DAOIST TITLE
                </label>
                <input value={daoistTitle} onChange={e => setDaoistTitle(e.target.value)} placeholder="e.g. Sword Saint" />
              </div>
              <div>
                <label style={{ fontSize: 11, color: '#666', letterSpacing: 1, display: 'block', marginBottom: 6 }}>
                  SECT / CLAN
                </label>
                <input value={sect} onChange={e => setSect(e.target.value)} placeholder="e.g. Azure Peak Sect" />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 11, color: '#666', letterSpacing: 1, display: 'block', marginBottom: 6 }}>
                PATH / ALIGNMENT
              </label>
              <input value={path} onChange={e => setPath(e.target.value)} placeholder="e.g. Sword Dao, Righteous Path" />
            </div>
          </div>
        )}

        {/* Step 2: Spirit Root */}
        {step === 2 && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
            <h2>SPIRIT ROOT</h2>
            <p style={{ color: '#666', fontSize: 12, textAlign: 'center', lineHeight: 1.6 }}>
              Spin the wheel to determine your innate elemental affinity. Rarer roots grant faster cultivation but harder breakthroughs.
            </p>
            <SpinWheel items={SPIRIT_ROOTS} label="Spirit Root" onResult={handleSpiritRootResult} size={340} />

            {spiritRoot && (
              <div style={{ background: '#000', border: '1px solid #333', padding: 16, width: '100%', maxWidth: 340 }}>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 11, color: '#ffaa00' }}>GRADE {spiritRoot.grade} — </span>
                  <span style={{ fontSize: 11, color: '#ffaa00' }}>{GRADE_LABELS[spiritRoot.grade]}</span>
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
                  <div>
                    <div style={{ color: '#666', marginBottom: 2 }}>SE BONUS</div>
                    <div style={{ color: '#00ffcc' }}>×{spiritRoot.expMultiplier.toFixed(2)}</div>
                  </div>
                  <div>
                    <div style={{ color: '#666', marginBottom: 2 }}>BREAKTHROUGH DC</div>
                    <div style={{ color: spiritRoot.breakthroughDCMod > 0 ? '#ff4444' : spiritRoot.breakthroughDCMod < 0 ? '#44dd77' : '#999' }}>
                      {spiritRoot.breakthroughDCMod > 0 ? '+' : ''}{spiritRoot.breakthroughDCMod}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showSubWheel && spiritRoot?.subItems && (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{ color: '#666', fontSize: 12, letterSpacing: 1 }}>
                  AUTO-SPINNING ELEMENT COMBINATION...
                </div>
                <SpinWheel
                  items={spiritRoot.subItems}
                  label="Element Combination"
                  onResult={handleSubRootResult}
                  size={280}
                />
                {subRoot && (
                  <div style={{ color: '#00ffcc', fontSize: 13 }}>
                    ✓ Combination: <strong>{subRoot.name}</strong>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Physique */}
        {step === 3 && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
            <h2>PHYSIQUE / BLOODLINE</h2>
            <p style={{ color: '#666', fontSize: 12, textAlign: 'center', lineHeight: 1.6 }}>
              Spin the wheel to determine your body constitution. Physique grants passive traits that persist throughout your cultivation journey.
            </p>
            <SpinWheel items={PHYSIQUES} label="Physique" onResult={handlePhysiqueResult} size={340} />
          </div>
        )}

        {/* Step 4: Attributes */}
        {step === 4 && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ margin: 0 }}>CORE ATTRIBUTES</h2>
              <div style={{
                padding: '4px 12px',
                border: `1px solid ${remaining === 0 ? '#44dd77' : remaining < 0 ? '#ff4444' : '#ffaa00'}`,
                color: remaining === 0 ? '#44dd77' : remaining < 0 ? '#ff4444' : '#ffaa00',
                fontSize: 12,
              }}>
                {remaining > 0 ? `${remaining} POINTS REMAINING` : remaining === 0 ? 'ALL POINTS SPENT ✓' : 'OVER BUDGET!'}
              </div>
            </div>
            <p style={{ color: '#555', fontSize: 12, marginBottom: 20, lineHeight: 1.5 }}>
              Distribute 20 points. Min 1, max 8 per attribute. These are your starting values — they grow through cultivation.
            </p>
            {ATTRS.map(attr => {
              const mod = getAttrMod(attrs[attr]);
              return (
                <div key={attr} style={{
                  display: 'grid', gridTemplateColumns: '60px 1fr 120px 60px',
                  alignItems: 'center', gap: 12, marginBottom: 12, padding: '8px 0',
                  borderBottom: '1px solid #1e1e1e',
                }}>
                  <div>
                    <div style={{ color: '#00ffcc', fontSize: 14, fontWeight: 'bold' }}>{ATTR_LABELS[attr]}</div>
                    <div style={{ color: '#555', fontSize: 10 }}>{mod >= 0 ? '+' : ''}{mod} mod</div>
                  </div>
                  <div style={{ color: '#666', fontSize: 11 }}>{ATTR_DESCS[attr]}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button
                      className="small icon-btn"
                      onClick={() => setAttr(attr, attrs[attr] - 1)}
                      disabled={attrs[attr] <= MIN_ATTR}
                    >−</button>
                    <div style={{
                      width: 36, height: 36,
                      border: '1px solid #444',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, color: '#fff',
                    }}>
                      {attrs[attr]}
                    </div>
                    <button
                      className="small icon-btn"
                      onClick={() => setAttr(attr, attrs[attr] + 1)}
                      disabled={attrs[attr] >= MAX_ATTR || remaining <= 0}
                    >+</button>
                  </div>
                  <div style={{ fontSize: 11, color: '#555', textAlign: 'center' }}>
                    / {MAX_ATTR} max
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && spiritRoot && physique && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card">
              <h2>IDENTITY</h2>
              <div className="grid2" style={{ gap: 8, fontSize: 13 }}>
                <div><span style={{ color: '#555' }}>Name: </span><span style={{ color: '#00ffcc' }}>{charName}</span></div>
                <div><span style={{ color: '#555' }}>Player: </span>{playerName}</div>
                <div><span style={{ color: '#555' }}>Title: </span>{daoistTitle || '—'}</div>
                <div><span style={{ color: '#555' }}>Sect: </span>{sect || '—'}</div>
                <div><span style={{ color: '#555' }}>Path: </span>{path || '—'}</div>
                <div><span style={{ color: '#555' }}>Realm: </span>{REALM_NAMES[1]} — {RANK_LABELS['early']}</div>
              </div>
            </div>
            <div className="grid2">
              <div className="card">
                <h2>SPIRIT ROOT</h2>
                <div style={{ color: '#00ffcc', fontSize: 14, marginBottom: 4 }}>{spiritRoot.name}</div>
                {subRoot && <div style={{ color: '#aaa', fontSize: 12, marginBottom: 8 }}>{subRoot.name}</div>}
                <div style={{ color: '#555', fontSize: 11, marginBottom: 4 }}>{spiritRoot.tier.label}</div>
                <div style={{ fontSize: 12 }}>
                  <span style={{ color: '#555' }}>SE Multiplier: </span>
                  <span style={{ color: '#00ffcc' }}>×{spiritRoot.expMultiplier}</span>
                </div>
                <div style={{ fontSize: 12 }}>
                  <span style={{ color: '#555' }}>Breakthrough: </span>
                  <span style={{ color: spiritRoot.breakthroughDCMod > 0 ? '#ff4444' : '#44dd77' }}>
                    DC {15 + spiritRoot.breakthroughDCMod}
                  </span>
                </div>
              </div>
              <div className="card">
                <h2>PHYSIQUE</h2>
                <div style={{ color: '#00ffcc', fontSize: 14, marginBottom: 4 }}>{physique.name}</div>
                <div style={{ color: '#555', fontSize: 11, marginBottom: 8 }}>{physique.tier.label}</div>
                <div style={{ color: '#aaa', fontSize: 12, lineHeight: 1.4 }}>{physique.desc}</div>
              </div>
            </div>
            <div className="card">
              <h2>ATTRIBUTES & STARTING RESOURCES</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
                {ATTRS.map(attr => {
                  const mod = getAttrMod(attrs[attr]);
                  return (
                    <div key={attr} style={{
                      background: '#181818', border: '1px solid #2e2e2e',
                      padding: '10px', textAlign: 'center',
                    }}>
                      <div style={{ color: '#555', fontSize: 11, marginBottom: 4 }}>{ATTR_LABELS[attr]}</div>
                      <div style={{ color: '#fff', fontSize: 20 }}>{attrs[attr]}</div>
                      <div style={{ color: '#555', fontSize: 11 }}>{mod >= 0 ? '+' : ''}{mod}</div>
                    </div>
                  );
                })}
              </div>
              <div className="grid3" style={{ fontSize: 12 }}>
                <div>
                  <span style={{ color: '#555' }}>Max HP: </span>
                  <span style={{ color: '#cc3333' }}>{getMaxHP(attrs.con, 1, 'early')}</span>
                </div>
                <div>
                  <span style={{ color: '#555' }}>Max Qi: </span>
                  <span style={{ color: '#3366cc' }}>{getMaxQI(attrs.spi, 1, 'early')}</span>
                </div>
                <div>
                  <span style={{ color: '#555' }}>Max Strain: </span>
                  <span style={{ color: '#cc6600' }}>12</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
          <button
            onClick={() => setStep(prev => Math.max(1, prev - 1) as Step)}
            disabled={step === 1}
          >
            ← Back
          </button>
          {step < 5 ? (
            <button
              className="primary"
              onClick={() => setStep(prev => (prev + 1) as Step)}
              disabled={
                (step === 1 && !canProceedStep1()) ||
                (step === 2 && !canProceedStep2()) ||
                (step === 3 && !canProceedStep3()) ||
                (step === 4 && !canProceedStep4())
              }
            >
              Next →
            </button>
          ) : (
            <button
              className="primary"
              onClick={handleCreate}
              disabled={!spiritRoot || !physique || remaining !== 0}
            >
              Create Cultivator
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
