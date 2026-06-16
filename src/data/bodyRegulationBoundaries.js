const bodySafetyDisclaimer =
  'This information is general educational support only. It does not diagnose, treat, or replace professional advice, safeguarding processes, or urgent care.'

export const bodyRegulationBoundaries = [
  {
    id: 'pressure-seeking-private-space',
    category: 'Body regulation',
    title: 'Body pressure-seeking and private-space rules',
    pathway: 'Sensory & Body Regulation',
    situation:
      'The child seeks firm pressure, squeezes into spaces, presses against people, or touches their own body for regulation.',
    caregiver_goal:
      'Meet body-regulation needs while teaching clear, respectful private-space rules.',
    normalise:
      'Body seeking can be a sign of sensory need, stress, fatigue, or needing clearer body feedback.',
    investigate:
      'First check pain, toileting needs, constipation, clothing discomfort, skin irritation, injury, anxiety, or sudden change.',
    try_first: [
      'Offer a safe pressure option before giving a correction.',
      'Use a short private-space rule with the same calm words each time.',
      'Give a clear place where private body care can happen.',
    ],
    helpful_words: [
      'You can ask for pressure.',
      'Private body. Bathroom or bedroom.',
      'Let’s check clothes, toilet, or quiet space.',
    ],
    avoid: [
      'Shaming, laughing, or making a public scene.',
      'Assuming the behaviour is deliberate or sexual.',
      'Ignoring body discomfort before teaching a rule.',
    ],
    sensory_swaps: [
      'Wall push-ups',
      'Weighted lap item',
      'Firm cushion squeeze',
      'Heavy work job',
    ],
    visual_supports: [
      'Private space card',
      'Pressure choice card',
      'Bathroom or bedroom visual',
    ],
    when_to_seek_help: [
      'Seek help if behaviour is new, intense, hard to redirect, causing injury, or happening with pain or toileting changes.',
      'Act immediately if another person is involved, boundaries are unsafe, or safeguarding concerns are present.',
    ],
    evidence_level: 'Guideline-supported',
    evidence_sources: [
      'NICE CG170',
      'Autism CRC National Guideline',
      'AAP 2020 clinical report',
    ],
    disclaimer: bodySafetyDisclaimer,
  },
  {
    id: 'clothing-discomfort-tightness',
    category: 'Health and comfort checks',
    title: 'Clothing discomfort or tightness',
    pathway: 'Sensory & Body Regulation',
    situation:
      'The child pulls at clothing, avoids sitting, reaches into clothing, or becomes distressed after dressing.',
    caregiver_goal:
      'Check comfort and reduce irritation before interpreting the behaviour socially.',
    normalise:
      'Clothing seams, tags, waistbands, heat, or texture can feel overwhelming or painful.',
    investigate:
      'Check tightness, seams, labels, skin marks, rash, heat, toileting needs, constipation, or injury.',
    try_first: [
      'Move to a private place for a quick clothing and skin comfort check.',
      'Offer softer, looser, or familiar clothing if available.',
      'Use simple words to name the next step.',
    ],
    helpful_words: [
      'Clothes feel wrong. We can check.',
      'Bathroom first, then comfy clothes.',
      'You can show itchy, tight, or sore.',
    ],
    avoid: [
      'Telling the child to stop without checking discomfort.',
      'Changing clothes in public view when privacy is possible.',
      'Forcing scratchy or painful clothing for appearance.',
    ],
    sensory_swaps: [
      'Soft waistband',
      'Tag-free clothing',
      'Compression layer if preferred',
      'Spare familiar clothes',
    ],
    visual_supports: [
      'Itchy/tight/sore body card',
      'Clothing choice card',
      'Private change visual',
    ],
    when_to_seek_help: [
      'Seek health advice for rash, swelling, injury, pain, new sensitivity, toileting symptoms, or signs of infection.',
      'Seek urgent care for severe pain, significant injury, or sudden concerning physical symptoms.',
    ],
    evidence_level: 'Clinical safety guidance',
    evidence_sources: [
      'AAP 2020 clinical report',
      'NICE CG170',
      'Autism CRC National Guideline',
    ],
    disclaimer: bodySafetyDisclaimer,
  },
  {
    id: 'toileting-constipation-check',
    category: 'Health and comfort checks',
    title: 'Toileting or constipation check',
    pathway: 'Sensory & Body Regulation',
    situation:
      'The child seems unsettled, reaches toward clothing, avoids sitting, has accidents, or becomes distressed around bathroom routines.',
    caregiver_goal:
      'Treat toileting and constipation as possible body needs before focusing on behaviour.',
    normalise:
      'Many children show discomfort through movement, avoidance, distress, or body-focused behaviour.',
    investigate:
      'Check last toilet visit, stool pattern, urine changes, tummy pain, withholding, hydration, rash, and clothing comfort.',
    try_first: [
      'Offer a calm, short bathroom check.',
      'Use a visual toileting sequence with a clear finish.',
      'Keep language practical and private.',
    ],
    helpful_words: [
      'Body check. Toilet, clothes, or quiet space.',
      'Try toilet, then finished.',
      'You are not in trouble.',
    ],
    avoid: [
      'Calling accidents or withholding naughty.',
      'Long forced toilet sits.',
      'Discussing private body needs loudly or publicly.',
    ],
    sensory_swaps: [
      'Stable foot support',
      'Soft wipes',
      'Comfortable seat insert',
      'Quiet bathroom option',
    ],
    visual_supports: [
      'Toilet routine strip',
      'Finished card',
      'Pain or tummy card',
    ],
    when_to_seek_help: [
      'Seek medical advice for constipation, pain, blood, new accidents, urinary symptoms, fever, or toileting changes.',
      'Seek urgent help for severe abdominal pain, inability to pass urine, dehydration signs, or serious distress.',
    ],
    evidence_level: 'Clinical safety guidance',
    evidence_sources: [
      'AAP 2020 clinical report',
      'NICE CG170',
      'Autism CRC National Guideline',
    ],
    disclaimer: bodySafetyDisclaimer,
  },
  {
    id: 'after-school-sensory-fatigue',
    category: 'Fatigue and overload',
    title: 'After-school sensory fatigue',
    pathway: 'Sensory & Body Regulation',
    situation:
      'The child holds things together at school, then becomes distressed, restless, withdrawn, or body-seeking after school.',
    caregiver_goal:
      'Support decompression and body regulation before adding demands or teaching.',
    normalise:
      'After-school distress can reflect accumulated sensory, social, communication, and masking effort.',
    investigate:
      'Check hunger, thirst, toileting, pain, clothing discomfort, bullying, school stress, and sudden changes.',
    try_first: [
      'Offer a predictable low-demand arrival routine.',
      'Reduce questions for the first part of home time.',
      'Provide a safe body-regulation option.',
    ],
    helpful_words: [
      'School took a lot. Quiet first.',
      'You can have pressure or space.',
      'Food, toilet, clothes, or quiet space?',
    ],
    avoid: [
      'Starting homework or questions immediately.',
      'Punishing the child for losing capacity after coping all day.',
      'Assuming school was fine because no concern was reported.',
    ],
    sensory_swaps: [
      'Snack and drink',
      'Quiet corner',
      'Weighted lap item',
      'Movement break',
    ],
    visual_supports: [
      'After-school reset card',
      'Body check choice board',
      'Low-demand routine strip',
    ],
    when_to_seek_help: [
      'Seek support if after-school distress is severe, daily, unsafe, or linked with school refusal.',
      'Act quickly if the child reports harm, bullying, unsafe incidents, or safeguarding concerns.',
    ],
    evidence_level: 'Guideline-supported',
    evidence_sources: [
      'NICE CG170',
      'Autism CRC National Guideline',
      'AAP 2020 clinical report',
    ],
    disclaimer: bodySafetyDisclaimer,
  },
  {
    id: 'public-private-places',
    category: 'Privacy and boundaries',
    title: 'Public vs private places',
    pathway: 'Privacy, Safety & Social Boundaries',
    situation:
      'The child needs clear teaching about which body-care behaviours belong in private places.',
    caregiver_goal:
      'Teach privacy rules calmly and concretely without shame.',
    normalise:
      'Public and private rules are social concepts that may need direct, repeated, visual teaching.',
    investigate:
      'Before teaching, check whether discomfort, toileting, clothing, overload, or anxiety is driving the behaviour.',
    try_first: [
      'Use a simple public/private visual.',
      'Redirect to a private place without drawing attention.',
      'Practise the rule outside moments of distress.',
    ],
    helpful_words: [
      'Private body. Bathroom or bedroom.',
      'Public place means clothes stay on.',
      'I will help you find a private place.',
    ],
    avoid: [
      'Using shame-based words.',
      'Giving long explanations in public.',
      'Assuming the child already understands privacy rules.',
    ],
    sensory_swaps: [
      'Hand fidget',
      'Deep pressure request',
      'Pocket comfort item',
      'Movement break',
    ],
    visual_supports: [
      'Public/private places card',
      'Bathroom or bedroom card',
      'Clothes stay on visual',
    ],
    when_to_seek_help: [
      'Seek professional help if public/private teaching is not working or behaviour creates safety risks.',
      'Escalate immediately if other people are involved, consent or safety is unclear, or safeguarding concerns exist.',
    ],
    evidence_level: 'Guideline-supported',
    evidence_sources: [
      'NICE CG170',
      'Autism CRC National Guideline',
      'NCAEP 2020 Evidence-Based Practices report',
    ],
    disclaimer: bodySafetyDisclaimer,
  },
  {
    id: 'public-private-body-behaviours',
    category: 'Privacy and boundaries',
    title: 'Public vs private body behaviours',
    pathway: 'Privacy, Safety & Social Boundaries',
    situation:
      'The child repeats a private body behaviour in a public or shared setting.',
    caregiver_goal:
      'Protect privacy and safety while calmly redirecting to an appropriate place or alternative.',
    normalise:
      'A child may need explicit teaching, body checks, and regulation support rather than blame.',
    investigate:
      'First check pain, toileting, constipation, skin irritation, clothing discomfort, infection signs, injury, anxiety, or sudden new behaviour.',
    try_first: [
      'Move close enough to speak quietly.',
      'Use the same short script and guide toward privacy or a sensory swap.',
      'Reduce attention from others where possible.',
    ],
    helpful_words: [
      'Private body. Bathroom or bedroom.',
      'Hands outside clothes in public.',
      'Let’s check clothes, toilet, or quiet space.',
    ],
    avoid: [
      'Scolding loudly or embarrassing the child.',
      'Making assumptions about intent.',
      'Ignoring repeated public behaviour without a plan.',
    ],
    sensory_swaps: [
      'Fidget in pocket',
      'Hands-on carrying job',
      'Chair push-downs',
      'Firm cushion hug',
    ],
    visual_supports: [
      'Hands outside clothes card',
      'Private place card',
      'Help or break card',
    ],
    when_to_seek_help: [
      'Seek medical advice for pain, infection signs, toileting changes, constipation, injury, rash, or sudden new behaviour.',
      'Seek safeguarding or professional advice if another person is involved, behaviour is unsafe, coercive, targeted, or difficult to redirect.',
    ],
    evidence_level: 'Clinical safety guidance',
    evidence_sources: [
      'NICE CG170',
      'AAP 2020 clinical report',
      'Autism CRC National Guideline',
    ],
    disclaimer: bodySafetyDisclaimer,
  },
  {
    id: 'heavy-work-alternatives',
    category: 'Body regulation',
    title: 'Heavy work alternatives',
    pathway: 'Sensory & Body Regulation',
    situation:
      'The child is climbing, crashing, squeezing, pushing, pulling, or seeking strong body input.',
    caregiver_goal:
      'Offer safe body input that respects the child and protects people, property, and privacy.',
    normalise:
      'Strong movement and pressure can help some children organise their body and feel calmer.',
    investigate:
      'Check fatigue, hunger, pain, toileting, overload, clothing discomfort, and whether the setting has been too still or noisy.',
    try_first: [
      'Offer one safe heavy-work option immediately.',
      'Give clear boundaries around bodies, furniture, and other people.',
      'Build heavy work into predictable times before overload builds.',
    ],
    helpful_words: [
      'Your body needs heavy work.',
      'Push wall, not people.',
      'You can ask for pressure.',
    ],
    avoid: [
      'Stopping all movement without a replacement.',
      'Letting pressure-seeking happen to unwilling people.',
      'Using heavy work as a punishment.',
    ],
    sensory_swaps: [
      'Carry books',
      'Wall push-ups',
      'Animal walks',
      'Laundry basket push',
    ],
    visual_supports: [
      'Heavy work choice board',
      'Safe body rules',
      'Ask for pressure card',
    ],
    when_to_seek_help: [
      'Seek occupational therapy or clinical support if sensory seeking is unsafe, constant, painful, or disrupts daily life.',
      'Get urgent help for injury, dangerous climbing, running into danger, or behaviour that cannot be made safe.',
    ],
    evidence_level: 'Guideline-supported',
    evidence_sources: [
      'Autism CRC National Guideline',
      'NICE CG170',
      'AAP 2020 clinical report',
    ],
    disclaimer: bodySafetyDisclaimer,
  },
  {
    id: 'visual-boundary-cards',
    category: 'Privacy and boundaries',
    title: 'Visual boundary cards',
    pathway: 'Privacy, Safety & Social Boundaries',
    situation:
      'The child needs repeated reminders about private places, asking for help, body space, or safe touch.',
    caregiver_goal:
      'Make boundaries visible and predictable without relying on long spoken instructions.',
    normalise:
      'Visual cards can reduce language load and make abstract social rules easier to understand.',
    investigate:
      'Check whether the card is being used after body discomfort and safety checks, not instead of them.',
    try_first: [
      'Choose two or three cards that match the immediate need.',
      'Pair each card with one short phrase.',
      'Practise when calm, then use the same card in real situations.',
    ],
    helpful_words: [
      'This card means private place.',
      'This card means ask first.',
      'This card means body space.',
    ],
    avoid: [
      'Using too many cards at once.',
      'Showing cards only when the child is already overwhelmed.',
      'Using visuals as public embarrassment.',
    ],
    sensory_swaps: [
      'Break card',
      'Pressure card',
      'Quiet space card',
      'Fidget choice card',
    ],
    visual_supports: [
      'Private body card',
      'Ask first card',
      'Body space card',
      'Safe hands card',
    ],
    when_to_seek_help: [
      'Seek communication or behaviour support if visuals do not help after consistent use.',
      'Escalate if boundary concerns involve other people, unsafe public behaviour, or safeguarding issues.',
    ],
    evidence_level: 'Evidence-based practice',
    evidence_sources: [
      'NCAEP 2020 Evidence-Based Practices report',
      'Hume et al. 2021 systematic review',
      'NICE CG170',
    ],
    disclaimer: bodySafetyDisclaimer,
  },
  {
    id: 'calm-parent-scripts',
    category: 'Scripts and teaching',
    title: 'Calm parent scripts',
    pathway: 'Privacy, Safety & Social Boundaries',
    situation:
      'A caregiver needs short words for body checks, privacy teaching, or sensory redirection.',
    caregiver_goal:
      'Use consistent, calm language that protects dignity and reduces escalation.',
    normalise:
      'Scripts help adults stay steady and help children hear the same message across settings.',
    investigate:
      'Use scripts after checking pain, toileting, constipation, clothing discomfort, skin irritation, injury, anxiety, and sudden changes.',
    try_first: [
      'Pick one script for the situation and repeat it calmly.',
      'Pair words with a visual card or clear next step.',
      'Debrief later only if the child is calm and able to process.',
    ],
    helpful_words: [
      'Private body. Bathroom or bedroom.',
      'You can ask for pressure.',
      'Let’s check clothes, toilet, or quiet space.',
    ],
    avoid: [
      'Long lectures.',
      'Threats or shame.',
      'Changing the wording every time.',
    ],
    sensory_swaps: [
      'Pressure request',
      'Quiet space',
      'Heavy work job',
      'Hands-busy object',
    ],
    visual_supports: [
      'Script card for adults',
      'First check card',
      'Private place visual',
    ],
    when_to_seek_help: [
      'Seek support if scripts do not reduce distress or behaviour becomes unsafe.',
      'Escalate immediately for pain, injury, sudden change, involvement of others, or safeguarding concerns.',
    ],
    evidence_level: 'Caregiver-informed',
    evidence_sources: [
      'Autism CRC National Guideline',
      'NICE CG170',
      'AAP 2020 clinical report',
    ],
    disclaimer: bodySafetyDisclaimer,
  },
  {
    id: 'when-to-seek-professional-help',
    category: 'Safety and escalation',
    title: 'When to seek professional help',
    pathway: 'Privacy, Safety & Social Boundaries',
    situation:
      'Body-regulation or boundary behaviours are new, escalating, unsafe, painful, or hard to understand.',
    caregiver_goal:
      'Know when to move from home or school supports to health, therapy, safeguarding, or urgent help.',
    normalise:
      'Seeking help is a protective step. It does not mean the child or caregiver has failed.',
    investigate:
      'Document pain signs, toileting, constipation, infection signs, injury, sleep, medication changes, school stress, setting, frequency, and who was present.',
    try_first: [
      'Make the immediate setting safe.',
      'Use calm, private language.',
      'Contact the most relevant support: health, school, therapy, safeguarding, or emergency services.',
    ],
    helpful_words: [
      'We need more help with this.',
      'Safety first, then support plan.',
      'You are not in trouble. We are getting help.',
    ],
    avoid: [
      'Waiting through repeated unsafe incidents without a plan.',
      'Keeping safeguarding concerns private.',
      'Assuming one explanation before checking health and context.',
    ],
    sensory_swaps: [
      'Safe quiet space',
      'Trusted adult support',
      'Body check routine',
      'Reduced demands',
    ],
    visual_supports: [
      'Incident notes template',
      'Who can help list',
      'Safety plan card',
    ],
    when_to_seek_help: [
      'Seek medical advice for pain, toileting issues, constipation, infection signs, injury, sudden new behaviour, sleep changes, eating changes, or severe distress.',
      'Seek urgent or safeguarding help if anyone is unsafe, another person is involved, behaviour happens in unsafe public settings, consent is unclear, or abuse is suspected.',
    ],
    evidence_level: 'Clinical safety guidance',
    evidence_sources: [
      'NICE CG170',
      'NICE CG128',
      'AAP 2020 clinical report',
      'Autism CRC National Guideline',
    ],
    disclaimer: bodySafetyDisclaimer,
  },
]
