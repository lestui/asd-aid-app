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

const bodyBehaviourFlow = [
  {
    key: 'concern',
    question: 'Is anyone unsafe or distressed right now?',
    options: ['No', 'Yes, immediate concern'],
  },
  {
    key: 'discomfort',
    question: 'Could there be physical discomfort?',
    options: [
      'possible rash/chafing',
      'toileting/UTI signs',
      'constipation/tummy discomfort',
      'tight clothing/waistband',
      'not sure',
    ],
  },
  {
    key: 'location',
    question: 'Where is it happening most?',
    options: [
      'school/classroom',
      'car/travel',
      'home',
      'public place',
      'bedtime/private space',
    ],
  },
  {
    key: 'trigger',
    question: 'What seems to trigger it?',
    options: [
      'sitting still',
      'sensory overload',
      'anxiety/stress',
      'boredom/waiting',
      'clothing discomfort',
      'unknown',
    ],
  },
]

const flows = {
  sensory: {
    title: 'Sensory overload / meltdown',
    steps: sensoryFlow,
    resultHeading: 'Here are calm next steps.',
    alertAnswer: 'No, immediate risk',
    alertText:
      'Move dangerous items away, reduce demands, and seek urgent help if anyone may be hurt.',
    resultSections: [
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
    ],
  },
  bodyBehaviour: {
    title: 'Public / private body behaviour',
    steps: bodyBehaviourFlow,
    resultHeading: 'Try these calm, practical supports.',
    alertAnswer: 'Yes, immediate concern',
    alertText:
      'Move calmly, protect privacy, reduce attention, and get help if anyone is unsafe or very distressed.',
    script:
      'Your body is private. Private parts are for private places like the bathroom or bedroom. At school and in public, hands stay outside clothes.',
    resultSections: [
      {
        title: 'First checks',
        items: [
          'Check pain, toileting, rash, constipation, and clothing discomfort first.',
          'Look for chafing, tight waistbands, itchy seams, heat, or needing the toilet.',
          'If this is new, intense, or linked with pain, consider checking in with a health professional.',
        ],
      },
      {
        title: 'Calm language to use',
        items: [
          'Use a quiet, neutral voice and keep words short.',
          'Say the private body script the same way each time.',
          'Give a simple next step, such as bathroom, hands out, or choose a fidget.',
        ],
      },
      {
        title: 'What to avoid',
        items: [
          'Do not shame, punish, or make a big public reaction.',
          'Avoid long explanations in the moment.',
          'Avoid joking, teasing, or drawing attention from other people.',
        ],
      },
      {
        title: 'Replacement supports',
        items: [
          'Offer a fidget, chew-safe item, weighted lap pad, movement break, or hands-on task.',
          'Use a visual reminder for private place and public place rules.',
          'Plan regular toilet breaks and clothing checks before longer sitting times.',
        ],
      },
      {
        title: 'School/support plan ideas',
        items: [
          'Use discreet redirection at school, such as a quiet cue card or calm prompt.',
          'Agree on a private break option, bathroom pass, or sensory break plan.',
          'Track patterns without blame: time, place, clothing, toileting, waiting, and stress.',
        ],
      },
      {
        title: 'When to seek help',
        items: [
          'Seek help if there is pain, toileting concern, rash, injury, or sudden behaviour change.',
          'Ask for support if the behaviour is frequent, escalating, or hard to redirect safely.',
          'Get urgent help if anyone may be harmed or the child is very distressed.',
        ],
      },
    ],
  },
}

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [activeFlowKey, setActiveFlowKey] = useState('')

  const activeFlow = flows[activeFlowKey]
  const activeStep = activeFlow?.steps[currentStep]
  const hasAlert = activeFlow?.alertAnswer
    ? Object.values(answers).includes(activeFlow.alertAnswer)
    : false
  const selectedSituation = answers.selectedSituation

  function returnHome() {
    setCurrentView('home')
    setCurrentStep(0)
    setAnswers({})
    setActiveFlowKey('')
  }

  function chooseSituation(situation) {
    if (situation === 'Sensory overload / meltdown') {
      setActiveFlowKey('sensory')
      setCurrentView('flow')
      setCurrentStep(0)
      setAnswers({})
      return
    }

    if (situation === 'Public / private body behaviour') {
      setActiveFlowKey('bodyBehaviour')
      setCurrentView('flow')
      setCurrentStep(0)
      setAnswers({})
      return
    }

    setAnswers({ selectedSituation: situation })
  }

  function chooseAnswer(answer) {
    if (!activeFlow || !activeStep) {
      return
    }

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [activeStep.key]: answer,
    }))

    if (currentStep === activeFlow.steps.length - 1) {
      setCurrentView('result')
      return
    }

    setCurrentStep((step) => step + 1)
  }

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

        {currentView === 'flow' && activeFlow && activeStep && (
          <div className="decision-panel flow-panel">
            <button className="back-button" type="button" onClick={returnHome}>
              Back
            </button>
            <p className="step-count">
              Step {currentStep + 1} of {activeFlow.steps.length}
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

        {currentView === 'result' && activeFlow && (
          <div className="decision-panel result-panel">
            <button className="back-button" type="button" onClick={returnHome}>
              Back
            </button>
            <p className="step-count">{activeFlow.title}</p>
            <h2>{activeFlow.resultHeading}</h2>

            {hasAlert && <p className="urgent-note">{activeFlow.alertText}</p>}

            {activeFlow.script && (
              <blockquote className="script-card">{activeFlow.script}</blockquote>
            )}

            <div className="answer-summary" aria-label="Your answers">
              {activeFlow.steps.map((step) => (
                <p key={step.key}>
                  <strong>{step.question}</strong>
                  <span>{answers[step.key]}</span>
                </p>
              ))}
            </div>

            <div className="result-sections">
              {activeFlow.resultSections.map((section) => (
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
