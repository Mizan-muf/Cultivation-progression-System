import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCampaignStore } from '../store/campaignStore';
import {
  getMaxHP, getMaxQI, getMaxStrain, getStrainStage,
} from '../lib/gameFormulas';
import type { Combatant } from '../lib/types';

const STRAIN_COLORS: Record<string, string> = {
  clear: '#44dd77', strained: '#ffaa00', overloaded: '#ff8800', critical: '#ff4444', death: '#ff0000',
};

function CombatantRow({
  combatant, isActive, onUpdate,
}: {
  combatant: Combatant;
  isActive: boolean;
  onUpdate: (updates: Partial<Combatant>) => void;
}) {
  const hpPct = combatant.hpMax > 0 ? Math.max(0, combatant.hpCurrent / combatant.hpMax) : 0;
  const qiPct = combatant.qiMax > 0 ? Math.max(0, combatant.qiCurrent / combatant.qiMax) : 0;
  const strainStage = getStrainStage(combatant.strainCurrent, combatant.strainMax);

  return (
    <div style={{
      background: isActive ? '#0d1a12' : '#181818',
      border: `1px solid ${isActive ? '#00ffcc' : '#2a2a2a'}`,
      padding: '12px 16px', marginBottom: 6,
      display: 'grid',
      gridTemplateColumns: '200px 1fr 80px 80px 100px 120px',
      gap: 12, alignItems: 'center',
    }}>
      {/* Name & initiative */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {isActive && <span style={{ color: '#00ffcc', fontSize: 12 }}>▶</span>}
          <span style={{ color: isActive ? '#00ffcc' : '#e8e8e8', fontSize: 14 }}>{combatant.name}</span>
        </div>
        <div style={{ color: '#555', fontSize: 11 }}>Init: {combatant.initiative}</div>
        {combatant.statusEffects.length > 0 && (
          <div style={{ fontSize: 10, color: '#ffaa00', marginTop: 2 }}>
            {combatant.statusEffects.join(', ')}
          </div>
        )}
      </div>

      {/* HP + Qi bars */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 10, color: '#cc3333', width: 20 }}>HP</span>
          <div style={{ flex: 1, background: '#111', height: 8 }}>
            <div style={{ width: `${hpPct * 100}%`, height: '100%', background: '#cc3333' }} />
          </div>
          <span style={{ fontSize: 11, color: '#aaa', minWidth: 60, textAlign: 'right' }}>
            {combatant.hpCurrent}/{combatant.hpMax}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, color: '#3366cc', width: 20 }}>QI</span>
          <div style={{ flex: 1, background: '#111', height: 8 }}>
            <div style={{ width: `${qiPct * 100}%`, height: '100%', background: '#3366cc' }} />
          </div>
          <span style={{ fontSize: 11, color: '#aaa', minWidth: 60, textAlign: 'right' }}>
            {combatant.qiCurrent}/{combatant.qiMax}
          </span>
        </div>
      </div>

      {/* Strain */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: STRAIN_COLORS[strainStage], fontSize: 12 }}>
          {combatant.strainCurrent}/{combatant.strainMax}
        </div>
        <div style={{ fontSize: 10, color: STRAIN_COLORS[strainStage] }}>
          {strainStage.toUpperCase()}
        </div>
      </div>

      {/* AP */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#e8e8e8', fontSize: 16 }}>{combatant.apRemaining}</div>
        <div style={{ fontSize: 10, color: '#555' }}>AP LEFT</div>
      </div>

      {/* Quick HP modify */}
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <button className="small danger" onClick={() => onUpdate({ hpCurrent: Math.max(0, combatant.hpCurrent - 1) })}>-1</button>
        <input
          type="number"
          value={combatant.hpCurrent}
          onChange={e => onUpdate({ hpCurrent: Math.max(0, Math.min(combatant.hpMax, parseInt(e.target.value) || 0)) })}
          style={{ width: 50, textAlign: 'center', padding: '2px 4px', fontSize: 12 }}
        />
        <button className="small success-text" style={{ border: '1px solid #44dd77' }}
          onClick={() => onUpdate({ hpCurrent: Math.min(combatant.hpMax, combatant.hpCurrent + 1) })}>+1</button>
      </div>

      {/* AP actions */}
      <div style={{ display: 'flex', gap: 4 }}>
        {[1,2,3].map(ap => (
          <button key={ap} className="small"
            style={{ color: combatant.apRemaining >= ap ? '#00ffcc' : '#333', border: `1px solid ${combatant.apRemaining >= ap ? '#00b38a' : '#2a2a2a'}` }}
            onClick={() => onUpdate({ apRemaining: Math.max(0, combatant.apRemaining - ap) })}>
            -{ap}
          </button>
        ))}
        <button className="small" onClick={() => onUpdate({ apRemaining: 3 })}>R</button>
      </div>
    </div>
  );
}

interface CombatantSetup {
  name: string;
  initiative: number;
  hpMax: number;
  qiMax: number;
  strainMax: number;
}

export function CombatTracker() {
  const { id: campaignId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCampaign, startCombat, endCombat, nextTurn, updateCombatant } = useCampaignStore();
  const campaign = getCampaign(campaignId!);

  const [setup, setSetup] = useState<CombatantSetup[]>([]);
  const [newCombatant, setNewCombatant] = useState<CombatantSetup>({ name: '', initiative: 10, hpMax: 20, qiMax: 20, strainMax: 12 });

  if (!campaign) return <div style={{ padding: 24, color: '#555' }}>Campaign not found.</div>;

  const combat = campaign.combat;

  function addSetupCombatant() {
    if (!newCombatant.name.trim()) return;
    setSetup(prev => [...prev, newCombatant]);
    setNewCombatant({ name: '', initiative: 10, hpMax: 20, qiMax: 20, strainMax: 12 });
  }

  function addFromParty() {
    if (!campaign) return;
    const partyMembers = campaign.characters.filter(c => !c.isNPC);
    const additions: CombatantSetup[] = partyMembers.map(c => ({
      name: c.name,
      initiative: c.agi,
      hpMax: getMaxHP(c.con, c.realm, c.rank),
      qiMax: getMaxQI(c.spi, c.realm, c.rank),
      strainMax: getMaxStrain(c.realm),
    }));
    setSetup(prev => {
      const existing = new Set(prev.map(p => p.name));
      return [...prev, ...additions.filter(a => !existing.has(a.name))];
    });
  }

  function handleStart() {
    if (setup.length < 1) return;
    startCombat(campaignId!, setup.map(s => ({
      characterId: null,
      name: s.name,
      initiative: s.initiative,
      hpCurrent: s.hpMax,
      hpMax: s.hpMax,
      qiCurrent: s.qiMax,
      qiMax: s.qiMax,
      strainCurrent: 0,
      strainMax: s.strainMax,
      apRemaining: 3,
      statusEffects: [],
    })));
    setSetup([]);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        background: '#141414', borderBottom: '1px solid #2e2e2e',
        padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <button className="icon-btn" onClick={() => navigate(-1)}>←</button>
        <h1 style={{ flex: 1, fontSize: 18 }}>
          {combat ? `COMBAT — ROUND ${combat.round}` : 'COMBAT TRACKER'}
        </h1>
        {combat && (
          <button className="danger" onClick={() => endCombat(campaignId!)}>End Combat</button>
        )}
      </div>

      <div style={{ flex: 1, padding: 20, overflowY: 'auto' }}>
        {!combat ? (
          <div style={{ maxWidth: 600 }}>
            <h2>SETUP ENCOUNTER</h2>

            <div style={{ marginBottom: 20 }}>
              <button onClick={addFromParty} style={{ marginBottom: 12 }}>
                + Add All Party Members
              </button>
              {setup.map((s, i) => (
                <div key={i} style={{
                  background: '#181818', border: '1px solid #2a2a2a',
                  padding: '8px 12px', marginBottom: 4,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12,
                }}>
                  <span style={{ color: '#00ffcc' }}>{s.name}</span>
                  <span style={{ color: '#555' }}>Init: {s.initiative} | HP: {s.hpMax} | Qi: {s.qiMax} | Strain: {s.strainMax}</span>
                  <button className="small icon-btn" onClick={() => setSetup(prev => prev.filter((_, j) => j !== i))}>✕</button>
                </div>
              ))}
            </div>

            <div style={{ background: '#181818', border: '1px solid #2a2a2a', padding: 16, marginBottom: 20 }}>
              <h3>ADD COMBATANT</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 80px 80px 40px', gap: 8, alignItems: 'end' }}>
                <div>
                  <label style={{ fontSize: 10, color: '#555', display: 'block', marginBottom: 4 }}>NAME</label>
                  <input value={newCombatant.name} onChange={e => setNewCombatant(p => ({...p, name: e.target.value}))}
                    placeholder="Name..." onKeyDown={e => e.key === 'Enter' && addSetupCombatant()} />
                </div>
                {(['initiative','hpMax','qiMax','strainMax'] as const).map((field, i) => (
                  <div key={field}>
                    <label style={{ fontSize: 10, color: '#555', display: 'block', marginBottom: 4 }}>
                      {['INIT','HP','QI','STRAIN'][i]}
                    </label>
                    <input type="number" value={newCombatant[field]}
                      onChange={e => setNewCombatant(p => ({...p, [field]: parseInt(e.target.value)||0}))} />
                  </div>
                ))}
                <button className="primary" onClick={addSetupCombatant} style={{ height: 34 }}>+</button>
              </div>
            </div>

            <button className="primary" onClick={handleStart} disabled={setup.length === 0}
              style={{ width: '100%' }}>
              Begin Combat ({setup.length} combatants)
            </button>
          </div>
        ) : (
          <div>
            <div style={{
              display: 'flex', gap: 20, marginBottom: 20,
              padding: '12px 16px', background: '#0d1010', border: '1px solid #2e2e2e',
            }}>
              <div>
                <span style={{ color: '#555', fontSize: 11 }}>ROUND </span>
                <span style={{ color: '#00ffcc', fontSize: 20 }}>{combat.round}</span>
              </div>
              <div>
                <span style={{ color: '#555', fontSize: 11 }}>ACTIVE </span>
                <span style={{ color: '#00ffcc', fontSize: 14 }}>
                  {combat.combatants[combat.activeCombatantIndex]?.name}
                </span>
              </div>
              <button className="primary" onClick={() => nextTurn(campaignId!)} style={{ marginLeft: 'auto' }}>
                Next Turn →
              </button>
            </div>

            {combat.combatants.map(cb => (
              <CombatantRow
                key={cb.id}
                combatant={cb}
                isActive={cb.isCurrentTurn}
                onUpdate={updates => updateCombatant(campaignId!, cb.id, updates)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
