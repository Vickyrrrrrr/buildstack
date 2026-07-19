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
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#09090b',
          padding: '80px',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          boxSizing: 'border-box',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#38bdf8',
            }}
          />
          <span
            style={{
              fontSize: '18px',
              letterSpacing: '0.25em',
              fontWeight: 700,
              color: '#94a3b8',
              textTransform: 'uppercase',
            }}
          >
            BUILDSTACK EDA LAB
          </span>
        </div>

        {/* Headline & Subtitle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <h1
            style={{
              fontSize: '58px',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              margin: 0,
              color: '#fafafa',
            }}
          >
            Semiconductor EDA Automation
          </h1>
          <p
            style={{
              fontSize: '25px',
              color: '#a1a1aa',
              margin: 0,
              maxWidth: '900px',
              lineHeight: 1.45,
              fontWeight: 400,
            }}
          >
            Intent → Silicon. Autonomous error repair & DRC-clean GDSII generation.
          </p>
        </div>

        {/* Footer Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '28px',
          }}
        >
          <span style={{ fontSize: '22px', color: '#38bdf8', fontWeight: 600, letterSpacing: '-0.01em' }}>
            buildstack.live
          </span>
          <span
            style={{
              fontSize: '15px',
              letterSpacing: '0.08em',
              color: '#d4d4d8',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            AgentIC Powered
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
