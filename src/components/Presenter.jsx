import { useMbux } from '../store.jsx'

export default function Presenter() {
  const { presenter, setPresenter, driverState, changeState, triggerRegen, triggerBooking, triggerCollision, reset } = useMbux()

  const StateBtn = ({ s, label, k }) => (
    <button className={`pbtn${driverState === s ? ' active' : ''}`} onClick={() => changeState(s)}>
      {label} <span className="k">{k}</span>
    </button>
  )

  return (
    <>
      <div className="ptap" onClick={() => setPresenter(true)} />
      <div className={`presenter${presenter ? ' show' : ''}`}>
        <button className="pclose" onClick={() => setPresenter(false)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <div className="ttl">PRESENTER CONTROLS · HIDDEN FROM AUDIENCE</div>
        <StateBtn s="relaxed" label="Relaxed" k="1" />
        <StateBtn s="stressed" label="Stressed" k="2" />
        <StateBtn s="fatigued" label="Fatigued" k="3" />
        <button className="pbtn" onClick={triggerRegen}>Regen <span className="k">R</span></button>
        <button className="pbtn" onClick={triggerBooking}>Booking <span className="k">B</span></button>
        <button className="pbtn danger" onClick={triggerCollision}>Collision <span className="k">C</span></button>
        <button className="pbtn" onClick={reset}>Reset <span className="k">0</span></button>
      </div>
    </>
  )
}
