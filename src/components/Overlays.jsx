import { useMbux } from '../store.jsx'
import { MercedesStar, Waveform } from './ui.jsx'

function ReasoningPanel() {
  const { reasonOpen, reasonLines, closeReason } = useMbux()
  return (
    <div className={`reason${reasonOpen ? ' show' : ''}`}>
      <h3>
        <span className="liveorb" />Wakil is thinking
        <button className="close" onClick={closeReason}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </h3>
      <div className="s">Live agent reasoning trace</div>
      <div className="log">
        {reasonLines.map((l, i) => (
          <div className={`ln${l.type ? ' ' + l.type : ''}`} key={i}><span className="arr">▶</span> {l.text}</div>
        ))}
      </div>
    </div>
  )
}

function AssistDock() {
  const { assist } = useMbux()
  return (
    <div className={`assist-dock${assist.open ? ' show' : ''}`}>
      <MercedesStar className="star" />
      <Waveform className="wf" w={120} h={34} gid="d" />
      <div className="say" dangerouslySetInnerHTML={{ __html: assist.text }} />
    </div>
  )
}

function ActionCards() {
  const { cards, hideCard, confirmBooking } = useMbux()
  return (
    <>
      <div className={`fcard${cards.regen ? ' show' : ''}`} id="regen-card">
        <div className="fh"><div className="orb" /><b>Wakil</b><span className="tag">PREDICTIVE</span></div>
        <p>You brake hard approaching <span className="hl">Exit 12</span>. Pre-conditioning the battery and raising regen sensitivity for the next <span className="hl">4 km</span>.</p>
        <div className="fact"><button className="bprim" onClick={() => hideCard('regen')}>Got it</button></div>
      </div>

      <div className={`fcard${cards.booking ? ' show' : ''}`} id="booking-card">
        <div className="fh"><div className="orb" /><b>Wakil</b><span className="tag">ACTION</span></div>
        <p>Front brake pads reach critical wear in <span className="hl">~380 km</span>. I've reserved <span className="hl">9:00 AM, Tue 24 Jun</span> at Hap Seng Star Kinrara — your calendar is free.</p>
        <div className="fact"><button className="bprim" onClick={confirmBooking}>Confirm booking</button><button className="bgho" onClick={() => hideCard('booking')}>Change time</button></div>
      </div>

      <div className={`fcard${cards.fatigue ? ' show' : ''}`} id="fatigue-card">
        <div className="fh"><div className="orb" /><b>Wakil</b><span className="tag">WELLBEING</span></div>
        <p>Signs of fatigue detected — longer blinks, drifting inputs. <span className="hl">R&amp;R Awan Besar</span> is 6 km ahead. Route there?</p>
        <div className="fact"><button className="bprim" onClick={() => hideCard('fatigue')}>Route to rest stop</button><button className="bgho" onClick={() => hideCard('fatigue')}>I'm fine</button></div>
      </div>
    </>
  )
}

function Collision() {
  const { collide, ccard, standDown, setClaim } = useMbux()
  const Check = (
    <span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 6" /></svg></span>
  )
  return (
    <div className={`collide${collide ? ' show' : ''}`}>
      <div className="calert">
        <div className="rg"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" /></svg></div>
        <h2>Impact detected</h2>
        <p>Wakil is taking over. You're not alone.</p>
        <div className={`ccard${ccard ? ' show' : ''}`}>
          <div className="stp">{Check}Telemetry snapshot captured — 78 km/h, 4.2 G, GPS locked</div>
          <div className="stp">{Check}Dashcam stills compiled into report</div>
          <div className="stp">{Check}Etiqa claim pre-filled with policy details</div>
          <div className="stp">{Check}Emergency SMS drafted — awaiting your approval</div>
          <div className="ccact"><button className="bprim" onClick={() => setClaim(true)}>View claim pack</button><button className="bgho" onClick={standDown}>I'm safe — stand down</button></div>
        </div>
      </div>
    </div>
  )
}

function ClaimDoc() {
  const { claim, setClaim } = useMbux()
  return (
    <div className={`mbg${claim ? ' show' : ''}`}>
      <div className="cdoc">
        <div className="top"><div><h1>Motor Accident Claim Pack</h1><div className="sub">Auto-compiled by Wakil · Mercedes-Benz Malaysia</div></div><div className="bdg">DRAFT</div></div>
        <h2>Vehicle &amp; Policy</h2>
        <table><tbody>
          <tr><td>Vehicle</td><td>Mercedes-Benz EQE 350+ (2026)</td></tr>
          <tr><td>Registration</td><td>VKL 8821</td></tr>
          <tr><td>Owner</td><td>Aiman bin Razak</td></tr>
          <tr><td>Insurer / Policy</td><td>Etiqa · MT-7741992-08</td></tr>
        </tbody></table>
        <h2>Incident Telemetry</h2>
        <table><tbody>
          <tr><td>Timestamp</td><td>24 Jun 2026, 09:07:42 MYT</td></tr>
          <tr><td>Location (GPS)</td><td>3.0571° N, 101.6869° E</td></tr>
          <tr><td>Speed at impact</td><td>78 km/h</td></tr>
          <tr><td>Peak deceleration</td><td>4.2 G (frontal)</td></tr>
          <tr><td>Airbag deployment</td><td>Front driver + passenger</td></tr>
        </tbody></table>
        <h2>Attached Evidence</h2>
        <table><tbody>
          <tr><td>Dashcam stills</td><td>3 frames (−2s, impact, +2s)</td></tr>
          <tr><td>Pre-crash event log</td><td>10 s buffer included</td></tr>
        </tbody></table>
        <div className="ft">Generated in 2.4 s · Pending owner approval before submission</div>
        <div className="cact"><button className="caprim" onClick={() => window.print()}>Save as PDF</button><button className="caghost" onClick={() => setClaim(false)}>Close</button></div>
      </div>
    </div>
  )
}

export default function Overlays() {
  return (
    <>
      <AssistDock />
      <ReasoningPanel />
      <ActionCards />
      <Collision />
      <ClaimDoc />
    </>
  )
}
