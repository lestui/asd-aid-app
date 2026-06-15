import { useState } from 'react'
import './App.css'

const situations = [
  'Sensory overload / meltdown',
  'Communication difficulty',
  'School or transition struggle',
  'Public / private body behaviour',
]

const sensoryFlow = [
  {
    key: 'safe',
    question: 'Is the child safe right now?',
    options: ['Yes', 'No, immediate risk'],
  },
  {
    key: 'words',
    question: 'Can the child speak or process words right now?',
    options: ['Yes', 'No, shutting down or non-speaking'],
  },
  {
    key: 'signs',
    question: 'What signs are you seeing?',
    options: [
      'covering ears/hiding',
      'crying/screaming',
      'running/climbing',
      'freezing/shutdown',
      'hitting/throwing',
    ],
  },
  {
    key: 'trigger',
    question: 'What may have triggered it?',
    options: [
      'noise/crowd',
      'lights/visual overload',
      'transition/change',
      'demand/task',
      'hunger/tiredness/pain',
      'unknown',
    ],
  },
]

const resultSections = [
  {
    title: 'Immediate steps',
    items: [
      'Use a calm voice and slow movements.',
      'Lower noise, lights, touch, and talking where you can.',
      'Offer space, a familiar comfort item, or a quieter place.',
      'Use short words or visual choices if words are hard right now.',
    ],
  },
  {
    title: 'What to avoid',
    items: [
      'Avoid extra questions, lectures, or pressure to explain.',
      'Avoid forcing eye contact or physical contact.',
      'Avoid sudden changes unless safety requires it.',
      'Avoid making the moment a behaviour lesson while the child is overwhelmed.',
    ],
  },
  {
    title: 'Body checks',
    items: [
      'Check for hunger, thirst, tiredness, heat, cold, pain, or clothing discomfort.',
      'Look for signs the child needs toileting, rest, or a break from sensory input.',
      'When things are calmer, note what helped and what seemed to make it harder.',
    ],
  },
  {
    title: 'When to get help',
    items: [
      'Get help if anyone may be hurt, the child cannot move to safety, or the situation feels unsafe.',
      'Contact a trusted professional if episodes are becoming more frequent, intense, or hard to recover from.',
      'Use emergency services if there is immediate danger.',
    ],
  },
]

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})

  const activeStep = sensoryFlow[currentStep]
  const hasImmediateRisk = answers.safe === 'No, immediate risk'

  function returnHome() {
    setCurrentView('home')
    setCurrentStep(0)
    setAnswers({})
  }

  function chooseSituation(situation) {
    if (situation === 'Sensory overload / meltdown') {
      setCurrentView('sensory-flow')
      setCurrentStep(0)
      setAnswers({})
      return
    }

    setAnswers({ selectedSituation: situation })
  }

  function chooseAnswer(answer) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [activeStep.key]: answer,
    }))

    if (currentStep === sensoryFlow.length - 1) {
      setCurrentView('sensory-result')
      return
    }

    setCurrentStep((step) => step + 1)
  }

  const selectedSituation = answers.selectedSituation

  return (
    <main className="app-shell">
      <section className="support-card" aria-labelledby="app-title">
        <header className={currentView === 'home' ? 'hero' : 'hero compact'}>
          <p className="eyebrow">MVP support guide</p>
          <h1 id="app-title">ASD Aid</h1>
          <p className="subtitle">
            A calm decision-support tool for daily autism and ADHD challenges.
          </p>
        </header>

        {currentView === 'home' && (
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
                  onClick={() => chooseSituation(situation)}
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
        )}

        {currentView === 'sensory-flow' && (
          <div className="decision-panel flow-panel">
            <button className="back-button" type="button" onClick={returnHome}>
              Back
            </button>
            <p className="step-count">
              Step {currentStep + 1} of {sensoryFlow.length}
            </p>
            <h2>{activeStep.question}</h2>
            <div className="button-list" role="list">
              {activeStep.options.map((option) => (
                <button
                  className="decision-button"
                  key={option}
                  type="button"
                  onClick={() => chooseAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentView === 'sensory-result' && (
          <div className="decision-panel result-panel">
            <button className="back-button" type="button" onClick={returnHome}>
              Back
            </button>
            <p className="step-count">Sensory overload / meltdown</p>
            <h2>Here are calm next steps.</h2>

            {hasImmediateRisk && (
              <p className="urgent-note">
                Move dangerous items away, reduce demands, and seek urgent help
                if anyone may be hurt.
              </p>
            )}

            <div className="answer-summary" aria-label="Your answers">
              {sensoryFlow.map((step) => (
                <p key={step.key}>
                  <strong>{step.question}</strong>
                  <span>{answers[step.key]}</span>
                </p>
              ))}
            </div>

            <div className="result-sections">
              {resultSections.map((section) => (
                <section className="result-section" key={section.title}>
                  <h3>{section.title}</h3>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        )}
      </section>

      <p className="disclaimer">
        This app provides general support strategies only. It does not diagnose
        or replace medical, therapy, or emergency advice.
      </p>
    </main>
  )
}

export default App
