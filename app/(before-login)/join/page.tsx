"use client";
import AuthInput from "@/components/layout/authLayout/AuthInput";
import Link from "next/link";
import {joinAction} from "./actions";
import {useActionState} from "react";

const initialState = {
  errMsg: undefined,
  resMsg: undefined,
};

export default function Page() {
  const [state, action, isPending] = useActionState(joinAction, initialState);

  return (
    <form
      action={action}
      className="flex flex-col items-center gap-3 m-auto border border-[#3b99e1] p-5 rounded-lg w-96"
    >
      <h2 className="text-2xl font-bold">회원가입</h2>
      <AuthInput
        inputId="email"
        inputName="email"
        labelTxt="이메일"
        inputType="email"
        placeHolder="이메일을 입력해주세요"
        errMsg={state.errMsg?.fieldErrors.email}
      />
      <AuthInput
        inputId="userName"
        inputName="userName"
        labelTxt="유저이름"
        inputType="text"
        placeHolder="유저명을 입력하세요"
        errMsg={state.errMsg?.fieldErrors.email}
      />
      <AuthInput
        inputId="firstName"
        inputName="firstName"
        labelTxt="이름(성)"
        inputType="text"
        placeHolder="이름(성)을 입력해주세요"
        errMsg={state.errMsg?.fieldErrors.email}
      />
      <AuthInput
        inputId="lastName"
        inputName="lastName"
        labelTxt="이름"
        inputType="text"
        placeHolder="이름을 입력해주세요"
        errMsg={state.errMsg?.fieldErrors.email}
      />
      <AuthInput
        inputId="phone"
        inputName="phone"
        labelTxt="전화번호"
        inputType="text"
        placeHolder="전화번호를 입력해주세요"
        errMsg={state.errMsg?.fieldErrors.email}
      />
      <AuthInput
        inputId="password"
        inputName="password"
        labelTxt="비밀번호"
        inputType="password"
        placeHolder="비밀번호를 입력해주세요"
        errMsg={state.errMsg?.fieldErrors.email}
      />
      <AuthInput
        inputId="checkPass"
        inputName="checkPass"
        labelTxt="2차비밀번호"
        inputType="password"
        placeHolder="2차비밀번호를 입력해주세요"
        errMsg={state.errMsg?.fieldErrors.email}
      />
      <button
        className={` w-full rounded-md py-2 ${
          isPending ? "bg-red-400" : "bg-blue-500"
        }`}
      >
        회원가입
      </button>
      <p>
        이미 회원이십니까?{" "}
        <Link href="/login" className="text-mainblue">
          로그인
        </Link>
      </p>
    </form>
  );
}
