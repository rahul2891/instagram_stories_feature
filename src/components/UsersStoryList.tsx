import type { UserStories } from "../types/story";

interface Props {
  usersStories: UserStories[];
  onSelect: (userIndex: number) => void;
}

const UsersStoryList: React.FC<Props> = ({ usersStories, onSelect }) => (
  <div
    style={{
      display: "flex",
      overflowX: "auto",
      padding: 10,
      gap: 10,
      borderBottom: "1px solid #ccc",
      backgroundColor: "#fff",
      maxWidth: 480,
      margin: "0 auto",
    }}
  >
    {usersStories.map((user, idx) => (
      <div
        key={user.userId}
        role="button"
        aria-label={`View ${user.username}'s stories`}
        tabIndex={0}
        onClick={() => onSelect(idx)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect(idx)}
        style={{ cursor: "pointer", textAlign: "center" }}
      >
        <img
          loading="lazy"
          src={user.stories[0].imageUrl}
          alt={user.username}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #f3425f",
          }}
          draggable={false}
        />
        <div style={{ fontSize: 12, marginTop: 4 }}>{user.username}</div>
      </div>
    ))}
  </div>
);

export default UsersStoryList;
