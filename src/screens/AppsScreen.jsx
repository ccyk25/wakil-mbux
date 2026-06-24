import { useMbux } from '../store.jsx'
import { AssistantRing, Waveform, Glyphs } from '../components/ui.jsx'

const APPS = [
  { key: 'nav', label: 'Navigation', cls: 'nav', glyph: Glyphs.nav, view: 'nav' },
  { key: 'media', label: 'Media', cls: 'media', glyph: Glyphs.media, view: 'media' },
  { key: 'phone', label: 'Phone', cls: 'phone', glyph: Glyphs.phone, view: 'phone' },
  { key: 'climate', label: 'Comfort', cls: 'climate', glyph: Glyphs.climate, view: 'climate' },
  { key: 'wakil', label: 'Wakil', cls: 'wakil', glyph: Glyphs.wakil, view: 'wakil' },
  { key: 'energy', label: 'Energy', cls: 'energy', glyph: Glyphs.energy, view: 'energy' },
  { key: 'ambient', label: 'Ambient', cls: 'ambient', amb: true },
  { key: 'weather', label: 'Weather', cls: 'weather', glyph: Glyphs.weather },
  { key: 'burmester', label: 'Burmester', cls: 'burmester', text: 'B' },
  { key: 'settings', label: 'Settings', cls: 'settings', glyph: Glyphs.settings },
]

export default function AppsScreen() {
  const { view, go, nextAmbient } = useMbux()

  const onClick = (a) => { if (a.amb) nextAmbient(); else if (a.view) go(a.view) }

  return (
    <div className={`screen${view === 'apps' ? ' active' : ''}`} id="apps-screen">
      <div className="wrap">
        <div className="assistant-col">
          <AssistantRing />
          <div className="hey"><b>Hey Wakil</b><span>Tap or say it — I'm listening</span></div>
          <Waveform className="viz" w={600} h={80} gid="v" />
        </div>
        <div className="grid">
          {APPS.map((a) => (
            <button className="appic" key={a.key} onClick={() => onClick(a)}>
              <span className={`sq ${a.cls}`}>
                {a.text ? a.text : a.glyph ? <svg viewBox="0 0 24 24" fill="currentColor">{a.glyph}</svg> : null}
              </span>
              <small>{a.label}</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
