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
          backgroundColor: '#1b1410',
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(217, 119, 69, 0.18) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(199, 147, 79, 0.12) 0%, transparent 45%)',
          padding: '80px',
          color: '#f7f3ee',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          boxSizing: 'border-box',
          border: '1px solid rgba(217, 119, 69, 0.25)',
        }}
      >
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#d97745',
              boxShadow: '0 0 14px rgba(217, 119, 69, 0.8)',
            }}
          />
          <span
            style={{
              fontSize: '20px',
              letterSpacing: '0.22em',
              fontWeight: 700,
              color: '#d8cab8',
              textTransform: 'uppercase',
            }}
          >
            BUILDSTACK EDA LAB
          </span>
        </div>

        {/* Core Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* AgentIC badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span
              style={{
                fontSize: '14px',
                letterSpacing: '0.18em',
                fontWeight: 700,
                color: '#d97745',
                textTransform: 'uppercase',
                backgroundColor: 'rgba(217, 119, 69, 0.12)',
                border: '1px solid rgba(217, 119, 69, 0.35)',
                padding: '6px 14px',
                borderRadius: '4px',
              }}
            >
              LIVE · v1.0
            </span>
            <span
              style={{
                fontSize: '28px',
                fontWeight: 800,
                color: '#d97745',
                letterSpacing: '-0.02em',
              }}
            >
              AgentIC
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: '54px',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              margin: 0,
              color: '#f7f3ee',
            }}
          >
            Autonomous VLSI Design Agent
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '24px',
              color: '#b08968',
              margin: 0,
              maxWidth: '900px',
              lineHeight: 1.45,
              fontWeight: 400,
            }}
          >
            Intent → Silicon. RTL to DRC-clean GDSII with autonomous error repair — entirely on your machine.
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid rgba(217, 119, 69, 0.2)',
            paddingTop: '28px',
          }}
        >
          <span
            style={{
              fontSize: '22px',
              color: '#d97745',
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}
          >
            buildstack.live
          </span>

          {/* Feature pills */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {['Sky130', 'OpenROAD', 'Local-first'].map((label) => (
              <span
                key={label}
                style={{
                  fontSize: '13px',
                  letterSpacing: '0.06em',
                  color: '#d8cab8',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  border: '1px solid rgba(217, 119, 69, 0.2)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </span>
            ))}
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
