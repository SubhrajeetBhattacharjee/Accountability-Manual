export type QuizOption = { text: string; score: number }

export type Lesson = {
  number: string
  title: string
  duration: string
  category: string
  completed?: boolean
  summary: string
  image: string
  read: string
  prompt: string
  options: QuizOption[]
  lesson: string
}

export const lessons: Lesson[] = [
  { number: '01', title: 'Understanding Consent', duration: '5 min', category: 'Consent', completed: true, summary: 'Consent is an enthusiastic yes, not just the absence of a no.', image: '/images/scenario-consent.jpg', read: 'Consent must be free, informed, and ongoing. It cannot be coerced through persistence, guilt, or fear. Silence is not consent. Drunkenness removes the ability to give consent.', prompt: 'You and your partner are making out, but she suddenly goes quiet and stops actively responding. What do you do?', options: [{ text: 'Stop immediately, ask if she is okay, and step back to give her space.', score: 2 }, { text: 'Keep going slowly and wait for her to tell you to stop if she wants to.', score: 0 }, { text: 'Ask her why she is ruining the mood.', score: 0 }], lesson: 'Consent is ongoing. If enthusiasm or active participation stops, you stop. Always.' },
  { number: '02', title: 'Handling Rejection', duration: '4 min', category: 'Respect', completed: true, summary: 'A "No" is a complete sentence. Learn to accept it with grace.', image: '/images/scenario-rejection.jpg', read: 'Rejection can sting your ego, but it does not make the other person cruel or indebted to you. Women do not owe you their time, attention, or an explanation.', prompt: 'You offer to buy a woman a drink at a bar and she politely declines. What is your next move?', options: [{ text: 'Smile, say "Have a good night," and walk away.', score: 2 }, { text: 'Ask her why, or offer a different drink to show you are persistent.', score: 0 }, { text: 'Call her stuck up to your friends loudly enough for her to hear.', score: 0 }], lesson: 'Accept rejection immediately and gracefully. Do not turn your disappointment into her problem.' },
  { number: '03', title: 'Bystander Intervention', duration: '5 min', category: 'Safety', summary: 'How to safely support a woman being harassed in public.', image: '/images/scenario-bystander.jpg', read: 'Men have a responsibility to call out harassment. But bystander intervention doesn\'t always mean a physical confrontation. Sometimes the safest way to help is to de-escalate by ignoring the harasser and engaging the targeted woman.', prompt: 'You see a guy repeatedly bothering a woman on the subway who looks uncomfortable. What do you do?', options: [{ text: 'Sit next to her, pretend you know her, and start a friendly, unrelated conversation.', score: 2 }, { text: 'Yell at the guy to back off and prepare for a fight.', score: 0 }, { text: 'Mind your own business. It is not your problem.', score: 0 }], lesson: 'Direct confrontation can escalate danger. Creating a safe distraction or barrier is often more effective and protects the target.' },
  { number: '04', title: 'Calling Out Your Friends', duration: '4 min', category: 'Accountability', summary: 'Silence is complicity. How to challenge locker room talk.', image: '/images/scenario-calling-out.jpg', read: 'The culture that leads to assault starts with "jokes" and disrespect. When men let other men degrade women in conversations, it normalizes harm.', prompt: 'Your buddy shares a non-consensual explicit image of a woman in your group chat. What do you do?', options: [{ text: 'Tell him it is not cool, delete your copy, and tell him to delete it.', score: 2 }, { text: 'Just ignore it or mute the chat. You didn\'t send it.', score: 0 }, { text: 'Save it but tell him he shouldn\'t send those things.', score: 0 }], lesson: 'Do not be a link in the chain. Call out your friends even when it is uncomfortable.' },
  { number: '05', title: 'Respecting Personal Space', duration: '4 min', category: 'Boundaries', summary: 'Notice the physical signals that say someone needs room.', image: '/images/scenario-personal-space.jpg', read: 'Women are constantly navigating physical threats. A man\'s presence, even if well-intentioned, can feel threatening at night or in confined spaces.', prompt: 'You are walking home at night and realize you are walking close behind a woman on a dark street.', options: [{ text: 'Cross the street to walk on the other side, or slow down significantly to create distance.', score: 2 }, { text: 'Walk faster to pass her quickly so she knows you aren\'t following her.', score: 0 }, { text: 'Call out to her and say "Don\'t worry, I\'m a good guy!"', score: 0 }], lesson: 'Your intentions do not matter more than her feeling of safety. Proactively create distance.' },
  { number: '06', title: 'Emotional Labor', duration: '4 min', category: 'Partnership', summary: 'Support women without making them manage your emotions.', image: '/images/scenario-emotional-labor.jpg', read: 'When a woman shares a fear or an experience of harassment with you, do not center yourself or get defensive about "not all men".', prompt: 'A female friend tells you about a scary encounter she just had with a man. How do you respond?', options: [{ text: 'Listen, validate her feelings, and ask how you can support her right now.', score: 2 }, { text: 'Get visibly angry and promise to go find the guy and beat him up.', score: 0 }, { text: 'Tell her that you would never do something like that to reassure her.', score: 0 }], lesson: 'Replace rescuing with listening. Support means staying close while she keeps agency, without making it about you.' },
  { number: '07', title: 'Minding Your Own Business', duration: '3 min', category: 'Respect', summary: 'Everyone has the right to live their life without strangers judging them.', image: '/images/scenario-moral-policing.jpg', read: 'Moral policing is when people try to force their own rules on others. Just because you don\'t agree with what someone is doing doesn\'t mean you have the right to stop them or scare them.', prompt: 'You see a young couple holding hands in the park, and a group of angry older men start yelling at them to leave. What do you do?', options: [{ text: 'Step in calmly, tell the men to leave them alone, and help the couple leave safely.', score: 2 }, { text: 'Join the men because you think holding hands in public is wrong.', score: 0 }, { text: 'Just stand there and watch because it is entertaining.', score: 0 }], lesson: 'It is never our job to police other people\'s harmless choices. Let people live in peace.' },
  { number: '08', title: 'Clothes Are Not an Invitation', duration: '4 min', category: 'Boundaries', summary: 'A person\'s outfit is a personal choice, not a message for you.', image: '/images/scenario-clothing.jpg', read: 'What a woman wears is about her comfort and style. It is never an invitation, a "yes," or an excuse for bad behavior. Treat everyone with the same respect, no matter what they are wearing.', prompt: 'A woman walks into a cafe wearing a short dress, and your friend makes a rude comment about her "asking for attention." What do you do?', options: [{ text: 'Tell your friend, "That\'s not cool. What she wears is her business, not ours."', score: 2 }, { text: 'Laugh along so your friend doesn\'t feel embarrassed.', score: 0 }, { text: 'Stare at the woman to see what your friend is talking about.', score: 0 }], lesson: 'Respect is mandatory, regardless of clothing.' },
  { number: '09', title: 'Brains, Not Brawn', duration: '5 min', category: 'Partnership', summary: 'Equality isn\'t about physical strength; it\'s about treating minds as equals.', image: '/images/scenario-true-equality.jpg', read: 'Equality doesn\'t mean acting like a "tough guy" or showing off physical strength. True strength is cerebral-using your mind. Being equal means valuing someone else\'s voice and intelligence as much as your own.', prompt: 'You and a female classmate are assigned a project. She suggests a really smart idea that is different from yours. What do you do?', options: [{ text: 'Say, "That\'s a great idea, let\'s try it!" and work together.', score: 2 }, { text: 'Ignore her idea and do it your way because you want to be the boss.', score: 0 }, { text: 'Tell her that you\'ll handle the "hard work" and she can just decorate it.', score: 0 }], lesson: 'Real strength is working as a team and respecting someone else\'s intelligence.' },
]

export const safetyFacts = [
  { value: '31,516', label: 'rape cases registered in India in 2022', source: 'NCRB, Crime in India 2022' },
  { value: '86', label: 'registered cases per day from that annual figure', source: 'Calculated from NCRB 2022 data' },
  { value: '1', label: 'case is one person, one family, and one life affected', source: 'A reminder against reducing harm to a number' },
]
export const newsLinks = [
  { title: 'Crime in India reports and data', source: 'National Crime Records Bureau', href: 'https://ncrb.gov.in/crime-in-india-table-content' },
  { title: 'Women safety and support services', source: 'Government of India, Women and Child Development', href: 'https://www.india.gov.in/spotlight/one-stop-centre-scheme' },
  { title: 'Emergency support in India', source: 'Emergency Response Support System: 112', href: 'https://112.gov.in/' },
]
export const takeaways = [
  { title: 'NO MEANS STOP.', detail: 'Respecting a boundary is a basic duty, not a special favour.' },
  { title: 'PAIN IS NOT PERMISSION.', detail: 'Disappointment, jealousy, and anger never excuse intimidation or violence.' },
  { title: 'PROTECT DIGNITY.', detail: 'Treat strangers with the same care you would want for your own family.' },
]
export const sourceNote = 'The figures above describe registered cases, not the full incidence of violence. Under-reporting, access to justice, and changing reporting practices affect every comparison.'
export type ScenarioQuestion = {
  prompt: string
  good: string
  notGood: string
}

export type Scenario = {
  eyebrow: string
  title: string
  image: string
  questions: ScenarioQuestion[]
  moral: string
  familyExample: string
}

export const scenariosByCategory = lessons
export const scenarios: Scenario[] = lessons.map((lesson) => ({
  eyebrow: `${lesson.category.toUpperCase()} IN PRACTICE`,
  title: lesson.title,
  image: lesson.image,
  questions: [
    {
      prompt: lesson.prompt,
      good: lesson.options[0]?.text ?? 'Pause, listen, and make space for the other person.',
      notGood: lesson.options[1]?.text ?? 'Keep pushing until the other person gives in.',
    },
    {
      prompt: `What would this look like if it happened to someone you love?`,
      good: 'Choose the response that protects their dignity, safety, and agency.',
      notGood: 'Treat the situation as entertainment, gossip, or a test of loyalty.',
    },
    {
      prompt: `What is the safest next step after ${lesson.title.toLowerCase()}?`,
      good: lesson.lesson,
      notGood: 'React immediately, assume intent, or make the situation harder to leave.',
    },
  ],
  moral: lesson.lesson,
  familyExample: `Imagine this happening to your sibling, parent, cousin, or closest friend. The standard should not change because the person is someone else.`,
}))
export const categoryHeat = [
  { 
    category: 'Boundaries', 
    values: [
      { level: 2, tip: 'Respect physical space in public.' }, 
      { level: 3, tip: 'Avoid unwarranted comments.' }, 
      { level: 2, tip: 'Recognize signs of discomfort.' }, 
      { level: 4, tip: 'Never touch without permission.' }, 
      { level: 3, tip: 'Maintain professional boundaries.' }, 
      { level: 2, tip: 'Listen when someone says no.' }, 
      { level: 4, tip: 'Stop if she steps away.' }, 
      { level: 3, tip: 'Do not trap someone in conversation.' }, 
      { level: 2, tip: 'Give way on the sidewalk.' }
    ] 
  },
  { 
    category: 'Consent', 
    values: [
      { level: 5, tip: 'Consent is an enthusiastic yes.' }, 
      { level: 4, tip: 'Silence is not consent.' }, 
      { level: 5, tip: 'Drunkenness means no consent.' }, 
      { level: 3, tip: 'Consent can be revoked at any time.' }, 
      { level: 4, tip: 'Coercion is not consent.' }, 
      { level: 5, tip: 'Always ask, never assume.' }, 
      { level: 4, tip: 'Watch for non-verbal cues.' }, 
      { level: 5, tip: 'Respect a changed mind.' }, 
      { level: 4, tip: 'Prioritize her comfort over your ego.' }
    ] 
  },
  { 
    category: 'Digital harm', 
    values: [
      { level: 4, tip: 'Do not forward non-consensual images.' }, 
      { level: 5, tip: 'Call out friends who share bad content.' }, 
      { level: 3, tip: 'Do not harass in DMs.' }, 
      { level: 5, tip: 'Respect online privacy.' }, 
      { level: 4, tip: 'Do not pressure for photos.' }, 
      { level: 5, tip: 'Report abusive behavior.' }, 
      { level: 3, tip: 'Do not stalk online profiles.' }, 
      { level: 4, tip: 'Think before you comment.' }, 
      { level: 5, tip: 'Block and report toxic groups.' }
    ] 
  },
  { 
    category: 'Anger', 
    values: [
      { level: 3, tip: 'Process rejection peacefully.' }, 
      { level: 4, tip: 'Do not take it out on her.' }, 
      { level: 5, tip: 'Seek help if you cannot control anger.' }, 
      { level: 4, tip: 'Do not yell or intimidate.' }, 
      { level: 3, tip: 'Walk away when frustrated.' }, 
      { level: 5, tip: 'Violence is never the answer.' }, 
      { level: 4, tip: 'Do not break things to scare her.' }, 
      { level: 3, tip: 'Breathe and step back.' }, 
      { level: 5, tip: 'Take accountability for your emotions.' }
    ] 
  },
]
export const heatLegend = ['Low attention', 'Needs attention', 'High attention', 'Urgent care']

export const quotes = [
  { text: "Each time a woman stands up for herself, without knowing it possibly, without claiming it, she stands up for all women.", author: "Maya Angelou" },
  { text: "I know enough women who are completely patriarchal, who are totally anti-women... Patriarchy is a system, it is not a gender.", author: "Kamala Bhasin" },
  { text: "There is no limit to what we, as women, can accomplish.", author: "Michelle Obama" },
]

export const laws = [
  { title: "Section 354 IPC", description: "Criminalizes assault or criminal force to woman with intent to outrage her modesty. It covers unwanted physical contact and explicit propositions." },
  { title: "POSH Act, 2013", description: "The Prevention of Sexual Harassment (POSH) Act protects women from sexual harassment at their workplace and provides a redressal mechanism." },
  { title: "Section 354D IPC", description: "Criminalizes stalking, which includes following a woman, or monitoring her online activity without her consent." },
  { title: "Section 509 IPC", description: "Addresses words, gestures, or acts intended to insult the modesty of a woman. Harassment is punishable by law." },
]

export const helplines = [
  { name: "Women Helpline (All India)", number: "1091", description: "Toll-free 24/7 helpline for women in distress." },
  { name: "Domestic Abuse Helpline", number: "181", description: "Immediate emergency response for women facing violence." },
  { name: "National Cyber Crime", number: "1930", description: "Report cyber harassment, non-consensual image sharing, and online stalking." },
  { name: "Police Emergency", number: "112", description: "Pan-India single emergency number." }
]
