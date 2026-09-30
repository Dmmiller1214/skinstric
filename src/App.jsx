import { useState } from "react";
import NameEntry from "./NameEntry";
import "./App.css";
import LocationEntry from "./LocationEntry";
import { submitCustomer } from "./api";
import ImageOptions from "./ImageOptions";

function App() {
  const [customerLocation, setCustomerLocation] = useState("");
  const [screen, setScreen] = useState("intro");
  const [customerName, setCustomerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  async function handleCustomerSubmit(location) {
    setCustomerLocation(location);
    setIsSubmitting(true);
    setSubmissionMessage("Saving your details…");

    try {
      await submitCustomer(customerName, location);
      setSubmissionMessage("");
      setScreen("image-options");
    } catch (error) {
      setSubmissionMessage(
        error instanceof Error
          ? error.message
          : "Unable to save your details. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (screen === "name") {
    return (
      <NameEntry
        initialName={customerName}
        onBack={() => setScreen("intro")}
        onProceed={(name) => {
          setCustomerName(name);
          setSubmissionMessage("");
          setScreen("location");
        }}
      />
    );
  }
  if (screen === "location") {
    return (
      <LocationEntry
        initialLocation={customerLocation}
        onBack={() => setScreen("name")}
        onProceed={handleCustomerSubmit}
        isSubmitting={isSubmitting}
        submissionMessage={submissionMessage}
      />
    );
  }

  if (screen === "image-options") {
    return <ImageOptions onBack={() => setScreen("location")} />;
  }
  return (
    <>
      <header className="site-header">
        <div className="site-brand">
          <span>SKINSTRIC</span>
          <span className="page-label">[ INTRO ]</span>
        </div>

        <button type="button">ENTER CODE</button>
      </header>

      <main className="intro">
        <h1 className="intro-title">
          Sophisticated
          <br />
          skincare
        </h1>
        <button className="discover-ai" type="button">
          <span className="take-test-diamond" aria-hidden="true">
            <span>◀</span>
          </span>
          <span>DISCOVER A.I.</span>
        </button>
        <button
          className="take-test"
          type="button"
          onClick={() => setScreen("name")}
        >
          <span>TAKE TEST</span>
          <span className="take-test-diamond" aria-hidden="true">
            <span>▶</span>
          </span>
        </button>
        <p className="intro-description">
          Skinstric developed an A.I. that creates a highly-personalised routine
          tailored to what your skin needs.
        </p>
      </main>
    </>
  );
}

export default App;
