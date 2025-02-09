import React, { useState, useEffect, useCallback, useMemo } from "react";
import { StoryGroup } from "../types/story";
import { StoryProgress } from "./StoryProgress";
import { StoryHeader } from "./StoryHeader";
import { StoryCube } from "./StoryCube";

const STORY_DURATION = 5000;
const TRANSITION_DURATION = 400;

interface StoryViewerProps {
  storyGroups: StoryGroup[];
  initialGroupIndex: number;
  initialStoryIndex: number;
  onClose: () => void;
  onStoryViewed: (groupIndex: number, storyIndex: number) => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  storyGroups,
  initialGroupIndex,
  initialStoryIndex,
  onClose,
  onStoryViewed,
}) => {
  const [groupIndex, setGroupIndex] = useState(initialGroupIndex);
  const [storyIndex, setStoryIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<"next" | "prev" | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const currentGroup = useMemo(() => storyGroups[groupIndex], [storyGroups, groupIndex]);
  const currentStory = useMemo(() => currentGroup?.stories[storyIndex], [currentGroup, storyIndex]);

  const { nextUserStory, prevUserStory } = useMemo(() => {
    if (!currentGroup) return { nextUserStory: null, prevUserStory: null };

    const nextUserStory = groupIndex < storyGroups.length - 1 
      ? storyGroups[groupIndex + 1].stories[0]
      : null;

    const prevUserStory = groupIndex > 0
      ? storyGroups[groupIndex - 1].stories[0]
      : null;

    return { nextUserStory, prevUserStory };
  }, [groupIndex, currentGroup, storyGroups]);

  const resetTransition = useCallback(() => {
    setIsTransitioning(false);
    setTransitionDirection(null);
    setIsNavigating(false);
  }, []);

  useEffect(() => {
    if (currentStory && !currentStory.viewed) {
      onStoryViewed(groupIndex, storyIndex);
    }
  }, [groupIndex, storyIndex, currentStory, onStoryViewed]);

  useEffect(() => {
    let timeoutId: number | undefined;

    if (isTransitioning) {
      timeoutId = window.setTimeout(resetTransition, TRANSITION_DURATION);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [isTransitioning, resetTransition]);

  const performTransition = useCallback((direction: "next" | "prev", newGroupIndex: number, newStoryIndex: number) => {
    if (isTransitioning || isNavigating) return;
    
    setIsNavigating(true);
    setIsTransitioning(true);
    setTransitionDirection(direction);
    setProgress(0);
    setIsPaused(true);

    const timeoutId = window.setTimeout(() => {
      setGroupIndex(newGroupIndex);
      setStoryIndex(newStoryIndex);
      resetTransition();
      setIsPaused(false);
    }, TRANSITION_DURATION + 50); // small buffer after transition

    return () => window.clearTimeout(timeoutId);
  }, [isTransitioning, isNavigating, resetTransition]);

  const goToNextStory = useCallback(() => {
    if (isTransitioning || isNavigating || !currentGroup) return;

    setIsPaused(true);
    
    if (storyIndex < currentGroup.stories.length - 1) {
      setStoryIndex(prev => prev + 1);
      setProgress(0);
      setIsPaused(false);
    } else if (groupIndex < storyGroups.length - 1) {
      performTransition("next", groupIndex + 1, 0);
    } else {
      onClose();
    }
  }, [storyIndex, groupIndex, currentGroup, storyGroups.length, onClose, isTransitioning, isNavigating, performTransition]);

  const goToPreviousUser = useCallback(() => {
    if (isTransitioning || isNavigating || groupIndex <= 0) return;
    performTransition("prev", groupIndex - 1, 0);
  }, [groupIndex, isTransitioning, isNavigating, performTransition]);

  const goToNextUser = useCallback(() => {
    if (isTransitioning || isNavigating || groupIndex >= storyGroups.length - 1) return;
    performTransition("next", groupIndex + 1, 0);
  }, [groupIndex, storyGroups.length, isTransitioning, isNavigating, performTransition]);

  useEffect(() => {
    let intervalId: number | undefined;
    
    if (!isPaused && !isTransitioning && !isNavigating && currentStory) {
      intervalId = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            goToNextStory();
            return 0;
          }
          return prev + (100 / STORY_DURATION) * 100;
        });
      }, 100);
    }

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [currentStory, isPaused, goToNextStory, isTransitioning, isNavigating]);

  const handleTouchStart = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleTouchMove = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (isTransitioning || isNavigating) return;

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - window.innerWidth / 2;
    
    if (Math.abs(deltaX) > window.innerWidth / 4) {
      if (deltaX > 0) {
        goToPreviousUser();
      } else {
        goToNextUser();
      }
    } else {
      setIsPaused(false);
    }
  }, [goToPreviousUser, goToNextUser, isTransitioning, isNavigating]);

  const handleTap = useCallback(() => {
    if (!isTransitioning && !isNavigating) {
      goToNextStory();
    }
  }, [goToNextStory, isTransitioning, isNavigating]);

  const handleLoadingChange = useCallback((isLoading: boolean) => {
    setIsPaused(isLoading);
  }, []);

  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="relative h-full story-cube-container">
        <StoryProgress
          stories={currentGroup.stories}
          currentIndex={storyIndex}
          progress={progress}
        />
        
        <StoryHeader
          user={currentStory.user}
          timestamp={currentStory.timestamp}
          onClose={onClose}
        />

        <StoryCube
          currentStory={currentStory}
          prevStory={prevUserStory}
          nextStory={nextUserStory}
          transitionDirection={transitionDirection}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTap={handleTap}
          onLoadingChange={handleLoadingChange}
        />
      </div>
    </div>
  );
};