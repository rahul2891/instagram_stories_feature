import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StoryViewer from "../components/StoryViewer";
import { mockStories } from "../data/mockData";
import "@testing-library/jest-dom";

describe("StoryViewer", () => {
  beforeEach(() => {
    global.Image = class {
      onload: ((this: GlobalEventHandlers, ev: Event) => any) | null = null;
      src: string = "";

      constructor() {
        setTimeout(() => {
          if (this.onload) {
            this.onload.call(
              this as unknown as GlobalEventHandlers,
              new Event("load")
            );
          }
        }, 0);
      }
    } as unknown as typeof Image;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders the first user and story", async () => {
    const onClose = jest.fn();
    render(
      <StoryViewer
        usersStories={mockStories}
        startUserIndex={0}
        onClose={onClose}
      />
    );

    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("story-wrapper")).toBeInTheDocument();
    });

    expect(screen.getByTestId("username-display")).toHaveTextContent("Rahul");
    expect(screen.getByTestId("story-image")).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", async () => {
    const onClose = jest.fn();
    render(
      <StoryViewer
        usersStories={mockStories}
        startUserIndex={0}
        onClose={onClose}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId("story-wrapper")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("close-button"));
    expect(onClose).toHaveBeenCalled();
  });
});
