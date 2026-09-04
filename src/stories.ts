export type Word = { word: string; definition: string; choices: string[]; correct: number }
export type Story = {
  id: string
  tier: 'Easy' | 'Medium' | 'Brave'
  chapter: string
  title: string
  subtitle: string
  theme: string
  interest: string
  image: string
  alt: string
  paragraphs: string[]
  words: Word[]
  proveIt: { question: string; options: string[]; correct: number; explanation: string }[]
  villain: { character: string; prompt: string; options: { line: string; result: string }[] }
  mistake: { summary: string; options: string[]; correct: number }
  whatIf: { question: string; options: string[]; correct: number; explanation: string }
}

export const stories: Story[] = [
  {
    id: 'lumi', tier: 'Easy', chapter: 'Chapter 1', title: "Lumi's Little Light",
    subtitle: 'A tiny glow. A very big garden.', theme: 'courage', interest: 'Magic',
    image: '/stories/lumi-garden.png', alt: 'Lumi the firefly flying through a magical moonlit garden',
    paragraphs: [
      'Lumi was the smallest firefly in the moonlit garden. Her light was only a tiny spark, but she carried it proudly between the tall flowers.',
      'One evening, a silver mist covered the path home. Lumi felt timid, yet she noticed that every little glow made the next stone easier to see.',
      'She followed the winding trail and shared her light with a lost beetle. Together, their two small sparks gleamed brightly enough to guide them home.'
    ],
    words: [
      { word: 'moonlit', definition: 'lit by the light of the moon', choices: ['lit by moonlight', 'hidden underground', 'very noisy'], correct: 0 },
      { word: 'timid', definition: 'shy or a little afraid', choices: ['shy or afraid', 'loud and angry', 'fast and strong'], correct: 0 },
      { word: 'gleamed', definition: 'shone with a soft, bright light', choices: ['made a soft light', 'fell asleep', 'made a loud sound'], correct: 0 }
    ],
    proveIt: [
      { question: 'What was special about Lumi in this paragraph?', options: ['She was small and carried a tiny light', 'She was the tallest flower', 'She could make the moon move'], correct: 0, explanation: 'The paragraph says Lumi was the smallest firefly and her light was a tiny spark.' },
      { question: 'Why was the path difficult for Lumi to see?', options: ['Silver mist covered it', 'The flowers moved it', 'The beetle hid it'], correct: 0, explanation: 'The silver mist covered the path home.' },
      { question: 'Why could Lumi and the beetle find their way home?', options: ['They combined their little lights', 'The sun came out', 'A bird carried them'], correct: 0, explanation: 'Two little sparks together made the path bright enough to follow.' }
    ],
    villain: { character: 'The Mist', prompt: 'The mist wants Lumi to turn back. What should it whisper?', options: [
      { line: '“Your light is too small to matter.”', result: 'Lumi looks at the next glowing stone and decides one step is enough.' },
      { line: '“This garden belongs only to me!”', result: 'The flowers rustle. Lumi remembers the garden belongs to everyone.' },
      { line: '“Maybe I am lost, too.”', result: 'Lumi understands the mist may be frightened, just like her.' }
    ]},
    mistake: { summary: 'Lumi found her way because she had the biggest light in the garden.', options: ['Her light was small, and teamwork helped', 'She never left home', 'The garden was sunny'], correct: 0 },
    whatIf: { question: 'What if Lumi had a blue light instead of a gold one—would the main story change?', options: ['No, the color is not what made her brave', 'Yes, blue lights cannot help anyone'], correct: 0, explanation: 'The important part is that Lumi used the light she had and shared it.' }
  },
  {
    id: 'mila', tier: 'Medium', chapter: 'Chapter 2', title: "Mila and the Storm Kite",
    subtitle: 'One torn kite. One clever plan.', theme: 'persistence', interest: 'Adventure',
    image: '/stories/mila-kpolis.png'.replace('kpolis','kite'), alt: 'Mila repairing a red kite in a warm attic during a storm',
    paragraphs: [
      'Mila discovered a crimson kite in the attic. Its paper was fragile and one corner was torn, but the wooden frame was still strong.',
      'Rain tapped the round window while Mila carefully patched the rip. The first patch slipped. The second wrinkled. Mila took a breath and tried once more.',
      'When the clouds finally parted, Mila ran outside. A fresh breeze lifted the repaired kite, and it soared above the silver rooftops.'
    ],
    words: [
      { word: 'fragile', definition: 'easy to break or damage', choices: ['easy to damage', 'very heavy', 'brightly colored'], correct: 0 },
      { word: 'patched', definition: 'repaired a damaged spot', choices: ['repaired a spot', 'threw away', 'painted blue'], correct: 0 },
      { word: 'soared', definition: 'flew high in the air', choices: ['flew high', 'fell quickly', 'sat still'], correct: 0 }
    ],
    proveIt: [
      { question: 'Why did Mila think the kite was worth repairing?', options: ['Its wooden frame was still strong', 'It was brand new', 'It could already fly'], correct: 0, explanation: 'The paper was damaged, but the paragraph says the wooden frame was still strong.' },
      { question: 'What shows that Mila was persistent?', options: ['She tried the patch again after it failed', 'She waited for someone else', 'She bought a new kite'], correct: 0, explanation: 'Mila kept trying even when her first two patches did not work.' },
      { question: 'What happened after the clouds parted?', options: ['The repaired kite flew above the rooftops', 'Mila returned the kite to the attic', 'The kite became a boat'], correct: 0, explanation: 'Mila ran outside and the breeze lifted the repaired kite.' }
    ],
    villain: { character: 'The Storm', prompt: 'The storm wants Mila to give up. What should it rumble?', options: [
      { line: '“That old kite will never fly!”', result: 'Mila studies the strong frame and finds one more way to fix it.' },
      { line: '“My wind is much too powerful!”', result: 'Mila waits patiently for the safest moment to test her kite.' },
      { line: '“I wish someone understood me.”', result: 'Mila realizes even a storm eventually needs to rest.' }
    ]},
    mistake: { summary: 'Mila discovered a toy boat and sailed it across the attic.', options: ['She found and repaired a kite', 'She was outside the whole time', 'There was no storm'], correct: 0 },
    whatIf: { question: 'If the kite had been blue instead of red, would the lesson change?', options: ['No, Mila would still need persistence', 'Yes, only red kites can be repaired'], correct: 0, explanation: 'The color is a surface detail. Mila’s persistence is what drives the story.' }
  },
  {
    id: 'nova', tier: 'Brave', chapter: 'Chapter 3', title: 'The Crystal Between Us',
    subtitle: 'Two explorers. Two plans. One bright solution.', theme: 'cooperation', interest: 'Space',
    image: '/stories/nova-orion.png', alt: 'Nova and Orion solving a problem with a glowing crystal in a moon rover',
    paragraphs: [
      'Nova and Orion discovered a luminous crystal on the far side of the moon. Its shell looked fragile, but the energy inside could power their rover home.',
      'Nova wanted to carry it by hand. Orion insisted they use the rover’s padded case. Their disagreement grew until neither explorer was listening.',
      'Then Nova proposed a compromise: Orion would guide the case while Nova steadied the crystal. Working together, they secured it safely, and the rover soared toward home.'
    ],
    words: [
      { word: 'luminous', definition: 'glowing or giving off light', choices: ['giving off light', 'completely silent', 'made of water'], correct: 0 },
      { word: 'insisted', definition: 'said firmly that something must happen', choices: ['said firmly', 'forgot completely', 'asked quietly'], correct: 0 },
      { word: 'compromise', definition: 'an agreement where each side gives a little', choices: ['a shared agreement', 'a secret map', 'a sudden race'], correct: 0 }
    ],
    proveIt: [
      { question: 'Why was the crystal important to the explorers?', options: ['It could power their rover home', 'It was a snack for the trip', 'It showed them a treasure map'], correct: 0, explanation: 'The paragraph says the crystal’s energy could power their rover home.' },
      { question: 'What caused the explorers’ problem in this paragraph?', options: ['They disagreed and stopped listening', 'The rover disappeared', 'The crystal stopped glowing'], correct: 0, explanation: 'Nova and Orion argued about how to carry the crystal and neither listened.' },
      { question: 'How did Nova and Orion finally solve their disagreement?', options: ['They combined parts of both plans', 'Nova worked alone', 'They left the crystal behind'], correct: 0, explanation: 'Their compromise used Orion’s safe case and Nova’s steady hands.' }
    ],
    villain: { character: 'The Crystal Keeper', prompt: 'The keeper doubts the explorers. What should it say?', options: [
      { line: '“Only one of you can be right.”', result: 'Nova and Orion notice that their best solution needs both of them.' },
      { line: '“You will break my crystal!”', result: 'The explorers slow down and explain every safety step.' },
      { line: '“Show me how two plans become one.”', result: 'The explorers demonstrate their compromise together.' }
    ]},
    mistake: { summary: 'Nova and Orion solved the problem by racing each other for the crystal.', options: ['They compromised and worked together', 'The crystal disappeared', 'The rover did not need power'], correct: 0 },
    whatIf: { question: 'If the crystal glowed green instead of gold, would the main lesson change?', options: ['No, cooperation would still solve the problem', 'Yes, green crystals cannot be carried'], correct: 0, explanation: 'Its color does not change the conflict or the value of cooperation.' }
  }
]
