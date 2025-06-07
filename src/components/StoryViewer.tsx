import { useEffect, useState } from "react";
import type { UserStories } from "../types/story";
import ProgressBar from "./ProgressBar";

interface Props {
  usersStories: UserStories[];
  startUserIndex: number;
  onClose: () => void;
}

const STORY_DURATION = 5000;

const StoryViewer: React.FC<Props> = ({
  usersStories,
  startUserIndex,
  onClose,
}) => {
  const [userIndex, setUserIndex] = useState(startUserIndex);
  const [storyIndex, setStoryIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [loading, setLoading] = useState(true);

  const currentUserStories = usersStories[userIndex];
  const currentStory = currentUserStories.stories[storyIndex];

  useEffect(() => {
    setLoading(true);
    const storyImage = new Image();
    storyImage.src = currentStory.imageUrl;
    storyImage.onload = () => setLoading(false);
  }, [userIndex, storyIndex]);

  const advanceStoryManually = () => {
    if (storyIndex < currentUserStories.stories.length - 1) {
      setStoryIndex((prev) => prev + 1);
    } else if (userIndex < usersStories.length - 1) {
      setUserIndex((prev) => prev + 1);
      setStoryIndex(0);
    } else {
      onClose();
    }
    setResetKey((k) => k + 1);
  };

  const handleGoBack = () => {
    if (storyIndex > 0) {
      setStoryIndex((prev) => prev - 1);
    } else if (userIndex > 0) {
      const prevUserStories = usersStories[userIndex - 1];
      setUserIndex((prev) => prev - 1);
      setStoryIndex(prevUserStories.stories.length - 1);
    }
    setResetKey((k) => k + 1);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        zIndex: 1000,
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "rgba(0,0,0,0.6)",
          border: "none",
          color: "white",
          fontSize: 18,
          padding: "6px 12px",
          borderRadius: 5,
          cursor: "pointer",
          zIndex: 1001,
        }}
      >
        ✕
      </button>

      <div
        style={{
          color: "white",
          padding: "10px",
          fontWeight: "bold",
          fontSize: "16px",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          marginTop: "10px",
        }}
      >
        {currentUserStories.username}
      </div>

      <div
        style={{
          display: "flex",
          gap: 5,
          padding: 10,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        {currentUserStories.stories.map((_, indx) => (
          <div
            key={indx}
            style={{
              flex: 1,
              height: 4,
              backgroundColor: "rgba(255,255,255,0.3)",
              overflow: "hidden",
              borderRadius: 2,
              position: "relative",
            }}
          >
            {indx < storyIndex && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                  backgroundColor: "white",
                }}
              />
            )}
            {indx === storyIndex && (
              <ProgressBar
                storyDuration={STORY_DURATION}
                onStoryEnd={advanceStoryManually}
                resetTrigger={resetKey}
                isCurrentStory={indx === storyIndex}
                hasFinished={indx < storyIndex}
              />
            )}
          </div>
        ))}
      </div>

      {loading ? (
        <div
          style={{
            color: "white",
            fontSize: 20,
            textAlign: "center",
            marginTop: 50,
          }}
        >
          Loading...
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            cursor: "pointer",
          }}
          onClick={(e) => {
            const clickX = e.nativeEvent.offsetX;
            if (clickX < window.innerWidth / 2) {
              handleGoBack();
            } else {
              advanceStoryManually();
            }
          }}
        >
          <img
            src={currentStory.imageUrl}
            alt="story"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              userSelect: "none",
            }}
            draggable={false}
          />
        </div>
      )}
    </div>
  );
};

export default StoryViewer;
