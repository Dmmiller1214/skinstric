import { useEffect, useRef, useState } from "react";

function CameraCapture({ onBack, onCapture }) {
  const videoRef = useRef(null);
  const [cameraError, setCameraError] = useState("");
  const [isStarting, setIsStarting] = useState(true);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [captureError, setCaptureError] = useState("");
  const [isPreparingPhoto, setIsPreparingPhoto] = useState(false);

  useEffect(() => {
    let stream;
    let cancelled = false;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        if (!cancelled) {
          setIsStarting(false);
        }
      } catch (error) {
        stream?.getTracks().forEach((track) => track.stop());

        if (!cancelled) {
          setCameraError(
            error.name === "NotAllowedError"
              ? "Camera access was denied. Allow access or go back to upload an image."
              : "Unable to start the camera. Check that it is connected and available.",
          );
          setIsStarting(false);
        }
      }
    }

    startCamera();

    return () => {
      cancelled = true;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);
  function handleCapture() {
    const video = videoRef.current;

    if (!video || video.readyState < 2 || !video.videoWidth) {
      setCaptureError("The camera is not ready yet. Please try again.");
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Unable to create a photo.");
      }

      context.drawImage(video, 0, 0);
      setCapturedPhoto(canvas.toDataURL("image/jpeg", 0.9));
      setCaptureError("");
    } catch {
      setCaptureError("Unable to take the photo. Please try again.");
    }
  }
  async function handleUsePhoto() {
    if (!capturedPhoto || isPreparingPhoto) {
      return;
    }

    setIsPreparingPhoto(true);
    setCaptureError("");

    try {
      const response = await fetch(capturedPhoto);
      const blob = await response.blob();
      const file = new File([blob], "selfie.jpg", {
        type: "image/jpeg",
      });

      onCapture(file);
    } catch {
      setCaptureError("Unable to prepare the photo. Please try again.");
    } finally {
      setIsPreparingPhoto(false);
    }
  }
  if (cameraError) {
    return (
      <main className="camera-error">
        <h1>Camera unavailable</h1>
        <p role="alert">{cameraError}</p>
        <button type="button" onClick={onBack}>
          BACK TO IMAGE OPTIONS
        </button>
      </main>
    );
  }
  return (
    <main className="camera-capture">
      <video
        hidden={Boolean(capturedPhoto)}
        ref={videoRef}
        className="camera-preview"
        autoPlay
        playsInline
        muted
        aria-label="Live camera preview"
      />
      {capturedPhoto && (
        <img
          className="camera-preview"
          src={capturedPhoto}
          alt="Your captured selfie"
        />
      )}
      {isStarting && (
        <div className="camera-loading">
          <div className="entry-diamonds" aria-hidden="true" />
          <p role="status">SETTING UP CAMERA…</p>
          <button type="button" onClick={onBack}>
            CANCEL
          </button>
        </div>
      )}
      {cameraError && <p role="alert">{cameraError}</p>}

      <header className="entry-header">
        <div className="site-brand">
          <span>SKINSTRIC</span>
          <span className="page-label">[ ANALYSIS ]</span>
        </div>
      </header>

      <div className="camera-guide">
        <p>PLACE YOUR HEAD IN THE OVAL</p>
      </div>

      <button
        className="camera-shutter"
        type="button"
        disabled={isStarting}
        onClick={() => {
          if (capturedPhoto) {
            setCapturedPhoto(null);
            setCaptureError("");
          } else {
            handleCapture();
          }
        }}
      >
        {capturedPhoto ? "RETAKE" : "TAKE PICTURE"}
      </button>
      {capturedPhoto && (
        <button
          className="camera-use-photo"
          type="button"
          onClick={handleUsePhoto}
          disabled={isStarting || isPreparingPhoto}
        >
          {isPreparingPhoto ? "PREPARING…" : "USE PHOTO"}
        </button>
      )}

      {captureError && (
        <p className="camera-capture-error" role="alert">
          {captureError}
        </p>
      )}

      <div className="camera-tips">
        <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
        <p>NEUTRAL EXPRESSION · FRONTAL POSE · ADEQUATE LIGHTING</p>
      </div>

      <button
        className="name-entry-back"
        type="button"
        onClick={onBack}
        disabled={isPreparingPhoto}
      >
        <span className="take-test-diamond" aria-hidden="true">
          <span>◀</span>
        </span>
        <span>BACK</span>
      </button>
    </main>
  );
}

export default CameraCapture;
