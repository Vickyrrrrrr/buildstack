import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#100d0a',
          padding: '72px 80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          boxSizing: 'border-box',
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              letterSpacing: '0.3em',
              fontWeight: 600,
              color: '#7d6e60',
              textTransform: 'uppercase',
            }}
          >
            Buildstack EDA Lab
          </span>

          <span
            style={{
              fontSize: '13px',
              letterSpacing: '0.2em',
              fontWeight: 600,
              color: '#d97745',
              textTransform: 'uppercase',
            }}
          >
            v1.0 · Now Live
          </span>
        </div>

        {/* Center — pure typography */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0px',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: '#d97745',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            AgentIC
          </span>

          <span
            style={{
              fontSize: '72px',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#f7f3ee',
              display: 'block',
            }}
          >
            The AI agent
          </span>
          <span
            style={{
              fontSize: '72px',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#f7f3ee',
              display: 'block',
            }}
          >
            for chip design.
          </span>

          <span
            style={{
              fontSize: '22px',
              fontWeight: 400,
              color: '#7d6e60',
              marginTop: '28px',
              lineHeight: 1.5,
              maxWidth: '700px',
            }}
          >
            RTL → Synthesis → P&R → DRC-clean GDSII.
            Autonomous. Local. Zero IP leaks.
          </span>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#d8cab8',
              letterSpacing: '-0.01em',
            }}
          >
            buildstack.live
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
            <span style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#4a3f36', textTransform: 'uppercase', fontWeight: 600 }}>
              Supports
            </span>
            <span style={{ fontSize: '14px', letterSpacing: '0.08em', color: '#7d6e60', fontWeight: 500 }}>
              Sky130 · ASAP7 · GF180MCU · Any PDK
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
