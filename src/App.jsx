import { useState } from 'react'
import './App.css'

const situations = [
  'Sensory overload / meltdown',
  'Communication difficulty',
  'School or transition struggle',
  'Public / private body behaviour',
]

function App() {
  const [selectedSituation, setSelectedSituation] = useState('')

  return (
    <main className="app-shell">
      <section className="support-card" aria-labelledby="app-title">
        <header className="hero">
          <p className="eyebrow">MVP support guide</p>
          <h1 id="app-title">ASD Aid</h1>
          <p className="subtitle">
            A calm decision-support tool for daily autism and ADHD challenges.
          </p>
        </header>

        <div className="decision-panel">
          <h2>What is happening right now?</h2>
          <div className="button-list" role="list">
            {situations.map((situation) => (
              <button
                className={
                  selectedSituation === situation
                    ? 'decision-button selected'
                    : 'decision-button'
                }
                key={situation}
                type="button"
                onClick={() => setSelectedSituation(situation)}
              >
                {situation}
              </button>
            ))}
          </div>

          {selectedSituation && (
            <p className="selection-note" aria-live="polite">
              Selected: {selectedSituation}
            </p>
          )}
        </div>
      </section>

      <p className="disclaimer">
        This app provides general support strategies only. It does not diagnose
        or replace medical, therapy, or emergency advice.
      </p>
    </main>
  )
}

export default App
