import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PromptEditor } from "@/components/prompts/PromptEditor";
import type { PromptTemplate } from "@shared/types";

const mockTemplates: PromptTemplate[] = [
  {
    id: "p1",
    label: "Generative poster",
    prompt: "Create a poster with point-line-plane elements",
  },
  {
    id: "p2",
    label: "Material collage",
    prompt: "Design a material-focused collage",
  },
];

describe("PromptEditor", () => {
  it("renders template selector", () => {
    render(<PromptEditor templates={mockTemplates} />);
    expect(screen.getByLabelText("Select a template")).toBeInTheDocument();
  });

  it("renders prompt textarea", () => {
    render(<PromptEditor templates={mockTemplates} />);
    expect(screen.getByLabelText("Edit your prompt")).toBeInTheDocument();
  });

  it("loads template when selected", async () => {
    const user = userEvent.setup();
    render(<PromptEditor templates={mockTemplates} />);

    const select = screen.getByLabelText("Select a template");
    await user.selectOptions(select, "p1");

    const textarea = screen.getByLabelText("Edit your prompt") as HTMLTextAreaElement;
    expect(textarea.value).toContain("point-line-plane");
  });

  it("allows editing prompt text", async () => {
    const user = userEvent.setup();
    render(<PromptEditor templates={mockTemplates} />);

    const textarea = screen.getByLabelText("Edit your prompt");
    await user.type(textarea, "Custom prompt");

    expect(textarea).toHaveValue("Custom prompt");
  });

  it("copy button is disabled when prompt is empty", async () => {
    const user = userEvent.setup();
    render(<PromptEditor templates={mockTemplates} />);

    const textarea = screen.getByLabelText("Edit your prompt");
    await user.clear(textarea);

    const copyButton = screen.getByRole("button", { name: /copy/i });
    expect(copyButton).toBeDisabled();
  });

  it("copies prompt to clipboard", async () => {
    const user = userEvent.setup();
    const copyToClipboard = vi.fn().mockResolvedValue(undefined);

    render(<PromptEditor templates={mockTemplates} copyToClipboard={copyToClipboard} />);

    const textarea = screen.getByLabelText("Edit your prompt");
    await user.clear(textarea);
    await user.type(textarea, "Test prompt");

    const copyButton = screen.getByRole("button", { name: /copy/i });
    await user.click(copyButton);

    expect(copyToClipboard).toHaveBeenCalledWith("Test prompt");
    await waitFor(() => {
      expect(screen.getByText(/copied to clipboard/i)).toBeInTheDocument();
    });
  });
});
