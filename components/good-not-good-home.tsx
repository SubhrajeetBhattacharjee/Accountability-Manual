'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  ArrowRight, Check, ChevronRight, Copy, Menu, X, Share2,
  Info, Music, VolumeX, Mail, Phone, Heart, Sun, Moon,
} from 'lucide-react'
import {
  categoryHeat, heatLegend, lessons, newsLinks, safetyFacts,
  scenarios, sourceNote, takeaways, laws, quotes, helplines,
} from '@/lib/good-not-good-data'

const brandName = 'The Accountability Manual'
// Simulated pledge count - starts high so it feels real, increments locally on sign

function Logo() {
  return (
    <a href="#top" className="brand-mark" aria-label={`${brandName} home`}>
      {brandName}
    </a>
  )
}

/* ── SCROLL PROGRESS BAR ───────────────────────────────────────── */
function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setPct(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ width: `${pct}%` }} />
    </div>
  )
}

/* ── QUIZ ──────────────────────────────────────────────────────── */
const quizQuestions = [
  {
    eyebrow: 'SITUATION 1 OF 4',
    question: 'You are making out with a woman and she suddenly goes quiet and stiffens up.',
    options: [
      { label: 'Stop immediately', detail: 'Check in, give her space, put her comfort first.', lessonRef: null },
      { label: 'Keep going slowly', detail: 'Wait for her to verbally tell you to stop.', lessonRef: 'Lesson 01: Understanding Consent' },
      { label: 'Ask, but keep your hands where they are', detail: "Ask what's wrong without actually pausing.", lessonRef: 'Lesson 01: Understanding Consent' },
    ],
    bestIndex: 0,
  },
  {
    eyebrow: 'SITUATION 2 OF 4',
    question: 'You see a man persistently bothering a woman on the subway. She looks tense and is avoiding eye contact with him.',
    options: [
      { label: 'Get physically involved', detail: 'Yell at the man to back off - escalate if needed.', lessonRef: 'Lesson 03: Bystander Intervention' },
      { label: 'Create a low-key distraction', detail: 'Sit beside the woman and start a friendly, unrelated chat with her.', lessonRef: null },
      { label: 'Mind your business', detail: 'Assume they probably know each other and scroll your phone.', lessonRef: 'Lesson 03: Bystander Intervention' },
    ],
    bestIndex: 1,
  },
  {
    eyebrow: 'SITUATION 3 OF 4',
    question: 'Your buddy shares a non-consensual explicit image of a woman in your group chat.',
    options: [
      { label: 'Delete it silently', detail: 'Delete your copy, but say nothing to avoid drama.', lessonRef: 'Lesson 04: Calling Out Your Friends' },
      { label: 'Screenshot it for evidence', detail: 'Save it just in case you need to show it was him.', lessonRef: 'Lesson 04: Calling Out Your Friends' },
      { label: 'Call it out and delete it', detail: 'Tell him directly it is not okay, then delete your copy.', lessonRef: null },
    ],
    bestIndex: 2,
  },
  {
    eyebrow: 'SITUATION 4 OF 4',
    question: 'A female friend tells you about a really scary encounter she just had with a stranger.',
    options: [
      { label: 'Defend the other gender', detail: "Remind her 'not all men' are like that so she doesn't generalize.", lessonRef: 'Lesson 06: Emotional Labor' },
      { label: 'Listen and validate her', detail: 'Listen without interrupting, validate what she felt, ask how you can help.', lessonRef: null },
      { label: 'Get visibly angry', detail: 'Get so angry on her behalf that she ends up comforting you.', lessonRef: 'Lesson 06: Emotional Labor' },
    ],
    bestIndex: 1,
  },
]

function ScenarioDemo() {
  const [step, setStep] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [recommendedLessons, setRecommendedLessons] = useState<string[]>([])
  const [done, setDone] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const currentQ = quizQuestions[step]

  const handleAnswer = (optionIndex: number, lessonRef: string | null) => {
    if (answered) return
    setChosen(optionIndex)
    setAnswered(true)
    if (lessonRef && !recommendedLessons.includes(lessonRef)) {
      setRecommendedLessons(prev => [...prev, lessonRef])
    }
  }

  const next = () => {
    if (step < quizQuestions.length - 1) {
      setStep(s => s + 1)
      setChosen(null)
      setAnswered(false)
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      setDone(true)
    }
  }

  const reset = () => {
    setStep(0)
    setChosen(null)
    setAnswered(false)
    setRecommendedLessons([])
    setDone(false)
  }

  const shareResult = async () => {
    const text = recommendedLessons.length > 0
      ? `I just tested my accountability instincts at The Accountability Manual. Here's what I'm working on: ${recommendedLessons.join(', ')}. Challenge yourself too:`
      : `I just completed The Accountability Manual quiz with a perfect score! Learn about consent, respect & bystander intervention:`
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: 'My Accountability Score', text, url }).catch(() => {})
    } else {
      await navigator.clipboard.writeText(`${text} ${url}`)
      alert('Result copied to clipboard!')
    }
  }

  return (
    <section id="scenarios" className="demo-section" aria-labelledby="demo-heading" ref={sectionRef}>
      <div className="demo-layout page-wrap">
        <div className="demo-intro">
          <span className="section-kicker">A PRACTICAL EXERCISE</span>
          <h2 id="demo-heading">The answer is<br /><em>in the pause.</em></h2>
          <p>Good judgment starts with noticing the nuances of a situation. No answer shown until you choose.</p>
          {!done && (
            <div className="quiz-timeline" aria-label="Quiz progress">
              {quizQuestions.map((_, i) => (
                <div key={i} className={`quiz-step ${i < step ? 'done' : i === step ? 'active' : 'upcoming'}`}>
                  <div className="quiz-dot">
                    {i < step ? <Check size={12} /> : <span>{i + 1}</span>}
                  </div>
                  {i < quizQuestions.length - 1 && <div className="quiz-line" />}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="demo-card">
          {done ? (
            <div className="demo-result animate-fade-in">
              <div className="result-title">
                <span className="result-mark"><Check /></span>
                <span>Self-Reflection Complete</span>
              </div>
              {recommendedLessons.length > 0 ? (
                <>
                  <p>Based on your responses, a few lessons could sharpen your instincts.</p>
                  <div className="recommended-lessons">
                    <span className="rec-label">Start with:</span>
                    {recommendedLessons.map((lesson, idx) => (
                      <a href="#learn" key={idx} className="recommended-pill">
                        {lesson} <ArrowRight size={14} />
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p>Excellent instincts. You navigated all four situations with real care.</p>
                  <span className="result-note">You already have a strong foundation in respecting boundaries and agency.</span>
                </>
              )}
              <div className="result-actions">
                <button type="button" className="primary-button" onClick={shareResult}>
                  Share my result <Share2 size={15} />
                </button>
                <button type="button" className="text-button" onClick={reset}>
                  Take it again <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ) : (
            <div key={step} className="animate-fade-in">
              <div className="demo-question">
                <span className="eyebrow">{currentQ.eyebrow}</span>
                <h3>{currentQ.question}</h3>
              </div>
              <div className="quiz-options">
                {currentQ.options.map((opt, i) => {
                  const isChosen = chosen === i
                  const isBest = answered && i === currentQ.bestIndex
                  const isWrong = answered && isChosen && i !== currentQ.bestIndex
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`quiz-option ${answered ? 'answered' : ''} ${isBest ? 'best' : ''} ${isWrong ? 'wrong' : ''} ${isChosen ? 'chosen' : ''}`}
                      onClick={() => handleAnswer(i, opt.lessonRef)}
                      disabled={answered}
                    >
                      <span className="quiz-option-marker">
                        {answered
                          ? (isBest ? <Check size={13} /> : isWrong ? <X size={13} /> : null)
                          : String.fromCharCode(65 + i)}
                      </span>
                      <span className="quiz-option-text">
                        <strong>{opt.label}</strong>
                        {answered && <span>{opt.detail}</span>}
                      </span>
                    </button>
                  )
                })}
              </div>
              {answered && (
                <div className="quiz-feedback animate-fade-in">
                  {chosen === currentQ.bestIndex
                    ? <p><strong className="text-green">Great instinct.</strong> That's the most considered response - it centres her safety and dignity.</p>
                    : <p><strong className="text-red">Worth reflecting on.</strong> {currentQ.options[currentQ.bestIndex].detail}</p>
                  }
                  <button type="button" className="primary-button" onClick={next} style={{ marginTop: '16px' }}>
                    {step < quizQuestions.length - 1 ? 'Next situation' : 'See my results'} <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ── PLEDGE SECTION ────────────────────────────────────────────── */
function PledgeSection() {
  const [signed, setSigned] = useState(false)
  const [name, setName] = useState('')
  const [pledgeCount, setPledgeCount] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)

  // Fetch real-time count on mount
  useEffect(() => {
    fetch('/api/pledge')
      .then(res => res.json())
      .then(data => setPledgeCount(data.count))
      .catch(() => setPledgeCount(0))
  }, [])

  const commitments = [
    'I will listen without centering myself.',
    'I will speak up when I see something wrong.',
    'I will keep learning and stay open to being corrected.',
    'I will hold myself accountable - not just others.',
  ]

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setAnimating(true)
    try {
      const res = await fetch('/api/pledge', { method: 'POST' })
      const data = await res.json()
      setTimeout(() => {
        setSigned(true)
        setPledgeCount(data.count)
        setAnimating(false)
      }, 600)
    } catch {
      // Fallback if API fails
      setTimeout(() => {
        setSigned(true)
        setPledgeCount(c => (c || 0) + 1)
        setAnimating(false)
      }, 600)
    }
  }

  const shareText = `I just signed The Accountability Manual pledge. Join me in committing to listening, speaking up, and learning:`
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://theaccountabilitymanual.com'
  
  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
    alert('Copied! Paste it anywhere to share.')
  }

  return (
    <section className="pledge-section" aria-labelledby="pledge-heading">
      <div className="page-wrap pledge-inner">
        <div className="pledge-left">
          <span className="section-kicker">THE PLEDGE</span>
          <h2 id="pledge-heading">Words mean nothing<br /><em>without a commitment.</em></h2>
          <p>Reading is not enough. Sign your name below and join {pledgeCount !== null ? (pledgeCount === 0 ? 'the movement of people' : `${pledgeCount.toLocaleString()} others`) : 'others'} who have committed to doing better - every day.</p>
          <div className={`pledge-counter ${animating ? 'counter-bump' : ''}`}>
            <Heart size={18} fill="currentColor" />
            <span><strong>{pledgeCount !== null ? pledgeCount.toLocaleString() : '...'}</strong> people have signed</span>
          </div>
        </div>

        <div className="pledge-right">
          <div className="pledge-commitments">
            {commitments.map((c, i) => (
              <div key={i} className={`pledge-item ${signed ? 'pledge-signed' : ''}`}>
                <span className="pledge-check"><Check size={13} /></span>
                <span>{c}</span>
              </div>
            ))}
          </div>

          {!signed ? (
            <form onSubmit={handleSign} className="pledge-form">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your first name"
                required
                className="pledge-input"
                aria-label="Your name"
                maxLength={40}
              />
              <button type="submit" className="primary-button pledge-btn" disabled={animating}>
                {animating ? 'Signing…' : <>Sign the pledge <Heart size={15} /></>}
              </button>
            </form>
          ) : (
            <div className="pledge-thankyou animate-fade-in">
              <div className="pledge-signed-name">Signed by {name} ✓</div>
              <p>Thank you. Your commitment matters. Share this with someone who needs to see it.</p>
              <div className="share-buttons-row">
                <a href={shareLinks.whatsapp} target="_blank" rel="noreferrer" className="secondary-button" aria-label="Share on WhatsApp">
                  WhatsApp
                </a>
                <a href={shareLinks.x} target="_blank" rel="noreferrer" className="secondary-button" aria-label="Share on X (Twitter)">
                  X
                </a>
                <a href={shareLinks.facebook} target="_blank" rel="noreferrer" className="secondary-button" aria-label="Share on Facebook">
                  Facebook
                </a>
                <button type="button" className="secondary-button" onClick={copyLink} aria-label="Copy link">
                  <Copy size={15} /> Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ── MAIN COMPONENT ────────────────────────────────────────────── */
export default function GoodNotGoodHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Persist dark mode preference
  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved === 'true') setDarkMode(true)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', String(darkMode))
  }, [darkMode])

  const toggleAudio = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isAudioPlaying) {
      audio.pause()
      setIsAudioPlaying(false)
    } else {
      audio.play().then(() => setIsAudioPlaying(true)).catch(() => {})
    }
  }, [isAudioPlaying])

  const scenario = scenarios[scenarioIndex]

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({
        title: 'The Accountability Manual',
        text: 'A practical guide on consent, boundaries, and bystander intervention.',
        url,
      }).catch(() => {})
    } else {
      await navigator.clipboard.writeText(url)
      alert('Link copied!')
    }
  }

  const handleNewsletter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setNewsletterStatus('submitting')
    const formData = new FormData(e.currentTarget)
    
    try {
      // Decode email at runtime to prevent simple bot scraping
      const target = atob('c3ViaHJhamVldGJoYXR0YWNoYXJqZWUwNUBnbWFpbC5jb20=')
      const res = await fetch(`https://formsubmit.co/ajax/${target}`, {
        method: 'POST',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.get('email'), _captcha: 'false' })
      })
      
      if (res.ok) {
        setNewsletterStatus('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        setNewsletterStatus('error')
      }
    } catch {
      setNewsletterStatus('error')
    }
  }

  return (
    <div id="top" className="site-shell">
      <ScrollProgress />

      <header className="site-header">
        <div className="page-wrap header-inner">
          <Logo />
          <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
            <a href="#learn" onClick={() => setMenuOpen(false)}>Lessons</a>
            <a href="#scenarios" onClick={() => setMenuOpen(false)}>Quiz</a>
            <a href="#daily" onClick={() => setMenuOpen(false)}>Scenarios</a>
            <a href="#pledge" onClick={() => setMenuOpen(false)}>Pledge</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#learn" className="nav-cta" onClick={() => setMenuOpen(false)}>Begin <ArrowRight size={14} /></a>
          </nav>
          <div className="header-end">
            <button
              type="button"
              onClick={() => setDarkMode(d => !d)}
              className="icon-toggle"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              type="button"
              onClick={toggleAudio}
              className="icon-toggle"
              aria-label={isAudioPlaying ? 'Pause music' : 'Play ambient music'}
              title={isAudioPlaying ? 'Pause music' : 'Play ambient music'}
            >
              {isAudioPlaying ? <Music size={16} /> : <VolumeX size={16} />}
            </button>
            <button
              type="button"
              className="menu-button"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ── HERO ── */}
        <section className="hero page-wrap">
          <div className="hero-copy">
            <span className="eyebrow">A GUIDE FOR EVERYONE</span>
            <h1>Creating a safer<br /><em>world for women.</em></h1>
            <p>Clear, practical lessons on consent, boundaries, bystander intervention, and how to actively practise respect in everyday life.</p>
            <div className="hero-actions">
              <a href="#learn" className="primary-button">Read the first lesson <ArrowRight size={15} /></a>
              <a href="#scenarios" className="secondary-button">Test your judgment</a>
              <button onClick={handleShare} className="secondary-button icon-btn" aria-label="Share this page">
                <Share2 size={17} />
              </button>
            </div>
            <span className="quiet-note">Non-provocative, healthy learning. No account required.</span>
          </div>
          <div className="hero-art">
            <img
              src="/images/editorial-boundaries.png"
              alt="Two people seated apart, considering a respectful boundary"
            />
          </div>
        </section>

        {/* ── QUIZ ── */}
        <ScenarioDemo />

        {/* ── LESSONS ── */}
        <section id="learn" className="learn-section page-wrap">
          <div className="section-heading">
            <div>
              <span className="section-kicker">THE FOUNDATION</span>
              <h2>Start with what matters.</h2>
              <p>Essential learning on consent, respect, and intervention.</p>
            </div>
            <a href="#learn" className="inline-link">View all <ChevronRight size={15} /></a>
          </div>
          <div className="lesson-list">
            {lessons.map((lesson) => (
              <a className="lesson-row" href="#daily" key={lesson.number}>
                <span className="lesson-number">{lesson.number}</span>
                <span className="lesson-main">
                  <strong>{lesson.title}</strong>
                  <span className="lesson-cat">{lesson.category}</span>
                </span>
                <span className="lesson-duration">{lesson.duration}</span>
                <ChevronRight size={17} className="lesson-arrow" />
              </a>
            ))}
          </div>
        </section>

        {/* ── SCENARIOS ── */}
        <section id="daily" className="scenario-section">
          <div className="page-wrap scenario-inner">
            <div className="scenario-copy">
              <div>
                <span className="section-kicker">SCENARIO {String(scenarioIndex + 1).padStart(2, '0')} / {scenarios.length}</span>
                <h2>{scenario.eyebrow}</h2>
                <p>{scenario.title}</p>
              </div>
              <div className="scenario-img-wrap">
                <img src={scenario.image} alt={scenario.title} />
              </div>
            </div>

            <div className="scenario-card">
              <div>
                <span className="section-kicker">A PRACTICAL QUESTION</span>
                <h3>{scenario.questions[0].prompt}</h3>
              </div>
              <div className="scenario-answer">
                <div className="answer-block answer-block--good">
                  <span className="answer-label answer-good"><Check size={14} /> CONSIDERED RESPONSE</span>
                  <p>{scenario.questions[0].good}</p>
                </div>
                <div className="answer-block answer-block--bad">
                  <span className="answer-label answer-bad"><X size={14} /> WHAT TO AVOID</span>
                  <p>{scenario.questions[0].notGood}</p>
                </div>
              </div>
              <div className="scenario-followups">
                <h4>Further considerations</h4>
                {scenario.questions.slice(1).map((question) => (
                  <div className="scenario-followup" key={question.prompt}>
                    <span>{question.prompt}</span>
                    <div>
                      <p><strong className="text-green">Better:</strong> {question.good}</p>
                      <p><strong className="text-red">Harmful:</strong> {question.notGood}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="scenario-moral-box">
                <span className="section-kicker">THE LESSON</span>
                <p>{scenario.moral}</p>
                <div className="scenario-personal">
                  <span className="section-kicker">MAKE IT PERSONAL</span>
                  <p>{scenario.familyExample}</p>
                </div>
              </div>
              <button
                type="button"
                className="primary-button scenario-next-btn"
                onClick={() => {
                  setScenarioIndex((scenarioIndex + 1) % scenarios.length)
                  document.getElementById('daily')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Next situation <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>

        {/* ── EVIDENCE ── */}
        <section className="evidence-section page-wrap" aria-labelledby="evidence-heading">
          <div className="section-heading">
            <div>
              <span className="section-kicker kicker-live">
                <span className="live-dot" />
                LIVE TRACKING: THE HUMAN COST
              </span>
              <h2 id="evidence-heading">Numbers are people.</h2>
              <p>Registered crime data gives scale. These are real, documented cases.</p>
            </div>
          </div>
          <div className="fact-grid">
            {safetyFacts.map((fact) => (
              <article className="fact-card" key={fact.label}>
                <strong>{fact.value}</strong>
                <p>{fact.label}</p>
                <small>{fact.source}</small>
              </article>
            ))}
          </div>
          <p className="source-note">{sourceNote}</p>
          <div className="news-panel">
            <div>
              <span className="section-kicker">READ THE RECORD</span>
              <h3>Stay informed without turning suffering into spectacle.</h3>
            </div>
            <div className="news-list">
              {newsLinks.map((item) => (
                <a href={item.href} target="_blank" rel="noreferrer" key={item.title}>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.source}</small>
                  </span>
                  <ChevronRight size={17} />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── HEATMAP ── */}
        <section className="heatmap-section" aria-labelledby="heatmap-heading">
          <div className="page-wrap">
            <div className="section-heading">
              <div>
                <span className="section-kicker">INTERACTIVE ATTENTION MAP</span>
                <h2 id="heatmap-heading">Notice where harm gathers.</h2>
                <p>Tap or hover over the cells to explore actionable tips and context.</p>
              </div>
            </div>
            <div className="heatmap" role="img" aria-label="Heatmap showing attention levels across safety categories">
              {categoryHeat.map((row) => (
                <div className="heatmap-row" key={row.category}>
                  <strong>{row.category}</strong>
                  <div className="heatmap-cells">
                    {row.values.map((valObj, index) => (
                      <div className="heatmap-tooltip-container" key={`${row.category}-${index}`} tabIndex={0}>
                        <span className={`heat-cell heat-${valObj.level}`} aria-label={`${row.category}, level ${valObj.level}: ${valObj.tip}`} />
                        <div className="heatmap-tooltip">{valObj.tip}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="heat-legend">
              {heatLegend.map((item, index) => (
                <span key={item}><i className={`heat-cell heat-${index + 1}`} />{item}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── LAWS ── */}
        <section className="laws-section page-wrap" aria-labelledby="laws-heading">
          <div className="section-heading">
            <div>
              <span className="section-kicker">KNOW THE LAW</span>
              <h2 id="laws-heading">Legal protections in India.</h2>
              <p>Ignorance is not an excuse. Educate yourself on the frameworks that protect women.</p>
            </div>
          </div>
          <div className="laws-grid">
            {laws.map((law) => (
              <article key={law.title} className="law-card">
                <span className="law-icon"><Info size={18} /></span>
                <div>
                  <h3>{law.title}</h3>
                  <p>{law.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── HELPLINES ── */}
        <section className="helplines-section page-wrap" aria-labelledby="helplines-heading">
          <div className="section-heading">
            <div>
              <span className="section-kicker">IF YOU NOTICE SOMETHING</span>
              <h2 id="helplines-heading">Emergency contact numbers.</h2>
              <p>Be a proactive bystander. If you see someone in distress, these are the numbers to call.</p>
            </div>
          </div>
          <div className="helplines-grid">
            {helplines.map((helpline) => (
              <a href={`tel:${helpline.number}`} key={helpline.number} className="helpline-card">
                <div className="helpline-top">
                  <Phone size={20} />
                  <span className="helpline-number">{helpline.number}</span>
                </div>
                <h3>{helpline.name}</h3>
                <p>{helpline.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* ── QUOTES ── */}
        <section className="quotes-section page-wrap" aria-labelledby="quotes-heading">
          <div className="section-heading">
            <div>
              <span className="section-kicker">WISDOM</span>
              <h2 id="quotes-heading">Voices that guide us.</h2>
            </div>
          </div>
          <div className="quotes-list">
            {quotes.map((quote, idx) => (
              <blockquote key={idx}>
                <p>"{quote.text}"</p>
                <footer>- {quote.author}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* ── TAKEAWAYS ── */}
        <section id="about" className="takeaway-section page-wrap">
          <div className="section-heading">
            <div>
              <span className="section-kicker">KEEP THIS CLOSE</span>
              <h2>Three things worth remembering.</h2>
            </div>
            <Copy aria-hidden="true" size={20} />
          </div>
          <div className="takeaway-grid">
            {takeaways.map((takeaway) => (
              <article className="takeaway-card" key={takeaway.title}>
                <span className="takeaway-mark">/</span>
                <h3>{takeaway.title}</h3>
                <p>{takeaway.detail}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── PLEDGE ── */}
        <PledgeSection />

        {/* ── NEWSLETTER ── */}
        <section className="newsletter-section page-wrap" aria-labelledby="newsletter-heading">
          <div className="newsletter-inner">
            <div className="newsletter-icon"><Mail size={34} /></div>
            <h2 id="newsletter-heading">Stay informed. Stay positive.</h2>
            <p>
              Join our community to receive daily bite-sized knowledge drops, uplifting reminders from women who changed the world, and early access to upcoming learning events.
            </p>
            {newsletterStatus === 'success' ? (
              <div className="newsletter-success">
                <Check size={22} />
                <span>You&apos;re in! Expect something good in your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="newsletter-form">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  required
                  className="newsletter-input"
                  aria-label="Email address"
                />
                <button type="submit" className="primary-button" disabled={newsletterStatus === 'submitting'}>
                  {newsletterStatus === 'submitting' ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
            )}
            {newsletterStatus === 'error' && (
              <p className="newsletter-error">Something went wrong. Please try again.</p>
            )}
            <span className="newsletter-note">No spam. No guilt trips. Unsubscribe anytime.</span>
          </div>
        </section>
      </main>

      {/* Music - drop your file at /public/music/ambient.mp3 */}
      <audio ref={audioRef} loop src="/music/ambient.mp3" preload="none" />

      <footer className="site-footer">
        <div className="page-wrap footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Logo />
            <span className="footer-tagline">Made for the moments that matter.</span>
          </div>
          <a href="#top" className="inline-link" style={{ fontSize: '14px' }}>Back to top ↑</a>
        </div>
      </footer>
    </div>
  )
}
