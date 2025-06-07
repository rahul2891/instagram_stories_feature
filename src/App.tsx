import { useState } from "react";
import "./App.css";
import StoryViewer from "./components/StoryViewer";
import UsersStoryList from "./components/UsersStoryList";
import type { UserStories } from "./types/story";

const App: React.FC = () => {
  const [usersStories, setUsersStories] = useState<UserStories[]>([]);
  const [activeUserIndex, setActiveUserIndex] = useState<number | null>(null);

  return (
    <>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <UsersStoryList />
        <StoryViewer />
      </div>
    </>
  );
};

export default App;
