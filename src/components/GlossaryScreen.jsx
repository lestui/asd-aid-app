const glossaryTerms = [
  {
    term: 'ASD',
    expanded: 'Autism Spectrum Disorder',
    definition:
      'A neurodevelopmental difference that can affect communication, sensory processing, routines, social understanding, and support needs.',
    context: 'Many people simply prefer "autistic" or "autism". Follow the person and family\'s preferred language.',
  },
  {
    term: 'ADHD',
    expanded: 'Attention-deficit/hyperactivity disorder',
    definition:
      'A neurodevelopmental difference that can affect attention, energy, impulse control, planning, emotions, and daily routines.',
    context: 'Autism and ADHD can overlap. Support should focus on the person\'s needs, not labels alone.',
  },
  {
    term: 'OT',
    expanded: 'Occupational Therapist / Occupational Therapy',
    definition:
      'Support focused on everyday activities, sensory needs, movement, self-care, routines, and building independence.',
    context: 'An OT may help with sensory plans, equipment, daily routines, or practical home and school strategies.',
  },
  {
    term: 'SLT',
    expanded: 'Speech Language Therapist / Speech Language Therapy',
    definition:
      'Support for communication, understanding language, speech, social communication, visual supports, and communication tools.',
    context: 'Some services may use "speech therapist" or "speech-language pathologist" for similar roles.',
  },
  {
    term: 'MoE',
    expanded: 'Ministry of Education',
    definition:
      'In Aotearoa New Zealand, the government education agency that may be involved in learning support and school services.',
    context: 'Schools may talk with MoE learning support staff when a child needs extra support at school.',
  },
  {
    term: 'NASC',
    expanded: 'Needs Assessment and Service Coordination',
    definition:
      'A disability support pathway in New Zealand that helps assess support needs and connect families with available services.',
    context: 'Eligibility and available supports can vary, so families should check with their local service.',
  },
  {
    term: 'IF',
    expanded: 'Individualised Funding',
    definition:
      'A way some disability supports can be managed more flexibly by a person or family, depending on eligibility and funding rules.',
    context: 'The details can change by provider, support package, and current funding guidance.',
  },
  {
    term: 'SESTA',
    expanded: 'Specialised School Transport Assistance',
    definition:
      'A Ministry of Education transport support for eligible students who need help getting to and from school.',
    context: 'Schools and MoE can advise whether a child may be eligible and how applications work.',
  },
  {
    term: 'GP',
    expanded: 'General Practitioner / family doctor',
    definition:
      'A usual first health contact for concerns, check-ups, referrals, and medical advice.',
    context: 'A GP can help when there are pain, sleep, eating, toileting, injury, medication, or sudden change concerns.',
  },
  {
    term: 'Whaikaha',
    expanded: 'Ministry of Disabled People / disability support system context in NZ',
    definition:
      'A New Zealand disability support term families may see when looking for disability services, funding, or system information.',
    context: 'Names, responsibilities, and pathways can change, so check the current official service information.',
  },
  {
    term: 'IEP',
    expanded: 'Individual Education Plan',
    definition:
      'A school plan that records learning goals, support strategies, responsibilities, and review dates for a student.',
    context: 'IEPs work best when they are practical, reviewed regularly, and shaped with family and learner input.',
  },
]

function GlossaryScreen({ onBack }) {
  return (
    <div className="decision-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back home
      </button>

      <div className="screen-intro">
        <p className="step-count">Glossary</p>
        <h2>Plain-English support terms and acronyms.</h2>
        <p>
          Short explanations for common school, health, and disability support
          words caregivers may hear.
        </p>
      </div>

      <p className="education-disclaimer">
        Terms can vary by school, service, region, or funding provider. Check
        with the relevant service for official advice.
      </p>

      <div className="glossary-list" aria-label="Glossary terms">
        {glossaryTerms.map((item) => (
          <article className="glossary-card" key={item.term}>
            <div className="glossary-heading">
              <h3>{item.term}</h3>
              <p className="glossary-expanded">{item.expanded}</p>
            </div>
            <p>{item.definition}</p>
            <p className="glossary-context">{item.context}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export default GlossaryScreen
