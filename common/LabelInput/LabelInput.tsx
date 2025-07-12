import React from "react";

import "./LabelInput.scss";

interface LabelInputProps {
  type: string;
  htmlFor: string;
  text: string;
  name: string;
  placeholder: string;
  value?: string;
  disabled?: boolean;
}

const LabelInput = ({
  type,
  htmlFor,
  text,
  name,
  placeholder,
  value,
  disabled,
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
        defaultValue={value}
        disabled={disabled}
      />
    </div>
  );
};

export default LabelInput;
