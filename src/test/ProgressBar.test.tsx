import { render, screen, act } from "@testing-library/react";
import ProgressBar from "../components/ProgressBar";
import "@testing-library/jest-dom";

describe("ProgressBar", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("renders 0% progress for non-current unfinished story", () => {
    render(
      <ProgressBar
        isCurrentStory={false}
        hasFinished={false}
        storyDuration={5000}
        onStoryEnd={jest.fn()}
        resetTrigger={0}
      />
    );

    const bar = screen.getByTestId("progress-bar");
    expect(bar).toHaveStyle("width: 0%");
  });

  test("renders 100% progress for non-current finished story", () => {
    render(
      <ProgressBar
        isCurrentStory={false}
        hasFinished={true}
        storyDuration={5000}
        onStoryEnd={jest.fn()}
        resetTrigger={0}
      />
    );

    const bar = screen.getByTestId("progress-bar");
    expect(bar).toHaveStyle("width: 100%");
  });

  test("fills progress over time for current story", () => {
    const onStoryEnd = jest.fn();

    render(
      <ProgressBar
        isCurrentStory={true}
        hasFinished={false}
        storyDuration={1000}
        onStoryEnd={onStoryEnd}
        resetTrigger={0}
      />
    );

    const bar = screen.getByTestId("progress-bar");

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(parseFloat(bar.style.width)).toBeGreaterThan(0);

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(bar).toHaveStyle("width: 100%");
    expect(onStoryEnd).toHaveBeenCalledTimes(1);
  });

  test("resets progress when resetTrigger changes", () => {
    const { rerender } = render(
      <ProgressBar
        isCurrentStory={true}
        hasFinished={false}
        storyDuration={1000}
        onStoryEnd={jest.fn()}
        resetTrigger={0}
      />
    );

    const bar = screen.getByTestId("progress-bar");

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(parseFloat(bar.style.width)).toBeGreaterThan(0);

    rerender(
      <ProgressBar
        isCurrentStory={true}
        hasFinished={false}
        storyDuration={1000}
        onStoryEnd={jest.fn()}
        resetTrigger={1}
      />
    );

    expect(bar).toHaveStyle("width: 0%");
  });
});
