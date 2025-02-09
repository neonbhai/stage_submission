import React, { useRef, useEffect, useMemo, useCallback, useState } from "react";
import { Story } from "../types/story";
import { StoryLoader } from "./StoryLoader";
import { StoryError } from "./StoryError";

interface StoryCubeProps {
  currentStory: Story;
  prevStory: Story | null;
  nextStory: Story | null;
  transitionDirection: "next" | "prev" | null;
  onTouchStart: () => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onTap: () => void;
  onLoadingChange: (isLoading: boolean) => void;
}

export const StoryCube: React.FC<StoryCubeProps> = React.memo(({
  currentStory,
  prevStory,
  nextStory,
  transitionDirection,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onTap,
  onLoadingChange,
}) => {
  const cubeRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const isInteractingRef = useRef<boolean>(false);
  const swipingRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const cubeClassName = useMemo(() => {
    return `story-cube ${
      transitionDirection === "next"
        ? "transition-next"
        : transitionDirection === "prev"
        ? "transition-prev"
        : ""
    }`;
  }, [transitionDirection]);

  useEffect(() => {
    if (cubeRef.current && transitionDirection) {
      cubeRef.current.classList.remove('no-transition');
    }
  }, [transitionDirection]);

  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.classList.add('no-transition');
      cubeRef.current.style.transform = "";
    }
    setIsLoading(true);
    setHasError(false);
  }, [currentStory]);

  useEffect(() => onLoadingChange(isLoading), [isLoading, onLoadingChange]);

  const handleInteractionStart = useCallback((x: number) => {
    isInteractingRef.current = true;
    startXRef.current = x;
    startTimeRef.current = Date.now();
    swipingRef.current = false;
    onTouchStart();
  }, [onTouchStart]);

  const handleInteractionMove = useCallback((x: number, e?: React.TouchEvent) => {
    if (!isInteractingRef.current || startXRef.current === null) return;

    const deltaX = x - startXRef.current;
    
    if (Math.abs(deltaX) > 20) {
      swipingRef.current = true;
    }

    if (e && 'touches' in e) {
      onTouchMove(e as React.TouchEvent);
    }
  }, [onTouchMove]);

  const handleInteractionEnd = useCallback((x: number, e?: React.TouchEvent) => {
    if (!isInteractingRef.current || startXRef.current === null) return;

    const deltaX = x - startXRef.current;
    const interactionDuration = Date.now() - startTimeRef.current;

    if (!swipingRef.current && interactionDuration < 300 && Math.abs(deltaX) < 10) {
      onTap();
    } else if (swipingRef.current && Math.abs(deltaX) > 50 && e) {
      onTouchEnd(e);
    }

    isInteractingRef.current = false;
    startXRef.current = null;
    swipingRef.current = false;
  }, [onTap, onTouchEnd]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleInteractionStart(e.clientX);
  }, [handleInteractionStart]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleInteractionMove(e.clientX, e);
  }, [handleInteractionMove]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    handleInteractionEnd(e.clientX);
  }, [handleInteractionEnd]);

  const handleMouseLeave = useCallback((e: React.MouseEvent) => {
    if (isInteractingRef.current) {
      handleInteractionEnd(e.clientX);
    }
  }, [handleInteractionEnd]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    handleInteractionStart(e.touches[0].clientX);
  }, [handleInteractionStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    handleInteractionMove(e.touches[0].clientX, e);
  }, [handleInteractionMove]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    handleInteractionEnd(e.changedTouches[0].clientX, e);
  }, [handleInteractionEnd]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div ref={cubeRef} className={cubeClassName}>
      {prevStory && !isInteractingRef.current && (
        <div className="story-face prev">
          <img
            src={prevStory.imageUrl}
            alt="Previous story"
            className="w-full h-full object-cover select-none"
            draggable="false"
          />
        </div>
      )}

      <div
        className="story-face current"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={currentStory.imageUrl}
          alt="Story"
          className="w-full h-full object-cover select-none"
          draggable="false"
          loading="eager"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        {isLoading && <StoryLoader />}
        {hasError && <StoryError />}
      </div>

      {nextStory && !isInteractingRef.current && (
        <div className="story-face next">
          <img
            src={nextStory.imageUrl}
            alt="Next story"
            className="w-full h-full object-cover select-none"
            draggable="false"
          />
        </div>
      )}
    </div>
  );
});