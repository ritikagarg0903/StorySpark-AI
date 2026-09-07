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
  rover: 'a vehicle made to travel across another planet or moon', safely: 'in a way that avoids danger or harm',
  constellation: 'a group of stars that forms a recognizable pattern', intricate: 'containing many small, carefully connected details',
  migrating: 'moving from one region to another at a regular time', deliberate: 'done intentionally and with careful thought',
  hypothesis: 'an explanation that can be tested with evidence', anomaly: 'something different from what is normally expected',
  protocol: 'an official set of rules for handling a situation', consensus: 'general agreement reached by a group',
  settlement: 'a community where people establish homes and live together', observatory: 'a place equipped for studying space and the sky',
  retrieve: 'to go and bring something back', crater: 'a large bowl-shaped hollow in the ground',
  authority: 'the official power or right to make decisions', uncertainty: 'a state of not knowing what will happen or what is true'
}

function cleanWord(value) {
  return String(value || '').toLowerCase().replace(/[^a-z'-]/g, '').slice(0, 40)
}

async function dictionaryDefinition(word) {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`, {
      signal: AbortSignal.timeout(3000)
    })
    if (!response.ok) return ''
    const entries = await response.json()
    const definition = entries?.[0]?.meanings?.flatMap(meaning => meaning.definitions || [])?.find(item => typeof item.definition === 'string')?.definition
    return typeof definition === 'string' ? definition.slice(0, 180) : ''
  } catch {
    return ''
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const word = cleanWord(req.body?.word)
  const context = String(req.body?.context || '').slice(0, 700)
  if (!word) return res.status(400).json({ error: 'A word is required' })

  const local = fallbackDefinitions[word]
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    const dictionary = local || await dictionaryDefinition(word)
    return res.status(200).json({
      word,
      definition: dictionary || `A definition for “${word}” is temporarily unavailable. Please try again.`,
      example: context,
      source: local ? 'reviewed' : dictionary ? 'dictionary' : 'unavailable'
    })
  }

  try {
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Define the word "${word}" exactly as it is used in this passage: "${context}". Audience: ages 9-13. Use one clear sentence, no more than 18 words. Return JSON with one field named definition.` }] }],
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
    const dictionary = local || await dictionaryDefinition(word)
    return res.status(200).json({
      word,
      definition: dictionary || `A definition for “${word}” is temporarily unavailable. Please try again.`,
      example: context,
      source: local ? 'reviewed' : dictionary ? 'dictionary' : 'unavailable'
    })
  }
}
