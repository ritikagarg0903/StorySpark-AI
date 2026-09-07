const allowedInterests = ['Magic', 'Adventure', 'Space']
const allowedTiers = ['Explorer', 'Pathfinder', 'Trailblazer']

function validStory(value) {
  return value && typeof value.title === 'string' && typeof value.subtitle === 'string' &&
    Array.isArray(value.paragraphs) && value.paragraphs.length === 5 &&
    value.paragraphs.every(p => typeof p === 'string' && p.length >= 80 && p.length <= 650) &&
    Array.isArray(value.words) && value.words.length >= 5 &&
    Array.isArray(value.proveIt) && value.proveIt.length === 5 &&
    value.villain?.options?.length === 3 && value.mistake?.options?.length === 3 &&
    value.whatIf?.options?.length === 2
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return res.status(503).json({ error: 'Live story generation is not configured yet.' })

  const interest = allowedInterests.includes(req.body?.interest) ? req.body.interest : 'Adventure'
  const tier = allowedTiers.includes(req.body?.tier) ? req.body.tier : 'Pathfinder'
  const reviewWords = Array.isArray(req.body?.reviewWords)
    ? req.body.reviewWords.map(String).map(w => w.toLowerCase().replace(/[^a-z'-]/g, '')).filter(Boolean).slice(0, 3)
    : []

  const prompt = `Create a completely original, intelligent English reading adventure for ages 9-13.
Interest: ${interest}. Reading tier: ${tier}. Naturally reuse these review words: ${reviewWords.join(', ') || 'brave, discover'}.
Write exactly 5 paragraphs, each 75-110 words. Maintain one coherent plot with setup, escalating problem, two meaningful attempts, a difficult choice, and a satisfying resolution.
Use vivid but accessible prose, logical cause and effect, nuanced character motives, and age-appropriate academic vocabulary. Avoid babyish language and obvious morals.
No graphic violence, romance, brands, personal data, external links, or frightening danger. Do not include a child's name.
For each paragraph, create one question answerable ONLY from that paragraph. Include 3 plausible options and a correct index.
Create 8 vocabulary items used in the story, each with a context-aware definition, 3 choices, and correct index.
Add one perspective challenge with exactly 3 dialogue choices and consequences, one wrong-summary challenge with 3 options, and one counterfactual what-if challenge with 2 options.
Return JSON only, using exactly this shape:
{"title":"","subtitle":"","theme":"","paragraphs":["","","","",""],"words":[{"word":"","definition":"","choices":["","",""],"correct":0}],"proveIt":[{"question":"","options":["","",""],"correct":0,"explanation":""}],"villain":{"character":"","prompt":"","options":[{"line":"","result":""},{"line":"","result":""},{"line":"","result":""}]},"mistake":{"summary":"","options":["","",""],"correct":0},"whatIf":{"question":"","options":["",""],"correct":0,"explanation":""}}`

  try {
    const model = process.env.GEMINI_MODEL || 'gemini-3.7-flash'
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', maxOutputTokens: 4000 }
      })
    })
    if (!response.ok) throw new Error('Gemini request failed')
    const payload = await response.json()
    const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text
    const story = JSON.parse(text)
    if (!validStory(story)) throw new Error('Generated story did not pass validation')
    return res.status(200).json(story)
  } catch {
    return res.status(502).json({ error: 'Story generation failed validation. Please try again.' })
  }
}
