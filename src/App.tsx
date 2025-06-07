import { useEffect, useState } from "react";
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
        <StoryViewer />
      </div>
    </>
  );
};

export default App;
