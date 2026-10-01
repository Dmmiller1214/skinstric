# Skinstric

A responsive React application built for the Skinstric internship assignment.

Live site: https://skinstric-lime.vercel.app/

## Features

- Name and location forms with validation.
- Customer information submitted to the Phase 1 API.
- Automatic Base64 upload and analysis after selecting a gallery image.
- Camera capture and retake, with automatic analysis after accepting a photo.
- Thank You page after successful customer information submission.
- Animated diamond outlines, hover effects, and demographic confidence rings.
- Reduced-motion support for animations.
- Loading and error feedback.
- Race, age, and gender scores sorted highest to lowest.
- Percentages displayed to two decimal places.
- Editable demographic selections and reset functionality.
- Separate page URLs with browser Back/Forward navigation.
- Responsive layouts for desktop, tablet, and mobile.

The demographic scores are randomized simulations returned by the
assignment API. They are not real assessments of a person's appearance
or identity.

## Technologies

- React
- Vite
- React Router
- Standard CSS
- SVG artwork exported from Figma
- Vercel

## Run locally

Install dependencies:

npm install

Start the development server:

npm run dev

Open the Local URL printed in the terminal.

## Project checks

Check code quality:

npm run lint

Create a production build:

npm run build

## Page routes

- `/` — Introduction
- `/name` — Name entry
- `/location` — Location entry
- `/thank-you` — Customer submission confirmation
- `/image-options` — Gallery or camera selection
- `/camera` — Camera capture
- `/analysis` — Analysis menu
- `/demographics` — Demographic results

## Data and camera behavior

Form values, image selections, results, and corrected attributes are
stored in React state and reset when the page is refreshed.

Opening the Thank You page without a name and location redirects to name entry.
Opening the location page without a name redirects to name entry.
Opening analysis or demographics without results redirects to image selection.

Camera access requires browser permission and HTTPS or localhost.
The live selfie preview is mirrored; the captured image is not.
Camera tracks are stopped when the camera screen closes.

Customer details and images are sent to the assignment's supplied APIs.
Their server-side retention behavior is not documented in the assignment.

## Current limitations

- Arial is used as a fallback because the Figma font, Roobert TRIAL,
  was not supplied.
- Skin type, cosmetic concerns, and weather options are disabled.
  Their functionality is outside the PDF's listed requirements.
- ENTER CODE and DISCOVER A.I. are visual placeholders without actions.
