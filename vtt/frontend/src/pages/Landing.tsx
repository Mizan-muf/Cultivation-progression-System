import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCampaignStore } from '../store/campaignStore';

export function Landing() {
  const navigate = useNavigate();
  const { createCampaign, joinCampaign, setGMToken } = useCampaignStore();
  const [tab, setTab] = useState<'create' | 'join'>('create');
  const [campaignName, setCampaignName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState('');

  function handleCreate() {
    if (!campaignName.trim()) { setError('Enter a campaign name.'); return; }
    const campaign = createCampaign(campaignName.trim());
    navigate(`/campaign/${campaign.id}/gm`);
  }

  function handleJoin() {
    if (!joinCode.trim()) { setError('Enter a session code.'); return; }
    const campaign = joinCampaign(joinCode.trim());
    if (!campaign) { setError('No campaign found with that code.'); return; }
    navigate(`/campaign/${campaign.id}/lobby`);
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <h1 style={{ fontSize: 32, marginBottom: 6 }}>XANXIA</h1>
      <div style={{ color: '#555', letterSpacing: 3, marginBottom: 40, fontSize: 12 }}>
        CULTIVATION TTRPG — VIRTUAL TABLE TOP
      </div>

      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #2e2e2e', marginBottom: 24 }}>
          {(['create', 'join'] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(''); }}
              style={{
                flex: 1, background: 'transparent',
                borderBottom: tab === t ? '2px solid #00ffcc' : '2px solid transparent',
                borderTop: 'none', borderLeft: 'none', borderRight: 'none',
                color: tab === t ? '#00ffcc' : '#666',
                paddingBottom: 10, fontSize: 12, letterSpacing: 2,
              }}
            >
              {t === 'create' ? 'NEW CAMPAIGN' : 'JOIN CAMPAIGN'}
            </button>
          ))}
        </div>

        {tab === 'create' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, color: '#666', letterSpacing: 1, display: 'block', marginBottom: 6 }}>
                CAMPAIGN NAME
              </label>
              <input
                value={campaignName}
                onChange={e => setCampaignName(e.target.value)}
                placeholder="Enter campaign name..."
                onKeyDown={e => e.key === 'Enter' && handleCreate()}
              />
            </div>
            <button className="primary" onClick={handleCreate} style={{ marginTop: 8 }}>
              Create Campaign
            </button>
            <p style={{ fontSize: 11, color: '#555', textAlign: 'center', lineHeight: 1.5 }}>
              You will be the GM. A 6-character session code will be generated for players to join.
            </p>
          </div>
        )}

        {tab === 'join' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, color: '#666', letterSpacing: 1, display: 'block', marginBottom: 6 }}>
                SESSION CODE
              </label>
              <input
                value={joinCode}
                onChange={e => setJoinCode(e.target.value.toUpperCase())}
                placeholder="e.g. AB3X9Z"
                maxLength={6}
                style={{ textTransform: 'uppercase', letterSpacing: 4, textAlign: 'center', fontSize: 18 }}
                onKeyDown={e => e.key === 'Enter' && handleJoin()}
              />
            </div>
            <button className="primary" onClick={handleJoin} style={{ marginTop: 8 }}>
              Join Campaign
            </button>
            <p style={{ fontSize: 11, color: '#555', textAlign: 'center', lineHeight: 1.5 }}>
              Ask your GM for the 6-character session code.
            </p>
          </div>
        )}

        {error && (
          <div style={{ marginTop: 12, color: '#ff4444', fontSize: 12, textAlign: 'center' }}>
            {error}
          </div>
        )}
      </div>

      <div style={{ position: 'absolute', bottom: 24, color: '#333', fontSize: 11, letterSpacing: 1 }}>
        DATA STORED LOCALLY IN BROWSER
      </div>
    </div>
  );
}
