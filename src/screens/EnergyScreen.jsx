import { useMbux } from '../store.jsx'

export default function EnergyScreen() {
  const { view } = useMbux()
  return (
    <div className={`screen${view === 'energy' ? ' active' : ''}`} id="energy-screen">
      <div className="pad">
        <div className="ph">Energy · EQE 350+</div>
        <div className="comfort">
          <div className="seats" style={{ flex: '0 0 240px' }}>
            <div style={{ position: 'relative', width: 210, height: 210 }}>
              <svg width="210" height="210" viewBox="0 0 210 210" style={{ transform: 'rotate(-90deg)' }}>
                <defs><linearGradient id="eg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2ee6b6" /><stop offset="1" stopColor="#23C7E0" /></linearGradient></defs>
                <circle cx="105" cy="105" r="90" stroke="rgba(255,255,255,.08)" strokeWidth="15" fill="none" />
                <circle cx="105" cy="105" r="90" stroke="url(#eg)" strokeWidth="15" fill="none" strokeLinecap="round" strokeDasharray="565" strokeDashoffset="158" style={{ filter: 'drop-shadow(0 0 8px rgba(35,199,224,.6))' }} />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <b style={{ fontSize: 42, fontWeight: 300 }}>72<span style={{ fontSize: 20 }}>%</span></b>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>418 km range</span>
              </div>
            </div>
          </div>
          <div className="comf-ctrl" style={{ gap: 12 }}>
            <div className="crow glass"><span className="cn">Efficiency · last 50 km</span><span style={{ marginLeft: 'auto', fontWeight: 600 }}>16.8 kWh/100km</span></div>
            <div className="crow glass"><span className="cn">Nearest charger · Shell Recharge</span><span style={{ marginLeft: 'auto', fontWeight: 600 }}>40 min to 80% · 4.2 km</span></div>
            <div className="crow glass"><span className="cn">Regen mode</span><span style={{ marginLeft: 'auto', fontWeight: 600, color: 'var(--teal)' }}>Adaptive · Wakil-tuned</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
