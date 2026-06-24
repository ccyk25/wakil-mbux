import { useEffect, useRef } from 'react'
import { useMbux } from './store.jsx'
import StatusBar from './components/StatusBar.jsx'
import ControlBar from './components/ControlBar.jsx'
import Presenter from './components/Presenter.jsx'
import Overlays from './components/Overlays.jsx'
import NavScreen from './screens/NavScreen.jsx'
import AppsScreen from './screens/AppsScreen.jsx'
import MediaScreen from './screens/MediaScreen.jsx'
import ComfortScreen from './screens/ComfortScreen.jsx'
import EnergyScreen from './screens/EnergyScreen.jsx'
import PhoneScreen from './screens/PhoneScreen.jsx'
import WakilScreen from './screens/WakilScreen.jsx'

export default function App() {
  const api = useMbux()
  const ref = useRef(api)
  ref.current = api

  // Presenter keyboard shortcuts (read latest actions via ref to avoid stale closures)
  useEffect(() => {
    const onKey = (e) => {
      const a = ref.current
      const k = e.key.toLowerCase()
      if (k === '1') a.changeState('relaxed')
      else if (k === '2') a.changeState('stressed')
      else if (k === '3') a.changeState('fatigued')
      else if (k === 'r') a.triggerRegen()
      else if (k === 'b') a.triggerBooking()
      else if (k === 'c') a.triggerCollision()
      else if (k === 'p') a.setPresenter((p) => !p)
      else if (k === '0') a.reset()
      else if (k === 'escape') { a.reset(); a.setPresenter(false) }
      else if (k === 'h') a.go('apps')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div id="app">
      <StatusBar />
      <div className="stage" id="stage">
        <NavScreen />
        <AppsScreen />
        <MediaScreen />
        <ComfortScreen />
        <EnergyScreen />
        <PhoneScreen />
        <WakilScreen />
        <Overlays />
      </div>
      <ControlBar />
      <Presenter />
      <div className="ambient-frame" />
      <div className="ambient-strip" />
    </div>
  )
}
