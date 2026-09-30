function AnalysisMenu({ onDemographics, onBack }) {
  return (
    <main className="analysis-menu">
      <header className="entry-header">
        <div className="site-brand">
          <span>SKINSTRIC</span>
          <span className="page-label">[ ANALYSIS ]</span>
        </div>
      </header>

      <section className="analysis-menu-heading">
        <h1>A. I. ANALYSIS</h1>
        <p>
          A. I. HAS ESTIMATED THE FOLLOWING.
          <br />
          FIX ESTIMATED INFORMATION IF NEEDED.
        </p>
      </section>
      <div className="entry-diamonds" aria-hidden="true" />

      <div className="analysis-menu-options">
        <button
          className="analysis-tile tile-demographics"
          type="button"
          onClick={onDemographics}
        >
          <span>DEMOGRAPHICS</span>
        </button>

        <button className="analysis-tile tile-skin" type="button" disabled>
          <span>
            SKIN TYPE
            <br />
            DETAILS
          </span>
        </button>

        <button className="analysis-tile tile-cosmetic" type="button" disabled>
          <span>
            COSMETIC
            <br />
            CONCERNS
          </span>
        </button>

        <button className="analysis-tile tile-weather" type="button" disabled>
          <span>WEATHER</span>
        </button>
      </div>

      <button className="name-entry-back" type="button" onClick={onBack}>
        <span className="take-test-diamond" aria-hidden="true">
          <span>◀</span>
        </span>
        <span>BACK</span>
      </button>
    </main>
  );
}

export default AnalysisMenu;
