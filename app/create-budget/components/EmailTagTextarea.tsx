// components/EmailTagTextarea.tsx
import React, { useState, useRef, useEffect } from "react";

type Props = {
  initialEmails?: string[];
  onChange?: (emails: string[]) => void;
};

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;

export default function EmailTagTextarea({
  initialEmails = [],
  onChange,
}: Props) {
  const [emails, setEmails] = useState<string[]>(initialEmails);
  const [text, setText] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    onChange?.(emails);
  }, [emails, onChange]);

  function normalize(input: string) {
    return input
      .split(/[\n,;]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function addEmailsFromString(input: string) {
    const parts = normalize(input);
    if (!parts.length) return;
    const newList = [...emails];
    for (const p of parts) {
      if (!newList.includes(p)) newList.push(p);
    }
    setEmails(newList);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" || e.key === "," || e.key === ";") {
      e.preventDefault();
      addEmailsFromString(text);
      setText("");
    } else if (e.key === "Backspace" && text === "" && emails.length) {
      // remove last tag
      setEmails((prev) => prev.slice(0, -1));
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const pasted = e.clipboardData.getData("text");
    if (pasted) {
      e.preventDefault();
      addEmailsFromString(pasted);
      setText("");
    }
  }

  function removeEmail(idx: number) {
    setEmails((prev) => prev.filter((_, i) => i !== idx));
  }

  function isValidEmail(e: string) {
    return emailRegex.test(e);
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="relative border rounded p-2 bg-white dark:bg-gray-800 min-h-[56px]">
        {/* Floating label */}
        <label
          className={`absolute left-3 transition-all pointer-events-none ${
            emails.length || text.length
              ? "-top-2 text-xs bg-white dark:bg-gray-800 px-1 text-gray-600"
              : "top-3 text-gray-400"
          }`}
        >
          Invite by email
        </label>

        <div className="flex flex-wrap gap-2 mt-4">
          {emails.map((em, idx) => (
            <div
              key={idx}
              title={isValidEmail(em) ? "" : "Invalid email address"}
              className={`flex items-center px-3 py-1 rounded-full text-sm ${
                isValidEmail(em)
                  ? "bg-green-100 text-green-900"
                  : "bg-red-100 text-red-900"
              }`}
            >
              {em}
              <button
                onClick={() => removeEmail(idx)}
                className="ml-2 text-gray-600 hover:text-gray-900"
                aria-label={`Remove ${em}`}
              >
                ×
              </button>
            </div>
          ))}

          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            rows={1}
            placeholder=""
            className="flex-1 resize-none min-h-[32px] p-1 text-sm bg-transparent focus:outline-none"
            style={{ maxWidth: 360 }}
          />
        </div>
      </div>

      {emails.length > 0 && (
        <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          <strong>Included emails:</strong>
          <ul className="list-disc list-inside">
            {emails.map((em, idx) => (
              <li key={idx} className={isValidEmail(em) ? "" : "text-red-600"}>
                {em}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
