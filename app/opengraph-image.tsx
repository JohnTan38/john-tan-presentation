import { ImageResponse } from 'next/og'

export const alt = 'John Tan — Assistant Program Facilitator application profile for 365CPS'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#F9F3E4',
          color: '#0C111D',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 28, color: '#B20411' }}>
          <span style={{ width: 54, height: 10, borderRadius: 999, background: '#B20411' }} />
          Application profile · 365CPS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div style={{ fontSize: 84, lineHeight: 0.98, fontWeight: 700, letterSpacing: '-4px', maxWidth: 980 }}>
            Care that listens, connects, and follows through.
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: '#464659' }}>
            John Tan · Assistant Program Facilitator
          </div>
        </div>
      </div>
    ),
    size,
  )
}
