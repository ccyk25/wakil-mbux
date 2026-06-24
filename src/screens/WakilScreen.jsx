import { useMbux } from '../store.jsx'

const HEALTH = [
  { dot: 'r', n: 'Front Brake Pads', v: '83%', cls: 'red' },
  { dot: 'a', n: 'Rear Tyre Wear', v: '61%', cls: 'amber' },
  { dot: 'g', n: 'Battery Cell Stress', v: 'Low' },
  { dot: 'g', n: 'Engine Oil Life', v: '68%' },
]
const IDLE = [
  'Telemetry stream connected — 14 events buffered',
  'Behaviour profile: moderate · 2 hard-brake events today',
  'Brake wear index 83% — booking window open',
  'Standing by for triggers',
]

export default function WakilScreen() {
  const { view } = useMbux()
  return (
    <div className={`screen${view === 'wakil' ? ' active' : ''}`} id="wakil-screen">
      <div className="pad">
        <div className="ph">Wakil · Symbiotic Agent</div>
        <div className="wwrap">
          <div className="twin">
            <div className="twincar glass">
              <svg viewBox="0 0 200 90" fill="none" stroke="var(--teal)" strokeWidth="2"><path d="M15 62 Q20 44 42 42 L70 40 Q88 28 120 30 L150 34 Q174 38 184 56 L186 64 Q186 70 178 70 L24 70 Q14 70 15 62Z" /><circle cx="58" cy="70" r="11" fill="#0a1526" /><circle cx="150" cy="70" r="11" fill="#0a1526" /><path d="M78 40 L112 34" /></svg>
            </div>
            {HEALTH.map((h) => (
              <div className="hrow glass" key={h.n}><span className={`dot ${h.dot}`} /><span className="hn">{h.n}</span><span className={`hv ${h.cls || ''}`}>{h.v}</span></div>
            ))}
          </div>
          <div className="wmain glass">
            <h3><span className="liveorb" />Reasoning Log</h3>
            <div className="s">Live chain-of-thought · multi-factor agentic reasoning</div>
            <div className="logbox">
              {IDLE.map((t, i) => <div className="ln" key={i}><span className="arr">▶</span> {t}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
