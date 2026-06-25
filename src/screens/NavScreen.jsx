import { useState } from 'react'
import { useMbux } from '../store.jsx'
import { Disc } from '../components/ui.jsx'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function NavScreen() {
  const { view, current, playing, togglePlay, next, prev } = useMbux()
  const [zoom, setZoom] = useState(1)

  return (
    <div className={`screen${view === 'nav' ? ' active' : ''}`} id="nav-screen">
      <div className="map" style={{ zIndex: 0 }}>
        <MapContainer center={[3.0487, 101.6214]} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[3.0487, 101.6214]}>
            <Popup>
              Lebuhraya Bukit Jalil
            </Popup>
          </Marker>
        </MapContainer>
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

    </div>
  )
}
