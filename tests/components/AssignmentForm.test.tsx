import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AssignmentForm } from "@/components/assignments/AssignmentForm";

const setup = () => {
  const onSubmit = vi.fn().mockResolvedValue(undefined);
  render(<AssignmentForm onSubmit={onSubmit} />);
  return { onSubmit };
};

describe("AssignmentForm", () => {
  it("renders required fields", () => {
    setup();

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Project URL")).toBeInTheDocument();
    expect(screen.getByLabelText("Notes")).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    const user = userEvent.setup();
    setup();

    await user.click(screen.getByRole("button", { name: /submit assignment/i }));

    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Project URL is required")).toBeInTheDocument();
  });

  it("validates email format", async () => {
    const user = userEvent.setup();
    setup();

    await user.type(screen.getByLabelText("Email"), "invalid-email");
    await user.click(screen.getByRole("button", { name: /submit assignment/i }));

    expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
  });

  it("calls onSubmit with form data", async () => {
    const user = userEvent.setup();
    const { onSubmit } = setup();

    await user.type(screen.getByLabelText("Name"), "Alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Project URL"), "https://example.com");
    await user.type(screen.getByLabelText("Notes"), "Test notes");

    await user.click(screen.getByRole("button", { name: /submit assignment/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Alice",
      email: "alice@example.com",
      projectUrl: "https://example.com",
      notes: "Test notes",
    });
  });

  it("shows success message after submission", async () => {
    const user = userEvent.setup();
    setup();

    await user.type(screen.getByLabelText("Name"), "Alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Project URL"), "https://example.com");

    await user.click(screen.getByRole("button", { name: /submit assignment/i }));

    expect(await screen.findByText("Assignment submitted successfully")).toBeInTheDocument();
  });
});
