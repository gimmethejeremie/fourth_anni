import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type PolaroidProps = {
  id: string;
  mediaPlaceholder: string;
  caption?: string;
  rotation?: number;
  isLarge?: boolean;
  isVideo?: boolean;
};

const isRenderableMediaPath = (value: string) => {
  return /^(\/|https?:\/\/|data:|blob:)/i.test(value.trim());
};

export const Polaroid = ({ id, mediaPlaceholder, caption, rotation = 0, isLarge = false, isVideo = false }: PolaroidProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasMediaError, setHasMediaError] = useState(false);

  const clampedRotation = Math.max(-4, Math.min(4, rotation));
  const shouldRenderMedia = isRenderableMediaPath(mediaPlaceholder) && !hasMediaError;

  useEffect(() => {
    setHasMediaError(false);
  }, [mediaPlaceholder]);

  const renderMedia = (expanded: boolean = false) => {
    const mediaClassName = `polaroidMedia ${isVideo ? "video" : "image"} ${expanded ? "large" : ""} ${shouldRenderMedia ? "realMedia" : ""}`;

    if (isVideo) {
      return (
        <div className={mediaClassName}>
          {shouldRenderMedia ? (
            <video
              src={mediaPlaceholder}
              controls={expanded}
              muted={!expanded}
              playsInline
              preload="metadata"
              aria-label={caption ?? id}
              onError={() => setHasMediaError(true)}
            />
          ) : (
            <>
              <div className="videoIcon">▶</div>
              <span>{mediaPlaceholder}</span>
            </>
          )}
        </div>
      );
    }

    return (
      <div className={mediaClassName}>
        {shouldRenderMedia ? (
          <img src={mediaPlaceholder} alt={caption ?? id} loading="lazy" onError={() => setHasMediaError(true)} />
        ) : (
          <span>{mediaPlaceholder}</span>
        )}
      </div>
    );
  };

  return (
    <>
      <div 
        className={`scrapbookPolaroid ${isLarge ? 'large' : 'small'}`}
        style={{ transform: `rotate(${clampedRotation}deg)` }}
        onClick={() => setIsExpanded(true)}
      >
        <div className="washiTape top" />
        <div className="washiTape bottom" />
        {renderMedia(false)}
        {caption && <div className="polaroidCaption">{caption}</div>}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="polaroidLightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          >
            <motion.div 
              className="lightboxContent"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {renderMedia(true)}
              {caption && <div className="polaroidCaption large">{caption}</div>}
              <button className="closeBtn" onClick={() => setIsExpanded(false)}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
