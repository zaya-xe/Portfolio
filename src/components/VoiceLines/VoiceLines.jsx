import { useEffect, useRef, useState } from "react";
import "./VoiceLines.scss";

const BAR_COUNT = 64;

// Shown until the real waveform has been read from the file (or if it can't
// be): speech-like, loud at the start and tapering off.
const PLACEHOLDER_PEAKS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const taper = 1 - (i / BAR_COUNT) * 0.8;
  const wobble = 0.55 + 0.45 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6));
  return taper * wobble;
});

// The loudest point in each slice of the clip, scaled so the biggest is 1.
async function readPeaks(url) {
  const response = await fetch(url);
  const data = await response.arrayBuffer();
  const buffer = await new OfflineAudioContext(1, 1, 44100).decodeAudioData(data);
  const samples = buffer.getChannelData(0);
  const block = Math.max(1, Math.floor(samples.length / BAR_COUNT));
  const peaks = [];
  for (let i = 0; i < BAR_COUNT; i += 1) {
    let max = 0;
    for (let j = i * block; j < Math.min((i + 1) * block, samples.length); j += 1) {
      max = Math.max(max, Math.abs(samples[j]));
    }
    peaks.push(max);
  }
  const loudest = Math.max(...peaks) || 1;
  return peaks.map((p) => p / loudest);
}

function formatTime(seconds) {
  const whole = Math.max(0, Math.ceil(seconds || 0));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

function VoiceLine({ line, playing, onPlayingChange }) {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [peaks, setPeaks] = useState(PLACEHOLDER_PEAKS);

  useEffect(() => {
    let cancelled = false;
    readPeaks(line.src).then(
      (result) => {
        if (!cancelled) setPeaks(result);
      },
      () => {},
    );
    return () => {
      cancelled = true;
    };
  }, [line.src]);

  // only one clip plays at a time: when another one starts, this one stops
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && !playing && !audio.paused) audio.pause();
  }, [playing]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  const progress = duration ? time / duration : 0;
  const label = `${line.name} voice line`;

  return (
    <li className="voice-line">
      <button
        type="button"
        className="voice-line__play"
        aria-label={`${playing ? "Pause" : "Play"} ${label}`}
        onClick={toggle}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          {playing ? (
            <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
          ) : (
            <path d="M8 5.5v13l11-6.5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          )}
        </svg>
      </button>

      <div className="voice-line__body">
        <p className="voice-line__name">{line.name}</p>
        <p className="voice-line__quote">{line.quote}</p>

        <div className="voice-line__player" style={{ "--progress": progress }}>
          <div className="voice-line__track">
            <div className="voice-line__wave" aria-hidden="true">
              {peaks.map((peak, i) => (
                <span
                  key={i}
                  className={i / BAR_COUNT < progress ? "is-played" : undefined}
                  style={{ height: `${Math.max(10, peak * 100)}%` }}
                />
              ))}
            </div>
            <input
              type="range"
              className="voice-line__seek"
              aria-label={`Seek ${label}`}
              aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
              min="0"
              max={duration || 1}
              step="0.01"
              value={time}
              disabled={!duration}
              onChange={(event) => {
                const next = Number(event.target.value);
                if (audioRef.current) audioRef.current.currentTime = next;
                setTime(next);
              }}
            />
          </div>
          <span className="voice-line__time" aria-hidden="true">
            {formatTime(duration - time)}
          </span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={line.src}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onPlay={() => onPlayingChange(true)}
        onPause={() => onPlayingChange(false)}
        onEnded={() => setTime(0)}
      />
    </li>
  );
}

// A list of clips that never play over each other.
export default function VoiceLines({ lines }) {
  const [activeKey, setActiveKey] = useState(null);

  return (
    <ul className="voice-lines" aria-label="Voice lines">
      {lines.map((line) => (
        <VoiceLine
          key={line.key}
          line={line}
          playing={activeKey === line.key}
          onPlayingChange={(isPlaying) =>
            setActiveKey((current) => (isPlaying ? line.key : current === line.key ? null : current))
          }
        />
      ))}
    </ul>
  );
}
