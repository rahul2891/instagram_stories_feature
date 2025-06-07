import { Suspense, useEffect, useState } from "react";
import "./App.css";
import StoryViewer from "./components/StoryViewer";
import UsersStoryList from "./components/UsersStoryList";
import type { UserStories } from "./types/story";
import { mockStories } from "./data/mockData";

const App: React.FC = () => {
  const [usersStories, setUsersStories] = useState<UserStories[]>([]);
  const [activeUserIndex, setActiveUserIndex] = useState<number | null>(null);

  useEffect(() => {
    setUsersStories(mockStories);
  }, []);

  return (
    <>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <UsersStoryList
          usersStories={usersStories}
          onSelect={(indx) => setActiveUserIndex(indx)}
        />
        {activeUserIndex !== null && (
          <Suspense fallback={<div>Loading story...</div>}>
            <StoryViewer
              usersStories={usersStories}
              startUserIndex={activeUserIndex}
              onClose={() => setActiveUserIndex(null)}
            />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default App;
