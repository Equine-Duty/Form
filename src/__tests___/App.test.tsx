// Imports
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// To Test
import { Home } from "@/pages/Home";

// Tests
describe("Renders main page correctly", async () => {
  afterEach(() => {
    cleanup();
  });

  it("Should render the page correctly", async () => {
    // Setup
    render(<Home />);
    const h1 = await screen.getByText("Vite");

    // Expectations
    expect(h1).not.toBeNull();
  });

  it("Should render the page correctly", async () => {
    // Setup
    render(<Home />);
    const h1 = await screen.getByText("Vite");

    // Expectations
    expect(h1).not.toBeNull();
  });

  it("Should test button", async () => {
    render(<Home />);
    const button = await screen.getByTestId("button");
    const user = userEvent.setup();
    await user.click(button);
  });

  it("Should show the button count set to 3", async () => {
    render(<Home />);
    const button = await screen.getByTestId("button");
    const user = userEvent.setup();

    await user.click(button);
    expect(button?.innerHTML).toBe("1");
    await user.click(button);
    expect(button?.innerHTML).toBe("2");
    await user.click(button);
    expect(button?.innerHTML).toBe("3");
  });
});
