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
  column?: boolean;
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
  column = true,
  ...args
}: IInputLayoutProps) {
  return (
    <div
      className={`flex ${column ? "flex-col" : "items-center"} gap-2 ${
        notShow ? "hidden" : ""
      } w-full`}
    >
      <label htmlFor={inputId} className="font-bold text-xl text-nowrap">
        {labelTxt}
      </label>
      <input
        id={inputId}
        type={inputType}
        name={inputName}
        defaultValue={value}
        placeholder={placeholder}
        {...args}
        className="px-2 py-1 border-b border-b-blue-300 w-full"
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
