import {HTMLInputTypeAttribute} from "react";

interface IAuthInputTypes {
  inputId: string;
  inputName: string;
  labelTxt: string;
  inputType: HTMLInputTypeAttribute;
  placeHolder: string;
  className?: string;
  errMsg?: string[];
}
export default function AuthInput({
  inputId,
  inputName,
  labelTxt,
  inputType,
  placeHolder,
  className,
  errMsg,
}: IAuthInputTypes) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={inputId} className="font-bold">
        {labelTxt}
      </label>
      <input
        id={inputId}
        name={inputName}
        type={inputType}
        placeholder={placeHolder}
        className={`px-2 py-2 rounded-md border ${className}`}
      />
      {errMsg && errMsg.map((value, index) => <span key={index}>{value}</span>)}
    </div>
  );
}
