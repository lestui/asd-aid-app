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

const schoolTransitionFlow = [
  {
    key: 'struggle',
    question: 'What is the main struggle right now?',
    options: [
      'refusing to go',
      'crying/clinging',
      'running away/hiding',
      'aggressive distress',
      'shutting down',
      'after-school crash',
    ],
  },
  {
    key: 'timing',
    question: 'When does it happen most?',
    options: [
      'morning before school',
      'school drop-off',
      'classroom entry',
      'transitions during school',
      'pickup/after school',
      'bedtime before school',
    ],
  },
  {
    key: 'driver',
    question: 'What might be driving it?',
    options: [
      'sensory overload',
      'separation anxiety',
      'change in routine',
      'social pressure',
      'demand/task avoidance',
      'tiredness/hunger/pain',
      'unknown',
    ],
  },
  {
    key: 'support',
    question: 'What support is already in place?',
    options: [
      'none yet',
      'teacher knows',
      'learning support plan',
      'reduced hours',
      'calm space',
      'visual schedule',
      'not sure',
    ],
  },
]

const communicationFlow = [
  {
    key: 'current',
    question: 'What is happening right now?',
    options: [
      'not answering',
      'repeating words/sounds',
      'crying/frustrated',
      'pointing/pulling adult',
      'saying no to everything',
      'seems confused',
    ],
  },
  {
    key: 'words',
    question: 'Can the child use words right now?',
    options: ['yes', 'some words', 'no words right now', 'not sure'],
  },
  {
    key: 'need',
    question: 'What might they need?',
    options: [
      'help',
      'break',
      'food/drink',
      'toilet',
      'comfort',
      'more time',
      'different activity',
      'unknown',
    ],
  },
  {
    key: 'harder',
    question: 'What makes communication harder right now?',
    options: [
      'too many words',
      'too many choices',
      'noise/overload',
      'pressure to answer',
      'change in routine',
      'tiredness/hunger/pain',
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
  schoolTransition: {
    title: 'School or transition struggle',
    steps: schoolTransitionFlow,
    resultHeading: 'Start with a calmer transition plan.',
    script:
      'Hi, we’re noticing school transitions are becoming very hard for him. Could we work together on a simple support plan with a calm entry routine, discreet breaks, and a way to reduce overload before it becomes too much?',
    resultSections: [
      {
        title: 'Immediate steps for today',
        items: [
          'Reduce pressure and avoid long explanations during distress.',
          'Use short, predictable language, such as first shoes, then car.',
          'Offer a calm transition object, visual schedule, or first/then plan.',
          'Choose the smallest next step and give time for the child to move toward it.',
        ],
      },
      {
        title: 'What to avoid',
        items: [
          'Avoid arguing, bargaining, or asking lots of why questions in the moment.',
          'Avoid rushing with surprise changes unless safety requires it.',
          'Avoid turning the transition into a lesson while the child is overwhelmed.',
        ],
      },
      {
        title: 'Things to check',
        items: [
          'Check sleep, food, toileting, pain, clothing comfort, and morning sensory load.',
          'Look for patterns around certain days, people, rooms, noise, or timetable changes.',
          'Track patterns: day, time, trigger, sleep, food, and what helped.',
        ],
      },
      {
        title: 'School support ideas',
        items: [
          'Ask for a calm entry routine with one predictable adult and fewer words.',
          'Use a visual schedule, first/then card, or quiet arrival job.',
          'Plan discreet breaks before overload builds, not only after distress starts.',
          'Consider a reduced-demand start to the day while the routine settles.',
        ],
      },
      {
        title: 'A simple message/script to send to school',
        items: [
          'Use the message above as a starting point and adjust names or details as needed.',
          'Ask for one or two practical changes first so the plan is easy to try.',
          'Share what helped at home and ask what staff are noticing at school.',
        ],
      },
      {
        title: 'When to seek extra help',
        items: [
          'Seek extra help if distress is escalating, safety is hard to manage, or school attendance is becoming very difficult.',
          'Ask school support staff or a trusted professional for help building a shared plan.',
          'Get urgent help if anyone may be hurt or the child cannot be kept safe.',
        ],
      },
    ],
  },
  communication: {
    title: 'Communication difficulty',
    steps: communicationFlow,
    resultHeading: 'Support communication without pressure.',
    scripts: [
      'You do not need to talk. Show me or point.',
      'First calm, then we solve.',
      'Do you want help or a break?',
    ],
    resultSections: [
      {
        title: 'Immediate communication support',
        items: [
          'Use fewer words and keep your voice calm.',
          'Pause and wait so the child has time to process.',
          'Offer two simple choices, or one clear next step.',
          'Accept pointing, gestures, objects, or showing instead of speech.',
        ],
      },
      {
        title: 'What to say',
        items: [
          'Use the scripts above in a steady, predictable way.',
          'Name what you can see without asking for an explanation.',
          'Try short choices such as help or break, drink or toilet, here or quiet space.',
        ],
      },
      {
        title: 'What to avoid',
        items: [
          'Do not demand eye contact or force speech during distress.',
          'Avoid repeating the same question quickly.',
          'Avoid too many choices, long explanations, or pressure to answer now.',
        ],
      },
      {
        title: 'Visual/support options',
        items: [
          'Use visuals, pointing, gestures, or objects to help the child communicate.',
          'Offer a picture card, first/then card, yes/no choice, or familiar item.',
          'Let the child show you what they need if words are not available.',
        ],
      },
      {
        title: 'Body checks',
        items: [
          'Check tiredness, hunger, thirst, toileting, pain, heat, cold, and sensory overload.',
          'Look for signs that the child needs a break, comfort, movement, or a quieter space.',
          'Notice whether communication improves after the body need is met.',
        ],
      },
      {
        title: 'When to seek extra help',
        items: [
          'Seek extra help if communication changes suddenly, distress is increasing, or daily needs are hard to understand.',
          'Ask a trusted professional or school support person for practical communication supports.',
          'Get urgent help if anyone may be hurt or the child cannot be kept safe.',
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
  const activeScripts =
    activeFlow?.scripts ?? (activeFlow?.script ? [activeFlow.script] : [])
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

    if (situation === 'School or transition struggle') {
      setActiveFlowKey('schoolTransition')
      setCurrentView('flow')
      setCurrentStep(0)
      setAnswers({})
      return
    }

    if (situation === 'Communication difficulty') {
      setActiveFlowKey('communication')
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

            {activeScripts.length > 0 && (
              <div className="script-list">
                {activeScripts.map((script) => (
                  <blockquote className="script-card" key={script}>
                    {script}
                  </blockquote>
                ))}
              </div>
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
