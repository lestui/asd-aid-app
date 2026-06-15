import { useState } from 'react'
import FlowScreen from './components/FlowScreen.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import ResultScreen from './components/ResultScreen.jsx'
import { flows, situations } from './data/flows.js'
import './App.css'

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
    setActiveFlowKey(situation.flowKey)
    setCurrentView('flow')
    setCurrentStep(0)
    setAnswers({})
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
          <HomeScreen
            selectedSituation={selectedSituation}
            situations={situations}
            onChooseSituation={chooseSituation}
          />
        )}

        {currentView === 'flow' && activeFlow && activeStep && (
          <FlowScreen
            currentStep={currentStep}
            flow={activeFlow}
            step={activeStep}
            onBack={returnHome}
            onChooseAnswer={chooseAnswer}
          />
        )}

        {currentView === 'result' && activeFlow && (
          <ResultScreen
            answers={answers}
            flow={activeFlow}
            hasAlert={hasAlert}
            scripts={activeScripts}
            onBack={returnHome}
          />
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
