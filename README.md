# Wakil — In-Car MBUX Dashboard (React)

The in-car tablet surface for **Wakil** (Vibathon 2026 · AI Defined Vehicle). A faithful MBUX-style
infotainment UI with working controls and hidden presenter triggers for the live demo.

Built with **Vite + React 18 + Tailwind**. The glassmorphic design system lives in `src/index.css`
(layered box-shadows, backdrop-blur and the ambient-light theming are far cleaner as CSS than as
Tailwind utilities); Tailwind is wired up so you and an AI agent can add utility classes freely while
iterating.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist  (use this static bundle as the offline demo fallback)
npm run preview  # serve the production build
```

Open in Chrome on the demo tablet and use the fullscreen button (top-right) so it fills the screen.

## Presenter controls (hidden from the audience)

Trigger from behind the laptop — judges only see the cabin react.

| Key | Action |
|-----|--------|
| `1` `2` `3` | Relaxed / **Stressed** / Fatigued driver state |
| `C` | Collision concierge |
| `R` | Predictive regen card |
| `B` | Zero-click workshop booking |
| `0` / `Esc` | Reset |
| `P` | Toggle the on-screen presenter panel |
| `H` | Jump to the app launcher |

No keyboard on the tablet? **Triple-tap the profile circle** (top-right) to open the presenter panel.

Pressing `2` runs the full ambient adaptation: ambient light warm→#4A90D9, media to Focus 40%,
cabin −2°C with the "cooling" badge, the calm takeover, the streaming reasoning log, and the
"Hey Wakil" assist line.

## Structure

```
src/
  index.css            design system (ported), Tailwind directives, keyframes, ambient theming
  store.jsx            MbuxProvider — all state, the driver-state machine, reasoning stream, triggers
  App.jsx              shell + global keyboard shortcuts
  components/
    ui.jsx             shared SVG primitives (star, assistant ring, waveform, disc, icon glyphs)
    StatusBar.jsx      clock, fullscreen, hidden triple-tap trigger
    ControlBar.jsx     climate chevrons + glass app tiles
    Presenter.jsx      hidden demo control panel
    Overlays.jsx       reasoning panel, assist dock, action cards, collision, claim PDF
  screens/
    NavScreen.jsx  AppsScreen.jsx  MediaScreen.jsx  ComfortScreen.jsx
    EnergyScreen.jsx  PhoneScreen.jsx  WakilScreen.jsx
```

## Wiring in the real backend later

`store.jsx` is the single integration point. Replace the mocked driver-state machine and the
`reason()` lines with a WebSocket subscription to the FastAPI/LangChain agent: push live telemetry
into state, and stream the agent's chain-of-thought into `reasonLines`. Nothing in the components
needs to change — they already render from store state.
