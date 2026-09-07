import { useMemo, useState } from 'react'
import { ArrowRight, BookOpen, Check, ChevronRight, LoaderCircle, RotateCcw, Sparkles, Star, Volume2, WandSparkles, X } from 'lucide-react'
import { stories, type Story, type Word } from './stories'

type Screen = 'welcome' | 'reader' | 'villain' | 'mistake' | 'whatif' | 'adapt' | 'recap'
type AnswerState = { selected: number | null; revealed: boolean }

const interests = [
  { name: 'Magic', icon: '✨', desc: 'Ancient clues & impossible mysteries' },
  { name: 'Adventure', icon: '🪁', desc: 'Bold inventions & difficult choices' },
  { name: 'Space', icon: '🪐', desc: 'Lunar science & cosmic dilemmas' },
]

function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [name, setName] = useState('')
  const [interest, setInterest] = useState('Magic')
  const [storyIndex, setStoryIndex] = useState(0)
  const [page, setPage] = useState(0)
  const [known, setKnown] = useState<Record<string, boolean>>({})
  const [helped, setHelped] = useState<string[]>([])
  const [word, setWord] = useState<Word | null>(null)
  const [wordLoading, setWordLoading] = useState(false)
  const [wordAnswer, setWordAnswer] = useState<AnswerState>({ selected: null, revealed: false })
  const [proveOpen, setProveOpen] = useState(false)
  const [proveLoading, setProveLoading] = useState(false)
  const [proveAnswer, setProveAnswer] = useState<AnswerState>({ selected: null, revealed: false })
  const [villainChoice, setVillainChoice] = useState<number | null>(null)
  const [checkAnswer, setCheckAnswer] = useState<AnswerState>({ selected: null, revealed: false })
  const [stars, setStars] = useState(0)
  const [generatedStory, setGeneratedStory] = useState<Story | null>(null)
  const [storyGenerating, setStoryGenerating] = useState(false)
  const [storyError, setStoryError] = useState('')
  const story = generatedStory ?? stories[storyIndex]

  const displayName = name.trim() || 'Explorer'
  const readingProgress = 18 + Math.round(((page + 1) / story.paragraphs.length) * 37)
  const progress = screen === 'reader' ? readingProgress : screen === 'villain' ? 62 : screen === 'mistake' ? 72 : screen === 'whatif' ? 82 : screen === 'adapt' ? 92 : screen === 'recap' ? 100 : 0

  const personalizedStory = useMemo(() => {
    const next = stories[Math.min(storyIndex + 1, stories.length - 1)]
    const review = helped[helped.length - 1] || story.words[0].word
    return { next, review }
  }, [storyIndex, helped, story.words])

  function start() {
    const idx = Math.max(0, interests.findIndex(i => i.name === interest))
    setStoryIndex(idx)
    setPage(0)
    setScreen('reader')
  }

  async function openWord(w: Word, context = '') {
    setWord(w)
    setWordAnswer({ selected: null, revealed: false })
    if (!helped.includes(w.word)) setHelped(v => [...v, w.word])
    if (w.choices.length) return
    setWordLoading(true)
    try {
      const response = await fetch('/api/define-word', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ word: w.word, context }) })
      const result = await response.json()
      if (typeof result.definition === 'string') setWord(current => current?.word === w.word ? { ...current, definition: result.definition } : current)
    } catch {
      setWord(current => current?.word === w.word ? { ...current, definition: `Look at the words around “${w.word}” for clues to its meaning.` } : current)
    } finally {
      setWordLoading(false)
    }
  }

  async function generateNextStory() {
    setStoryGenerating(true)
    setStoryError('')
    try {
      const response = await fetch('/api/generate-story', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ interest, tier: personalizedStory.next.tier, reviewWords: Object.keys(known).slice(-3) }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Could not create the story')
      const imageByInterest: Record<string, string> = { Magic: '/stories/lumi-garden.png', Adventure: '/stories/mila-kite.png', Space: '/stories/nova-orion.png' }
      setGeneratedStory({ ...result, id: `gemini-${Date.now()}`, chapter: 'A brand-new AI story', tier: personalizedStory.next.tier, interest, image: imageByInterest[interest], alt: `An illustrated ${interest.toLowerCase()} story` } as Story)
      setPage(0)
      setVillainChoice(null)
      setScreen('reader')
    } catch (error) {
      setStoryError(error instanceof Error ? error.message : 'Could not create the story')
    } finally {
      setStoryGenerating(false)
    }
  }

  function answerWord(index: number) {
    if (!word) return
    const correct = index === word.correct
    setWordAnswer({ selected: index, revealed: true })
    if (correct) {
      setKnown(v => ({ ...v, [word.word]: true }))
      setStars(v => v + 1)
    }
  }

  function proveIt() {
    setProveOpen(true)
    setProveLoading(true)
    setProveAnswer({ selected: null, revealed: false })
    window.setTimeout(() => setProveLoading(false), 900)
  }

  function nextFromReader() {
    if (page < story.paragraphs.length - 1) setPage(v => v + 1)
    else setScreen('villain')
  }

  function reset() {
    setScreen('welcome'); setPage(0); setStoryIndex(0); setGeneratedStory(null); setKnown({}); setHelped([]); setStars(0); setName('')
  }

  return (
    <div className="app-shell">
      <div className="stars-bg" aria-hidden="true" />
      <Header screen={screen} progress={progress} stars={stars} onHome={reset} />

      <main>
        {screen === 'welcome' && <Welcome name={name} setName={setName} interest={interest} setInterest={setInterest} onStart={start} />}
        {screen === 'reader' && <Reader story={story} page={page} known={known} displayName={displayName} onWord={openWord} onProve={proveIt} onNext={nextFromReader} />}
        {screen === 'villain' && <Villain story={story} choice={villainChoice} setChoice={setVillainChoice} onNext={() => { setCheckAnswer({selected:null,revealed:false}); setScreen('mistake') }} />}
        {screen === 'mistake' && <QuizCard eyebrow="COMPREHENSION CHALLENGE" title="Fix the mistake" icon="🔍" prompt={story.mistake.summary} options={story.mistake.options} correct={story.mistake.correct} state={checkAnswer} setState={setCheckAnswer} success="Sharp eyes! You compared the summary with what really happened." onNext={() => { setCheckAnswer({selected:null,revealed:false}); setScreen('whatif') }} />}
        {screen === 'whatif' && <QuizCard eyebrow="THINK DEEPER" title="What if?" icon="💭" prompt={story.whatIf.question} options={story.whatIf.options} correct={story.whatIf.correct} state={checkAnswer} setState={setCheckAnswer} success={story.whatIf.explanation} onNext={() => setScreen('adapt')} />}
        {screen === 'adapt' && <Adapt name={displayName} story={story} next={personalizedStory.next} review={personalizedStory.review} generating={storyGenerating} error={storyError} onGenerate={generateNextStory} onNext={() => { setGeneratedStory(null); if (storyIndex < stories.length - 1) { setStoryIndex(v => v + 1); setPage(0); setVillainChoice(null); setScreen('reader') } else setScreen('recap') }} onRecap={() => setScreen('recap')} />}
        {screen === 'recap' && <Recap name={displayName} stars={stars} known={Object.keys(known)} helped={helped} story={story} onReset={reset} />}
      </main>

      {word && <WordModal word={word} loading={wordLoading} isKnown={!!known[word.word]} state={wordAnswer} onAnswer={answerWord} onClose={() => setWord(null)} />}
      {proveOpen && <ProveModal story={story} page={page} displayName={displayName} loading={proveLoading} state={proveAnswer} setState={setProveAnswer} onClose={() => setProveOpen(false)} />}
    </div>
  )
}

function Header({ screen, progress, stars, onHome }: { screen: Screen; progress: number; stars: number; onHome: () => void }) {
  return <header className="topbar">
    <button className="brand" onClick={onHome} aria-label="StorySpark home"><span className="brand-mark"><Sparkles size={20}/></span><span>StorySpark <b>AI</b></span></button>
    {screen !== 'welcome' && <div className="journey"><span>Your reading journey</span><div className="progress"><i style={{width:`${progress}%`}} /></div><strong>{progress}%</strong></div>}
    <div className="star-count"><Star size={18} fill="currentColor" /> {stars} word stars</div>
  </header>
}

function Welcome({ name, setName, interest, setInterest, onStart }: { name:string; setName:(v:string)=>void; interest:string; setInterest:(v:string)=>void; onStart:()=>void }) {
  return <section className="welcome layout">
    <div className="hero-copy">
      <div className="pill"><WandSparkles size={15}/> MADE FOR READERS AGES 9–13</div>
      <h1>Every great reader<br/>starts with a <em>spark.</em></h1>
      <p>Investigate layered mysteries, master powerful vocabulary, defend your ideas, and shape stories that remember how you learn.</p>
      <div className="trust-row"><span>✓ No account</span><span>✓ Designed for ages 9–13</span><span>✓ Grown-up recap</span></div>
    </div>
    <div className="start-card">
      <span className="step-label">YOUR ADVENTURE STARTS HERE</span>
      <h2>What should we call you?</h2>
      <label className="input-wrap"><span>Reader name</span><input value={name} maxLength={18} onChange={e=>setName(e.target.value.replace(/[^a-zA-Z '-]/g,''))} placeholder="Type your first name" /></label>
      <h3>Pick a story world</h3>
      <div className="interest-grid">{interests.map(i => <button key={i.name} className={interest===i.name?'interest active':'interest'} onClick={()=>setInterest(i.name)}><b>{i.icon}</b><span><strong>{i.name}</strong><small>{i.desc}</small></span>{interest===i.name&&<Check size={18}/>}</button>)}</div>
      <button className="primary full" onClick={onStart}>Begin my story <ArrowRight size={19}/></button>
      <small className="privacy">Your name stays on this device and disappears when you leave.</small>
    </div>
  </section>
}

function Reader({story,page,known,displayName,onWord,onProve,onNext}:{story:Story;page:number;known:Record<string,boolean>;displayName:string;onWord:(w:Word,context?:string)=>void;onProve:()=>void;onNext:()=>void}) {
  const text = story.paragraphs[page].replaceAll('Mila', story.id==='mila'?displayName:'Mila')
  const pageWords = story.words.filter(w => text.toLowerCase().includes(w.word.toLowerCase()))
  const pieces = text.split(/([A-Za-z]+(?:['’][A-Za-z]+)?)/g)
  return <section className="reader layout">
    <aside className="story-side">
      <span className="chapter">{story.chapter} · {story.tier}</span>
      <h1>{story.title}</h1><p>{story.subtitle}</p>
      <img src={story.image} alt={story.alt}/>
      <div className="page-dots">{story.paragraphs.map((_,i)=><i key={i} className={i===page?'active':''}/>)}</div>
    </aside>
    <article className="reading-card">
      <div className="reading-meta"><span><BookOpen size={17}/> Read along</span><button className="listen" onClick={()=>speechSynthesis.speak(new SpeechSynthesisUtterance(text))}><Volume2 size={17}/> Listen</button></div>
      <div className="story-text">{pieces.map((piece,i)=>{
        const w=story.words.find(x=>x.word.toLowerCase()===piece.toLowerCase())
        if (!/^[A-Za-z]/.test(piece)) return piece
        const lookup = w || { word: piece.toLowerCase(), definition: 'Finding a simple meaning…', choices: [], correct: 0 }
        return <button key={i} aria-label={`Define ${piece}`} className={w ? `word ${known[w.word]?'known':''}` : 'tappable-word'} onClick={()=>onWord(lookup,text)}>{piece}{w&&known[w.word]&&<Star size={12} fill="currentColor"/>}</button>
      })}</div>
      <div className="word-shelf"><div><span>✨</span><p><b>Every word is tappable</b><small>Tap any word in the paragraph for its meaning. Special learning words glow.</small></p></div><div>{pageWords.map(w => <button key={w.word} onClick={() => onWord(w,text)} className={known[w.word] ? 'learned' : ''}>{w.word}{known[w.word] ? <Star size={12} fill="currentColor"/> : <span>Tap for meaning</span>}</button>)}</div></div>
      <div className="reader-actions"><button className="secondary" onClick={onProve}><Sparkles size={18}/> Prove It <small>AI question</small></button><button className="primary" onClick={onNext}>{page===story.paragraphs.length-1?'Enter the story':'Next page'} <ArrowRight size={18}/></button></div>
    </article>
  </section>
}

function Villain({story,choice,setChoice,onNext}:{story:Story;choice:number|null;setChoice:(v:number)=>void;onNext:()=>void}) {
  return <section className="center-stage villain-stage">
    <div className="pill coral"><Sparkles size={15}/> PERSPECTIVE FLIP</div>
    <h1>You're the villain now!</h1>
    <p className="lead">Stories have more than one side. Step into <b>{story.villain.character}</b>'s shoes.</p>
    <div className="villain-card"><div className="character-orb">🎭</div><div><span>YOUR NEXT LINE</span><h2>{story.villain.prompt}</h2></div></div>
    <div className="choice-stack">{story.villain.options.map((o,i)=><button key={o.line} onClick={()=>setChoice(i)} className={choice===i?'choice selected':'choice'}><span>“</span><b>{o.line.replace(/[“”]/g,'')}</b>{choice===i&&<Check/>}</button>)}</div>
    {choice!==null && <div className="consequence"><Sparkles/><div><b>The story shifts…</b><p>{story.villain.options[choice].result}</p></div></div>}
    <button className="primary" disabled={choice===null} onClick={onNext}>See what happens next <ChevronRight/></button>
  </section>
}

function QuizCard({eyebrow,title,icon,prompt,options,correct,state,setState,success,onNext}:{eyebrow:string;title:string;icon:string;prompt:string;options:string[];correct:number;state:AnswerState;setState:(s:AnswerState)=>void;success:string;onNext:()=>void}) {
  return <section className="center-stage quiz-stage">
    <div className="pill"><Sparkles size={15}/> {eyebrow}</div><div className="big-icon">{icon}</div><h1>{title}</h1>
    <div className="quote-card"><span>THE STORY SAYS…</span><p>“{prompt}”</p></div>
    <h3>Which answer shows what really happened?</h3>
    <div className="choice-stack">{options.map((o,i)=>{const cls=state.revealed?(i===correct?'choice correct':state.selected===i?'choice wrong':'choice'):(state.selected===i?'choice selected':'choice');return <button className={cls} key={o} disabled={state.revealed} onClick={()=>setState({selected:i,revealed:true})}><span>{String.fromCharCode(65+i)}</span><b>{o}</b>{state.revealed&&i===correct?<Check/>:state.revealed&&state.selected===i?<X/>:null}</button>})}</div>
    {state.revealed && <div className={state.selected===correct?'feedback good':'feedback'}><b>{state.selected===correct?'You got it!':'Good try—look again at the story.'}</b><p>{success}</p></div>}
    <button className="primary" disabled={!state.revealed} onClick={onNext}>Keep going <ArrowRight/></button>
  </section>
}

function Adapt({name,story,next,review,generating,error,onGenerate,onNext,onRecap}:{name:string;story:Story;next:Story;review:string;generating:boolean;error:string;onGenerate:()=>void;onNext:()=>void;onRecap:()=>void}) {
  return <section className="center-stage adapt-stage">
    <div className="ai-orb"><WandSparkles size={34}/></div><div className="pill"><Sparkles size={15}/> MOCK AI · READY OFFLINE</div>
    <h1>Your next story is taking shape</h1><p className="lead">StorySpark noticed how you read and prepared the right next adventure for you.</p>
    <div className="adapt-grid">
      <div className="why-card"><span>WHY THIS STORY?</span><h2>Built for {name}</h2><ul><li><Check/> You explored <b>{story.theme}</b></li><li><Check/> <b>{review}</b> will return for practice</li><li><Check/> Sentences gently level up</li></ul><div className="privacy-note">🔒 No personal information was sent anywhere.</div></div>
      <button type="button" className="next-card" onClick={onNext} aria-label={`Open next story: ${next.title}`}><img src={next.image} alt={next.alt}/><div><span>UP NEXT · {next.tier}</span><h2>{next.title}</h2><p>{next.subtitle}</p><div className="tags"><i>{next.interest}</i><i>Review: {review}</i></div><strong className="card-cta">Open this story <ArrowRight size={17}/></strong></div></button>
    </div>
    {error && <div className="generation-error">{error} The reviewed story is still ready below.</div>}
    <div className="button-row"><button className="primary continue-button" onClick={onNext}>{story.id==='nova'?'See my recap':'Read the next story'} <ArrowRight/></button><button className="secondary gemini-button" disabled={generating} onClick={onGenerate}>{generating?<LoaderCircle className="spin"/>:<WandSparkles/>}{generating?'Creating 5-page story…':'Create a new Gemini story'}</button><button className="secondary" onClick={onRecap}>Finish & see recap</button></div>
  </section>
}

function Recap({name,stars,known,helped,story,onReset}:{name:string;stars:number;known:string[];helped:string[];story:Story;onReset:()=>void}) {
  const practice=helped.find(w=>!known.includes(w))||helped[helped.length-1]||story.words[0].word
  return <section className="center-stage recap-stage"><div className="celebrate">★</div><div className="pill"><Sparkles size={15}/> GROWN-UP RECAP</div><h1>{name}'s reading spark is growing!</h1><p className="lead">A quick look at today's adventure.</p>
    <div className="recap-card"><div className="recap-head"><div><span>TODAY'S JOURNEY</span><h2>{story.title}</h2><p>Theme: {story.theme}</p></div><div className="score"><Star fill="currentColor"/> <b>{stars}</b><small>word stars</small></div></div>
      <div className="recap-stats"><div><span>📖</span><b>{Math.max(1,known.length)}</b><small>words recalled</small></div><div><span>💡</span><b>{helped.length}</b><small>words explored</small></div><div><span>🎯</span><b>{story.tier}</b><small>reading level</small></div></div>
      <div className="try-tomorrow"><span>🌱</span><div><b>Try this tomorrow</b><p>Ask {name} to use <strong>{practice}</strong> in a brand-new sentence.</p></div></div>
    </div>
    <button className="primary" onClick={onReset}><RotateCcw size={18}/> Start another adventure</button>
  </section>
}

function WordModal({word,loading,isKnown,state,onAnswer,onClose}:{word:Word;loading:boolean;isKnown:boolean;state:AnswerState;onAnswer:(i:number)=>void;onClose:()=>void}) {
  const hasChallenge = word.choices.length > 0
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal word-modal" onMouseDown={e=>e.stopPropagation()}><button className="close" onClick={onClose}><X/></button><div className="word-orb">Aa</div><span className="modal-label">WORD DISCOVERY</span><h2>{word.word}</h2><p className="definition">{loading?<><LoaderCircle className="spin"/> Finding its meaning in this sentence…</>:word.definition}</p>{hasChallenge&&<><hr/><h3>{isKnown?'A word star is already yours!':'Which meaning matches?'}</h3><div className="mini-options">{word.choices.map((c,i)=><button key={c} disabled={state.revealed||isKnown} className={state.revealed&&i===word.correct?'correct':state.revealed&&state.selected===i?'wrong':''} onClick={()=>onAnswer(i)}>{c}{state.revealed&&i===word.correct&&<Check/>}</button>)}</div>{(state.revealed||isKnown)&&<div className="earned"><Star fill="currentColor"/> {isKnown?'You remembered this word!':'Word star earned!'}</div>}</>}<button className="primary full" onClick={onClose}>{hasChallenge&&(state.revealed||isKnown)?'Back to the story':'Got it'}</button></div></div>
}

function ProveModal({story,page,displayName,loading,state,setState,onClose}:{story:Story;page:number;displayName:string;loading:boolean;state:AnswerState;setState:(s:AnswerState)=>void;onClose:()=>void}) {
  const raw = story.proveIt[page]
  const personalize = (text: string) => story.id === 'mila' ? text.replaceAll('Mila', displayName) : text
  const q = { ...raw, question: personalize(raw.question), options: raw.options.map(personalize), explanation: personalize(raw.explanation) }
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal prove-modal" onMouseDown={e=>e.stopPropagation()}><button className="close" onClick={onClose}><X/></button>{loading?<div className="thinking"><div className="ai-orb pulse"><WandSparkles/></div><h2>Reading this page…</h2><p>Creating one question only from the words you can see.</p><div className="loading"><i/><i/><i/></div><small>Mock AI · page {page + 1} context · reviewed fallback ready</small></div>:<><div className="pill"><Sparkles size={14}/> PROVE IT · THIS PAGE</div><p className="context-note">Based only on page {page + 1} of {story.paragraphs.length}</p><h2>{q.question}</h2><div className="mini-options">{q.options.map((o,i)=><button key={o} disabled={state.revealed} className={state.revealed&&i===q.correct?'correct':state.revealed&&state.selected===i?'wrong':''} onClick={()=>setState({selected:i,revealed:true})}>{o}{state.revealed&&i===q.correct&&<Check/>}</button>)}</div>{state.revealed&&<div className="feedback good"><b>{state.selected===q.correct?'Great evidence!':'Here is the story clue:'}</b><p>{q.explanation}</p></div>}<button className="primary full" disabled={!state.revealed} onClick={onClose}>Back to my story</button></>}</div></div>
}

export default App
