import { useRef, useState } from "react";
import "./Artefact.scss";

// A design artefact (a research board, a chart, a canvas...) shown as a figure.
// Most of these are dense, so clicking opens the picture large in a dialog:
// `fullSrc` is an optional higher-detail version to show there. The dialog is
// the browser's own <dialog>, so Escape closes it, focus stays inside it while
// it's open, and focus goes back to the figure afterwards.
export default function Artefact({
  src,
  alt,
  caption,
  width,
  height,
  fullSrc,
  fullWidth,
  fullHeight,
  crop,
  framePadding,
  className = "",
}) {
  const dialogRef = useRef(null);
  // the large image only loads once the dialog has been opened
  const [opened, setOpened] = useState(false);

  // `crop` ({ top, height }, in the image's own pixels) trims empty margins
  // off the picture shown on the page; the enlarged view still shows all of it
  const cropStyle = crop
    ? {
        aspectRatio: `${width} / ${crop.height}`,
        objectFit: "cover",
        objectPosition: `50% ${(crop.top / (height - crop.height)) * 100}%`,
      }
    : undefined;

  // `framePadding` (any CSS padding value) gives the picture room inside its frame
  const frameStyle = framePadding ? { padding: framePadding } : undefined;

  const open = () => {
    setOpened(true);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <figure className={`artefact ${className}`.trim()}>
      <button
        type="button"
        className="artefact__open"
        onClick={open}
        aria-label={`Enlarge: ${caption}`}
        style={frameStyle}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          style={cropStyle}
        />
        <span className="artefact__hint" aria-hidden="true">
          Click to enlarge
        </span>
      </button>
      <figcaption className="artefact__caption">{caption}</figcaption>

      <dialog
        ref={dialogRef}
        className="artefact__dialog"
        aria-label={caption}
        // a click on the dim area around the picture (the dialog's own box)
        // closes it, like pressing Escape
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
      >
        <button type="button" className="artefact__close" onClick={close} aria-label="Close enlarged view">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M3 3L15 15M15 3L3 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="artefact__scroller" tabIndex={0} aria-label={`${caption}, scrollable`}>
          {opened && (
            <img
              src={fullSrc || src}
              alt={alt}
              width={fullWidth || width}
              height={fullHeight || height}
            />
          )}
        </div>
      </dialog>
    </figure>
  );
}
