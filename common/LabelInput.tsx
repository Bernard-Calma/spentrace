import React from "react";

interface LabelInputProps {
  type: string;
  htmlFor: string;
  text: string;
  name: string;
  placeholder: string;
  value?: string | number;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  pattern?: string;
}

const LabelInput = ({
  type,
  htmlFor,
  text,
  name,
  placeholder,
  value,
  disabled,
  required = false,
  onChange,
  pattern,
}: LabelInputProps) => {
  return (
    <div className="flex flex-col gap-2 label-input">
      <label htmlFor={htmlFor} className="font-semibold">
        {text}
      </label>
      <input
        className={`border border-gray-300 rounded p-2 ${
          disabled ? "disabled:bg-gray-100" : ""
        }`}
        type={type}
        id={htmlFor}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        pattern={pattern}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "+" || e.key === "-") {
            e.preventDefault();
          }
        }}
        required={required}
        autoComplete="off"
        title="If disabled, login or subscribe to enable feature."
      />
    </div>
  );
};

export default LabelInput;
