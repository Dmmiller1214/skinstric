export async function submitCustomer(name, location) {
  const response = await fetch(
    'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, location }),
    }
  )

  if (!response.ok) {
    throw new Error('Unable to save your details. Please try again.')
  }

  return response.json()
}

export async function analyzeImage(base64Image) {
  const response = await fetch(
    'https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Image }),
    }
  )

  if (!response.ok) {
    throw new Error('Unable to analyze your image. Please try again.')
  }

  const result = await response.json()
  return result.data
}