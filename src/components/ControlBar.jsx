import { useMbux } from '../store.jsx'
import { Glyphs } from './ui.jsx'

function Seat() {
  return (
    <span className="seatic">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M6 20v-7a3 3 0 013-3h2M6 20h8a3 3 0 003-3v-2M9 10V6a2 2 0 012-2h4" /></svg>
    </span>
  )
}

export default function ControlBar() {
  const { view, go, dt, pt, stepTemp, nextAmbient } = useMbux()
  const Icon = ({ g }) => <svg viewBox="0 0 24 24" fill="currentColor">{g}</svg>

  return (
    <div className="ctrlbar">
      <div className="clim left">
        <Seat />
        <button className="chev warm" onClick={() => stepTemp('driver', -0.5)}>‹</button>
        <div>
          <div className="tmp">{dt.toFixed(1)}</div>
          <div className="cool-badge">cooling</div>
        </div>
        <button className="chev cool" onClick={() => stepTemp('driver', 0.5)}>›</button>
      </div>

      <div className="tiles">
        <button className="tile" onClick={() => go('apps')} title="Home"><Icon g={Glyphs.home} /></button>
        <button className={`tile${view === 'nav' ? ' active' : ''}`} onClick={() => go('nav')} title="Navigation"><Icon g={Glyphs.nav} /></button>
        <button className={`tile${view === 'media' ? ' active' : ''}`} onClick={() => go('media')} title="Media"><Icon g={Glyphs.media} /></button>
        <button className={`tile${view === 'phone' ? ' active' : ''}`} onClick={() => go('phone')} title="Phone"><Icon g={Glyphs.phone} /></button>
        <button className="tile amb" onClick={nextAmbient} title="Ambient light" />
        <button className="tile cam" title="Camera"><Icon g={Glyphs.cam} /></button>
        <button className={`tile wakil${view === 'wakil' ? ' active' : ''}`} onClick={() => go('wakil')} title="Wakil"><div className="orb-mini" /></button>
      </div>

      <div className="clim right">
        <button className="chev warm" onClick={() => stepTemp('pass', -0.5)}>‹</button>
        <div className="tmp">{pt.toFixed(1)}</div>
        <button className="chev cool" onClick={() => stepTemp('pass', 0.5)}>›</button>
        <Seat />
      </div>
    </div>
  )
}
