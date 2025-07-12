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
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default LabelInput;
