import { ImageResponse } from 'next/og'

export const alt = 'John Tan, SUSS social work practicum candidate'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const phaseColours = ['#5E7FA3', '#2E7A73', '#E0A23A', '#C9D4DE']
const phaseWeeks = [8, 12, 13, 7]

export default function OpenGraphImage() {
  const weeks = phaseWeeks.flatMap((count, phase) => Array.from({ length: count }, () => phaseColours[phase]))

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
          background: '#0F2A47',
          color: '#F4F6F3',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: '#B9C7D6', fontFamily: 'Arial, sans-serif' }}>
          John Tan, practicum candidate for SUSS SWK512
        </div>
        <div style={{ display: 'flex', fontSize: 74, lineHeight: 1.04, maxWidth: 1000 }}>
          A 400-hour practicum, planned so that every hour teaches something.
        </div>
        <div style={{ display: 'flex', gap: 7 }}>
          {weeks.map((colour, index) => (
            <div key={index} style={{ width: 18, height: 56, borderRadius: 4, background: colour }} />
          ))}
        </div>
      </div>
    ),
    size,
  )
}
