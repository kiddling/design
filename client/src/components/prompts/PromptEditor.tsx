import { useState, ChangeEvent, useEffect } from "react";
import type { PromptTemplate } from "@shared/types";

interface PromptEditorProps {
  templates?: PromptTemplate[];
  copyToClipboard?: (value: string) => Promise<void>;
}

export function PromptEditor({ templates = [], copyToClipboard }: PromptEditorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (!templates.length || selectedTemplate) {
      return;
    }

    const [first] = templates;
    setSelectedTemplate(first.id);
    setPrompt(first.prompt);
  }, [templates, selectedTemplate]);

  const handleTemplateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const templateId = event.target.value;
    setSelectedTemplate(templateId);

    const template = templates.find((item) => item.id === templateId);
    if (template) {
      setPrompt(template.prompt);
      setStatus("");
    }
  };

  const handlePromptChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
    setStatus("");
  };

  const handleCopy = async () => {
    if (!prompt.trim()) {
      return;
    }

    const copy =
      copyToClipboard ??
      (async (value: string) => {
        if (!navigator.clipboard) {
          throw new Error("Clipboard access is not supported");
        }

        await navigator.clipboard.writeText(value);
      });

    try {
      await copy(prompt);
      setStatus("Prompt copied to clipboard");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Failed to copy prompt");
    }
  };

  return (
    <div className="prompt-editor" aria-label="Prompt editor">
      <div className="vertical-stack">
        <label htmlFor="template-select">Select a template</label>
        <select id="template-select" value={selectedTemplate} onChange={handleTemplateChange}>
          <option value="">-- Choose template --</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.label}
            </option>
          ))}
        </select>
      </div>

      <div className="vertical-stack">
        <label htmlFor="prompt-textarea">Edit your prompt</label>
        <textarea
          id="prompt-textarea"
          value={prompt}
          onChange={handlePromptChange}
          rows={6}
          placeholder="Enter or customize your prompt here"
        />
      </div>

      <div className="horizontal-stack" style={{ alignItems: "flex-start" }}>
        <button type="button" onClick={handleCopy} disabled={!prompt.trim()}>
          Copy to Clipboard
        </button>
        <p role="status" aria-live="polite" className="status-message" style={{ margin: 0 }}>
          {status}
        </p>
      </div>
    </div>
  );
}
