const illustrationConfig = {
  communication: {
    label: 'Communication Support',
    bubbles: true,
  },
  sensory: {
    label: 'Sensory Overload',
    sensory: true,
  },
  calm: {
    label: 'Calm Strategy',
    calm: true,
  },
  routine: {
    label: 'Routine Change',
    routine: true,
  },
  meltdown: {
    label: 'Meltdown Support',
    safeSpace: true,
  },
  shutdown: {
    label: 'Shutdown Support',
    blanket: true,
  },
  help: {
    label: 'Asking for Help',
    helpCard: true,
  },
  caregiver: {
    label: 'Caregiver Support',
    caregiver: true,
  },
}

function People({ low = false }) {
  return (
    <>
      <circle cx="42" cy={low ? '57' : '48'} r="7" fill="var(--color-primary)" />
      <path
        d={low ? 'M30 78C31 68 35 62 42 62C49 62 53 68 54 78' : 'M30 72C31.5 61 35.8 55 42 55C48.2 55 52.5 61 54 72'}
        stroke="var(--color-primary)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="74" cy={low ? '62' : '55'} r="5.5" fill="var(--color-primary-soft)" />
      <path
        d={low ? 'M65 78C66 71 69 67 74 67C79 67 82 71 83 78' : 'M65 72C66 64.5 69 60 74 60C79 60 82 64.5 83 72'}
        stroke="var(--color-primary-soft)"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </>
  )
}

function HelperIllustration({ type }) {
  const config = illustrationConfig[type]

  return (
    <svg
      className="helper-illustration"
      viewBox="0 0 128 96"
      role="img"
      aria-label={config.label}
    >
      <rect x="8" y="10" width="112" height="76" rx="22" fill="var(--color-surface-soft)" />
      {config.sensory && (
        <>
          <path d="M25 28L18 21M103 28L110 21M106 48H116M22 48H12" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round" />
          <path d="M92 34C99 41 99 53 92 60" stroke="var(--color-primary-soft)" strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      {config.calm && (
        <>
          <circle cx="92" cy="35" r="13" fill="none" stroke="var(--color-primary-soft)" strokeWidth="4" />
          <path d="M82 35H102M92 25V45" stroke="var(--color-accent)" strokeWidth="3" strokeLinecap="round" />
          <path d="M24 34C36 24 48 24 60 34" stroke="var(--color-primary-soft)" strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      {config.routine && (
        <>
          <rect x="70" y="23" width="36" height="42" rx="8" fill="#FFFFFF" stroke="var(--color-border)" strokeWidth="3" />
          <rect x="77" y="30" width="22" height="7" rx="3.5" fill="var(--color-primary-soft)" />
          <rect x="77" y="42" width="22" height="7" rx="3.5" fill="var(--color-accent)" />
          <rect x="77" y="54" width="16" height="7" rx="3.5" fill="var(--color-primary-pale)" />
        </>
      )}
      {config.safeSpace && (
        <>
          <path d="M23 74H62" stroke="var(--color-accent)" strokeWidth="7" strokeLinecap="round" />
          <path d="M78 25H104V54" stroke="var(--color-primary-soft)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {config.blanket && (
        <path d="M20 70C31 60 44 60 56 70" stroke="var(--color-accent)" strokeWidth="8" strokeLinecap="round" />
      )}
      {config.helpCard && (
        <>
          <rect x="72" y="28" width="34" height="24" rx="7" fill="#FFFFFF" stroke="var(--color-border)" strokeWidth="3" />
          <path d="M82 41H96" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round" />
          <path d="M62 54L75 45" stroke="var(--color-primary)" strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      {config.caregiver && (
        <>
          <rect x="70" y="24" width="28" height="42" rx="8" fill="#FFFFFF" stroke="var(--color-border)" strokeWidth="3" />
          <path d="M78 35H90M78 45H90M78 55H86" stroke="var(--color-primary-soft)" strokeWidth="3" strokeLinecap="round" />
          <path d="M106 32C103 28 97 30 97 35C97 40 106 45 106 45C106 45 115 40 115 35C115 30 109 28 106 32Z" fill="var(--color-accent)" />
        </>
      )}
      {config.bubbles && (
        <>
          <path d="M61 29H90C95 29 99 33 99 38V48C99 53 95 57 90 57H76L66 65V57H61C56 57 52 53 52 48V38C52 33 56 29 61 29Z" fill="#FFFFFF" stroke="var(--color-border)" strokeWidth="3" />
          <circle cx="68" cy="43" r="3" fill="var(--color-accent)" />
          <circle cx="78" cy="43" r="3" fill="var(--color-primary-soft)" />
          <circle cx="88" cy="43" r="3" fill="var(--color-primary-soft)" />
        </>
      )}
      <People low={config.safeSpace || config.blanket} />
      <circle cx="99" cy="71" r="6" fill="var(--color-accent)" opacity="0.9" />
    </svg>
  )
}

export default HelperIllustration
