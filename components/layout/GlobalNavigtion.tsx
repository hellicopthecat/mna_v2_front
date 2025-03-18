import Link from "next/link";

export default function GlobalNavition() {
  return (
    <nav className="w-full flex justify-between items-center p-5">
      <Link href="/" className="size-10 bg-red-500 rounded-full"></Link>
      <ul className="flex gap-5 *:flex *:items-center *:px-2 *:py-1 *:rounded-lg ">
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
      </ul>
    </nav>
  );
}
