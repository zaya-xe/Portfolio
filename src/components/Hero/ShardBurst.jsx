import "./ShardBurst.scss";
import shard1 from "../../assets/ind_shards/1.png";
import shard2 from "../../assets/ind_shards/2.png";
import shard3 from "../../assets/ind_shards/3.png";
import shard4 from "../../assets/ind_shards/4.png";
import shard5 from "../../assets/ind_shards/5.png";
import shard6 from "../../assets/ind_shards/6.png";
import shard7 from "../../assets/ind_shards/7.png";
import shard8 from "../../assets/ind_shards/8.png";
import shard9 from "../../assets/ind_shards/9.png";
import shard10 from "../../assets/ind_shards/10.png";
import shard11 from "../../assets/ind_shards/11.png";

// left/top/width are % of the canvas (the original 1960x1044 artwork's
// proportions). Shards 1-9 were found by matching each shard's own vector path
// against the full composite, so stacked at these coordinates they reconstruct
// the original image. Shards 10 and 11 (right-hand side) were placed by eye
// against the design mock: 10's PNG is cropped on its right edge on purpose, so
// it sits flush with the right of the screen and bleeds off it.
// burstX/burstY (vw) and rot (deg) describe where each shard starts before
// animating into that resting position on page load.
const SHARDS = [
  { id: 1, src: shard1, left: 0, top: 45.96, width: 32.27, burstX: 1, burstY: -10.7, rot: -18, delay: 0.05 },
  { id: 2, src: shard2, left: 5.43, top: 0.12, width: 19.32, burstX: -20, burstY: 1.1, rot: 22, delay: 0.15 },
  { id: 3, src: shard3, left: 34.02, top: 18.55, width: 7.1, burstX: -11, burstY: -5.9, rot: -30, delay: 0.3 },
  { id: 4, src: shard4, left: 35.08, top: 31.94, width: 4.13, burstX: 1, burstY: -3.2, rot: 26, delay: 0.4 },
  { id: 5, src: shard5, left: 32.36, top: 60.04, width: 1.74, burstX: 1, burstY: -14.4, rot: -35, delay: 0.55 },
  { id: 6, src: shard6, left: 25.71, top: 53.24, width: 6.38, burstX: 2, burstY: -15.5, rot: 32, delay: 0.22 },
  { id: 7, src: shard7, left: 9.34, top: 47.05, width: 4.76, burstX: 9, burstY: -4.8, rot: -24, delay: 0.35 },
  { id: 8, src: shard8, left: 14.34, top: 47.46, width: 1.21, burstX: 10, burstY: -10.7, rot: 28, delay: 0.5 },
  { id: 9, src: shard9, left: 32.07, top: 26.09, width: 1.29, burstX: -20, burstY: -6.4, rot: -20, delay: 0.45 },
  // sits ~0.5% past the right edge so the float never reveals its cut-off side
  { id: 10, src: shard10, left: 89.2, top: 3.5, width: 11.3, burstX: 12, burstY: -6, rot: 24, delay: 0.2 },
  { id: 11, src: shard11, left: 92.5, top: 54.9, width: 4.76, burstX: 8, burstY: -9, rot: -30, delay: 0.5 },
];

// Once settled, each shard floats gently on its own path (the shared
// `shard-float` keyframes in index.css — the same motion as the Bloom or Doom
// page). dx/dy (vw) is how far it wanders, rot (deg) how much it turns, delay
// (s, negative) starts it at a different point in the 60s loop. Distances are
// worked out so every shard moves at the same ~1.75px/s (at 1400px wide) as the
// home page's background drift; larger shards turn less so their far corners
// don't sweep faster than the small ones.
const FLOAT_LOOP_SECONDS = 60;
const FLOAT = {
  1: { dx: 2.21, dy: 1.55, rot: 2.5, delay: 0 },
  2: { dx: 1.84, dy: -2.19, rot: -3.5, delay: -5 },
  3: { dx: -2.46, dy: 0.89, rot: 6, delay: -11 },
  4: { dx: -1.84, dy: -2.19, rot: -7, delay: -16 },
  5: { dx: 0.62, dy: 3.5, rot: 8, delay: -22 },
  6: { dx: 2.46, dy: -0.89, rot: 5, delay: -27 },
  7: { dx: -2.3, dy: -1.33, rot: -6, delay: -33 },
  8: { dx: -1.52, dy: 2.63, rot: 7, delay: -38 },
  9: { dx: 0.88, dy: -3.29, rot: -8, delay: -44 },
  10: { dx: 0.32, dy: 3.67, rot: 2, delay: -49 },
  11: { dx: -2.46, dy: -0.89, rot: 6, delay: -55 },
};

export default function ShardBurst() {
  return (
    <div className="shard-burst" aria-hidden="true">
      <div className="shard-burst__canvas">
        {SHARDS.map((s) => {
          const f = FLOAT[s.id];
          // two layers so the two animations don't fight over `transform`:
          // the wrapper floats, the image inside does the one-off burst-in
          return (
            <span
              key={s.id}
              className="shard-burst__float"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `${s.width}%`,
                "--dx": `${f.dx}vw`,
                "--dy": `${f.dy}vw`,
                "--rot": `${f.rot}deg`,
                "--dur": `${FLOAT_LOOP_SECONDS}s`,
                "--delay": `${f.delay}s`,
              }}
            >
              <img
                src={s.src}
                alt=""
                className="shard-burst__item"
                style={{
                  "--burst-x": `${s.burstX}vw`,
                  "--burst-y": `${s.burstY}vw`,
                  "--burst-rot": `${s.rot}deg`,
                  animationDelay: `${s.delay}s`,
                }}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}
