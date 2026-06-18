import { useEffect, useState } from 'react'
import BodyRegulationScreen from './components/BodyRegulationScreen.jsx'
import CarerHandoverScreen from './components/CarerHandoverScreen.jsx'
import ChildProfileScreen from './components/ChildProfileScreen.jsx'
import DailyCheckInScreen from './components/DailyCheckInScreen.jsx'
import EmergencyProfileScreen from './components/EmergencyProfileScreen.jsx'
import EvidenceSupportScreen from './components/EvidenceSupportScreen.jsx'
import FlowScreen from './components/FlowScreen.jsx'
import FamilyGuideScreen from './components/FamilyGuideScreen.jsx'
import FurtherReadingScreen from './components/FurtherReadingScreen.jsx'
import FundingTrackerScreen from './components/FundingTrackerScreen.jsx'
import GlossaryScreen from './components/GlossaryScreen.jsx'
import GuideAreaScreen from './components/GuideAreaScreen.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import ResultScreen from './components/ResultScreen.jsx'
import SafeFoodsScreen from './components/SafeFoodsScreen.jsx'
import SavedStrategiesScreen from './components/SavedStrategiesScreen.jsx'
import ToiletingSupportScreen from './components/ToiletingSupportScreen.jsx'
import { flows, situations } from './data/flows.js'
import './App.css'

const PROFILE_STORAGE_KEY = 'asd-aid-child-profile'
const STRATEGIES_STORAGE_KEY = 'asd-aid-saved-strategies'
const DAILY_CHECKIN_STORAGE_KEY = 'asd-aid-daily-checkins'
const EMERGENCY_PROFILE_STORAGE_KEY = 'asd-aid-emergency-profile'
const HANDOVER_NOTE_STORAGE_KEY = 'asd-aid-carer-handover-note'
const SAFE_FOODS_STORAGE_KEY = 'asd-aid-safe-foods'
const FAMILY_GUIDE_STORAGE_KEY = 'asd-aid-family-guide'
const FUNDING_TRACKER_STORAGE_KEY = 'asd-aid-funding-tracker'

const emptyProfile = {
  nickname: '',
  ageStage: '',
  communicationStyle: [],
  sensoryTriggers: [],
  calmingSupports: [],
  safeFoods: '',
  emergencyContacts: '',
  schoolKindyNotes: '',
  carerNotes: '',
  topTriggers: '',
  soothingTools: '',
  difficultRoutines: [],
  toiletingConcerns: [],
  schoolChallenges: [],
  safetyConcerns: [],
  caregiverNotes: '',
}

const emptyDailyCheckIn = {
  status: '',
  sleepQuality: '',
  nightWaking: '',
  wakeMood: '',
  note: '',
  sleepNote: '',
  date: '',
  savedAt: '',
}

const emptyEmergencyProfile = {
  topTriggers: '',
  earlyWarningSigns: '',
  whatHelps: '',
  whatMakesWorse: '',
  communicationStyle: '',
  sensoryTools: '',
  safePlace: '',
  emergencyContacts: '',
  savedAt: '',
}

const safeFoodFields = [
  'foodName',
  'brand',
  'store',
  'packagingNotes',
  'prepMethod',
  'safeSubstitutes',
  'unsafeSubstitutes',
  'sensoryNotes',
  'caregiverNotes',
]

const emptySafeFood = {
  id: '',
  foodName: '',
  brand: '',
  store: '',
  packagingNotes: '',
  prepMethod: '',
  safeSubstitutes: '',
  unsafeSubstitutes: '',
  sensoryNotes: '',
  caregiverNotes: '',
  savedAt: '',
}

const familyGuideFields = [
  'childNickname',
  'greeting',
  'pleaseDo',
  'pleaseDoNot',
  'comfortItems',
  'safeFoodsReminder',
  'transitionTips',
  'overwhelmedSupport',
  'eventNote',
]

const emptyFamilyGuide = {
  childNickname: '',
  greeting: '',
  pleaseDo: '',
  pleaseDoNot: '',
  comfortItems: '',
  safeFoodsReminder: '',
  transitionTips: '',
  overwhelmedSupport: '',
  eventNote: '',
  savedAt: '',
}

const fundingTrackerFields = [
  'date',
  'supportType',
  'description',
  'hoursUsed',
  'daysUsed',
  'amountSpent',
  'receiptNote',
  'claimStatus',
  'notes',
]

const fundingSupportTypes = [
  'Carer Support',
  'Individualised Funding',
  'Respite',
  'Private support',
  'Other',
]

const fundingClaimStatuses = [
  'Not claimed',
  'Submitted',
  'Paid',
  'Rejected / needs follow-up',
]

const emptyFundingTrackerEntry = {
  id: '',
  date: '',
  supportType: 'Carer Support',
  description: '',
  hoursUsed: '',
  daysUsed: '',
  amountSpent: '',
  receiptNote: '',
  claimStatus: 'Not claimed',
  notes: '',
  savedAt: '',
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

  if (!mergedProfile.topTriggers && storedProfile?.triggers) {
    mergedProfile.topTriggers = storedProfile.triggers
  }

  if (!mergedProfile.soothingTools && storedProfile?.calmingTools) {
    mergedProfile.soothingTools = storedProfile.calmingTools
  }

  if (!mergedProfile.schoolKindyNotes && storedProfile?.schoolNotes) {
    mergedProfile.schoolKindyNotes = storedProfile.schoolNotes
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

function saveStoredValue(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

function getTodayKey() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function normalizeDailyCheckIns(storedCheckIns) {
  if (!Array.isArray(storedCheckIns)) {
    return []
  }

  return storedCheckIns
    .filter((checkIn) => checkIn && typeof checkIn === 'object' && checkIn.date)
    .map((checkIn) => ({
      ...emptyDailyCheckIn,
      ...checkIn,
    }))
}

function normalizeEmergencyProfile(storedProfile) {
  return {
    ...emptyEmergencyProfile,
    ...(storedProfile && typeof storedProfile === 'object' ? storedProfile : {}),
  }
}

function normalizeSafeFoods(storedSafeFoods) {
  if (!Array.isArray(storedSafeFoods)) {
    return []
  }

  return storedSafeFoods
    .filter((safeFood) => safeFood && typeof safeFood === 'object')
    .map((safeFood) => {
      const normalizedSafeFood = {
        ...emptySafeFood,
        id:
          typeof safeFood.id === 'string' && safeFood.id
            ? safeFood.id
            : createLocalId('safe-food'),
        savedAt: typeof safeFood.savedAt === 'string' ? safeFood.savedAt : '',
      }

      safeFoodFields.forEach((field) => {
        normalizedSafeFood[field] =
          typeof safeFood[field] === 'string' ? safeFood[field] : ''
      })

      return normalizedSafeFood
    })
    .filter((safeFood) =>
      safeFoodFields.some((field) => safeFood[field].trim()),
    )
}

function normalizeFamilyGuide(storedGuide) {
  const normalizedGuide = {
    ...emptyFamilyGuide,
    ...(storedGuide && typeof storedGuide === 'object' ? storedGuide : {}),
  }

  familyGuideFields.forEach((field) => {
    normalizedGuide[field] =
      typeof normalizedGuide[field] === 'string' ? normalizedGuide[field] : ''
  })

  normalizedGuide.savedAt =
    typeof normalizedGuide.savedAt === 'string' ? normalizedGuide.savedAt : ''

  return normalizedGuide
}

function normalizeStoredString(storedValue) {
  return typeof storedValue === 'string' ? storedValue : ''
}

function normalizeFundingTrackerEntries(storedEntries) {
  if (!Array.isArray(storedEntries)) {
    return []
  }

  return storedEntries
    .filter((entry) => entry && typeof entry === 'object')
    .map((entry) => {
      const normalizedEntry = {
        ...emptyFundingTrackerEntry,
        id:
          typeof entry.id === 'string' && entry.id
            ? entry.id
            : createLocalId('funding-entry'),
        savedAt: typeof entry.savedAt === 'string' ? entry.savedAt : '',
      }

      fundingTrackerFields.forEach((field) => {
        normalizedEntry[field] =
          typeof entry[field] === 'string' ? entry[field] : ''
      })

      if (!fundingSupportTypes.includes(normalizedEntry.supportType)) {
        normalizedEntry.supportType = 'Other'
      }

      if (!fundingClaimStatuses.includes(normalizedEntry.claimStatus)) {
        normalizedEntry.claimStatus = 'Not claimed'
      }

      return normalizedEntry
    })
    .filter((entry) =>
      fundingTrackerFields.some((field) => {
        if (field === 'supportType' || field === 'claimStatus') {
          return false
        }
        return entry[field].trim()
      }),
    )
}

function normalizeSavedStrategies(storedStrategies) {
  if (!Array.isArray(storedStrategies)) {
    return []
  }

  return storedStrategies
    .filter((strategy) => strategy && typeof strategy === 'object')
    .map((strategy) => {
      const normalizedStrategy = {
        id: typeof strategy.id === 'string' ? strategy.id : '',
        flowTitle:
          typeof strategy.flowTitle === 'string' ? strategy.flowTitle : '',
        savedAt: typeof strategy.savedAt === 'string' ? strategy.savedAt : '',
        answers: Array.isArray(strategy.answers)
          ? strategy.answers
              .filter((answer) => answer && typeof answer === 'object')
              .map((answer) => ({
                question:
                  typeof answer.question === 'string' ? answer.question : '',
                answer: typeof answer.answer === 'string' ? answer.answer : '',
              }))
              .filter((answer) => answer.question || answer.answer)
          : [],
        resultSections: Array.isArray(strategy.resultSections)
          ? strategy.resultSections
              .filter((section) => section && typeof section === 'object')
              .map((section) => ({
                ...section,
                title: typeof section.title === 'string' ? section.title : '',
                content:
                  typeof section.content === 'string' ? section.content : '',
                items: Array.isArray(section.items)
                  ? section.items.filter((item) => typeof item === 'string')
                  : [],
              }))
              .filter(
                (section) =>
                  section.title || section.content || section.items.length > 0,
              )
          : [],
      }

      return normalizedStrategy
    })
    .filter(
      (strategy) =>
        strategy.id ||
        strategy.flowTitle ||
        strategy.savedAt ||
        strategy.answers.length > 0 ||
        strategy.resultSections.length > 0,
    )
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

function createLocalId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function createStrategyId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return createLocalId('strategy')
}

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [activeFlowKey, setActiveFlowKey] = useState('')
  const [profile, setProfile] = useState(emptyProfile)
  const [savedStrategies, setSavedStrategies] = useState([])
  const [dailyCheckIns, setDailyCheckIns] = useState([])
  const [emergencyProfile, setEmergencyProfile] = useState(emptyEmergencyProfile)
  const [handoverNote, setHandoverNote] = useState('')
  const [safeFoods, setSafeFoods] = useState([])
  const [safeFoodDraft, setSafeFoodDraft] = useState(emptySafeFood)
  const [editingSafeFoodId, setEditingSafeFoodId] = useState('')
  const [familyGuide, setFamilyGuide] = useState(emptyFamilyGuide)
  const [fundingTrackerEntries, setFundingTrackerEntries] = useState([])
  const [fundingTrackerDraft, setFundingTrackerDraft] = useState(
    emptyFundingTrackerEntry,
  )
  const [editingFundingTrackerId, setEditingFundingTrackerId] = useState('')
  const [profileSavedMessage, setProfileSavedMessage] = useState('')
  const [strategySavedMessage, setStrategySavedMessage] = useState('')
  const [dailyCheckInSavedMessage, setDailyCheckInSavedMessage] = useState('')
  const [emergencyProfileSavedMessage, setEmergencyProfileSavedMessage] =
    useState('')
  const [handoverSavedMessage, setHandoverSavedMessage] = useState('')
  const [safeFoodsSavedMessage, setSafeFoodsSavedMessage] = useState('')
  const [familyGuideSavedMessage, setFamilyGuideSavedMessage] = useState('')
  const [fundingTrackerSavedMessage, setFundingTrackerSavedMessage] =
    useState('')
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
    setSavedStrategies(
      sortNewestFirst(
        normalizeSavedStrategies(loadStoredValue(STRATEGIES_STORAGE_KEY, [])),
      ),
    )
    setDailyCheckIns(
      normalizeDailyCheckIns(loadStoredValue(DAILY_CHECKIN_STORAGE_KEY, [])),
    )
    setEmergencyProfile(
      normalizeEmergencyProfile(
        loadStoredValue(EMERGENCY_PROFILE_STORAGE_KEY, emptyEmergencyProfile),
      ),
    )
    setHandoverNote(
      normalizeStoredString(loadStoredValue(HANDOVER_NOTE_STORAGE_KEY, '')),
    )
    setSafeFoods(
      normalizeSafeFoods(loadStoredValue(SAFE_FOODS_STORAGE_KEY, [])),
    )
    setFamilyGuide(
      normalizeFamilyGuide(
        loadStoredValue(FAMILY_GUIDE_STORAGE_KEY, emptyFamilyGuide),
      ),
    )
    setFundingTrackerEntries(
      sortNewestFirst(
        normalizeFundingTrackerEntries(
          loadStoredValue(FUNDING_TRACKER_STORAGE_KEY, []),
        ),
      ),
    )
  }, [])

  function returnHome() {
    setCurrentView('home')
    setCurrentStep(0)
    setAnswers({})
    setActiveFlowKey('')
    setActiveGuideAreaId('')
    setProfileSavedMessage('')
    setStrategySavedMessage('')
    setDailyCheckInSavedMessage('')
    setEmergencyProfileSavedMessage('')
    setHandoverSavedMessage('')
    setSafeFoodsSavedMessage('')
    setFamilyGuideSavedMessage('')
    setFundingTrackerSavedMessage('')
  }

  function openProfile() {
    setCurrentView('profile')
    setProfileSavedMessage('')
  }

  function openSavedStrategies() {
    setCurrentView('savedStrategies')
    setStrategySavedMessage('')
  }

  function openDailyCheckIn() {
    setCurrentView('dailyCheckIn')
    setDailyCheckInSavedMessage('')
  }

  function openEmergencyProfile() {
    setCurrentView('emergencyProfile')
    setEmergencyProfileSavedMessage('')
  }

  function openCarerHandover() {
    setCurrentView('carerHandover')
    setHandoverSavedMessage('')
  }

  function openSafeFoods() {
    setCurrentView('safeFoods')
    setSafeFoodsSavedMessage('')
  }

  function openFamilyGuide() {
    setCurrentView('familyGuide')
    setFamilyGuideSavedMessage('')
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

  function openGlossary() {
    setCurrentView('glossary')
  }

  function openFundingTracker() {
    setCurrentView('fundingTracker')
    setFundingTrackerSavedMessage('')
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
    const saved = saveStoredValue(PROFILE_STORAGE_KEY, profile)
    setProfileSavedMessage(
      saved
        ? 'Profile saved on this device.'
        : 'Profile could not be saved in this browser. You can still copy anything important before leaving this screen.',
    )
  }

  function updateDailyCheckInField(field, value) {
    const today = getTodayKey()
    setDailyCheckIns((currentCheckIns) => {
      const existingCheckIn = currentCheckIns.find(
        (checkIn) => checkIn.date === today,
      )
      const nextCheckIn = {
        ...emptyDailyCheckIn,
        ...existingCheckIn,
        date: today,
        savedAt: existingCheckIn?.savedAt ?? '',
        [field]: value,
      }
      const otherCheckIns = currentCheckIns.filter(
        (checkIn) => checkIn.date !== today,
      )
      return [nextCheckIn, ...otherCheckIns]
    })
  }

  function saveDailyCheckIn(event) {
    event.preventDefault()
    const today = getTodayKey()
    const currentCheckIn =
      dailyCheckIns.find((checkIn) => checkIn.date === today) ?? emptyDailyCheckIn
    const nextCheckIn = {
      ...emptyDailyCheckIn,
      ...currentCheckIn,
      date: today,
      savedAt: new Date().toISOString(),
    }
    const updatedCheckIns = [
      nextCheckIn,
      ...dailyCheckIns.filter((checkIn) => checkIn.date !== today),
    ]

    if (saveStoredValue(DAILY_CHECKIN_STORAGE_KEY, updatedCheckIns)) {
      setDailyCheckIns(updatedCheckIns)
      setDailyCheckInSavedMessage("Today's check-in saved on this device.")
      return
    }

    setDailyCheckInSavedMessage(
      "Today's check-in could not be saved in this browser.",
    )
  }

  function updateEmergencyProfileField(field, value) {
    setEmergencyProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }))
  }

  function saveEmergencyProfile(event) {
    event.preventDefault()
    const updatedProfile = {
      ...emergencyProfile,
      savedAt: new Date().toISOString(),
    }

    if (saveStoredValue(EMERGENCY_PROFILE_STORAGE_KEY, updatedProfile)) {
      setEmergencyProfile(updatedProfile)
      setEmergencyProfileSavedMessage(
        'Emergency profile saved on this device.',
      )
      return
    }

    setEmergencyProfileSavedMessage(
      'Emergency profile could not be saved in this browser.',
    )
  }

  function updateHandoverNote(value) {
    setHandoverNote(value)
    setHandoverSavedMessage('')
  }

  function saveHandoverNote() {
    if (saveStoredValue(HANDOVER_NOTE_STORAGE_KEY, handoverNote)) {
      setHandoverSavedMessage('Handover note saved on this device.')
      return
    }

    setHandoverSavedMessage(
      'Handover note could not be saved in this browser.',
    )
  }

  function updateSafeFoodField(field, value) {
    setSafeFoodDraft((currentDraft) => ({
      ...currentDraft,
      [field]: value,
    }))
    setSafeFoodsSavedMessage('')
  }

  function resetSafeFoodForm() {
    setSafeFoodDraft(emptySafeFood)
    setEditingSafeFoodId('')
    setSafeFoodsSavedMessage('')
  }

  function saveSafeFood(event) {
    event.preventDefault()

    if (!safeFoodFields.some((field) => safeFoodDraft[field].trim())) {
      setSafeFoodsSavedMessage('Add at least one safe food detail before saving.')
      return
    }

    const savedAt = new Date().toISOString()
    const safeFoodToSave = {
      ...emptySafeFood,
      ...safeFoodDraft,
      id: editingSafeFoodId || createLocalId('safe-food'),
      savedAt,
    }
    const updatedSafeFoods = editingSafeFoodId
      ? safeFoods.map((safeFood) =>
          safeFood.id === editingSafeFoodId ? safeFoodToSave : safeFood,
        )
      : [safeFoodToSave, ...safeFoods]

    if (saveStoredValue(SAFE_FOODS_STORAGE_KEY, updatedSafeFoods)) {
      setSafeFoods(updatedSafeFoods)
      setSafeFoodDraft(emptySafeFood)
      setEditingSafeFoodId('')
      setSafeFoodsSavedMessage('Safe food saved on this device.')
      return
    }

    setSafeFoodsSavedMessage('Safe food could not be saved in this browser.')
  }

  function editSafeFood(safeFoodId) {
    const safeFoodToEdit = safeFoods.find((safeFood) => safeFood.id === safeFoodId)
    if (!safeFoodToEdit) {
      return
    }

    setSafeFoodDraft(safeFoodToEdit)
    setEditingSafeFoodId(safeFoodId)
    setSafeFoodsSavedMessage('Editing saved safe food.')
  }

  function deleteSafeFood(safeFoodId) {
    const updatedSafeFoods = safeFoods.filter((safeFood) => safeFood.id !== safeFoodId)

    if (saveStoredValue(SAFE_FOODS_STORAGE_KEY, updatedSafeFoods)) {
      setSafeFoods(updatedSafeFoods)
      if (editingSafeFoodId === safeFoodId) {
        setSafeFoodDraft(emptySafeFood)
        setEditingSafeFoodId('')
      }
      setSafeFoodsSavedMessage('Safe food deleted.')
      return
    }

    setSafeFoodsSavedMessage('Safe food could not be deleted in this browser.')
  }

  function updateFamilyGuideField(field, value) {
    setFamilyGuide((currentGuide) => ({
      ...currentGuide,
      [field]: value,
    }))
    setFamilyGuideSavedMessage('')
  }

  function saveFamilyGuide(event) {
    event.preventDefault()
    const updatedGuide = {
      ...familyGuide,
      savedAt: new Date().toISOString(),
    }

    if (saveStoredValue(FAMILY_GUIDE_STORAGE_KEY, updatedGuide)) {
      setFamilyGuide(updatedGuide)
      setFamilyGuideSavedMessage('Family guide saved on this device.')
      return
    }

    setFamilyGuideSavedMessage('Family guide could not be saved in this browser.')
  }

  function updateFundingTrackerField(field, value) {
    setFundingTrackerDraft((currentDraft) => ({
      ...currentDraft,
      [field]: value,
    }))
    setFundingTrackerSavedMessage('')
  }

  function resetFundingTrackerForm() {
    setFundingTrackerDraft(emptyFundingTrackerEntry)
    setEditingFundingTrackerId('')
    setFundingTrackerSavedMessage('')
  }

  function saveFundingTrackerEntry(event) {
    event.preventDefault()

    const hasRecordDetail = fundingTrackerFields.some((field) => {
      if (field === 'supportType' || field === 'claimStatus') {
        return false
      }
      return fundingTrackerDraft[field].trim()
    })

    if (!hasRecordDetail) {
      setFundingTrackerSavedMessage(
        'Add at least one record detail before saving.',
      )
      return
    }

    const savedAt = new Date().toISOString()
    const entryToSave = {
      ...emptyFundingTrackerEntry,
      ...fundingTrackerDraft,
      id: editingFundingTrackerId || createLocalId('funding-entry'),
      savedAt,
    }
    const updatedEntries = editingFundingTrackerId
      ? fundingTrackerEntries.map((entry) =>
          entry.id === editingFundingTrackerId ? entryToSave : entry,
        )
      : [entryToSave, ...fundingTrackerEntries]

    const sortedEntries = sortNewestFirst(updatedEntries)

    if (saveStoredValue(FUNDING_TRACKER_STORAGE_KEY, sortedEntries)) {
      setFundingTrackerEntries(sortedEntries)
      setFundingTrackerDraft(emptyFundingTrackerEntry)
      setEditingFundingTrackerId('')
      setFundingTrackerSavedMessage('Funding tracker entry saved on this device.')
      return
    }

    setFundingTrackerSavedMessage(
      'Funding tracker entry could not be saved in this browser.',
    )
  }

  function editFundingTrackerEntry(entryId) {
    const entryToEdit = fundingTrackerEntries.find((entry) => entry.id === entryId)
    if (!entryToEdit) {
      return
    }

    setFundingTrackerDraft(entryToEdit)
    setEditingFundingTrackerId(entryId)
    setFundingTrackerSavedMessage('Editing saved tracker entry.')
  }

  function deleteFundingTrackerEntry(entryId) {
    const updatedEntries = fundingTrackerEntries.filter(
      (entry) => entry.id !== entryId,
    )

    if (saveStoredValue(FUNDING_TRACKER_STORAGE_KEY, updatedEntries)) {
      setFundingTrackerEntries(updatedEntries)
      if (editingFundingTrackerId === entryId) {
        setFundingTrackerDraft(emptyFundingTrackerEntry)
        setEditingFundingTrackerId('')
      }
      setFundingTrackerSavedMessage('Funding tracker entry deleted.')
      return
    }

    setFundingTrackerSavedMessage(
      'Funding tracker entry could not be deleted in this browser.',
    )
  }

  function saveCurrentStrategy() {
    if (!activeFlow) {
      return
    }

    const strategy = {
      id: createStrategyId(),
      flowTitle: activeFlow.title,
      savedAt: new Date().toISOString(),
      answers: activeFlow.steps.map((step) => ({
        question: step.question,
        answer: answers[step.key],
      })),
      resultSections: activeFlow.resultSections,
    }

    const updatedStrategies = [strategy, ...savedStrategies]

    if (saveStoredValue(STRATEGIES_STORAGE_KEY, updatedStrategies)) {
      setSavedStrategies(updatedStrategies)
      setStrategySavedMessage('Strategy saved on this device.')
      return
    }

    setStrategySavedMessage('Strategy could not be saved in this browser.')
  }

  function deleteSavedStrategy(strategyId) {
    setSavedStrategies((currentStrategies) => {
      const updatedStrategies = currentStrategies.filter(
        (strategy) => strategy.id !== strategyId,
      )
      if (!saveStoredValue(STRATEGIES_STORAGE_KEY, updatedStrategies)) {
        setStrategySavedMessage(
          'This strategy could not be deleted in this browser.',
        )
        return currentStrategies
      }
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
            <p className="acronym-note">
              ASD means Autism Spectrum Disorder. ADHD means
              attention-deficit/hyperactivity disorder.
            </p>
          </div>
        </header>

        {currentView === 'home' && (
          <HomeScreen
            selectedSituation={selectedSituation}
            situations={situations}
            onChooseSituation={chooseSituation}
            onOpenBodyRegulation={openBodyRegulation}
            onOpenCarerHandover={openCarerHandover}
            onOpenDailyCheckIn={openDailyCheckIn}
            onOpenEvidenceSupports={openEvidenceSupports}
            onOpenEmergencyProfile={openEmergencyProfile}
            onOpenFamilyGuide={openFamilyGuide}
            onOpenFurtherReading={openFurtherReading}
            onOpenFundingTracker={openFundingTracker}
            onOpenGlossary={openGlossary}
            onOpenGuideArea={openGuideArea}
            onOpenProfile={openProfile}
            onOpenSafeFoods={openSafeFoods}
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

        {currentView === 'dailyCheckIn' && (
          <DailyCheckInScreen
            checkIn={
              dailyCheckIns.find((checkIn) => checkIn.date === getTodayKey()) ??
              emptyDailyCheckIn
            }
            savedMessage={dailyCheckInSavedMessage}
            onBack={returnHome}
            onChange={updateDailyCheckInField}
            onSave={saveDailyCheckIn}
          />
        )}

        {currentView === 'emergencyProfile' && (
          <EmergencyProfileScreen
            emergencyProfile={emergencyProfile}
            savedMessage={emergencyProfileSavedMessage}
            onBack={returnHome}
            onChange={updateEmergencyProfileField}
            onSave={saveEmergencyProfile}
          />
        )}

        {currentView === 'carerHandover' && (
          <CarerHandoverScreen
            dailyCheckIn={
              dailyCheckIns.find((checkIn) => checkIn.date === getTodayKey()) ??
              emptyDailyCheckIn
            }
            emergencyProfile={emergencyProfile}
            handoverNote={handoverNote}
            profile={profile}
            savedMessage={handoverSavedMessage}
            onBack={returnHome}
            onChangeNote={updateHandoverNote}
            onSaveNote={saveHandoverNote}
          />
        )}

        {currentView === 'safeFoods' && (
          <SafeFoodsScreen
            draft={safeFoodDraft}
            editingSafeFoodId={editingSafeFoodId}
            safeFoods={safeFoods}
            savedMessage={safeFoodsSavedMessage}
            onBack={returnHome}
            onCancelEdit={resetSafeFoodForm}
            onChange={updateSafeFoodField}
            onDelete={deleteSafeFood}
            onEdit={editSafeFood}
            onSave={saveSafeFood}
          />
        )}

        {currentView === 'familyGuide' && (
          <FamilyGuideScreen
            familyGuide={familyGuide}
            savedMessage={familyGuideSavedMessage}
            onBack={returnHome}
            onChange={updateFamilyGuideField}
            onSave={saveFamilyGuide}
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

        {currentView === 'fundingTracker' && (
          <FundingTrackerScreen
            draft={fundingTrackerDraft}
            editingEntryId={editingFundingTrackerId}
            entries={fundingTrackerEntries}
            savedMessage={fundingTrackerSavedMessage}
            onBack={returnHome}
            onCancelEdit={resetFundingTrackerForm}
            onChange={updateFundingTrackerField}
            onDelete={deleteFundingTrackerEntry}
            onEdit={editFundingTrackerEntry}
            onSave={saveFundingTrackerEntry}
          />
        )}

        {currentView === 'glossary' && <GlossaryScreen onBack={returnHome} />}

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
