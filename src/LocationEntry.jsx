import { useState } from "react";

function LocationEntry({
  onBack,
  onProceed,
  initialLocation,
  isSubmitting,
  submissionMessage,
}) {
  const [location, setLocation] = useState(initialLocation);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedLocation = location.trim();
    const locationPattern =
      /^\p{L}[\p{L}\p{M}]*(?:[ '’.,-]+[\p{L}\p{M}]+)*\.?$/u;

    if (trimmedLocation === "") {
      setError("Please enter your location.");
      return;
    }

    if (!locationPattern.test(trimmedLocation)) {
      setError("Enter a location using letters, without numbers.");
      return;
    }

    setError("");
    onProceed(trimmedLocation);
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
        <label htmlFor="customer-location">CLICK TO TYPE</label>
        <input
          aria-describedby="location-error"
          aria-invalid={error !== ""}
          id="customer-location"
          name="location"
          type="text"
          aria-label="Your location"
          placeholder="Where are you from?"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <p id="location-error" role="alert">
          {error}
        </p>

        <button className="entry-proceed" type="submit" disabled={isSubmitting}>
          <span>{isSubmitting ? "SAVING…" : "PROCEED"}</span>
          <span className="take-test-diamond" aria-hidden="true">
            <span>▶</span>
          </span>
        </button>

        <p role="status">{submissionMessage}</p>
      </form>

      <button
        className="name-entry-back"
        type="button"
        onClick={onBack}
        disabled={isSubmitting}
      >
        <span className="take-test-diamond" aria-hidden="true">
          <span>◀</span>
        </span>
        <span>BACK</span>
      </button>
    </main>
  );
}

export default LocationEntry;
