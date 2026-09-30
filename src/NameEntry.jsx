import { useState } from "react";

function NameEntry({ onBack, onProceed, initialName }) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const namePattern = /^\p{L}[\p{L}\p{M}]*(?:[ '’-][\p{L}\p{M}]+)*$/u;

    if (trimmedName === "") {
      setError("Please enter your name.");
      return;
    }

    if (!namePattern.test(trimmedName)) {
      setError(
        "Use letters, with spaces, hyphens, or apostrophes between names.",
      );
      return;
    }

    setError("");
    onProceed(trimmedName);
  }

  return (
    <main className="name-entry">
      <header className="entry-header">
        <div className="site-brand">
          <span>SKINSTRIC</span>
          <span className="page-label">[ INTRO ]</span>
        </div>
      </header>
      <div className="entry-diamonds" aria-hidden="true" />
      <h1 className="name-entry-heading">TO START ANALYSIS</h1>

      <form className="name-entry-field" onSubmit={handleSubmit}>
        <label htmlFor="customer-name">CLICK TO TYPE</label>
        <input
          id="customer-name"
          name="name"
          type="text"
          autoComplete="name"
          aria-label="Your name"
          placeholder="Introduce Yourself"
          aria-describedby="name-error"
          aria-invalid={error !== ""}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <p id="name-error" role="alert">
          {error}
        </p>

        <button className="entry-proceed" type="submit">
          <span>PROCEED</span>
          <span className="take-test-diamond" aria-hidden="true">
            <span>▶</span>
          </span>
        </button>
      </form>

      <button className="name-entry-back" type="button" onClick={onBack}>
        <span className="take-test-diamond" aria-hidden="true">
          <span>◀</span>
        </span>
        <span>BACK</span>
      </button>
    </main>
  );
}

export default NameEntry;
