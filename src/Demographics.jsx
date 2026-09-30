import { useState } from "react";

function Demographics({
  results,
  onBack,
  selectedAttributes,
  setSelectedAttributes,
}) {
  const [activeCategory, setActiveCategory] = useState("race");
  

  const scores = Object.entries(results[activeCategory]).sort(
    (a, b) => b[1] - a[1],
  );
  const selectedLabel = selectedAttributes[activeCategory];
  const selectedScore = results[activeCategory][selectedLabel];
  function handleReset() {
    const defaults = {};

    for (const category of ["race", "age", "gender"]) {
      const sortedScores = Object.entries(results[category]).sort(
        (a, b) => b[1] - a[1],
      );

      defaults[category] = sortedScores[0][0];
    }

    setSelectedAttributes(defaults);
  }

  return (
    <main className="demographics">
      <header className="demographics-header">
        <div className="site-brand">
          <span>SKINSTRIC</span>
          <span className="page-label">[ ANALYSIS ]</span>
        </div>
      </header>

      <div className="demographics-heading">
        <p>A. I. ANALYSIS</p>
        <h1>DEMOGRAPHICS</h1>
        <p>PREDICTED RACE &amp; AGE</p>
      </div>
      <div className="demographics-layout">
        <div className="demographics-categories" aria-label="Result categories">
          {["race", "age", "gender"].map((category) => (
            <button
              key={category}
              type="button"
              className="demographics-category"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              <span>{selectedAttributes[category]}</span>
              <span>
                {category === "gender" ? "SEX" : category.toUpperCase()}
              </span>
            </button>
          ))}
        </div>

        <section className="demographics-summary">
          <h2>{selectedLabel}</h2>

          <div className="confidence-circle">
            <span>{(selectedScore * 100).toFixed(2)}%</span>
          </div>
        </section>

        <section className="demographics-scores">
          <h2>{activeCategory.toUpperCase()}</h2>
          <p>SIMULATED CONFIDENCE SCORES</p>

          <ul className="demographics-score-list">
            {scores.map(([label, score]) => (
              <li key={label}>
                <button
                  className="demographics-score"
                  type="button"
                  aria-pressed={selectedAttributes[activeCategory] === label}
                  onClick={() => {
                    setSelectedAttributes((previous) => ({
                      ...previous,
                      [activeCategory]: label,
                    }));
                  }}
                >
                  <span>{label}</span>
                  <span>{(score * 100).toFixed(2)}%</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="demographics-footer">
        <button className="demographics-back" type="button" onClick={onBack}>
          <span className="take-test-diamond" aria-hidden="true">
            <span>◀</span>
          </span>
          <span>BACK</span>
        </button>

        <p>If the estimate is wrong, select the correct one.</p>

        <button
          className="demographics-reset"
          type="button"
          onClick={handleReset}
        >
          RESET
        </button>
      </footer>
    </main>
  );
}

export default Demographics;
