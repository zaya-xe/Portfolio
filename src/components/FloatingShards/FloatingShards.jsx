import "./FloatingShards.scss";

// Decorative glass shards that drift slowly on their own paths (the shared
// `shard-float` keyframes in index.css, the same motion as the home page and the
// Bloom or Doom page). Place inside a position: relative section.
//
// Each shard: src, left / top / width (any CSS length, usually %), dx / dy (vw,
// how far it wanders), rot (deg), dur (s, the loop), delay (s, negative so each
// starts at a different point in its loop).
export default function FloatingShards({ shards }) {
  return (
    <div className="floating-shards" aria-hidden="true">
      {shards.map((s) => (
        <img
          key={s.id}
          src={s.src}
          alt=""
          className="floating-shards__item"
          style={{
            left: s.left,
            top: s.top,
            width: s.width,
            "--dx": `${s.dx}vw`,
            "--dy": `${s.dy}vw`,
            "--rot": `${s.rot}deg`,
            "--dur": `${s.dur ?? 60}s`,
            "--delay": `${s.delay ?? 0}s`,
          }}
        />
      ))}
    </div>
  );
}
