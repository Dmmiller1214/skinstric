import cameraIcon from "./assets/camera.svg";
import galleryIcon from "./assets/gallery.svg";
import { useEffect, useRef, useState } from "react";
import { fileToBase64 } from "./imageUtils";
import { analyzeImage } from "./api";
import Demographics from "./Demographics";
import AnalysisMenu from "./AnalysisMenu";
import CameraCapture from "./CameraCapture";

function ImageOptions({ onBack }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageError, setImageError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showDemographics, setShowDemographics] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function updateSelectedImage(file) {
    setSelectedFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  }
  async function handleAnalyze() {
    if (!selectedFile || isAnalyzing) {
      return;
    }

    setIsAnalyzing(true);
    setImageError("");
    setAnalysisResult(null);

    try {
      const base64 = await fileToBase64(selectedFile);
      const result = await analyzeImage(base64);

      if (!result?.race || !result?.age || !result?.gender) {
        throw new Error("The response is missing demographic results.");
      }
      const selections = {};

      for (const category of ["race", "age", "gender"]) {
        const sortedScores = Object.entries(result[category]).sort(
          (a, b) => b[1] - a[1],
        );

        selections[category] = sortedScores[0][0];
      }

      setSelectedAttributes(selections);

      setAnalysisResult(result);
    } catch (error) {
      setImageError(
        error instanceof Error
          ? error.message
          : "Unable to analyze this image. Please try again.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleImageSelect(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }
    setAnalysisResult(null);

    if (!file.type.startsWith("image/")) {
      updateSelectedImage(null);
      setImageError("Please choose an image file.");
      event.target.value = "";
      return;
    }

    setImageError("");
    updateSelectedImage(file);
  }
  if (showCamera) {
    return (
      <CameraCapture
        onBack={() => setShowCamera(false)}
        onCapture={(file) => {
          updateSelectedImage(file);
          setImageError("");
          setAnalysisResult(null);
          setShowDemographics(false);
          setShowCamera(false);
        }}
      />
    );
  }
  if (analysisResult) {
    if (showDemographics) {
      return (
        <Demographics
          results={analysisResult}
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
          onBack={() => setShowDemographics(false)}
        />
      );
    }

    return (
      <AnalysisMenu
        onDemographics={() => setShowDemographics(true)}
        onBack={() => {
          setShowDemographics(false);
          setAnalysisResult(null);
        }}
      />
    );
  }
  return (
    <main className="image-options">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageSelect}
      />
      <header className="entry-header">
        <div className="site-brand">
          <span>SKINSTRIC</span>
          <span className="page-label">[ INTRO ]</span>
        </div>
      </header>

      <h1 className="name-entry-heading">TO START ANALYSIS</h1>

      <div className="image-options-choices">
        <button
          type="button"
          className="image-option"
          aria-label="Allow A.I. to scan your face"
          onClick={() => setShowCamera(true)}
        >
          <img src={cameraIcon} alt="" className="image-option-icon" />
        </button>

        <button
          disabled={isAnalyzing}
          onClick={() => fileInputRef.current?.click()}
          type="button"
          className="image-option"
          aria-label="Allow A.I. to access gallery"
        >
          <img src={galleryIcon} alt="" className="image-option-icon" />
          {selectedFile && <span>{selectedFile.name}</span>}
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Selected image preview"
              className="selected-image-preview"
              onError={() => {
                setImageError(
                  "This image could not be opened. Try a JPG or PNG.",
                );
                updateSelectedImage(null);
              }}
            />
          )}
        </button>
        {imageError && <p role="alert">{imageError}</p>}
      </div>
      <div className="image-analysis">
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={!selectedFile || isAnalyzing}
        >
          {isAnalyzing ? "ANALYZING…" : "UPLOAD AND ANALYZE"}
        </button>

        <p role="status">
          {isAnalyzing
            ? "Uploading your image…"
            : analysisResult
              ? "Results received: race, age, and gender."
              : ""}
        </p>
      </div>

      <button
        className="name-entry-back"
        type="button"
        onClick={onBack}
        disabled={isAnalyzing}
      >
        <span className="take-test-diamond" aria-hidden="true">
          <span>◀</span>
        </span>
        <span>BACK</span>
      </button>
    </main>
  );
}

export default ImageOptions;
