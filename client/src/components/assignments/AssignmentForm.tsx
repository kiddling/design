import { FormEvent, useState } from "react";
import type { AssignmentFormSchema } from "@shared/types";

interface AssignmentFormProps {
  onSubmit: (data: AssignmentFormSchema) => Promise<void> | void;
}

const defaultValues: AssignmentFormSchema = {
  name: "",
  email: "",
  projectUrl: "",
  notes: "",
};

export function AssignmentForm({ onSubmit }: AssignmentFormProps) {
  const [formData, setFormData] = useState<AssignmentFormSchema>(defaultValues);
  const [errors, setErrors] = useState<Partial<Record<keyof AssignmentFormSchema, string>>>({});
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const validate = (data: AssignmentFormSchema) => {
    const newErrors: Partial<Record<keyof AssignmentFormSchema, string>> = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!data.projectUrl.trim()) {
      newErrors.projectUrl = "Project URL is required";
    } else if (!/^https?:\/\//.test(data.projectUrl)) {
      newErrors.projectUrl = "Enter a valid URL";
    }

    return newErrors;
  };

  const handleChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      await onSubmit(formData);
      setStatus({ type: "success", message: "Assignment submitted successfully" });
      setFormData(defaultValues);
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to submit assignment",
      });
    }
  };

  return (
    <form className="assignment-form" onSubmit={handleSubmit} aria-label="Assignment submission form">
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onInput={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          required
        />
        {errors.name ? (
          <p id="name-error" role="alert" className="error-text">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onInput={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          required
        />
        {errors.email ? (
          <p id="email-error" role="alert" className="error-text">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="projectUrl">Project URL</label>
        <input
          id="projectUrl"
          name="projectUrl"
          type="url"
          value={formData.projectUrl}
          onInput={handleChange}
          aria-invalid={Boolean(errors.projectUrl)}
          aria-describedby={errors.projectUrl ? "projectUrl-error" : undefined}
          placeholder="https://"
          required
        />
        {errors.projectUrl ? (
          <p id="projectUrl-error" role="alert" className="error-text">
            {errors.projectUrl}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes || ""}
          onInput={handleChange}
          rows={4}
          placeholder="Add context, goals, or challenges"
        />
      </div>

      <button type="submit">Submit assignment</button>

      {status ? (
        <p
          role={status.type === "error" ? "alert" : "status"}
          className={`status-message${status.type === "error" ? " status-message--error" : ""}`}
          aria-live={status.type === "error" ? "assertive" : "polite"}
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
