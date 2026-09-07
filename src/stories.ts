export type Word = { word: string; definition: string; choices: string[]; correct: number }
export type Story = {
  id: string
  tier: 'Grade 4-5' | 'Grade 6-7' | 'Grade 8'
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
    id: 'lumi', tier: 'Grade 4-5', chapter: 'Case File 01', title: 'Lumi and the Vanishing Constellation',
    subtitle: 'A coded map. A fading garden. One night to solve the mystery.', theme: 'curiosity and collaboration', interest: 'Magic',
    image: '/stories/lumi-garden.png', alt: 'Lumi the firefly exploring a magical moonlit garden',
    paragraphs: [
      'Every midnight, the fireflies of Astravale formed a constellation above the garden. Their pattern was more than decoration: it was an intricate map that guided migrating moths through the valley. When three lights suddenly vanished, the map pointed toward a dangerous cliff. Lumi, the youngest map keeper, noticed that the missing lights formed a deliberate triangle. The elders blamed the wind, but Lumi suspected the pattern was a message.',
      'Lumi searched beneath the moonflowers and discovered a trail of bioluminescent dust. It ended beside an abandoned greenhouse whose glass was obscured by silver vines. She developed a hypothesis: someone had moved the missing fireflies and left the dust as a clue. Before entering, Lumi recorded the evidence in her map journal. If her idea proved wrong, the details might help another explorer understand what she had missed.',
      'Inside, Lumi found the missing fireflies circling a cracked lantern. They had not been captured. They were trying to warn the garden that the lantern’s protective flame was failing. Without it, the first winter frost would reach the youngest plants. The fireflies had changed the constellation because it was the only signal large enough for everyone to notice. Lumi realized that what appeared to be sabotage was actually an urgent warning.',
      'The garden council refused to believe her. Bramble, the senior keeper, argued that changing the ancient map was reckless, regardless of the reason. Lumi could repair the lantern alone or pause to persuade the council. She chose to collaborate. Using her journal, the dust trail, and the triangular gap in the sky, she demonstrated how every clue supported the same conclusion. One by one, the skeptical keepers agreed to help.',
      'Before dawn, the team repaired the lantern and restored the constellation. Bramble apologized for dismissing evidence that challenged tradition. Lumi proposed a new signal that could warn the garden without confusing migrating moths. The council adopted her design and appointed her their youngest official investigator. Lumi had solved more than a mystery: she had shown that careful observation becomes powerful when people are willing to question assumptions together.'
    ],
    words: [
      { word: 'intricate', definition: 'made of many small, carefully connected parts', choices: ['complex and detailed', 'plain and unfinished', 'extremely noisy'], correct: 0 },
      { word: 'bioluminescent', definition: 'producing light naturally inside a living thing', choices: ['naturally producing light', 'reflecting only sunlight', 'moving without sound'], correct: 0 },
      { word: 'obscured', definition: 'hidden or made difficult to see', choices: ['hidden from view', 'made brighter', 'carefully measured'], correct: 0 },
      { word: 'hypothesis', definition: 'an explanation that can be tested using evidence', choices: ['a testable explanation', 'a final proven fact', 'an imaginary character'], correct: 0 },
      { word: 'sabotage', definition: 'deliberate damage intended to stop something working', choices: ['intentional damage', 'a careful repair', 'an accidental discovery'], correct: 0 },
      { word: 'collaborate', definition: 'work together toward the same goal', choices: ['work together', 'compete in secret', 'refuse assistance'], correct: 0 },
      { word: 'skeptical', definition: 'not easily convinced that something is true', choices: ['doubtful and questioning', 'immediately certain', 'cheerful and relaxed'], correct: 0 },
      { word: 'assumptions', definition: 'ideas accepted as true without complete proof', choices: ['unproven beliefs', 'measured distances', 'written promises'], correct: 0 }
    ],
    proveIt: [
      { question: 'Why did Lumi doubt that the wind caused the missing lights?', options: ['The missing lights formed a deliberate triangle', 'The wind had completely stopped', 'The elders showed her a secret message'], correct: 0, explanation: 'The triangle looked intentional, which gave Lumi a reason to question the simplest explanation.' },
      { question: 'Why did Lumi record the evidence before entering the greenhouse?', options: ['It could help test her idea or help another explorer', 'She wanted to publish a novel', 'The council required a daily drawing'], correct: 0, explanation: 'Her journal preserved the clues whether her hypothesis was correct or not.' },
      { question: 'What changed Lumi’s understanding of the missing fireflies?', options: ['She learned they were sending a warning', 'She discovered Bramble had trapped them', 'She found that the constellation was unimportant'], correct: 0, explanation: 'Their strange behavior was protection, not sabotage.' },
      { question: 'How did Lumi persuade the skeptical council?', options: ['She connected several clues into one explanation', 'She demanded that they trust her age', 'She repaired everything without telling them'], correct: 0, explanation: 'Lumi used her journal, the dust, and the sky pattern as connected evidence.' },
      { question: 'Which idea best expresses the story’s theme?', options: ['Evidence and collaboration can challenge mistaken assumptions', 'Traditions should never be changed', 'The youngest person is always correct'], correct: 0, explanation: 'Lumi succeeds by observing carefully and working with people who initially disagree.' }
    ],
    villain: { character: 'Bramble, the senior keeper', prompt: 'Bramble fears that accepting Lumi’s evidence will weaken tradition. What should he argue?', options: [
      { line: '“A rule without a reason is safer than a question.”', result: 'Lumi asks whether safety comes from repetition or from understanding the danger.' },
      { line: '“Your clues are interesting, but they do not prove the lantern will fail.”', result: 'Lumi must separate what the evidence proves from what it merely suggests.' },
      { line: '“If we change one signal, every tradition could disappear.”', result: 'The council considers whether improving one rule truly threatens every custom.' }
    ]},
    mistake: { summary: 'Lumi proved that Bramble secretly removed the fireflies to control the council.', options: ['The fireflies moved themselves to warn the garden', 'Bramble had already repaired the lantern', 'The moths created the silver dust'], correct: 0 },
    whatIf: { question: 'If Lumi’s hypothesis had been wrong, would recording the evidence still have value?', options: ['Yes, evidence can reveal mistakes and support a better explanation', 'No, incorrect hypotheses make all observations useless'], correct: 0, explanation: 'A hypothesis is meant to be tested. Careful records remain useful even when the first explanation changes.' }
  },
  {
    id: 'mila', tier: 'Grade 6-7', chapter: 'Case File 02', title: 'Mila and the Stormline Challenge',
    subtitle: 'A damaged design. A rival team. A storm hiding an opportunity.', theme: 'resilience and ethical competition', interest: 'Adventure',
    image: '/stories/mila-kite.png', alt: 'Mila repairing a red kite in an attic during a storm',
    paragraphs: [
      'Mila discovered a crimson kite blueprint inside her grandmother’s workshop. The design described an aerodynamic wing that could remain stable in unpredictable wind. She entered it in the Stormline Challenge, where teams launched instruments to measure air quality above the city. During practice, however, a sudden gust tore the fragile sail. Her rival, Theo, offered to sell her his spare design, but accepting would mean abandoning her grandmother’s unfinished idea.',
      'Instead, Mila treated the failure as information. She examined the trajectory recorded by her phone and noticed that the kite twisted seconds before the sail ripped. The wooden frame was resilient, but one joint transferred too much pressure into the paper. Mila built a smaller prototype from recycled fabric and moved the joint closer to the center. Her first adjustment made the kite spin. The second kept it level but prevented it from climbing.',
      'The night before the challenge, the weather forecast predicted stronger wind. Theo suggested postponing the event, yet the organizers refused because the measuring equipment was needed immediately. Mila proposed that the teams combine their designs: Theo’s flexible tail could stabilize her reinforced wing. Theo hesitated. If their shared kite succeeded, neither team would win alone. If it failed, both teams would lose their instruments.',
      'Mila argued that the competition’s real purpose was collecting data, not protecting individual credit. Theo finally agreed, but a connector snapped during assembly. With only minutes remaining, they had to improvise. Mila used a strip from the original crimson sail to secure the joint, while Theo recalibrated the sensor. Their hybrid kite rose unevenly, corrected its course, and then soared into the strongest layer of wind.',
      'The instrument returned with evidence of pollution moving from the industrial district toward several schools. The judges awarded both teams a shared innovation prize, but the discovery mattered more than the trophy. Mila preserved the torn piece of crimson sail in her journal. It represented neither failure nor victory by itself; it reminded her that resilient thinkers revise their plans without surrendering the purpose behind them.'
    ],
    words: [
      { word: 'aerodynamic', definition: 'shaped to move smoothly through air', choices: ['able to move smoothly through air', 'designed to remain underwater', 'too heavy to move'], correct: 0 },
      { word: 'fragile', definition: 'easily damaged or broken', choices: ['easily damaged', 'extremely flexible', 'impossible to replace'], correct: 0 },
      { word: 'trajectory', definition: 'the path followed by a moving object', choices: ['a path through space', 'a material’s strength', 'a weather prediction'], correct: 0 },
      { word: 'resilient', definition: 'able to recover after difficulty or damage', choices: ['able to recover', 'likely to disappear', 'unwilling to change'], correct: 0 },
      { word: 'prototype', definition: 'an early model used to test an idea', choices: ['a test version', 'a final award', 'an instruction manual'], correct: 0 },
      { word: 'recalibrated', definition: 'adjusted an instrument so it measured accurately', choices: ['adjusted for accuracy', 'decorated carefully', 'turned off permanently'], correct: 0 },
      { word: 'improvise', definition: 'create a solution using what is available', choices: ['adapt with available resources', 'follow an exact old plan', 'wait without acting'], correct: 0 },
      { word: 'innovation', definition: 'a useful new idea or method', choices: ['a useful new approach', 'a repeated mistake', 'an ancient rule'], correct: 0 }
    ],
    proveIt: [
      { question: 'What made the Stormline Challenge more than an ordinary kite contest?', options: ['The kites carried instruments that measured air quality', 'Every kite had to be crimson', 'The winner received Mila’s blueprint'], correct: 0, explanation: 'The competition served a real scientific purpose: collecting air-quality information.' },
      { question: 'How did Mila use the failed practice flight?', options: ['She analyzed its path and redesigned the weak joint', 'She copied Theo’s complete design', 'She replaced the kite without examining it'], correct: 0, explanation: 'Mila treated failure as evidence and changed a specific structural weakness.' },
      { question: 'Why did Theo hesitate to combine designs?', options: ['Sharing meant neither team could win alone', 'He believed the wind had disappeared', 'His kite did not have a tail'], correct: 0, explanation: 'Theo was balancing the shared mission against individual recognition.' },
      { question: 'What does “improvise” mean in the assembly scene?', options: ['Solve the problem with materials they had', 'Cancel the launch immediately', 'Repeat the broken design exactly'], correct: 0, explanation: 'They adapted the original sail and recalibrated the sensor under time pressure.' },
      { question: 'Why did the pollution data matter more than the trophy?', options: ['It identified a possible danger affecting schools', 'It proved crimson was the fastest color', 'It guaranteed Mila would never fail again'], correct: 0, explanation: 'The information could help protect people, fulfilling the challenge’s real purpose.' }
    ],
    villain: { character: 'Theo, the rival designer', prompt: 'Theo must decide whether competition matters more than the shared mission. What should he say?', options: [
      { line: '“If we cooperate, how will anyone know which idea was mine?”', result: 'Mila proposes documenting each contribution while keeping the mission first.' },
      { line: '“A shared success is better than two private failures.”', result: 'The teams immediately begin testing how their designs can work together.' },
      { line: '“Your design already failed once, so it has no value.”', result: 'Mila challenges the idea that a failed prototype cannot provide useful evidence.' }
    ]},
    mistake: { summary: 'Mila won by secretly copying Theo’s complete kite and hiding her damaged design.', options: ['They openly combined designs to complete a shared mission', 'Theo withdrew before the launch', 'The organizers cancelled the challenge'], correct: 0 },
    whatIf: { question: 'If Mila’s first prototype had flown perfectly, what important learning might have been lost?', options: ['She might not have discovered how the joint handled pressure', 'She would have forgotten what a kite was'], correct: 0, explanation: 'The failed tests revealed information that helped Mila build a safer, more resilient design.' }
  },
  {
    id: 'nova', tier: 'Grade 8', chapter: 'Case File 03', title: 'The Luminous Protocol',
    subtitle: 'A lunar anomaly. Conflicting orders. A decision that could reshape two worlds.', theme: 'responsibility and informed consensus', interest: 'Space',
    image: '/stories/nova-orion.png', alt: 'Nova and Orion investigating a glowing crystal inside a moon rover',
    paragraphs: [
      'Nova and Orion discovered a luminous crystal beneath the Shackleton crater observatory. The object released enough energy to power the lunar settlement for a decade, but its surface pulsed whenever their equipment approached. Mission Control ordered them to retrieve it immediately. Nova considered the signal an anomaly worth investigating. Orion argued that delaying the mission could leave hundreds of residents without reliable power during the approaching lunar night.',
      'They scanned the chamber and discovered a network of microscopic crystals extending deep beneath the crater. Removing the visible crystal might trigger a chain reaction through the entire formation. The evidence was incomplete: the network could be a volatile geological system, or it could simply respond harmlessly to heat. Nova wanted forty-eight hours for additional tests. Orion believed the settlement could not afford that delay.',
      'Their disagreement intensified when Mission Control repeated the retrieval order without addressing the new evidence. Orion prepared the containment case, while Nova blocked the rover’s mechanical arm. Neither explorer had the authority to overrule the other. They reviewed the emergency protocol and found a neglected clause: when new evidence revealed an unknown danger, the field team could request an independent scientific panel before proceeding.',
      'Nova transmitted the scans while Orion explained the settlement’s urgent energy needs. The panel reached a consensus that balanced both concerns. Instead of removing the central crystal, the explorers would collect energy from its outer field for one hour while monitoring the network. The cautious trial produced less power than retrieval would have, but it revealed that the deeper crystals reacted strongly whenever energy extraction accelerated.',
      'Mission Control cancelled the original order and established a protected research zone around the crater. The settlement activated older solar reserves while engineers studied safer ways to use the field. Orion admitted that urgency had narrowed his attention; Nova acknowledged that endless testing could also carry consequences. Their decision did not deliver an effortless solution. It created something more valuable: a safeguard that allowed progress without pretending uncertainty had disappeared.'
    ],
    words: [
      { word: 'luminous', definition: 'producing or reflecting a bright light', choices: ['giving off light', 'absorbing every sound', 'moving at great speed'], correct: 0 },
      { word: 'anomaly', definition: 'something that differs from what is normally expected', choices: ['an unusual result', 'a scheduled event', 'a proven explanation'], correct: 0 },
      { word: 'volatile', definition: 'likely to change suddenly or become dangerous', choices: ['unstable or unpredictable', 'completely harmless', 'ancient and valuable'], correct: 0 },
      { word: 'protocol', definition: 'an official set of rules for handling a situation', choices: ['an agreed procedure', 'a scientific instrument', 'a personal opinion'], correct: 0 },
      { word: 'clause', definition: 'a particular section of a rule or agreement', choices: ['a section of a rule', 'a type of crystal', 'a spoken warning'], correct: 0 },
      { word: 'consensus', definition: 'general agreement reached by a group', choices: ['shared agreement', 'a divided argument', 'an individual order'], correct: 0 },
      { word: 'accelerated', definition: 'increased in speed or rate', choices: ['became faster', 'stopped entirely', 'grew quieter'], correct: 0 },
      { word: 'safeguard', definition: 'a measure designed to prevent harm', choices: ['a protective measure', 'an energy source', 'a secret instruction'], correct: 0 }
    ],
    proveIt: [
      { question: 'What central conflict appears in the first section?', options: ['Immediate energy needs conflict with investigating an unknown risk', 'Nova and Orion disagree about who discovered the crater', 'Mission Control refuses to communicate with the explorers'], correct: 0, explanation: 'The explorers must weigh urgent benefits against uncertain danger.' },
      { question: 'Why could removing one crystal affect more than the visible object?', options: ['It was connected to a larger underground network', 'It controlled every rover on the moon', 'Its light attracted other crystals from space'], correct: 0, explanation: 'The scans revealed a connected formation beneath the chamber.' },
      { question: 'How did the neglected protocol clause change their options?', options: ['It allowed an independent review of the new danger', 'It gave Orion sole authority', 'It required immediate retrieval'], correct: 0, explanation: 'The clause created a legitimate alternative to obeying or refusing the order alone.' },
      { question: 'What did the cautious trial reveal?', options: ['Faster extraction caused a strong reaction below', 'The crystal contained no usable energy', 'The settlement already had unlimited power'], correct: 0, explanation: 'Monitoring showed that acceleration increased the response in the deeper network.' },
      { question: 'What does the ending suggest about responsible decisions?', options: ['They balance progress, evidence, urgency, and uncertainty', 'They remove every possible risk before acting', 'They always follow the first order given'], correct: 0, explanation: 'The safeguard allowed limited progress without ignoring incomplete knowledge.' }
    ],
    villain: { character: 'Mission Control', prompt: 'Mission Control values speed and certainty. Which order creates the strongest ethical conflict?', options: [
      { line: '“Retrieve it now. The settlement needs results, not questions.”', result: 'The explorers must decide whether urgent need justifies acting on incomplete evidence.' },
      { line: '“Send the new scans and wait for an independent review.”', result: 'The conflict eases because the order now accounts for the newly discovered risk.' },
      { line: '“Abandon the crater permanently without collecting any data.”', result: 'Nova questions whether avoiding every uncertainty is responsible either.' }
    ]},
    mistake: { summary: 'Nova and Orion removed the crystal immediately, proving that Mission Control’s first order was completely safe.', options: ['They tested limited extraction and discovered evidence of risk', 'The crystal never produced energy', 'They ignored both the panel and Mission Control'], correct: 0 },
    whatIf: { question: 'If the settlement had abundant backup power, how would the decision change?', options: ['There would be less reason to accept immediate risk', 'The underground network would automatically become safe'], correct: 0, explanation: 'More backup power would reduce urgency, but it would not change the scientific uncertainty itself.' }
  }
]
