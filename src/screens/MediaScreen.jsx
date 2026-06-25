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
        <div className="mfull" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <iframe 
            style={{ borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }} 
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0" 
            width="80%" 
            height="352" 
            frameBorder="0" 
            allowFullScreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
          </iframe>
        </div>
      </div>
    </div>
  )
}
