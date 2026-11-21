// MediaView: shows ONE work as an <img> or a <video>, depending on its type.
// Used by the card tile (as a cover) and by the card viewer (full size), so the
// "image or video?" decision lives in one place.
// Props: work ({ url, type }), alt (text description), controls (true = video controls)
function MediaView({ work, alt, controls = true }) {
  if (work.type === 'video') {
    return (
      <video
        // "#t=0.1" makes the browser show a real first frame when used as a cover
        src={controls ? work.url : `${work.url}#t=0.1`}
        controls={controls}
        muted={!controls}
        playsInline
        preload="metadata"
        aria-label={alt}
      />
    );
  }

  return <img src={work.url} alt={alt} loading="lazy" draggable="false" />;
}

export default MediaView;
