import { useState } from 'react'
import { useMbux } from '../store.jsx'
import { Disc } from '../components/ui.jsx'

export default function NavScreen() {
  const { view, current, playing, togglePlay, next, prev } = useMbux()
  const [zoom, setZoom] = useState(1)

  return (
    <div className={`screen${view === 'nav' ? ' active' : ''}`} id="nav-screen">
      <div className="map">
        <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" style={{ transform: `scale(${zoom})`, transformOrigin: '165px 500px', transition: 'transform .35s ease' }}>
          <rect width="1000" height="560" fill="#0a1526" />
          <path className="wt" d="M0 400 Q260 350 500 410 T1000 388 L1000 560 L0 560Z" />
          <ellipse className="pk" cx="770" cy="150" rx="150" ry="96" /><ellipse className="pk" cx="170" cy="110" rx="120" ry="74" />
          <path className="rd2" strokeWidth="9" d="M-20 190 H1020" /><path className="rd2" strokeWidth="9" d="M-20 320 H1020" />
          <path className="rd2" strokeWidth="9" d="M300 -20 V580" /><path className="rd2" strokeWidth="9" d="M690 -20 V580" />
          <path className="rd" strokeWidth="16" d="M-20 260 H1020" /><path className="rd" strokeWidth="16" d="M500 -20 V580" />
          <path className="rt-glow" d="M165 500 L165 260 L500 260 L500 120 L820 120" />
          <path className="rt" d="M165 500 L165 260 L500 260 L500 120 L820 120" />
          <g transform="translate(820,120)"><circle r="15" fill="#0a1526" stroke="var(--route)" strokeWidth="3" /><circle r="5" fill="var(--route)" /></g>
          <g transform="translate(165,500)"><circle r="22" fill="rgba(255,77,77,.16)" /><path d="M0 -14 L10 11 L0 5 L-10 11 Z" fill="var(--pos)" style={{ filter: 'drop-shadow(0 0 8px rgba(255,77,77,.85))' }} /></g>
          <text className="lbl" x="540" y="240">Lebuhraya Bukit Jalil</text><text className="lbl" x="210" y="350">Bandar Kinrara</text>
        </svg>
      </div>

      <div className="zl-top">
        <div className="where glass">
          <span className="mic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3zM5 11a7 7 0 0014 0M12 18v3" /></svg></span>
          <span>Where to?</span>
        </div>
        <div className="zl-eta glass">
          <div><div className="big">9:12 <span style={{ fontSize: 11, color: 'var(--muted)' }}>AM</span></div></div>
          <div className="pipe" />
          <div><div className="big">18<span style={{ fontSize: 11, color: 'var(--muted)' }}> min</span></div><div className="sub">12.4 km</div></div>
        </div>
      </div>

      <div className="turn glass">
        <svg className="ar" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        <div><div className="d">450 m</div><div className="r">Continue on Lebuhraya Bukit Jalil</div></div>
      </div>

      <div className="compass glass"><span className="nN">N</span></div>

      <div className="calm"><div className="l">CABIN OPTIMISED</div><div className="b">Breathe. I've got the rest.</div></div>

      <div className="fmedia glass">
        <Disc size="sm" />
        <div className="nfo"><div className="t">{current.t}</div><div className="a">{current.a}</div></div>
        <div className="fmc">
          <button onClick={prev}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5v14M20 5l-10 7 10 7z" /></svg></button>
          <button onClick={togglePlay}>
            {playing
              ? <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
              : <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z" /></svg>}
          </button>
          <button onClick={next}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 5v14M4 5l10 7-10 7z" /></svg></button>
        </div>
      </div>

      <div className="zoom">
        <button onClick={() => setZoom((z) => Math.min(1.5, z + 0.12))}>+</button>
        <button onClick={() => setZoom((z) => Math.max(0.85, z - 0.12))}>−</button>
      </div>
    </div>
  )
}
