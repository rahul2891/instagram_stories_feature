import { render, screen, fireEvent } from "@testing-library/react";
import UsersStoryList from "../components/UsersStoryList";
import { mockStories } from "../data/mockData";
import "@testing-library/jest-dom";

describe("UsersStoryList", () => {
  it("renders all user story thumbnails and usernames", () => {
    render(<UsersStoryList usersStories={mockStories} onSelect={jest.fn()} />);

    expect(screen.getByTestId("story-thumbnail-list")).toBeInTheDocument();

    mockStories.forEach((user) => {
      const { username, stories } = user;
      const firstImage = stories[0].imageUrl;

      expect(
        screen.getByTestId(`story-thumbnail-${username}`)
      ).toBeInTheDocument();
      expect(screen.getByTestId(`story-image-${username}`)).toHaveAttribute(
        "src",
        firstImage
      );
      expect(
        screen.getByTestId(`story-username-${username}`)
      ).toHaveTextContent(username);
    });
  });

  it("calls onSelect with correct index on click", () => {
    const onSelectMock = jest.fn();
    render(
      <UsersStoryList usersStories={mockStories} onSelect={onSelectMock} />
    );

    fireEvent.click(screen.getByTestId("story-thumbnail-Payal"));
    expect(onSelectMock).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByTestId("story-thumbnail-Roshit"));
    expect(onSelectMock).toHaveBeenCalledWith(4);
  });

  it("calls onSelect on Enter and Space key press", () => {
    const onSelectMock = jest.fn();
    render(
      <UsersStoryList usersStories={mockStories} onSelect={onSelectMock} />
    );

    const miraStory = screen.getByTestId("story-thumbnail-Mira");

    fireEvent.keyDown(miraStory, { key: "Enter", code: "Enter", charCode: 13 });
    expect(onSelectMock).toHaveBeenCalledWith(5);

    fireEvent.keyDown(miraStory, { key: " ", code: "Space", charCode: 32 });
    expect(onSelectMock).toHaveBeenCalledWith(5);
  });
});
