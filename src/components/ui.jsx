/* Reusable visual primitives for the MBUX UI. */

export function MercedesStar({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="44" />
      <path d="M50 50 L50 8 M50 50 L86 71 M50 50 L14 71" />
    </svg>
  )
}

/* Glowing 3D assistant ring (the "Hey Wakil" / Notes-style halo) */
export function AssistantRing() {
  return (
    <div className="ringwrap">
      <svg viewBox="0 0 220 160">
        <defs>
          <linearGradient id="tg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#5BE5A0" />
            <stop offset=".5" stopColor="#23C7E0" />
            <stop offset="1" stopColor="#4A90D9" />
          </linearGradient>
          <filter id="gl" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <g transform="translate(110,80)">
          <g className="ring-breathe">
            <g transform="rotate(-14)">
              <ellipse rx="74" ry="26" fill="none" stroke="url(#tg)" strokeWidth="7" filter="url(#gl)" opacity=".7" />
              <ellipse rx="74" ry="26" fill="none" stroke="url(#tg)" strokeWidth="2.4" />
              <ellipse rx="74" ry="26" fill="none" stroke="#eafdff" strokeWidth="1.4" opacity=".9" strokeDasharray="5 210">
                <animate attributeName="stroke-dashoffset" from="0" to="498" dur="3.2s" repeatCount="indefinite" />
              </ellipse>
            </g>
          </g>
        </g>
      </svg>
      <MercedesStar className="star" />
    </div>
  )
}

/* Flowing audio waveform (green→cyan→blue) */
function wavePath(w, h, k) {
  let d = `M0 ${h / 2}`
  for (let i = 0; i <= w; i += 10) {
    const y = h / 2 + Math.sin((i / w) * 6.28 * (2 + k) + k) * (h * 0.3 * (1 - k * 0.22))
    d += ` L${i} ${y}`
  }
  return d
}
export function Waveform({ className = 'viz', w = 600, h = 80, gid = 'v' }) {
  return (
    <svg className={className} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`wg${gid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5BE5A0" />
          <stop offset="0.5" stopColor="#23C7E0" />
          <stop offset="1" stopColor="#4A90D9" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((k) => (
        <path
          key={k}
          d={wavePath(w, h, k)}
          fill="none"
          stroke={`url(#wg${gid})`}
          strokeWidth={2 - k * 0.4}
          opacity={0.85 - k * 0.22}
          strokeLinecap="round"
          style={{ transformOrigin: 'center', animation: `wv${k} ${2.4 + k * 0.6}s ease-in-out infinite` }}
        />
      ))}
    </svg>
  )
}

/* Glass audio disc (Dolby-style) */
export function Disc({ size = 'sm' }) {
  return <div className={`disc ${size}`} />
}

/* Phone glyph reused in several places */
export const PhoneGlyph = (
  <path d="M20 15.5a12 12 0 01-4-.6 1 1 0 00-1 .2l-2 2a15 15 0 01-6-6l2-2a1 1 0 00.2-1 12 12 0 01-.6-4 1 1 0 00-1-1H5a1 1 0 00-1 1A16 16 0 0020 21a1 1 0 001-1v-3.5a1 1 0 00-1-1z" />
)

/* Filled app-icon glyphs */
export const Glyphs = {
  nav: <path d="M9 20.5l-5.3 1.9a1 1 0 01-1.3-.94V6.2a1 1 0 01.66-.94L9 3.4l6 2 5.3-1.9a1 1 0 011.34.94v15.26a1 1 0 01-.66.94L15 21.5l-6-1z" />,
  media: <path d="M9 18.5a3 3 0 11-2-2.83V6l11-2.2v9.36a3 3 0 11-2-2.82V6.2L9 7.6z" />,
  phone: PhoneGlyph,
  climate: <path d="M7 21a4 4 0 01-1.6-7.66V7a4 4 0 018 0v6.34A4 4 0 017 21zm1-6.8V7a2 2 0 10-2.4 0v7.2a2 2 0 102.4 0z" />,
  wakil: <path d="M12 2l2.6 6.4L21 11l-6.4 2.6L12 20l-2.6-6.4L3 11l6.4-2.6z" />,
  energy: <path d="M13 2L4 14h6l-1 8 9-12h-6z" />,
  weather: <g><circle cx="8" cy="8" r="3.4" /><path d="M16.5 10A4.5 4.5 0 0117 19H7a4 4 0 01-.5-7.97A5.5 5.5 0 0116.5 10z" /></g>,
  settings: <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm9 4a7 7 0 00-.13-1.3l2-1.55-2-3.46-2.36 1a7 7 0 00-2.25-1.3L16 3h-4l-.26 2.39a7 7 0 00-2.25 1.3l-2.36-1-2 3.46 2 1.55A7 7 0 005 12c0 .44.04.87.13 1.3l-2 1.55 2 3.46 2.36-1a7 7 0 002.25 1.3L12 21h4l.26-2.39a7 7 0 002.25-1.3l2.36 1 2-3.46-2-1.55c.09-.43.13-.86.13-1.3z" />,
  home: <path d="M12 3l9 8h-2v9h-5v-6h-4v6H5v-9H3z" />,
  cam: <path d="M9 4l-1.5 2H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-3.5L15 4zm3 14a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" />,
}
