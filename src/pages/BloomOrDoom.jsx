import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import PlanetViewer from "../components/PlanetViewer/PlanetViewer";
import VoiceLines from "../components/VoiceLines/VoiceLines";
import "./BloomOrDoom.scss";
import shard1 from "../assets/BloomOrDoom/green_shard1.png";
import shard2 from "../assets/BloomOrDoom/green_shard2.png";
import shard3 from "../assets/BloomOrDoom/green_shard3.png";
import shard4 from "../assets/BloomOrDoom/green_shard4.png";
import shard5 from "../assets/BloomOrDoom/green_shard5.png";
import alien1 from "../assets/BloomOrDoom/green_alien1.png";
import sunShip from "../assets/BloomOrDoom/SunShip.png";
import moonShip from "../assets/BloomOrDoom/MoonShip.png";
import barrenLand from "../assets/BloomOrDoom/barrenLand.png";
import flowers from "../assets/BloomOrDoom/flowers.png";
import carnivorousPlants from "../assets/BloomOrDoom/carnivorousPlants.png";
import titleImage from "../assets/BloomOrDoom/Title_Main.png";
import wfSplash from "../assets/BloomOrDoom/Wireframes/SplashScreen.png";
import wfMainMenu from "../assets/BloomOrDoom/Wireframes/MainMenu.png";
import wfTutorial from "../assets/BloomOrDoom/Wireframes/Tutorial.png";
import wfPlay from "../assets/BloomOrDoom/Wireframes/GameScreen1.png";
import wfSettings from "../assets/BloomOrDoom/Wireframes/Settings.png";
import wfBackground from "../assets/BloomOrDoom/Wireframes/Background.png";
import wfJoin from "../assets/BloomOrDoom/Wireframes/JoinGame.png";
import wfHost from "../assets/BloomOrDoom/Wireframes/HostGame.png";
import wfCountdown from "../assets/BloomOrDoom/Wireframes/Countdown.png";
import wfGame from "../assets/BloomOrDoom/Wireframes/GameScreen.png";
import wfWin from "../assets/BloomOrDoom/Wireframes/Win.png";
import wfLose from "../assets/BloomOrDoom/Wireframes/Lose.png";
import wfInvalid from "../assets/BloomOrDoom/Wireframes/InvalidCode.png";
import uiElements from "../assets/BloomOrDoom/UIElements.png";
import gameMagazine from "../assets/BloomOrDoom/GameMagazine.png";
import overheatingAudio from "../assets/BloomOrDoom/Overheating.mp3";
import asteroidsAudio from "../assets/BloomOrDoom/Asteroids.mp3";
import factBg1 from "../assets/BloomOrDoom/greenrolebg1.svg";
import factBg2 from "../assets/BloomOrDoom/greenrolebg2.svg";
import factBg3 from "../assets/BloomOrDoom/greenrolebg3.svg";
import factBg4 from "../assets/BloomOrDoom/greenrolebg4.svg";

const VIDEO_ID = "5L0wuR1jBvY";
const APK_URL =
  "https://drive.google.com/drive/folders/1wQc11dHf73zuvE_fBKyDMFg2GIVGWanl?usp=drive_link";

const FACTS = [
  { label: "My Role", value: "UX / Game Designer", bg: factBg1 },
  { label: "Team", value: "5 Members", bg: factBg2 },
  { label: "Duration", value: "3 Days + 1 Week", bg: factBg3 },
  { label: "Tools", value: "Figma · Unity · AI", bg: factBg4 },
];

// Shards for the "Day 01" section; positions are relative to that section. Each
// one drifts on its own path: dx/dy (vw) is how far it wanders, rot (deg) how
// much it turns, dur (s) is the loop length. Pace is matched to the home page's
// background drift (shard-drift in index.css: a 60s loop, ~1.75px/s at 1400px
// wide) - if you change one, change the other. The negative delays start each
// one at a different point in its loop so they don't move in sync.
const DAY_SHARDS = [
  { id: 4, src: shard4, left: "5vw", top: "74%", width: "10.5vw", dx: 2, dy: -1.8, rot: -5, dur: 60, delay: -10 },
  { id: 5, src: shard5, left: "91vw", top: "7%", width: "2.4vw", dx: -1.5, dy: 2.4, rot: 8, dur: 60, delay: -30 },
];

// Shards for the "Testing and Fixes" section, placed from the design mock (962
// wide): left / top / width are % of that section, with a minimum size so they
// don't shrink to nothing on a phone. Same slow drift as the other shards.
const TESTING_SHARDS = [
  { id: 6, src: shard2, left: "91%", top: "1%", width: "clamp(3.5rem, 7.9%, 12rem)", dx: -1.8, dy: 2.1, rot: 6, dur: 60, delay: -15 },
  { id: 7, src: shard1, left: "3%", top: "44%", width: "clamp(2.5rem, 5.8%, 9rem)", dx: 2, dy: -1.7, rot: -5, dur: 60, delay: -35 },
  { id: 8, src: shard3, left: "89.2%", top: "72%", width: "clamp(4rem, 9.8%, 14rem)", dx: -2.1, dy: -1.6, rot: 5, dur: 60, delay: -50 },
];

// The Game Design Document topics scattered across the "Day 02" section.
// left/top are % of the section (placed from the design mock, with its top 80px cropped). Each one
// periodically glides to a nearby spot (mx/my, in rem) and back, like the
// reference video: ~0.5s out, a short hold, ~0.75s back, then rests. delay (s)
// offsets each label inside the shared loop so they don't move together.
const GDD_TOPICS = [
  { text: "Player roles and interactions", left: 17.4, top: 34.8, mx: 2.5, my: 0.7, delay: 0 },
  { text: "Power-ups and obstacles", left: 70.4, top: 37.3, mx: -2.2, my: 2.4, delay: 1.1 },
  { text: "Accessibility considerations", left: 42.8, top: 42.7, mx: 1.8, my: -2.4, delay: 2.3 },
  { text: "Core gameplay features", left: 7.6, top: 56.3, mx: -2.4, my: 2.2, delay: 0.6 },
  { text: "Win and lose conditions", left: 78.4, top: 57.7, mx: 2.4, my: 1.9, delay: 1.7 },
  { text: "Environmental effects", left: 30, top: 64.4, mx: -1.6, my: -2.5, delay: 2.9 },
  { text: "Vegetation states in environment", left: 51.1, top: 77.3, mx: 2.5, my: -1.2, delay: 0.3 },
];

// "Designing the gameplay": the three kinds of terrain (top right of the
// section, placed with --x / --w in BloomOrDoom.scss) and the two ships.
const TERRAIN = [
  { key: "barren", label: "Barren Land", src: barrenLand, width: 160, height: 71 },
  { key: "flowers", label: "Flowers", src: flowers, width: 236, height: 120 },
  { key: "plants", label: "Carnivorous Plants", src: carnivorousPlants, width: 104, height: 167 },
];

const SHIPS = [
  {
    id: "sun",
    src: sunShip,
    alt: "SunShip, an orange satellite with a green ring",
    width: 1450,
    height: 1085,
    lines: [
      "Grows flowers on barren land",
      "Sun rays on flowers turn them carnivorous",
      "Releases bursts of chaotic solar flares",
    ],
  },
  {
    id: "moon",
    src: moonShip,
    alt: "MoonShip, a silver satellite with a blue ring",
    width: 1452,
    height: 1083,
    lines: [
      "Brings overgrowth back down",
      "Moon rays on flowers turn the land barren",
      "Gets stuck with unstable drifting asteroids",
    ],
  },
];

// A ship, the beam of light under it, and its three lines of text. The ship
// and beam sway together (one --tilt value drives both). The lines are drawn
// twice: black with a thin white outline underneath, and in solid white on
// top, but the white copy only shows inside the beam, which is what makes the
// text "light up" where the beam crosses it. The white copy is aria-hidden so
// screen readers read each line once.
function ShipStage({ ship }) {
  return (
    <div className={`case-study__stage case-study__stage--${ship.id}`}>
      <div className="case-study__beam" aria-hidden="true" />
      <img
        className="case-study__ship"
        src={ship.src}
        alt={ship.alt}
        width={ship.width}
        height={ship.height}
      />
      <ul className="case-study__lines">
        {ship.lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <div className="case-study__reveal" aria-hidden="true">
        <div className="case-study__reveal-inner">
          <ul className="case-study__lines case-study__lines--lit">
            {ship.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FloatingShards({ shards }) {
  return (
    <div className="case-study__shards" aria-hidden="true">
      {shards.map((s) => (
        <img
          key={s.id}
          src={s.src}
          alt=""
          className="case-study__shard"
          style={{
            left: s.left,
            top: s.top,
            width: s.width,
            "--dx": `${s.dx}vw`,
            "--dy": `${s.dy}vw`,
            "--rot": `${s.rot}deg`,
            "--dur": `${s.dur}s`,
            "--delay": `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// "Wireframes and Accessibility": the hand-drawn screens, scattered as in the
// design mock (703 x 438 there). x / y are the sketch's top-left corner in the
// mock; w / h are the image's own pixel size, which the mock shows at 703/1920
// of full size. They're turned into % of the section below, so the layout
// scales with the page.
const MOCK_W = 703;
const MOCK_H = 438;
const MOCK_FULL_W = 1920;
const WIREFRAMES = [
  { key: "splash", src: wfSplash, w: 321, h: 398, x: 88, y: 70, alt: "Wireframe sketch of the splash screen: the game logo above a planet" },
  { key: "menu", src: wfMainMenu, w: 215, h: 320, x: 218, y: 52, alt: "Wireframe sketch of the main menu, with the logo and buttons" },
  { key: "tutorial", src: wfTutorial, w: 402, h: 328, x: 309, y: 78, alt: "Wireframe sketch of the tutorial screen with its instructions" },
  { key: "play", src: wfPlay, w: 183, h: 229, x: 463, y: 100, alt: "Wireframe sketch of an early game screen" },
  { key: "settings", src: wfSettings, w: 198, h: 289, x: 537, y: 68, alt: "Wireframe sketch of the settings screen, with sliders and toggles" },
  { key: "background", src: wfBackground, w: 232, h: 152, x: 218, y: 175, alt: "Wireframe sketch of the background scene" },
  { key: "join", src: wfJoin, w: 175, h: 258, x: 70, y: 225, alt: "Wireframe sketch of the join game screen, where a code is entered" },
  { key: "host", src: wfHost, w: 172, h: 258, x: 149, y: 225, alt: "Wireframe sketch of the host game screen, showing a game code" },
  { key: "countdown", src: wfCountdown, w: 246, h: 185, x: 218, y: 251, alt: "Wireframe sketch of the loading and countdown screen" },
  { key: "game", src: wfGame, w: 427, h: 476, x: 321, y: 203, alt: "Wireframe sketch of the game screen, with its controls and toast messages" },
  { key: "win", src: wfWin, w: 189, h: 270, x: 484, y: 203, alt: "Wireframe sketch of the win screen" },
  { key: "lose", src: wfLose, w: 205, h: 246, x: 562, y: 203, alt: "Wireframe sketch of the lose screen" },
  { key: "invalid", src: wfInvalid, w: 204, h: 147, x: 107, y: 331, alt: "Wireframe sketch of the invalid code screen" },
];

// The AI-assisted voice lines for Day 03; the player is in VoiceLines.jsx.
const VOICE_LINES = [
  { key: "sunship", name: "Sunship", quote: "\u201cUh-Oh. Overheating!\u201d", src: overheatingAudio },
  { key: "moonship", name: "Moonship", quote: "\u201cUmm\u2026 Am I losing parts again?\u201d", src: asteroidsAudio },
];

const ACCESSIBILITY_FEATURES = [
  "Gyroscope & Joystick",
  "Audio & Text",
  "High Color Contrast",
  "Clear Visual Distinction",
  "Haptic Feedback",
  "Volume Adjustments",
];

export default function BloomOrDoom() {
  const titleRef = useRef(null);
  const heroRef = useRef(null);

  // A new "page" in a single-page app: start at the top, give it its own
  // document title, and move focus to the heading so screen readers announce
  // that the page changed.
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Bloom or Doom - Mawrah Khan";
    window.scrollTo(0, 0);
    titleRef.current?.focus({ preventScroll: true });

    // On desktop, settle on the hero (logo, planet and download button filling
    // the screen, nav just scrolled out of view) so the page opens "inside" the
    // case study. Phones keep the top, where the menu button is.
    // Measured once the fonts and images are in (plus a beat for layout to
    // settle), because the nav grows a little when its font loads and would
    // otherwise leave the page short of the target.
    let cancelled = false;
    let timer;
    if (heroRef.current && window.matchMedia("(min-width: 901px)").matches) {
      const pageLoaded =
        document.readyState === "complete"
          ? Promise.resolve()
          : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
      Promise.all([document.fonts.ready, pageLoaded]).then(() => {
        timer = setTimeout(() => {
          if (cancelled || !heroRef.current) return;
          const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
          const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({
            top: heroRef.current.getBoundingClientRect().top + window.scrollY - 2.5 * rem,
            behavior: calm ? "instant" : "smooth",
          });
        }, 150);
      });
    }
    return () => {
      cancelled = true;
      clearTimeout(timer);
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="case-study">
      <div className="case-study__nav">
        <Navbar activeId="case-studies" />
      </div>

      <main className="case-study__main">
        <div className="case-study__hero" ref={heroRef}>
          <h1 className="case-study__title" ref={titleRef} tabIndex={-1}>
            <img
              src={titleImage}
              alt="Bloom or Doom"
              width="2016"
              height="780"
            />
          </h1>

          <p className="case-study__pitch case-study__pitch--left">
            Help two aliens on their mission to restore their dying planet,
            Blubornia.
          </p>

          <div className="case-study__planet">
            <PlanetViewer />
          </div>

          <div className="case-study__pitch case-study__pitch--right">
            <p>
              One player controls the Sun, nurturing vegetation, while the
              other controls the Moon, removing carnivorous plants.
            </p>
            <p>Together, they restore balance and bring Blubornia back to life.</p>
          </div>

          <a
            className="case-study__btn"
            href={APK_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download APK
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 11L11 3M11 3H5M11 3V9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <dl className="case-study__facts">
          {FACTS.map((fact) => (
            <div
              className="case-study__fact"
              key={fact.label}
              style={{ "--fact-bg": `url("${fact.bg}")` }}
            >
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </main>

      <section className="case-study__day" aria-labelledby="day-01-title">
        <FloatingShards shards={DAY_SHARDS} />

        <div className="case-study__day-text">
          <h2 id="day-01-title">Day 01</h2>
          <p>
            We began the jam by exploring possible concepts and quickly
            narrowed the direction down to two ideas.
          </p>
          <p>
            We chose Bloom or Doom because its core interaction could be built
            within the three-day constraint while still giving us room to
            experiment with cooperative mechanics.
          </p>
          <p>
            We wanted our game to stand out, so our focus was on creativity,
            using tech like NFC in our gameplay.
          </p>
        </div>

        <div className="case-study__video case-study__day-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`}
            title="Bloom or Doom video"
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      <section className="case-study__gdd" aria-labelledby="day-02-title">
        <div className="case-study__gdd-head">
          <img
            className="case-study__alien"
            src={alien1}
            alt=""
            width="160"
            height="176"
          />
          <div className="case-study__day-text">
            <h2 id="day-02-title">Day 02</h2>
            <p>
              Before designing screens, I created a Game Design Document (GDD)
              to establish the game’s scope and align the team around the
              intended experience.
            </p>
          </div>
        </div>

        <ul className="case-study__topics" aria-label="What the GDD covers">
          {GDD_TOPICS.map((t) => (
            <li
              key={t.text}
              style={{
                left: `${t.left}%`,
                top: `${t.top}%`,
                "--mx": `${t.mx}rem`,
                "--my": `${t.my}rem`,
                "--delay": `${-t.delay}s`,
              }}
            >
              {t.text}
            </li>
          ))}
        </ul>

        <p className="case-study__gdd-note">
          I divided this workload among team members, allowing each person to
          focus on their responsibilities while managing their time
          effectively.
        </p>
      </section>

      <section className="case-study__gameplay" aria-labelledby="gameplay-title">
        <h2 id="gameplay-title">Designing the gameplay</h2>
        <p className="case-study__tagline">
          <span>3</span> stages. <span>2</span> satellites. <span>1</span>{" "}
          fragile ecosystem.
        </p>

        <ul className="case-study__terrain">
          {TERRAIN.map((t) => (
            <li key={t.key} className={`case-study__terrain-item case-study__terrain-item--${t.key}`}>
              <img src={t.src} alt="" width={t.width} height={t.height} />
              <span>{t.label}</span>
            </li>
          ))}
        </ul>

        {SHIPS.map((ship) => (
          <ShipStage key={ship.id} ship={ship} />
        ))}
      </section>

      <section className="case-study__wireframes" aria-labelledby="wireframes-title">
        <h2 id="wireframes-title">Wireframes and Accessibility</h2>

        <ul className="case-study__sketches">
          {WIREFRAMES.map((wf) => (
            <li
              key={wf.key}
              style={{
                "--x": `${(wf.x / MOCK_W) * 100}%`,
                "--y": `${(wf.y / MOCK_H) * 100}%`,
                "--w": `${(wf.w / MOCK_FULL_W) * 100}%`,
              }}
            >
              <img src={wf.src} alt={wf.alt} width={wf.w} height={wf.h} loading="lazy" />
            </li>
          ))}
        </ul>

        <ul className="case-study__a11y" aria-label="Accessibility features">
          {ACCESSIBILITY_FEATURES.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <section className="case-study__ui" aria-labelledby="day-03-title">
        <div className="case-study__ui-copy">
          <h2 id="day-03-title">Day 03</h2>
          <p>
            I worked with the graphic designer to define the assets needed to
            support the gameplay, using the wireframes and GDD to communicate
            where and how these assets would be used.
          </p>
          <p className="case-study__ui-second">
            Alongside the interface and gameplay work, I created AI-assisted
            voice lines, prepared the project presentation and tracked the
            development process throughout the jam.
          </p>
          <VoiceLines lines={VOICE_LINES} />
        </div>

        <img
          className="case-study__ui-kit"
          src={uiElements}
          alt="The game's interface kit: teal and gold buttons and icons, a countdown, a stopwatch, and Join and Host tiles"
          width="586"
          height="687"
          loading="lazy"
        />
      </section>

      <section className="case-study__testing" aria-labelledby="testing-title">
        <FloatingShards shards={TESTING_SHARDS} />

        <h2 id="testing-title">Testing and Fixes</h2>
        <p>
          Once the game became playable, I continuously tested the build to
          identify bugs and interaction issues that needed immediate attention.
          With only three days available, testing had to happen alongside
          development rather than being left until the end.
        </p>
        <p>
          Following feedback on the game’s complexity, we spent an
          additional week refining the experience after the jam. We focused on
          improving usability, polish, and overall player experience before
          showcasing the game at Develop:Brighton and featuring it in the
          Kingston University Games Magazine.
        </p>

        <img
          className="case-study__magazine"
          src={gameMagazine}
          alt="The Kingston University Games Magazine open on the page that features Bloom or Doom"
          width="1600"
          height="900"
          loading="lazy"
        />
      </section>
    </div>
  );
}
