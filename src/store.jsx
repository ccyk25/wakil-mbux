import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react'

/* ---- data ---- */
export const DRIVE = [
  { t: 'Open Road', a: 'Aurora Lights' },
  { t: 'Neon Coastline', a: 'Midnight Drive' },
  { t: 'Velocity', a: 'Noir Avenue' },
]
export const FOCUS = [
  { t: 'Stillpoint', a: 'Calm Theory' },
  { t: 'Deep Current', a: 'Lumen Field' },
  { t: 'Slow Tide', a: 'Ambient Hours' },
]
const AMBIENT_CYCLE = ['#caa06a', '#4A90D9', '#c44fe0', '#3ddc84', '#FF5A4D']

function setAmbient(hex) {
  const h = hex.replace('#', '')
  const rgb = [0, 2, 4].map((i) => parseInt(h.substr(i, 2), 16)).join(',')
  document.documentElement.style.setProperty('--ambient', hex)
  document.documentElement.style.setProperty('--ambient-rgb', rgb)
}
const clamp = (v) => Math.max(16, Math.min(28, v))

const Ctx = createContext(null)
export const useMbux = () => useContext(Ctx)

export function MbuxProvider({ children }) {
  const [view, setView] = useState('nav')
  const [playing, setPlaying] = useState(true)
  const [vol, setVol] = useState(65)
  const [track, setTrack] = useState(0)
  const [genre, setGenre] = useState('Drive')
  const [dt, setDt] = useState(22)
  const [pt, setPt] = useState(22)
  const [driverState, setDriverState] = useState('relaxed')
  const [progress, setProgress] = useState(34)

  const [reasonOpen, setReasonOpen] = useState(false)
  const [reasonLines, setReasonLines] = useState([])
  const [assist, setAssist] = useState({ open: false, text: '' })
  const [cards, setCards] = useState({ regen: false, booking: false, fatigue: false })
  const [collide, setCollide] = useState(false)
  const [ccard, setCcard] = useState(false)
  const [claim, setClaim] = useState(false)
  const [presenter, setPresenter] = useState(false)

  const ambI = useRef(0)
  const assistTO = useRef()

  const list = genre === 'Drive' ? DRIVE : FOCUS
  const current = list[track % list.length]

  /* reflect driver state on <body> for the data-state CSS selectors */
  useEffect(() => { document.body.dataset.state = driverState }, [driverState])
  useEffect(() => { setAmbient('#caa06a') }, [])

  /* media progress ticker */
  useEffect(() => {
    const id = setInterval(() => { if (playing) setProgress((p) => (p >= 100 ? 0 : p + 0.4)) }, 400)
    return () => clearInterval(id)
  }, [playing])

  /* ---- basic controls ---- */
  const go = useCallback((v) => setView(v), [])
  const togglePlay = () => setPlaying((p) => !p)
  const next = () => setTrack((t) => (t + 1) % (genre === 'Drive' ? DRIVE : FOCUS).length)
  const prev = () => setTrack((t) => (t - 1 + (genre === 'Drive' ? DRIVE : FOCUS).length) % (genre === 'Drive' ? DRIVE : FOCUS).length)
  const stepTemp = (which, d) => (which === 'driver' ? setDt((v) => clamp(v + d)) : setPt((v) => clamp(v + d)))

  /* ---- Wakil reasoning + voice ---- */
  const reason = useCallback((lines) => {
    setReasonOpen(true)
    setReasonLines([])
    lines.forEach((l, i) => setTimeout(() => setReasonLines((prev) => [...prev, l]), i * 420))
  }, [])
  const closeReason = () => setReasonOpen(false)
  const speak = useCallback((text, ms = 4000) => {
    setAssist({ open: true, text })
    clearTimeout(assistTO.current)
    assistTO.current = setTimeout(() => setAssist((a) => ({ ...a, open: false })), ms)
  }, [])

  /* ---- action cards ---- */
  const showCard = (k) => setCards((c) => ({ ...c, [k]: true }))
  const hideCard = (k) => setCards((c) => ({ ...c, [k]: false }))
  const hideAllCards = () => { setCards({ regen: false, booking: false, fatigue: false }); setAssist((a) => ({ ...a, open: false })) }

  /* ---- driver-state machine ---- */
  const applyRelaxed = () => { setVol(65); setDt(22); setGenre('Drive'); setAmbient('#caa06a') }
  const applyStressed = () => {
    setDt((v) => Math.max(16, v - 2)); setVol(40); setGenre('Focus'); setTrack(0)
    reason([
      { text: 'Heart-rate +18 bpm · grip pressure high', type: 'warn' },
      { text: 'Steering input variance: elevated', type: 'warn' },
      { text: 'Inferring driver state → Stressed' },
      { text: 'Lowering cabin −2°C · media to Focus 40%' },
      { text: 'Ambient light → calm blue #4A90D9' },
      { text: 'Cabin optimised in 1.8 s', type: 'ok' },
    ])
    setTimeout(() => speak('<b>Wakil</b> has optimised your cabin for comfort.', 4200), 700)
  }
  const changeState = useCallback((s) => {
    setDriverState(s)
    hideAllCards()
    if (s === 'relaxed') applyRelaxed()
    else if (s === 'stressed') applyStressed()
    else if (s === 'fatigued') {
      applyRelaxed(); showCard('fatigue')
      reason([
        { text: 'Blink interval lengthening · micro-drift', type: 'warn' },
        { text: 'Time at wheel: 2h 40m' },
        { text: 'Nearest rest stop: R&R Awan Besar · 6 km' },
        { text: 'Surfacing rest suggestion', type: 'ok' },
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reason, speak])

  /* ---- proxy triggers ---- */
  const triggerBooking = () => {
    showCard('booking')
    reason([
      { text: 'Brake wear index: 83% (threshold 80%)', type: 'warn' },
      { text: 'Checking owner calendar — Tue 9:00 AM: free' },
      { text: 'Querying Hap Seng Star Kinrara — slot available' },
      { text: 'Est. remaining safe distance: ~380 km' },
      { text: 'Drafting booking for owner approval', type: 'ok' },
    ])
  }
  const confirmBooking = () => { hideCard('booking'); speak('<b>Booked.</b> 9:00 AM Tue 24 Jun · Hap Seng Star Kinrara.') }
  const triggerRegen = () => showCard('regen')
  const triggerCollision = () => { setCollide(true); setCcard(false); setTimeout(() => setCcard(true), 1900) }
  const standDown = () => setCollide(false)
  const reset = () => { setCollide(false); setClaim(false); setReasonOpen(false); changeState('relaxed'); setView('nav') }
  const nextAmbient = () => {
    if (driverState === 'relaxed') { ambI.current = (ambI.current + 1) % AMBIENT_CYCLE.length; setAmbient(AMBIENT_CYCLE[ambI.current]) }
  }

  const value = {
    view, go,
    playing, togglePlay, next, prev,
    vol, setVol, dt, pt, stepTemp,
    genre, track, list, current,
    driverState, changeState,
    progress,
    reasonOpen, reasonLines, closeReason,
    assist,
    cards, hideCard, triggerBooking, confirmBooking, triggerRegen,
    collide, ccard, standDown, claim, setClaim, triggerCollision,
    presenter, setPresenter, reset, nextAmbient,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
