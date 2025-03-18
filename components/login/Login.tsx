"use client";

import Link from "next/link";
import AuthInput from "../layout/authLayout/AuthInput";
import {useActionState} from "react";
import {loginAction} from "@/app/(before-login)/login/actions";
const initialState = {
  errMsg: undefined,
};
export default function Login() {
  const [initState, action] = useActionState(loginAction, initialState);
  return (
    <form
      action={action}
      method="POST"
      className="flex flex-col items-center gap-3 m-auto border border-[#3b99e1] p-5 rounded-lg w-96"
    >
      <h2 className="text-2xl font-bold">Welcome Back</h2>
      <AuthInput
        inputId="email"
        inputName="email"
        labelTxt="Email"
        inputType="email"
        placeHolder="이메일을 입력해주세요."
      />
      <AuthInput
        inputId="password"
        inputName="password"
        labelTxt="Password"
        inputType="password"
        placeHolder="비밀번호를 입력해주세요."
      />
      <button className="bg-red-400 w-full rounded-md py-2">로그인</button>
      <p>
        아직 회원이 아니십니까?
        <Link href="/join" className="text-mainblue">
          회원가입
        </Link>
      </p>
    </form>
  );
}
