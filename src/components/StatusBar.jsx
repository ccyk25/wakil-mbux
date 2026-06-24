import { useEffect, useRef, useState } from 'react'
import { useMbux } from '../store.jsx'

export default function StatusBar() {
  const { setPresenter } = useMbux()
  const [clock, setClock] = useState('--:--')
  const taps = useRef(0)
  const tapTimer = useRef()

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      setClock(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`)
    }
    tick()
    const id = setInterval(tick, 10000)
    return () => clearInterval(id)
  }, [])

  const fullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.()
    else document.exitFullscreen?.()
  }
  const profileTap = () => {
    taps.current += 1
    clearTimeout(tapTimer.current)
    tapTimer.current = setTimeout(() => (taps.current = 0), 600)
    if (taps.current >= 3) { taps.current = 0; setPresenter((p) => !p) }
  }

  return (
    <div className="status">
      <div className="st-left">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 2l20 20M9.9 4.2A9 9 0 0121 12M6 7a9 9 0 00-3 5" /><circle cx="12" cy="12" r="2.5" /></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3l18 18M14 8h3l3 9M2 8h8v9H4a2 2 0 01-2-2V8z" /></svg>
        <svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="13" width="3" height="7" rx="1" /><rect x="7" y="9" width="3" height="11" rx="1" /><rect x="12" y="5" width="3" height="15" rx="1" /><rect x="17" y="2" width="3" height="18" rx="1" opacity=".4" /></svg>
      </div>
      <div className="st-mid"><span className="st-clock">{clock}</span></div>
      <div className="st-right">
        <span style={{ fontSize: 13 }}>Tue 24 Jun · 29°</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 14v-2a9 9 0 0118 0v2M3 14a2 2 0 002 2h1v-5H5a2 2 0 00-2 2zM21 14a2 2 0 01-2 2h-1v-5h1a2 2 0 012 2z" /></svg>
        <button className="fsbtn" onClick={fullscreen} aria-label="Toggle fullscreen">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
        </button>
        <div className="st-prof" onClick={profileTap} title="Profile">A</div>
      </div>
    </div>
  )
}
