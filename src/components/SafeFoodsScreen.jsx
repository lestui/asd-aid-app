import { useRef, useState } from 'react'

const safeFoodFields = [
  ['foodName', 'Food name', 'input'],
  ['brand', 'Brand', 'input'],
  ['store', 'Store / where purchased', 'input'],
  ['packagingNotes', 'Packaging notes', 'textarea'],
  ['prepMethod', 'Accepted preparation method', 'textarea'],
  ['safeSubstitutes', 'Safe substitutes', 'textarea'],
  ['unsafeSubstitutes', 'Unsafe substitutes', 'textarea'],
  [
    'sensoryNotes',
    'Texture / smell / temperature / shape notes',
    'textarea',
  ],
  ['caregiverNotes', 'Caregiver notes', 'textarea'],
]

function buildSafeFoodSummary(safeFood) {
  const foodName = safeFood.foodName || 'Unnamed food'
  const brand = safeFood.brand || 'brand not specified'
  const store = safeFood.store || 'usual store not specified'
  const prepMethod = safeFood.prepMethod || 'not specified'
  const unsafeSubstitutes = safeFood.unsafeSubstitutes || 'not listed'
  const safeSubstitutes = safeFood.safeSubstitutes
    ? ` Safe substitutes: ${safeFood.safeSubstitutes}.`
    : ''

  return `Safe food: ${foodName} by ${brand}. Buy from ${store}. Avoid substitutes unless listed. Accepted prep: ${prepMethod}. Unsafe versions: ${unsafeSubstitutes}.${safeSubstitutes}`
}

function SafeFoodsScreen({
  draft,
  editingSafeFoodId,
  safeFoods,
  savedMessage,
  onBack,
  onCancelEdit,
  onChange,
  onDelete,
  onEdit,
  onSave,
}) {
  const [copyMessage, setCopyMessage] = useState('')
  const summaryRef = useRef(null)
  const grocerySummary = safeFoods.map(buildSafeFoodSummary).join('\n\n')

  async function copyGrocerySummary() {
    if (!grocerySummary) {
      setCopyMessage('Add a safe food before copying a grocery summary.')
      return
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(grocerySummary)
        setCopyMessage('Grocery summary copied.')
        return
      }

      summaryRef.current?.select()
      if (document.execCommand('copy')) {
        setCopyMessage('Grocery summary copied.')
        return
      }
    } catch {
      // Fall through to the manual copy message.
    }

    setCopyMessage('Copy the grocery summary manually from the text box.')
  }

  return (
    <div className="decision-panel profile-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <p className="step-count">Safe foods</p>
      <div className="screen-intro">
        <h2>Keep reliable foods easy to find.</h2>
        <p>
          Save exact food, brand, preparation, and substitute notes for shopping
          or handover moments when predictability matters.
        </p>
      </div>

      <p className="privacy-note">
        Saved on this device/browser only. Anyone using the same browser profile
        may be able to see it.
      </p>

      <form className="profile-form" onSubmit={onSave}>
        {safeFoodFields.map(([field, label, inputType]) => (
          <label className="profile-field" key={field}>
            <span>{label}</span>
            {inputType === 'textarea' ? (
              <textarea
                rows="3"
                value={draft[field]}
                onChange={(event) => onChange(field, event.target.value)}
              />
            ) : (
              <input
                type="text"
                value={draft[field]}
                onChange={(event) => onChange(field, event.target.value)}
              />
            )}
          </label>
        ))}

        <button className="primary-action" type="submit">
          {editingSafeFoodId ? 'Update safe food' : 'Save safe food'}
        </button>
        {editingSafeFoodId && (
          <button
            className="secondary-action compact-action"
            type="button"
            onClick={onCancelEdit}
          >
            Cancel edit
          </button>
        )}
      </form>

      {savedMessage && (
        <p className="selection-note" aria-live="polite">
          {savedMessage}
        </p>
      )}

      <section className="safe-food-summary" aria-labelledby="grocery-summary-title">
        <h3 id="grocery-summary-title">Emergency grocery mode</h3>
        <label className="profile-field">
          <span>Copyable grocery summary</span>
          <textarea
            readOnly
            ref={summaryRef}
            rows="6"
            value={
              grocerySummary ||
              'Saved safe foods will appear here as a copyable grocery summary.'
            }
          />
        </label>
        <button
          className="secondary-action compact-action"
          type="button"
          onClick={copyGrocerySummary}
        >
          Copy grocery summary
        </button>
        {copyMessage && (
          <p className="selection-note" aria-live="polite">
            {copyMessage}
          </p>
        )}
      </section>

      <section className="safe-food-list" aria-labelledby="safe-food-list-title">
        <h3 id="safe-food-list-title">Saved safe foods</h3>
        {safeFoods.length === 0 ? (
          <p className="empty-note">No safe foods saved yet.</p>
        ) : (
          <div className="saved-list">
            {safeFoods.map((safeFood) => (
              <article className="saved-card safe-food-card" key={safeFood.id}>
                <div className="saved-card-header">
                  <div>
                    <h3>{safeFood.foodName || 'Unnamed food'}</h3>
                    <p>{safeFood.brand || 'Brand not specified'}</p>
                  </div>
                  <div className="safe-food-card-actions">
                    <button
                      className="secondary-action compact-action"
                      type="button"
                      onClick={() => onEdit(safeFood.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      type="button"
                      onClick={() => onDelete(safeFood.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <dl className="safe-food-details">
                  <div>
                    <dt>Safe substitutes</dt>
                    <dd>{safeFood.safeSubstitutes || 'Not listed'}</dd>
                  </div>
                  <div>
                    <dt>Unsafe substitutes</dt>
                    <dd>{safeFood.unsafeSubstitutes || 'Not listed'}</dd>
                  </div>
                  <div>
                    <dt>Prep method</dt>
                    <dd>{safeFood.prepMethod || 'Not specified'}</dd>
                  </div>
                  {safeFood.store && (
                    <div>
                      <dt>Store</dt>
                      <dd>{safeFood.store}</dd>
                    </div>
                  )}
                </dl>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default SafeFoodsScreen
