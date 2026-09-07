const fallbackDefinitions = {
  a: 'one person or thing that has not been named yet', an: 'one person or thing that has not been named yet',
  and: 'a word that joins things or ideas together', the: 'a word used before a particular person or thing',
  was: 'a past-tense form of “is”', were: 'a past-tense form of “are”', is: 'means something exists or has a quality',
  in: 'inside something or within a place', on: 'touching or supported by something', to: 'shows direction or purpose',
  of: 'shows that something belongs or relates to something else', with: 'together or accompanied by',
  her: 'belonging to or connected with a girl or woman', his: 'belonging to or connected with a boy or man',
  their: 'belonging to or connected with those people', it: 'a word used for a thing already mentioned',
  but: 'joins two ideas that are different or surprising', still: 'continuing up to this time',
  small: 'little in size', light: 'brightness that lets us see', garden: 'a place where flowers or plants are grown',
  paper: 'thin material used for writing, drawing, or making things', corner: 'the point where two edges meet',
  wooden: 'made from wood', frame: 'a strong structure that supports or surrounds something',
  strong: 'able to hold, carry, or resist force well', rain: 'drops of water that fall from clouds',
  window: 'an opening with glass that lets in light', clouds: 'collections of tiny water drops in the sky',
  crystal: 'a clear or shining solid with an orderly shape', energy: 'power that allows something to work or move',
  rover: 'a vehicle made to travel across another planet or moon', safely: 'in a way that avoids danger or harm'
}

function cleanWord(value) {
  return String(value || '').toLowerCase().replace(/[^a-z'-]/g, '').slice(0, 40)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const word = cleanWord(req.body?.word)
  const context = String(req.body?.context || '').slice(0, 700)
  if (!word) return res.status(400).json({ error: 'A word is required' })

  const local = fallbackDefinitions[word]
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(200).json({
      word,
      definition: local || `a word used in this sentence; read the words around “${word}” for clues`,
      example: context,
      source: 'offline'
    })
  }

  try {
    const model = process.env.GEMINI_MODEL || 'gemini-3.7-flash'
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Define the word "${word}" exactly as it is used in this passage: "${context}". Audience: ages 6-9. Use one short sentence, no more than 16 words. Return JSON with one field named definition.` }] }],
        generationConfig: { responseMimeType: 'application/json', maxOutputTokens: 80 }
      })
    })
    if (!response.ok) throw new Error('Gemini request failed')
    const payload = await response.json()
    const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text
    const parsed = JSON.parse(text)
    if (typeof parsed.definition !== 'string' || parsed.definition.length > 180) throw new Error('Invalid definition')
    return res.status(200).json({ word, definition: parsed.definition, example: context, source: 'gemini' })
  } catch {
    return res.status(200).json({
      word,
      definition: local || `a word used in this sentence; use the surrounding words to help understand “${word}”`,
      example: context,
      source: 'fallback'
    })
  }
}
