import { useEffect, useLayoutEffect, useRef, useState } from "react";
import planetUrl from "../../assets/BloomOrDoom/planet.glb?url";
import "./PlanetViewer.scss";

// How the planet arrives: it starts small and spinning fast (left to right, the
// same direction as its resting spin), then grows to full size while the spin
// slows to its resting speed (all over INTRO_MS).
const INTRO_MS = 3000;
const START_SCALE = 0.3;
const FAST_SPIN = 330; // degrees per second at the start
const REST_SPIN = 14; // degrees per second once settled (the auto-rotate speed)
const START_THETA = 30; // degrees: where the planet is facing at the start
const ORBIT_TAIL = "72deg 94%"; // the rest of the camera-orbit

// The planet of the game, baked from Unity into a .glb (see
// Assets/Editor/PortfolioPlanetExport.cs in the Unity project). It's shown with
// Google's <model-viewer>, which is a big script, so it is only fetched once
// this component is about to scroll into view.
export default function PlanetViewer() {
  const wrapRef = useRef(null);
  const viewerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  // no spinning or zooming on its own for people who ask for less motion; they
  // can still drag (or use the arrow keys) to turn it
  const [spin] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  // the slow auto-rotate only takes over once the intro has finished
  const [introDone, setIntroDone] = useState(!spin);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;
    const load = () =>
      import("@google/model-viewer").then(() => setReady(true), () => setFailed(true));

    if (!("IntersectionObserver" in window)) {
      load();
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          load();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  // once the model has arrived: make the terrain matte (it's plain rock and
  // soil, so the lights shouldn't put a chalky sheen over its colours) and let
  // the rest of the component know it can show the planet
  useEffect(() => {
    if (!ready) return undefined;
    const viewer = viewerRef.current;
    if (!viewer) return undefined;
    const onLoad = () => {
      const terrain = viewer.model?.materials.find((m) => m.name === "PlanetSurface");
      terrain?.pbrMetallicRoughness.setRoughnessFactor(1);
      setModelLoaded(true);
    };
    if (viewer.loaded) onLoad();
    viewer.addEventListener("load", onLoad);
    return () => viewer.removeEventListener("load", onLoad);
  }, [ready]);

  // The intro. A layout effect, so it starts before the first frame with the
  // model is painted (otherwise the full-size planet would flash up first).
  // The grow + fade is a Web Animation (runs on the compositor, so it stays
  // smooth); the spin is driven frame by frame so it can slow down gradually
  // and hand over seamlessly to the normal auto-rotate.
  useLayoutEffect(() => {
    if (!modelLoaded || !spin) return undefined;
    const viewer = viewerRef.current;
    if (!viewer) return undefined;

    const growth = viewer.animate(
      [
        { transform: `scale(${START_SCALE})`, opacity: 0 },
        { opacity: 1, offset: 0.2 },
        { transform: "scale(1)", opacity: 1 },
      ],
      { duration: INTRO_MS, easing: "cubic-bezier(0.3, 0.2, 0.2, 1)", fill: "both" },
    );

    let theta = START_THETA;
    let frame = 0;
    let last = performance.now();
    const began = last;
    let dragged = false;
    // someone grabbing the planet takes over from the scripted spin
    const onCameraChange = (event) => {
      if (event.detail?.source === "user-interaction") dragged = true;
    };
    viewer.addEventListener("camera-change", onCameraChange);

    const tick = (now) => {
      const progress = Math.min(1, (now - began) / INTRO_MS);
      // the spin eases down from fast to the resting speed
      const speed = REST_SPIN + (FAST_SPIN - REST_SPIN) * (1 - progress) ** 2;
      // the camera moves round to the left, which makes the planet's surface
      // travel left to right, the same way the auto-rotate afterwards turns it
      theta -= (speed * (now - last)) / 1000;
      last = now;
      if (!dragged) {
        viewer.cameraOrbit = `${theta}deg ${ORBIT_TAIL}`;
        viewer.jumpCameraToGoal();
      }
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    let cancelled = false;
    growth.finished.then(
      () => {
        if (cancelled) return;
        growth.cancel(); // back to the plain element, no leftover transform
        setIntroDone(true);
      },
      () => {},
    );

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      viewer.removeEventListener("camera-change", onCameraChange);
      growth.cancel();
    };
  }, [modelLoaded, spin]);

  return (
    <div className="planet-viewer" ref={wrapRef}>
      {ready && (
        <model-viewer
          ref={viewerRef}
          class={modelLoaded ? undefined : "is-hidden"}
          src={planetUrl}
          alt="3D model of Blubornia, the game's planet, with flowers and carnivorous plants growing on it. Drag to turn it."
          camera-controls=""
          auto-rotate={spin && introDone ? "" : undefined}
          rotation-per-second={`${REST_SPIN}deg`}
          auto-rotate-delay="0"
          camera-orbit={`${START_THETA}deg ${ORBIT_TAIL}`}
          min-camera-orbit="auto 20deg auto"
          max-camera-orbit="auto 160deg auto"
          disable-zoom=""
          interaction-prompt="none"
          touch-action="pan-y"
          shadow-intensity="0"
          environment-image="neutral"
          exposure="0.8"
        />
      )}
      {!modelLoaded && (
        <p className="planet-viewer__status" role="status">
          {failed ? "The 3D planet couldn't be loaded." : "Loading the planet…"}
        </p>
      )}
    </div>
  );
}
