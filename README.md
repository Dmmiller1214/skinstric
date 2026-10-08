# Skinstric — Image Analysis Interface

A React frontend demonstrating a multi-step experience for collecting user details, uploading or capturing an image, and displaying results returned by an external analysis API.

The project focuses on interface design, navigation, camera interaction, asynchronous requests, and results visualization.

## Live Demo

[View Skinstric](https://skinstric-lime.vercel.app/)

## Features

- Multi-step name and location entry
- Submission of user details to an external API
- Image upload with file-type validation
- Camera preview, photo capture, and retake controls
- Base64 image conversion for API submission
- Loading and error messages
- Results organized into categories with confidence displays
- Selection and reset controls for displayed result labels
- Navigation using React Router

## Tech Stack

- React
- JavaScript and JSX
- CSS
- Vite
- React Router
- Fetch API
- Browser camera, Canvas, and FileReader APIs

## Run Locally

Download or clone the repository, then open its root folder in a terminal:

```bash
npm ci
npm run dev
```

Open the local URL shown in the terminal.

Camera capture requires browser permission and a secure context, such as HTTPS or localhost.

## Available Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```text
src/
├── App.jsx           # Intro and user-details flow
├── NameEntry.jsx     # Name entry
├── LocationEntry.jsx # Location entry
├── ThankYou.jsx      # Submission confirmation
├── ImageOptions.jsx  # Upload and analysis flow
├── CameraCapture.jsx # Camera preview and capture
├── AnalysisMenu.jsx  # Results navigation
├── Demographics.jsx  # Results display and selection
├── api.js            # External API requests
└── imageUtils.js     # Image conversion
```

## External Services and Data

The application sends names and locations to the configured Skinstric phase-one endpoint. Uploaded or captured images are sent to its phase-two endpoint.

The frontend displays the returned values; it does not train or run an AI model locally. Results are model outputs, not verified facts about a person or medical assessments.

## Current Limitations

- API-dependent features require the external service to be available.
- User details and analysis results are held in React state and are not persisted across page refreshes.
- The intro's Enter Code and Discover A.I. controls have no implemented action.
- The inspected code displays demographic results; it does not generate a personalized skincare routine.

## Project Context and Credits

This project was completed as part of an internship with Skinstric.

The repository contains the frontend interface and integration with external Skinstric API endpoints. The AI model and backend services are separate from this frontend.

Skinstric branding, supplied designs, assets, and API services belong to their respective owners.
