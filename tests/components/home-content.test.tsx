import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";

import {HomeContent} from "@/components/home-content";
import messages from "@/messages/en.json";

describe("Security 51 home", () => {
  it("leads with the checkpoint and exposes all five generated guides", () => {
    render(<HomeContent locale="en" messages={messages} />);

    expect(screen.getByRole("heading", {level: 1})).toHaveTextContent("Trust the Manual. Verify Everything.");
    expect(screen.getByRole("link", {name: /Open Checkpoint Guide/i})).toHaveAttribute("href", "/checkpoint-guide");
    expect(screen.getAllByTestId("start-card")).toHaveLength(5);
    expect(screen.getByRole("link", {name: /Read Walkthrough/i})).toHaveAttribute("href", "/walkthrough");
  });
});
