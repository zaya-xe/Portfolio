import "./ShardBurst.scss";
import shard1 from "../../assets/ind_shards/1.svg";
import shard2 from "../../assets/ind_shards/2.svg";
import shard3 from "../../assets/ind_shards/3.svg";
import shard4 from "../../assets/ind_shards/4.svg";
import shard5 from "../../assets/ind_shards/5.svg";
import shard6 from "../../assets/ind_shards/6.svg";
import shard7 from "../../assets/ind_shards/7.svg";
import shard8 from "../../assets/ind_shards/8.svg";
import shard9 from "../../assets/ind_shards/9.svg";

// left/top/width are % of the original 1960x1044 artwork, found by matching
// each shard's own vector path against the full composite — so stacked at
// these coordinates they reconstruct the original image exactly.
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
];

export default function ShardBurst() {
  return (
    <div className="shard-burst" aria-hidden="true">
      <div className="shard-burst__canvas">
        {SHARDS.map((s) => (
          <img
            key={s.id}
            src={s.src}
            alt=""
            className="shard-burst__item"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.width}%`,
              "--burst-x": `${s.burstX}vw`,
              "--burst-y": `${s.burstY}vw`,
              "--burst-rot": `${s.rot}deg`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
