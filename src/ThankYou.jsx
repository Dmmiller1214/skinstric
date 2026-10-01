function ThankYou({ onBack, onProceed }) {
  return (
    <main className="name-entry">
      <header className="entry-header">
        <div className="site-brand">
          <span>SKINSTRIC</span>
          <span className="page-label">[ INTRO ]</span>
        </div>
      </header>

      <p className="name-entry-heading">TO START ANALYSIS</p>

      <div className="entry-diamonds" aria-hidden="true" />

      <section className="thank-you-message">
        <h1>Thank you!</h1>
        <p>Proceed for the next step</p>
      </section>

      <button
        className="name-entry-back"
        type="button"
        onClick={onBack}
      >
        <span className="take-test-diamond" aria-hidden="true">
          <span>◀</span>
        </span>
        <span>BACK</span>
      </button>

      <button
        className="entry-proceed"
        type="button"
        onClick={onProceed}
      >
        <span>PROCEED</span>
        <span className="take-test-diamond" aria-hidden="true">
          <span>▶</span>
        </span>
      </button>
    </main>
  )
}

export default ThankYou