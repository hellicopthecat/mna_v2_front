"use client";
import Link from "next/link";
import {logOutBtn} from "../../../app/(after-login)/_logout/logout";

export default function GlobalNavition({
  token,
  userId,
}: {
  token: string | undefined;
  userId: string;
}) {
  return (
    <nav className="w-full flex justify-between items-center">
      <Link href="/" className="size-10 bg-red-500 rounded-full"></Link>
      <ul className="flex gap-5 *:flex *:items-center *:px-2 *:py-1 *:rounded-lg ">
        {!token && (
          <>
            <li className="bg-mainblue">
              <Link href="/login" className="">
                로그인
              </Link>
            </li>
            <li className="border-2 border-mainblue">
              <Link href="/join" className="">
                회원가입
              </Link>
            </li>
          </>
        )}
        {token && (
          <>
            <li className="flex items-center gap-2">
              <div className="bg-fuchsia-500 p-2 rounded-full size-5" />
              <Link href={`/my-page`}>{userId}</Link>
            </li>
            <li className="bg-mainblue">
              <button onClick={() => logOutBtn()} className="cursor-pointer">
                로그아웃
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
