import { useMbux } from '../store.jsx'
import { PhoneGlyph } from '../components/ui.jsx'

const CALLS = [
  { i: 'HS', n: 'Hap Seng Star Kinrara', p: '+60 3-8082 1133', d: 'Incoming · 9:02 AM' },
  { i: 'FZ', n: 'Farah', p: 'Mobile', d: 'Outgoing · Yesterday' },
  { i: 'MB', n: 'MB Roadside Assist', p: '1-800-88-1133', d: 'Saved' },
]

export default function PhoneScreen() {
  const { view } = useMbux()
  return (
    <div className={`screen${view === 'phone' ? ' active' : ''}`} id="phone-screen">
      <div className="pad">
        <div className="ph">Phone · Aiman's iPhone</div>
        <div className="calls">
          {CALLS.map((c) => (
            <div className="call glass" key={c.i}>
              <div className="av">{c.i}</div>
              <div><div className="nm">{c.n}</div><div className="pn">{c.p}</div></div>
              <div className="dr">{c.d}</div>
              <button className="cb"><svg viewBox="0 0 24 24" fill="currentColor">{PhoneGlyph}</svg></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
