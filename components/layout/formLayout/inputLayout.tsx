import {HTMLInputTypeAttribute, InputHTMLAttributes} from "react";

interface IInputLayoutProps extends InputHTMLAttributes<HTMLInputElement> {
  labelTxt: string;
  inputId: string;
  inputName: string;
  inputType: HTMLInputTypeAttribute;
  value?: string;
  placeholder?: string;
  errMsg?: string[];
  notShow?: boolean;
}
export default function InputLayout({
  labelTxt,
  inputId,
  inputName,
  inputType,
  value,
  placeholder,
  errMsg,
  notShow = false,
  ...args
}: IInputLayoutProps) {
  return (
    <div
      className={`flex ${inputType !== "radio" && "flex-col"} gap-2 ${
        notShow ? "hidden" : ""
      }`}
    >
      <label htmlFor={inputId} className="font-bold text-xl">
        {labelTxt}
      </label>
      <input
        id={inputId}
        type={inputType}
        name={inputName}
        defaultValue={value}
        placeholder={placeholder}
        {...args}
        className="px-2 py-1 border-b border-b-blue-300"
      />
      {errMsg &&
        errMsg.map((msg, index) => (
          <span key={index} className="font-semibold text-red-400">
            {msg}
          </span>
        ))}
    </div>
  );
}
