import { useEffect, useRef, useState } from "react";
import planetUrl from "../../assets/BloomOrDoom/planet.glb?url";
import "./PlanetViewer.scss";

// The planet of the game, baked from Unity into a .glb (see
// Assets/Editor/PortfolioPlanetExport.cs in the Unity project). It's shown with
// Google's <model-viewer>, which is a big script, so it is only fetched once
// this component is about to scroll into view.
export default function PlanetViewer() {
  const wrapRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  // no spinning on its own for people who ask for less motion; they can still
  // drag (or use the arrow keys) to turn it
  const [spin] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

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

  // the terrain is plain rock and soil: fully matte, so the lights don't put a
  // chalky sheen over its colours
  useEffect(() => {
    if (!ready) return undefined;
    const viewer = wrapRef.current?.querySelector("model-viewer");
    if (!viewer) return undefined;
    const makeTerrainMatte = () => {
      const terrain = viewer.model?.materials.find((m) => m.name === "PlanetSurface");
      terrain?.pbrMetallicRoughness.setRoughnessFactor(1);
    };
    if (viewer.loaded) makeTerrainMatte();
    viewer.addEventListener("load", makeTerrainMatte);
    return () => viewer.removeEventListener("load", makeTerrainMatte);
  }, [ready]);

  return (
    <div className="planet-viewer" ref={wrapRef}>
      {ready ? (
        <model-viewer
          src={planetUrl}
          alt="3D model of Blubornia, the game's planet, with flowers and carnivorous plants growing on it. Drag to turn it."
          camera-controls=""
          auto-rotate={spin ? "" : undefined}
          rotation-per-second="14deg"
          auto-rotate-delay="0"
          camera-orbit="30deg 72deg 94%"
          min-camera-orbit="auto 20deg auto"
          max-camera-orbit="auto 160deg auto"
          disable-zoom=""
          interaction-prompt="none"
          touch-action="pan-y"
          shadow-intensity="0"
          environment-image="neutral"
          exposure="0.8"
        />
      ) : (
        <p className="planet-viewer__status" role="status">
          {failed ? "The 3D planet couldn't be loaded." : "Loading the planet…"}
        </p>
      )}
    </div>
  );
}
