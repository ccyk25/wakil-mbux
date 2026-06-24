import { useState } from 'react'
import { useMbux } from '../store.jsx'

const ROWS = [
  { key: 'seatD', label: 'Seat Heating · Driver', opts: ['Off', '1', '2', '3'] },
  { key: 'ventD', label: 'Seat Ventilation · Driver', opts: ['Off', '1', '2', '3'] },
  { key: 'mass', label: 'Massage Programme', opts: ['Off', 'Wave', 'Mobil'] },
  { key: 'amb', label: 'Ambient Light Zone', opts: ['Solid', 'Dual', 'Flow'] },
]

export default function ComfortScreen() {
  const { view } = useMbux()
  const [tab, setTab] = useState('Massage')
  const [seg, setSeg] = useState({ seatD: 0, ventD: 0, mass: 0, amb: 0 })

  return (
    <div className={`screen${view === 'climate' ? ' active' : ''}`} id="climate-screen">
      <div className="pad">
        <div className="ph">Comfort · Front Seats</div>
        <div className="comfort">
          <div className="seats"><div className="seat3d"><span>Driver</span></div><div className="seat3d"><span>Passenger</span></div></div>
          <div className="comf-ctrl">
            <div className="ctab">
              {['Massage', 'Kinetic', 'Climate'].map((t) => (
                <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>
              ))}
            </div>
            {ROWS.map((r) => (
              <div className="crow glass" key={r.key}>
                <span className="cn">{r.label}</span>
                <div className="seg">
                  {r.opts.map((o, i) => (
                    <button key={o} className={seg[r.key] === i ? 'on' : ''} onClick={() => setSeg((s) => ({ ...s, [r.key]: i }))}>{o}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
