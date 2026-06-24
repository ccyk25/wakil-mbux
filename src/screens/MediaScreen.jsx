import { useRef } from 'react'
import { useMbux } from '../store.jsx'
import { Disc } from '../components/ui.jsx'

export default function MediaScreen() {
  const { view, current, genre, playing, togglePlay, next, prev, vol, setVol, progress } = useMbux()
  const sld = useRef(null)
  const drag = useRef(false)

  const fromX = (x) => {
    const r = sld.current.getBoundingClientRect()
    setVol(Math.max(0, Math.min(100, Math.round(((x - r.left) / r.width) * 100))))
  }
  const sec = Math.floor((progress / 100) * 238)
  const cur = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`

  return (
    <div className={`screen${view === 'media' ? ' active' : ''}`} id="media-screen">
      <div className="pad">
        <div className="ph">Media · Bluetooth Audio</div>
        <div className="mfull">
          <Disc size="lg" />
          <div>
            <div className="mm"><div className="t">{current.t}</div><div className="a">{current.a} · {genre}</div></div>
            <div className="prog">
              <div className="barwrap"><i style={{ width: `${progress}%` }} /></div>
              <div className="tt"><span>{cur}</span><span>3:58</span></div>
            </div>
            <div className="mctrl">
              <button className="mc" onClick={prev}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5v14M20 5l-10 7 10 7z" /></svg></button>
              <button className="mc play" onClick={togglePlay}>
                {playing
                  ? <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                  : <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z" /></svg>}
              </button>
              <button className="mc" onClick={next}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 5v14M4 5l10 7-10 7z" /></svg></button>
            </div>
            <div className="volrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5zM15 9a3 3 0 010 6M18 6a7 7 0 010 12" /></svg>
              <div
                className="sld"
                ref={sld}
                onPointerDown={(e) => { drag.current = true; e.currentTarget.setPointerCapture(e.pointerId); fromX(e.clientX) }}
                onPointerMove={(e) => { if (drag.current) fromX(e.clientX) }}
                onPointerUp={() => (drag.current = false)}
              >
                <div className="fill" style={{ width: `${vol}%` }} />
                <div className="knob" style={{ left: `${vol}%` }} />
              </div>
              <span className="vval">{vol}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
