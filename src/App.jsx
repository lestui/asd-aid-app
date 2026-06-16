import { useEffect, useState } from 'react'
import BodyRegulationScreen from './components/BodyRegulationScreen.jsx'
import ChildProfileScreen from './components/ChildProfileScreen.jsx'
import EvidenceSupportScreen from './components/EvidenceSupportScreen.jsx'
import FlowScreen from './components/FlowScreen.jsx'
import FurtherReadingScreen from './components/FurtherReadingScreen.jsx'
import GuideAreaScreen from './components/GuideAreaScreen.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import ResultScreen from './components/ResultScreen.jsx'
import SavedStrategiesScreen from './components/SavedStrategiesScreen.jsx'
import ToiletingSupportScreen from './components/ToiletingSupportScreen.jsx'
import { flows, situations } from './data/flows.js'
import './App.css'

const PROFILE_STORAGE_KEY = 'asd-aid-child-profile'
const STRATEGIES_STORAGE_KEY = 'asd-aid-saved-strategies'

const emptyProfile = {
  nickname: '',
  ageStage: '',
  communicationStyle: [],
  sensoryTriggers: [],
  calmingSupports: [],
  difficultRoutines: [],
  toiletingConcerns: [],
  schoolChallenges: [],
  safetyConcerns: [],
  caregiverNotes: '',
}

function normalizeProfile(storedProfile) {
  const mergedProfile = {
    ...emptyProfile,
    ...(storedProfile && typeof storedProfile === 'object' ? storedProfile : {}),
  }

  Object.keys(emptyProfile).forEach((key) => {
    if (Array.isArray(emptyProfile[key]) && !Array.isArray(mergedProfile[key])) {
      mergedProfile[key] = []
    }
  })

  if (!mergedProfile.ageStage && storedProfile?.age) {
    mergedProfile.ageStage = storedProfile.age
  }

  if (!mergedProfile.caregiverNotes) {
    mergedProfile.caregiverNotes = [
      storedProfile?.triggers && `Triggers: ${storedProfile.triggers}`,
      storedProfile?.calmingTools && `Calming tools: ${storedProfile.calmingTools}`,
      storedProfile?.communicationPreferences &&
        `Communication: ${storedProfile.communicationPreferences}`,
      storedProfile?.schoolNotes && `School: ${storedProfile.schoolNotes}`,
    ]
      .filter(Boolean)
      .join('\n')
  }

  return mergedProfile
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
  const [activeGuideAreaId, setActiveGuideAreaId] = useState('')

  const activeFlow = flows[activeFlowKey]
  const activeStep = activeFlow?.steps[currentStep]
  const hasAlert = activeFlow?.alertAnswer
    ? Object.values(answers).includes(activeFlow.alertAnswer)
    : false
  const activeScripts =
    activeFlow?.scripts ?? (activeFlow?.script ? [activeFlow.script] : [])
  const selectedSituation = answers.selectedSituation

  useEffect(() => {
    setProfile(normalizeProfile(loadStoredValue(PROFILE_STORAGE_KEY, emptyProfile)))
    setSavedStrategies(sortNewestFirst(loadStoredValue(STRATEGIES_STORAGE_KEY, [])))
  }, [])

  function returnHome() {
    setCurrentView('home')
    setCurrentStep(0)
    setAnswers({})
    setActiveFlowKey('')
    setActiveGuideAreaId('')
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

  function openBodyRegulation() {
    setCurrentView('bodyRegulation')
  }

  function openToiletingSupport() {
    setCurrentView('toiletingSupport')
  }

  function openFurtherReading() {
    setCurrentView('furtherReading')
  }

  function openGuideArea(guideAreaId) {
    setActiveGuideAreaId(guideAreaId)
    setCurrentView('guideArea')
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
            className="brand-mark"
            src="/asd-helper-guide-icon.svg"
            alt=""
            aria-hidden="true"
          />
          <div className="brand-copy">
            <p className="eyebrow">Sunflower support</p>
            <h1 id="app-title">ASD Helper Guide</h1>
            <p className="subtitle">
              Calm decision support for everyday autism and ADHD challenges.
            </p>
          </div>
        </header>

        {currentView === 'home' && (
          <HomeScreen
            selectedSituation={selectedSituation}
            situations={situations}
            onChooseSituation={chooseSituation}
            onOpenBodyRegulation={openBodyRegulation}
            onOpenEvidenceSupports={openEvidenceSupports}
            onOpenFurtherReading={openFurtherReading}
            onOpenGuideArea={openGuideArea}
            onOpenProfile={openProfile}
            onOpenSavedStrategies={openSavedStrategies}
            onOpenToiletingSupport={openToiletingSupport}
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
            onBrowseBodyRegulation={openBodyRegulation}
            onBrowseEvidenceSupports={openEvidenceSupports}
            onBrowseToileting={openToiletingSupport}
            onChange={updateProfileField}
            onOpenGuideArea={openGuideArea}
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

        {currentView === 'bodyRegulation' && (
          <BodyRegulationScreen onBack={returnHome} />
        )}

        {currentView === 'toiletingSupport' && (
          <ToiletingSupportScreen onBack={returnHome} />
        )}

        {currentView === 'furtherReading' && (
          <FurtherReadingScreen onBack={returnHome} />
        )}

        {currentView === 'guideArea' && (
          <GuideAreaScreen
            guideAreaId={activeGuideAreaId}
            onBack={returnHome}
          />
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
