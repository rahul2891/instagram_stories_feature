import { useState } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

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
