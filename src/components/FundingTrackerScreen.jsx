import { useMemo, useRef, useState } from 'react'
import { copyText } from '../utils/copyText.js'

const supportTypes = [
  'Carer Support',
  'Individualised Funding',
  'Respite',
  'Private support',
  'Other',
]

const claimStatuses = [
  'Not claimed',
  'Submitted',
  'Paid',
  'Rejected / needs follow-up',
]

const fundingFields = [
  ['date', 'Date', 'date'],
  ['supportType', 'Funding/support type', 'select'],
  ['description', 'Description', 'textarea'],
  ['hoursUsed', 'Hours used', 'number'],
  ['daysUsed', 'Days used', 'number'],
  ['amountSpent', 'Amount spent', 'number'],
  ['receiptNote', 'Receipt/reference note', 'input'],
  ['claimStatus', 'Personal tracking status', 'select'],
  ['notes', 'Notes', 'textarea'],
]

function toNumber(value) {
  const numberValue = Number.parseFloat(value)
  return Number.isFinite(numberValue) ? numberValue : 0
}

function formatAmount(value) {
  return toNumber(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function buildFundingSummary(entries, totals) {
  const lines = [
    'Funding and support tracker summary',
    `Total hours used: ${totals.hours}`,
    `Total days used: ${totals.days}`,
    `Total amount spent: $${formatAmount(totals.amount)}`,
    '',
    'Tracking status counts:',
    ...claimStatuses.map((status) => `${status}: ${totals.statusCounts[status] || 0}`),
  ]

  if (entries.length > 0) {
    lines.push('', 'Saved entries:')
    entries.forEach((entry) => {
      lines.push(
        [
          entry.date || 'No date',
          entry.supportType || 'Other',
          entry.claimStatus || 'Not claimed',
          entry.description || 'No description',
          `Hours: ${entry.hoursUsed || '0'}`,
          `Days: ${entry.daysUsed || '0'}`,
          `Amount: $${formatAmount(entry.amountSpent)}`,
          entry.receiptNote ? `Receipt/reference: ${entry.receiptNote}` : '',
          entry.notes ? `Notes: ${entry.notes}` : '',
        ]
          .filter(Boolean)
          .join(' | '),
      )
    })
  }

  return lines.join('\n')
}

function FundingTrackerScreen({
  draft,
  editingEntryId,
  entries,
  savedMessage,
  onBack,
  onCancelEdit,
  onChange,
  onDelete,
  onEdit,
  onSave,
}) {
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [copyMessage, setCopyMessage] = useState('')
  const summaryRef = useRef(null)

  const filteredEntries = useMemo(
    () =>
      entries.filter(
        (entry) =>
          (typeFilter === 'All' || entry.supportType === typeFilter) &&
          (statusFilter === 'All' || entry.claimStatus === statusFilter),
      ),
    [entries, statusFilter, typeFilter],
  )

  const totals = useMemo(
    () =>
      entries.reduce(
        (summary, entry) => {
          summary.hours += toNumber(entry.hoursUsed)
          summary.days += toNumber(entry.daysUsed)
          summary.amount += toNumber(entry.amountSpent)
          const status = entry.claimStatus || 'Not claimed'
          summary.statusCounts[status] = (summary.statusCounts[status] || 0) + 1
          return summary
        },
        { hours: 0, days: 0, amount: 0, statusCounts: {} },
      ),
    [entries],
  )

  const summaryText = buildFundingSummary(entries, totals)

  async function copySummary() {
    const copied = await copyText(summaryText, summaryRef)
    setCopyMessage(
      copied
        ? 'Funding tracker summary copied.'
        : 'Copy the summary manually from the text box.',
    )
  }

  return (
    <div className="decision-panel profile-panel">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <p className="step-count">Funding & support tracker</p>
      <div className="screen-intro">
        <h2>Keep support spending notes in one place.</h2>
        <p>
          Track dates, hours, days, spending, receipts, and personal tracking
          status for your own records.
        </p>
      </div>

      <p className="privacy-note">
        Saved on this device/browser only. Anyone using the same browser profile
        may be able to see it.
      </p>
      <p className="education-disclaimer">
        This tracker is for organising your own records only. It does not
        replace advice from Whaikaha, NASC, your funding host, school, GP,
        therapist, or support coordinator.
      </p>

      <form className="profile-form" onSubmit={onSave}>
        {fundingFields.map(([field, label, inputType]) => (
          <label className="profile-field" key={field}>
            <span>{label}</span>
            {inputType === 'textarea' ? (
              <textarea
                rows="3"
                value={draft[field]}
                onChange={(event) => onChange(field, event.target.value)}
              />
            ) : inputType === 'select' && field === 'supportType' ? (
              <select
                value={draft.supportType}
                onChange={(event) => onChange(field, event.target.value)}
              >
                {supportTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            ) : inputType === 'select' ? (
              <select
                value={draft.claimStatus}
                onChange={(event) => onChange(field, event.target.value)}
              >
                {claimStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            ) : (
              <input
                min={inputType === 'number' ? '0' : undefined}
                step={inputType === 'number' ? '0.01' : undefined}
                type={inputType}
                value={draft[field]}
                onChange={(event) => onChange(field, event.target.value)}
              />
            )}
          </label>
        ))}

        <button className="primary-action" type="submit">
          {editingEntryId ? 'Update tracker entry' : 'Save tracker entry'}
        </button>
        {editingEntryId && (
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

      <section className="funding-summary" aria-labelledby="funding-summary-title">
        <h3 id="funding-summary-title">Simple totals</h3>
        <div className="funding-total-grid">
          <article>
            <span>Total hours used</span>
            <strong>{totals.hours}</strong>
          </article>
          <article>
            <span>Total days used</span>
            <strong>{totals.days}</strong>
          </article>
          <article>
            <span>Total amount spent</span>
            <strong>${formatAmount(totals.amount)}</strong>
          </article>
        </div>
        <div
          className="saved-section-list"
          aria-label="Count by personal tracking status"
        >
          {claimStatuses.map((status) => (
            <p key={status}>
              {status}: {totals.statusCounts[status] || 0}
            </p>
          ))}
        </div>
      </section>

      <section className="safe-food-summary" aria-labelledby="funding-copy-title">
        <h3 id="funding-copy-title">Copyable plain-text summary</h3>
        <label className="profile-field">
          <span>Summary text</span>
          <textarea readOnly ref={summaryRef} rows="10" value={summaryText} />
        </label>
        <button
          className="secondary-action compact-action"
          type="button"
          onClick={copySummary}
        >
          Copy summary
        </button>
        {copyMessage && (
          <p className="selection-note" aria-live="polite">
            {copyMessage}
          </p>
        )}
      </section>

      <section className="safe-food-list" aria-labelledby="funding-list-title">
        <h3 id="funding-list-title">Saved entries</h3>
        <div className="filter-panel">
          <label className="filter-field">
            <span>Filter by funding/support type</span>
            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
            >
              <option value="All">All types</option>
              {supportTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className="filter-field">
            <span>Filter by personal tracking status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All statuses</option>
              {claimStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filteredEntries.length === 0 ? (
          <p className="empty-note">No tracker entries match these filters yet.</p>
        ) : (
          <div className="saved-list">
            {filteredEntries.map((entry) => (
              <article className="saved-card" key={entry.id}>
                <div className="saved-card-header">
                  <div>
                    <h3>{entry.description || 'Untitled support entry'}</h3>
                    <p>
                      {entry.date || 'No date'} - {entry.supportType || 'Other'} -{' '}
                      {entry.claimStatus || 'Not claimed'}
                    </p>
                  </div>
                  <div className="safe-food-card-actions">
                    <button
                      className="secondary-action compact-action"
                      type="button"
                      onClick={() => onEdit(entry.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      type="button"
                      onClick={() => onDelete(entry.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <dl className="safe-food-details">
                  <div>
                    <dt>Hours / days</dt>
                    <dd>
                      {entry.hoursUsed || '0'} hours - {entry.daysUsed || '0'} days
                    </dd>
                  </div>
                  <div>
                    <dt>Amount spent</dt>
                    <dd>${formatAmount(entry.amountSpent)}</dd>
                  </div>
                  <div>
                    <dt>Receipt/reference</dt>
                    <dd>{entry.receiptNote || 'Not listed'}</dd>
                  </div>
                  {entry.notes && (
                    <div>
                      <dt>Notes</dt>
                      <dd>{entry.notes}</dd>
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

export default FundingTrackerScreen
