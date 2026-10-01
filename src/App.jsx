import { useState } from "react";
import NameEntry from "./NameEntry";
import "./App.css";
import LocationEntry from "./LocationEntry";
import { submitCustomer } from "./api";
import ImageOptions from "./ImageOptions";
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

function App() {
  const [customerLocation, setCustomerLocation] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const screen = pathname === "/" ? "intro" : pathname.slice(1);

  function goToScreen(nextScreen) {
    navigate(nextScreen === "intro" ? "/" : `/${nextScreen}`);
  }
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
      goToScreen("image-options");
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
        onBack={() => goToScreen("intro")}
        onProceed={(name) => {
          setCustomerName(name);
          setSubmissionMessage("");
          goToScreen("location");
        }}
      />
    );
  }
  if (screen === "location") {
    if (!customerName.trim()) {
      return <Navigate to="/name" replace />;
    }
    return (
      <LocationEntry
        initialLocation={customerLocation}
        onBack={() => goToScreen("name")}
        onProceed={handleCustomerSubmit}
        isSubmitting={isSubmitting}
        submissionMessage={submissionMessage}
      />
    );
  }

  if (
    ["image-options", "camera", "analysis", "demographics"].includes(screen)
  ) {
    return <ImageOptions onBack={() => goToScreen("location")} />;
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
          onClick={() => goToScreen("name")}
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
