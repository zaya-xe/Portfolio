import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import Artefact from "../components/Artefact/Artefact";
import "./NudgeAI.scss";

// ---- the Nudge logo ----
import logo from "../assets/NudgeAI/Logo.svg";

// ---- fact card artwork ----
import factBg1 from "../assets/NudgeAI/bluefactbg1.svg";
import factBg2 from "../assets/NudgeAI/bluefactbg2.svg";
import factBg3 from "../assets/NudgeAI/bluefactbg3.svg";

// ---- the project's design artefacts ----
import competitive from "../assets/NudgeAI/Competitive Analysis.png";
import competitiveFull from "../assets/NudgeAI/Competitive Analysis-1.png";
import technology from "../assets/NudgeAI/Technology Research.png";
import technologyFull from "../assets/NudgeAI/Technology Research-1.png";
import affinityMap from "../assets/NudgeAI/Affinity Map.png";
import businessAssumptions from "../assets/NudgeAI/Business Assumptions.png";
import businessPriority from "../assets/NudgeAI/Business assumption prioritization.png";
import userAssumptions from "../assets/NudgeAI/User Assumptions.png";
import userPriority from "../assets/NudgeAI/User assumption prioritization.png";
import personaBeginner from "../assets/NudgeAI/Proto Persona - 1.png";
import personaExpert from "../assets/NudgeAI/Proto Persona - 2.png";
import earlyCanvas from "../assets/NudgeAI/Early Lean UX Canvas.png";
import strategyCanvas from "../assets/NudgeAI/Lean Strategy Canvas.png";
import journeyMap from "../assets/NudgeAI/Customer Journey Map.png";
import crazyEights from "../assets/NudgeAI/Crazy 8's.png";
import moscow from "../assets/NudgeAI/MoSCoW.png";
import mentalModel from "../assets/NudgeAI/Mental Model.png";
import hypothesisStatements from "../assets/NudgeAI/Hypothesis statements.png";
import hypothesisTable from "../assets/NudgeAI/Hypothesis table.png";
import hypothesisPriority from "../assets/NudgeAI/Hypothesis Prioritisation Canvas.png";
import informationArchitecture from "../assets/NudgeAI/Information Architecture.png";
import lowFiCutouts from "../assets/NudgeAI/Low-fidelity wireframe cutouts.png";
import highFidelity from "../assets/NudgeAI/High Fidelity.png";
import branding from "../assets/NudgeAI/Branding.png";
import styleGuide from "../assets/NudgeAI/Style guide.svg";
import finalCanvas from "../assets/NudgeAI/Final version of Lean UX Canvas.png";

// ---------------------------------------------------------------------------
// Content. Everything the page says lives in this file, so it's easy to edit.
// It is kept deliberately short: the artefacts do most of the talking. The full
// story is in the project report (Kingston University, MSc User Experience
// Design, CI7821 UX for Emerging Technology, April 2026).
// ---------------------------------------------------------------------------

const FIGMA_BASE = "https://www.figma.com";
const FILE_KEY = "KDdRueDzm6EBXPduJvEve6/K2461416_UX-in-Emerging-Technology";
const LINKS = {
  lowFi: `${FIGMA_BASE}/proto/${FILE_KEY}?node-id=178-92&t=PN7bXOvX74nwQiBt-1&scaling=scale-down&content-scaling=fixed&page-id=143%3A1449&starting-point-node-id=178%3A92`,
  highFi: `${FIGMA_BASE}/proto/${FILE_KEY}?node-id=230-7&t=PN7bXOvX74nwQiBt-1&scaling=scale-down&content-scaling=fixed&page-id=143%3A1449&starting-point-node-id=230%3A7`,
  file: `${FIGMA_BASE}/design/${FILE_KEY}?node-id=143-1449&t=QVJtxpgQ3YMeGg3x-1`,
};

const FACTS = [
  { label: "My Role", value: "UX Researcher & Designer", bg: factBg1 },
  { label: "Method", value: "Lean UX", bg: factBg2 },
  { label: "Platform", value: "Figma plugin", bg: factBg3 },
];

const RESULTS = [
  { value: "5", label: "user interviews" },
  { value: "80%", label: "of hypotheses validated" },
  { value: "96.5", label: "average SUS score" },
  { value: "5/5", label: "testers preferred quick actions" },
];

const SECTION_LINKS = [
  { id: "challenge", label: "Challenge" },
  { id: "think", label: "Think" },
  { id: "make", label: "Make" },
  { id: "check", label: "Check" },
  { id: "reflect", label: "Reflect" },
];

const OBJECTIVES = [
  "75% of users complete core tasks within 5 minutes",
  "70% of users engage with the in-app guidance",
  "Less reliance on external tutorials",
];

const LEAN_STAGES = [
  { name: "Think", text: "Research, assumptions and hypotheses." },
  { name: "Make", text: "Ideation, wireframes, branding and a prototype." },
  { name: "Check", text: "Usability testing and a SUS survey." },
];

const PRINCIPLES = [
  "Concise, to limit cognitive load",
  "Timely, at the moment of need",
  "Always in the user’s control",
  "Assisting designers, not replacing them",
];

const GAPS = [
  "Little real-time, proactive guidance",
  "Poor awareness of the live design",
  "High dependence on user prompts",
  "Limited personalisation",
];

const FINDINGS = [
  { title: "Learning", text: "Users mostly use YouTube, Google and trial and error." },
  { title: "Feature awareness", text: "Advanced features like auto layout go unused." },
  { title: "Guidance", text: "In-context, step-by-step help is preferred." },
  { title: "Suggestions", text: "Welcome when relevant, optional and dismissible." },
];

const PERSONAS = [
  {
    src: personaBeginner,
    width: 1429,
    height: 1321,
    alt: "Proto persona for Giselle Thompson, a beginner Figma user",
    caption: "Giselle Thompson, the beginner",
    summary: "Where one wants step-by-step help in context, not more tutorials.",
  },
  {
    src: personaExpert,
    width: 1454,
    height: 1321,
    alt: "Proto persona for Alex Martinez, an expert Figma user",
    caption: "Alex Martinez, the expert",
    summary: "And the other wants speed, with smart shortcuts and suggestions.",
  },
];

const MOSCOW = [
  { tier: "Must have", items: ["Context-aware guidance", "Real-time problem detection", "Non-intrusive UI"] },
  { tier: "Should have", items: ["Accessibility checks", "Design issues highlighted", "Guided learning levels"] },
  { tier: "Could have", items: ["Chatbot interface", "Cross-project memory"] },
];

const PRIORITISED = [
  { tier: "Ship and measure", text: "Prompts, quick actions, step-by-step guidance" },
  { tier: "Test further", text: "Behaviour-based suggestions" },
  { tier: "Validate first", text: "Error detection, accessibility checks" },
  { tier: "Set aside", text: "Low-value ideas" },
];

const LOW_FI_TABLE = [
  { hypothesis: "Contextual prompts", evidence: "Both users followed them without confusion", status: "Strongly supported" },
  { hypothesis: "Quick actions", evidence: "Both preferred them to manual methods", status: "Strongly supported" },
  { hypothesis: "Step-by-step guidance", evidence: "Easy to follow, but needed a little support", status: "Supported" },
];

const HIGH_FI_TABLE = [
  { hypothesis: "Contextual prompts", evidence: "Relevant, non-intrusive, and users valued control over frequency", status: "Strongly supported" },
  { hypothesis: "Quick actions", evidence: "Chosen over manual steps by all five users", status: "Strongly supported" },
  { hypothesis: "Step-by-step guidance", evidence: "Effective for beginners; needs clearer sequencing", status: "Supported" },
];

const SUS_SCORES = [100, 92.5, 100, 90, 100];
const SUS_AVERAGE = SUS_SCORES.reduce((a, b) => a + b, 0) / SUS_SCORES.length;

const SUS_FINDINGS = [
  "Users felt faster and more confident",
  "Suggestions felt relevant and helpful",
  "Keep watching the balance between help and interruption",
];

const FUTURE_WORK = [
  "Explain why a feature is suggested",
  "Test in more complex, realistic projects",
  "Add accessibility checks and error detection",
  "Introduce free and paid plans",
];

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Phase({ id, number, label, title, intro, children }) {
  return (
    <section className="process__phase" id={id} aria-labelledby={`${id}-title`}>
      <header className="process__phase-head">
        <span className="process__phase-number" aria-hidden="true">
          {number}
        </span>
        <p className="process__phase-label">{label}</p>
        <h2 id={`${id}-title`}>{title}</h2>
        <p className="process__phase-intro">{intro}</p>
      </header>
      {children}
    </section>
  );
}

function Step({ num, title, children }) {
  return (
    <div className="process__step">
      <h3>
        <span className="process__step-num">{num}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function ExternalLink({ href, children, variant = "primary" }) {
  return (
    <a
      className={`process__btn${variant === "secondary" ? " process__btn--secondary" : ""}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="process__sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function HypothesisTable({ caption, rows, result }) {
  return (
    <div className="process__table-block">
      <div className="process__table-scroll" role="region" aria-label={caption} tabIndex={0}>
        <table className="process__table">
          <caption>{caption}</caption>
          <thead>
            <tr>
              <th scope="col">Hypothesis</th>
              <th scope="col">What we saw</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.hypothesis}>
                <td>{row.hypothesis}</td>
                <td>{row.evidence}</td>
                <td>
                  <span className={`process__status${row.status === "Supported" ? " process__status--soft" : ""}`}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="process__table-note">{result}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// The page
// ---------------------------------------------------------------------------

export default function NudgeAI() {
  const titleRef = useRef(null);

  // A new "page" in a single-page app: start at the top, give it its own
  // document title, and move focus to the heading so screen readers announce
  // that the page changed.
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Nudge AI - Mawrah Khan";
    window.scrollTo(0, 0);
    titleRef.current?.focus({ preventScroll: true });
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="process">
      <div className="process__nav">
        <Navbar activeId="case-studies" />
      </div>

      <main className="process__main">
        {/* ---------------- hero ---------------- */}
        <header className="process__hero">
          <div className="process__hero-copy">
            {/* the logo (name and tagline) is the page heading: its alt text carries both */}
            <h1 className="process__title" ref={titleRef} tabIndex={-1}>
              <img src={logo} alt="Nudge: smart help, right when you need it" width="527" height="190" />
            </h1>
            <p className="process__lead">
              A context-aware Figma co-pilot that guides designers at the moment they need it, without breaking their flow.
            </p>
            <div className="process__actions">
              <ExternalLink href={LINKS.highFi}>View the prototype</ExternalLink>
              <ExternalLink href={LINKS.file} variant="secondary">
                Open the Figma file
              </ExternalLink>
            </div>
          </div>

          <ul className="process__results" aria-label="Results at a glance">
            {RESULTS.map((result) => (
              <li key={result.label}>
                <span className="process__result-value">{result.value}</span>
                <span className="process__result-label">{result.label}</span>
              </li>
            ))}
          </ul>
        </header>

        <dl className="process__facts">
          {FACTS.map((fact) => (
            <div className="process__fact" key={fact.label} style={{ "--fact-bg": `url("${fact.bg}")` }}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <nav className="process__jump" aria-label="Sections of this page">
          <span className="process__jump-label">Jump to</span>
          <ul>
            {SECTION_LINKS.map((link) => (
              <li key={link.id}>
                <button type="button" onClick={() => scrollToId(link.id)}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ---------------- challenge ---------------- */}
        <section className="process__section" id="challenge" aria-labelledby="challenge-title">
          <h2 id="challenge-title" className="process__section-title">
            The challenge
          </h2>
          <div className="process__columns">
            <div className="process__prose">
              <p>
                Figma is powerful, but many beginners and intermediate users struggle to learn it. The help they need
                lives outside the tool, so they keep switching context and learning by trial and error.
              </p>
            </div>
            <aside className="process__card process__card--accent">
              <h3 className="process__card-title">What success looked like</h3>
              <ol className="process__objectives">
                {OBJECTIVES.map((objective) => (
                  <li key={objective}>{objective}</li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        {/* ---------------- process overview ---------------- */}
        <section className="process__section" id="process" aria-labelledby="process-title">
          <h2 id="process-title" className="process__section-title">
            How I worked
          </h2>
          <div className="process__prose process__prose--wide">
            <p>Lean UX: short cycles of research, prototyping and testing.</p>
          </div>
          <ol className="process__stages">
            {LEAN_STAGES.map((stage, index) => (
              <li key={stage.name}>
                <span className="process__stage-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{stage.name}</h3>
                <p>{stage.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------- think ---------------- */}
        <Phase
          id="think"
          number="01"
          label="Think"
          title="Understanding the problem"
          intro="Research with users and the market, turned into assumptions and hypotheses."
        >
          <Step num="1.1" title="Secondary research">
            <p>Before talking to anyone, I studied what was already known: the research, the competing tools and the technology on offer.</p>
            <h4>Literature review</h4>
            <p className="process__lead-in">To learn what good help looks like, I read the research. It reveals that support in complex tools should be:</p>
            <ul className="process__tags">
              {PRINCIPLES.map((principle) => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>

            <h4>Competitive analysis</h4>
            <p className="process__lead-in">To see where Nudge could stand out, I compared five existing tools. Most of these tools wait for prompts and work outside the live design.</p>
            <div className="process__figure-medium">
              <Artefact
                src={competitive}
                width={1852}
                height={1299}
                fullSrc={competitiveFull}
                fullWidth={3328}
                fullHeight={2554}
                alt="Cards summarising how each of the five competing tools works"
                caption="Competitive analysis (enlarge for the full comparison)"
              />
            </div>
            <ul className="process__tags">
              {GAPS.map((gap) => (
                <li key={gap}>{gap}</li>
              ))}
            </ul>

            <h4>Technology research</h4>
            <p className="process__lead-in">
              To decide how to build it, I compared the available AI models and programming languages. ChatGPT won for its mature API, and TypeScript was chosen as the language, which is recommended for Figma plugins.
            </p>
            <div className="process__figure-medium">
              <Artefact
                src={technologyFull}
                width={2104}
                height={1654}
                framePadding="24px"
                alt="A comparison of AI models and programming languages for building the plugin"
                caption="AI models and languages compared"
              />
            </div>
            {/* <div className="process__figure-medium process__figure-spaced">
              <Artefact
                src={technology}
                width={1980}
                height={1408}
                alt="The recommended technology approach: a contextually aware language model and adaptive interfaces"
                caption="The recommended approach: a contextually aware language model with adaptive interfaces"
              />
            </div> */}
          </Step>

          <Step num="1.2" title="Primary research">
            <p>With the landscape mapped, I spoke to real designers to learn how they pick up Figma and what gets in their way.</p>
            <h4>Interviews and affinity map</h4>
            <p className="process__lead-in">
              I interviewed five designers (two beginners, two intermediate, one expert) and grouped their thoughts into themes.
            </p>
            <div className="process__figure-narrow">
              <Artefact
                src={affinityMap}
                width={3629}
                height={4849}
                alt="An affinity map of sticky notes grouped by theme across the five participants"
                caption="Affinity map of the interview data"
              />
            </div>
            <ul className="process__cards process__cards--4">
              {FINDINGS.map((item) => (
                <li className="process__card" key={item.title}>
                  <h5>{item.title}</h5>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>

            <h4>Assumptions</h4>
            <p className="process__lead-in">The research left open questions, so I listed my assumptions and separated them into business and user categories.</p>
            <div className="process__columns process__columns--figures">
              <div>
                <h5 className="process__mini-title">Business</h5>
                <Artefact
                  src={businessAssumptions}
                  width={1980}
                  height={1408}
                  alt="A table of business assumptions"
                  caption="Business assumptions"
                />
              </div>
              <div>
                <h5 className="process__mini-title">User</h5>
                <Artefact
                  src={userAssumptions}
                  width={1980}
                  height={1408}
                  alt="A table of user assumptions"
                  caption="User assumptions"
                />
              </div>
            </div>
            <p className="process__lead-in">I then prioritised them by impact and effort to decide what to test first.</p>
            <div className="process__columns process__columns--figures">
              <Artefact
                src={businessPriority}
                width={1980}
                height={1408}
                alt="A chart placing business assumptions by impact and effort"
                caption="Business assumptions, prioritised by impact and effort"
              />
              <Artefact
                src={userPriority}
                width={1980}
                height={1408}
                alt="A chart placing user assumptions by impact and effort"
                caption="User assumptions, prioritised by impact and effort"
              />
            </div>
          </Step>

          <Step num="1.3" title="Proto personas">
            <p>To keep both ends of the audience in mind while designing, I turned the research into two proto-personas.</p>
            <ul className="process__personas">
              {PERSONAS.map((persona) => (
                <li key={persona.caption}>
                  <Artefact
                    src={persona.src}
                    width={persona.width}
                    height={persona.height}
                    alt={persona.alt}
                    caption={persona.caption}
                  />
                  <p>{persona.summary}</p>
                </li>
              ))}
            </ul>
          </Step>

          <Step num="1.4" title="Problem statement, version 1">
            <p>Pulling the research together, I wrote a first problem statement to steer the work.</p>
            <blockquote className="process__quote">
              Novice and intermediate Figma users face barriers in applying the platform’s features to their day-to-day workflow, as existing learning resources are disconnected from real-time design activity. There is a need for context-aware guidance that supports skill development while designing.
            </blockquote>
          </Step>

          <Step num="1.5" title="Framing the opportunity">
            <p>With a problem in hand, I framed the opportunity on a Lean UX canvas.</p>
            <Artefact
              src={earlyCanvas}
              width={1980}
              height={1320}
              alt="The first version of the Lean UX canvas for Nudge"
              caption="Early version of the Lean UX canvas"
            />
            <p>Then compared Nudge with existing tools on a strategy canvas.</p>
            <Artefact
              src={strategyCanvas}
              width={1980}
              height={1320}
              alt="The Lean strategy canvas comparing Nudge with existing tools"
              caption="Lean strategy canvas: Nudge against existing tools"
            />
          </Step>

          <Step num="1.6" title="Customer journey map">
            <p>To see the problem from a user’s side, I mapped the first persona’s journey from frustration to confidence once contextual guidance appears.</p>
            <Artefact
              src={journeyMap}
              width={1980}
              height={1592}
              alt="A customer journey map of a beginner user across before, during and after using Nudge"
              caption="Customer journey map for Giselle, the beginner"
            />
          </Step>

          <Step num="1.7" title="Ideating: Crazy 8s">
            <p>With the problem clear, I sketched eight ideas in eight minutes to get past the obvious first answer.</p>
            <div className="process__figure-small">
              <Artefact
                src={crazyEights}
                width={1333}
                height={2048}
                alt="A sheet of eight hand-drawn Crazy 8s ideas for Nudge"
                caption="Crazy 8s sketches"
              />
            </div>
          </Step>

          <Step num="1.8" title="Prioritising features: MoSCoW">
            <p>The ideas outgrew the time available, so I sorted features into must, should and could have.</p>
            <ul className="process__cards process__cards--3">
              {MOSCOW.map((group) => (
                <li className="process__card" key={group.tier}>
                  <h5>{group.tier}</h5>
                  <ul className="process__list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <div className="process__figure-medium">
              <Artefact
                src={moscow}
                width={1980}
                height={1408}
                alt="A MoSCoW chart sorting Nudge features into must, should, could and won't have"
                caption="MoSCoW chart"
              />
            </div>
          </Step>

          <Step num="1.9" title="Mental model">
            <p>To understand when help is wanted, I modelled how users move between exploring, doing and learning, which is where Nudge steps in.</p>
            <Artefact
              src={mentalModel}
              width={2404}
              height={1408}
              alt="A mental model showing an adaptive, non-linear flow from exploring to guided learning"
              caption="The adaptive, non-linear mental model"
            />
          </Step>

          <Step num="1.10" title="Hypotheses">
            <p>To make the ideas testable, each feature became a hypothesis, which was mapped into a tangible table.</p>
            <div className="process__figure-medium">
              <Artefact
                src={hypothesisStatements}
                width={1980}
                height={1376}
                alt="A list of hypothesis statements for Nudge"
                caption="Hypothesis statements"
              />
            </div>            
            <div className="process__figure-narrow">
              <Artefact
                className="process__gap-top"
                src={hypothesisTable}
                width={1980}
                height={2427}
                alt="A table linking outcomes, personas and features to hypotheses"
                caption="Hypothesis table"
              />
            </div>
            <ul className="process__cards process__cards--4">
              {PRIORITISED.map((item) => (
                <li className="process__card" key={item.tier}>
                  <h5>{item.tier}</h5>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
            <p>Then each hypothesis was ranked by value and risk to decide what to build and test first.</p>
            <div className="process__figure-medium">
              <Artefact
                src={hypothesisPriority}
                width={1980}
                height={1408}
                alt="A chart placing hypotheses by perceived value and risk"
                caption="Hypotheses prioritised by value and risk"
              />
            </div>
          </Step>
        </Phase>

        {/* ---------------- make ---------------- */}
        <Phase
          id="make"
          number="02"
          label="Make"
          title="Designing the solution"
          intro="From structure and sketches to a branded, interactive prototype."
        >
          <Step num="2.1" title="Information architecture">
            <p>Before drawing any screens, I mapped how Nudge’s features are organised inside Figma.</p>
            <Artefact
              src={informationArchitecture}
              width={2404}
              height={1408}
              crop={{ top: 170, height: 842 }}
              framePadding="0 0 24px"
              alt="The information architecture of the Nudge plugin"
              caption="Organisation of Nudge’s features inside Figma"
            />
          </Step>

          <Step num="2.2" title="Low-fidelity wireframes">
            <p>From that structure I made quick, colourless layouts, built from paper cutouts of the plugin’s panels, to test the flow before any visual design.</p>
            <div className="process__figure-small">
              <Artefact
                src={lowFiCutouts}
                width={1398}
                height={1977}
                crop={{ top: 140, height: 1572 }}
                alt="Rough paper cutouts of the Nudge plugin’s panels, used to assemble the low-fidelity wireframes"
                caption="Paper cutouts used to assemble the low-fidelity wireframes"
              />
            </div>
            <div className="process__actions">
              <ExternalLink href={LINKS.lowFi} variant="secondary">
                Try the low-fidelity prototype
              </ExternalLink>
            </div>
          </Step>

          <Step num="2.3" title="Branding">
            <p>Once the wireframes were tested, the next iteration needed a more realistic look and feel, so I defined the brand: simple, clear and subtle, with a dark UI, rounded cards and line icons in a primary blue and an accent purple.</p>
            <div className="process__figure-narrow">
              <Artefact
                src={branding}
                width={1380}
                height={1273}
                alt="The Nudge brand board: the colour system (a primary blue, an accent purple and two neutrals), notes on UI and icon style, rough hand-drawn logo sketches, tagline options, and the final logo with its tagline"
                caption="Brand colours, early logo sketches and the final logo"
              />
            </div>
          </Step>

          <Step num="2.4" title="Style guide">
            <p>To keep the interface consistent, I wrote a style guide: Inter throughout, a clear heading hierarchy (H1 at 96px down to H6 at 24px) and primary and secondary component variants.</p>
            <Artefact
              src={styleGuide}
              width={3090}
              height={1385}
              alt="The Nudge style guide: the logo and Inter typeface, heading sizes from H1 down to H6, the colours, components and icons"
              caption="Style guide"
            />
          </Step>

          <Step num="2.5" title="High-fidelity prototype">
            <p>Brand and style guide came together in an interactive prototype with contextual prompts, learning modules, quick actions and settings.</p>
            <Artefact
              src={highFidelity}
              width={1920}
              height={1024}
              alt="The Nudge plugin open in Figma, suggesting padding values for a button that is selected on the canvas"
              caption="The high-fidelity plugin giving contextual guidance inside Figma"
            />
            <div className="process__actions">
              <ExternalLink href={LINKS.highFi}>Try the high-fidelity prototype</ExternalLink>
            </div>
          </Step>

          <Step num="2.6" title="Final Lean UX canvas">
            <p>With the design taking shape, I returned to the Lean UX canvas: a sharper problem, measurable outcomes and hypotheses linked to features.</p>
            <Artefact
              src={finalCanvas}
              width={1980}
              height={1432}
              alt="The final version of the Lean UX canvas for Nudge"
              caption="Final version of the Lean UX canvas"
            />
          </Step>

          <Step num="2.7" title="Problem statement, version 2">
            <p>The same learning sharpened the problem statement, adding how much designers value their autonomy.</p>
            <blockquote className="process__quote">
              Many Figma users struggle to discover and apply its features in their natural workflow, and tutorials are
              disconnected from real-time work. Designers value autonomy, so they need context-aware, non-intrusive
              support that helps them learn and work better without disrupting their flow.
            </blockquote>
          </Step>
        </Phase>

        {/* ---------------- check ---------------- */}
        <Phase
          id="check"
          number="03"
          label="Check"
          title="Testing with users"
          intro="Two rounds of task-based testing and a usability survey."
        >
          <Step num="3.1" title="Low-fidelity wireframe testing">
            <p>
              To check the structure early, two participants (one beginner, one intermediate) tried the wireframes. They
              understood the plugin straight away and preferred quick actions over manual methods; the beginner wanted the
              reasoning behind suggestions.
            </p>
            <HypothesisTable
              caption="Hypothesis testing for the low-fidelity wireframes"
              rows={LOW_FI_TABLE}
              result="75% of hypotheses validated."
            />
          </Step>

          <Step num="3.2" title="High-fidelity prototype testing">
            <p>
              To test the polished design, five participants completed tasks with minimal help. Learning mode and quick
              actions worked best; behaviour tracking needed a clearer explanation.
            </p>
            <HypothesisTable
              caption="Hypothesis testing for the high-fidelity prototype"
              rows={HIGH_FI_TABLE}
              result="80% of hypotheses validated, up from 75%."
            />
          </Step>

          <Step num="3.3" title="System Usability Scale">
            <p>To put a number on usability, the five testers answered the System Usability Scale questionnaire about their experience, and each set of answers was converted into a SUS score out of 100:</p>
            <div className="process__sus">
              <ol className="process__sus-bars" aria-label="SUS score for each participant">
                {SUS_SCORES.map((score, index) => (
                  <li key={index}>
                    <span className="process__sus-name">Participant {index + 1}</span>
                    <span className="process__sus-track" aria-hidden="true">
                      <span className="process__sus-fill" style={{ "--score": `${score}%` }} />
                    </span>
                    <span className="process__sus-score">{score}</span>
                  </li>
                ))}
              </ol>
              <div className="process__sus-average">
                <span className="process__result-value">{SUS_AVERAGE}</span>
                <span className="process__result-label">average SUS score</span>
              </div>
            </div>
            <ul className="process__tags process__tags--stacked">
              {SUS_FINDINGS.map((finding) => (
                <li key={finding}>{finding}</li>
              ))}
            </ul>
          </Step>
        </Phase>

        {/* ---------------- reflect ---------------- */}
        <Phase
          id="reflect"
          number="04"
          label="Reflect"
          title="What I learned and what’s next"
          intro="The takeaways and where Nudge could go from here."
        >
          <Step num="4.1" title="Reflection">
            <p>
              Following Lean UX meant each stage informed the next. The key insight was balance: people value help that
              is relevant, timely and non-intrusive, while staying in control of their own workflow.
            </p>
          </Step>

          <Step num="4.2" title="Future work">
            <p>Testing showed what is still missing, and where Nudge could go next:</p>
            <ol className="process__future">
              {FUTURE_WORK.map((item, index) => (
                <li key={item}>
                  <span className="process__future-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span className="process__future-text">{item}</span>
                </li>
              ))}
            </ol>
          </Step>

          <Step num="4.3" title="Conclusion">
            <p>
              Nudge shows that contextual, in-app guidance can make complex design tools easier to learn and quicker to use. Testing validated 80% of the hypotheses and produced an average SUS score of 96.5, and designers valued help that stayed relevant, timely and under their control. The prototype is a strong proof of concept, and the next step is to test it in more complex, realistic projects.
            </p>
            <div className="process__actions">
              <ExternalLink href={LINKS.highFi}>View the prototype</ExternalLink>
              <ExternalLink href={LINKS.file} variant="secondary">
                Open the Figma file
              </ExternalLink>
            </div>
          </Step>
        </Phase>
      </main>
    </div>
  );
}
