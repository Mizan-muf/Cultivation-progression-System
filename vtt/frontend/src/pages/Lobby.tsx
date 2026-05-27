import { useParams, useNavigate } from 'react-router-dom';
import { useCampaignStore } from '../store/campaignStore';

export function Lobby() {
  const { id: campaignId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCampaign, setActiveCharacter } = useCampaignStore();
  const campaign = getCampaign(campaignId!);

  if (!campaign) {
    return <div style={{ padding: 24, color: '#555' }}>Campaign not found.</div>;
  }

  return (
    <div style={{ minHeight: '100vh', padding: 24 }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <h1>{campaign.name}</h1>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
            <span style={{ color: '#555', fontSize: 12 }}>Session Code:</span>
            <span style={{
              fontSize: 20, letterSpacing: 4, color: '#00ffcc',
              border: '1px solid #2e2e2e', padding: '4px 16px', background: '#0a0a0a',
            }}>
              {campaign.sessionCode}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2>SELECT YOUR CHARACTER</h2>
          {campaign.characters.filter(c => !c.isNPC).length === 0 ? (
            <div style={{ color: '#555', marginBottom: 16 }}>No characters yet.</div>
          ) : (
            campaign.characters.filter(c => !c.isNPC).map(char => (
              <div
                key={char.id}
                onClick={() => { setActiveCharacter(char.id); navigate(`/campaign/${campaignId}/character/${char.id}`); }}
                style={{
                  background: '#1a1a1a', border: '1px solid #2e2e2e',
                  padding: 16, marginBottom: 8, cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ color: '#00ffcc', fontSize: 15 }}>{char.name}</div>
                  <div style={{ color: '#555', fontSize: 12 }}>{char.playerName} · {char.spiritRoot.name}</div>
                </div>
                <div style={{ color: '#888', fontSize: 12 }}>
                  R{char.realm} {char.rank.toUpperCase()}
                </div>
              </div>
            ))
          )}
        </div>

        <button
          className="primary"
          onClick={() => navigate(`/campaign/${campaignId}/create`)}
          style={{ width: '100%', marginBottom: 12 }}
        >
          + Create New Character
        </button>
      </div>
    </div>
  );
}
