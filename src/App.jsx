import { useEffect, useState } from 'react'
import ChildProfileScreen from './components/ChildProfileScreen.jsx'
import EvidenceSupportScreen from './components/EvidenceSupportScreen.jsx'
import FlowScreen from './components/FlowScreen.jsx'
import FurtherReadingScreen from './components/FurtherReadingScreen.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import ResultScreen from './components/ResultScreen.jsx'
import SavedStrategiesScreen from './components/SavedStrategiesScreen.jsx'
import { flows, situations } from './data/flows.js'
import './App.css'

const PROFILE_STORAGE_KEY = 'asd-aid-child-profile'
const STRATEGIES_STORAGE_KEY = 'asd-aid-saved-strategies'

const emptyProfile = {
  nickname: '',
  age: '',
  triggers: '',
  calmingTools: '',
  communicationPreferences: '',
  schoolNotes: '',
}

function loadStoredValue(key, fallback) {
  try {
    const storedValue = window.localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : fallback
  } catch {
    return fallback
  }
}

function sortNewestFirst(strategies) {
  if (!Array.isArray(strategies)) {
    return []
  }

  return [...strategies].sort(
    (firstStrategy, secondStrategy) =>
      new Date(secondStrategy.savedAt).getTime() -
      new Date(firstStrategy.savedAt).getTime(),
  )
}

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [activeFlowKey, setActiveFlowKey] = useState('')
  const [profile, setProfile] = useState(emptyProfile)
  const [savedStrategies, setSavedStrategies] = useState([])
  const [profileSavedMessage, setProfileSavedMessage] = useState('')
  const [strategySavedMessage, setStrategySavedMessage] = useState('')

  const activeFlow = flows[activeFlowKey]
  const activeStep = activeFlow?.steps[currentStep]
  const hasAlert = activeFlow?.alertAnswer
    ? Object.values(answers).includes(activeFlow.alertAnswer)
    : false
  const activeScripts =
    activeFlow?.scripts ?? (activeFlow?.script ? [activeFlow.script] : [])
  const selectedSituation = answers.selectedSituation

  useEffect(() => {
    setProfile({
      ...emptyProfile,
      ...loadStoredValue(PROFILE_STORAGE_KEY, emptyProfile),
    })
    setSavedStrategies(sortNewestFirst(loadStoredValue(STRATEGIES_STORAGE_KEY, [])))
  }, [])

  function returnHome() {
    setCurrentView('home')
    setCurrentStep(0)
    setAnswers({})
    setActiveFlowKey('')
    setProfileSavedMessage('')
    setStrategySavedMessage('')
  }

  function openProfile() {
    setCurrentView('profile')
    setProfileSavedMessage('')
  }

  function openSavedStrategies() {
    setCurrentView('savedStrategies')
    setStrategySavedMessage('')
  }

  function openEvidenceSupports() {
    setCurrentView('evidenceSupports')
  }

  function openFurtherReading() {
    setCurrentView('furtherReading')
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

  function updateProfileField(field, value) {
    setProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }))
  }

  function saveProfile(event) {
    event.preventDefault()
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
    setProfileSavedMessage('Profile saved on this device.')
  }

  function saveCurrentStrategy() {
    if (!activeFlow) {
      return
    }

    const strategy = {
      id: crypto.randomUUID(),
      flowTitle: activeFlow.title,
      savedAt: new Date().toISOString(),
      answers: activeFlow.steps.map((step) => ({
        question: step.question,
        answer: answers[step.key],
      })),
      resultSections: activeFlow.resultSections,
    }

    setSavedStrategies((currentStrategies) => {
      const updatedStrategies = [strategy, ...currentStrategies]
      window.localStorage.setItem(
        STRATEGIES_STORAGE_KEY,
        JSON.stringify(updatedStrategies),
      )
      return updatedStrategies
    })
    setStrategySavedMessage('Strategy saved on this device.')
  }

  function deleteSavedStrategy(strategyId) {
    setSavedStrategies((currentStrategies) => {
      const updatedStrategies = currentStrategies.filter(
        (strategy) => strategy.id !== strategyId,
      )
      window.localStorage.setItem(
        STRATEGIES_STORAGE_KEY,
        JSON.stringify(updatedStrategies),
      )
      return updatedStrategies
    })
  }

  return (
    <main className="app-shell">
      <section className="support-card" aria-labelledby="app-title">
        <header className={currentView === 'home' ? 'hero' : 'hero compact'}>
          <img
            className="brand-logo"
            src="/asd-helper-guide-logo.svg"
            alt=""
            aria-hidden="true"
          />
          <p className="eyebrow">Support guide</p>
          <h1 id="app-title">ASD Helper Guide</h1>
          <p className="subtitle">
            A calm decision-support tool for daily autism and ADHD challenges.
          </p>
        </header>

        {currentView === 'home' && (
          <HomeScreen
            selectedSituation={selectedSituation}
            situations={situations}
            onChooseSituation={chooseSituation}
            onOpenEvidenceSupports={openEvidenceSupports}
            onOpenFurtherReading={openFurtherReading}
            onOpenProfile={openProfile}
            onOpenSavedStrategies={openSavedStrategies}
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
            savedMessage={strategySavedMessage}
            onBack={returnHome}
            onSaveStrategy={saveCurrentStrategy}
          />
        )}

        {currentView === 'profile' && (
          <ChildProfileScreen
            profile={profile}
            savedMessage={profileSavedMessage}
            onBack={returnHome}
            onChange={updateProfileField}
            onSave={saveProfile}
          />
        )}

        {currentView === 'savedStrategies' && (
          <SavedStrategiesScreen
            savedStrategies={savedStrategies}
            onBack={returnHome}
            onDelete={deleteSavedStrategy}
          />
        )}

        {currentView === 'evidenceSupports' && (
          <EvidenceSupportScreen onBack={returnHome} />
        )}

        {currentView === 'furtherReading' && (
          <FurtherReadingScreen onBack={returnHome} />
        )}
      </section>

      <p className="disclaimer">
        This app provides general educational support information. It is not a
        diagnostic tool and does not replace professional advice.
      </p>
    </main>
  )
}

export default App
