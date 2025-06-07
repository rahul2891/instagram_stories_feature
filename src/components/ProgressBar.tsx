import { useEffect, useState } from "react";

interface FillProps {
  isCurrentStory: boolean;
  hasFinished: boolean;
  storyDuration: number;
  onStoryEnd: () => void;
  resetTrigger: number;
}

const ProgressBar: React.FC<FillProps> = ({
  isCurrentStory,
  hasFinished,
  storyDuration,
  onStoryEnd,
  resetTrigger,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isCurrentStory) {
      setProgress(hasFinished ? 100 : 0);
      return;
    }

    setProgress(0);
    const intervalMs = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += intervalMs;
      setProgress((elapsed / storyDuration) * 100);
      if (elapsed >= storyDuration) {
        clearInterval(timer);
        onStoryEnd();
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [resetTrigger, isCurrentStory]);

  return (
    <div
      style={{
        flex: 1,
        height: 4,
        margin: "0 2px",
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "#ddd",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: "green",
          transition: "width 0.05s linear",
        }}
      />
    </div>
  );
};

export default ProgressBar;
