import MyPageNav from "@/components/myPage/navigation/MyPageNav";
import {IUserTypes} from "@/types/user/userType";
import {cookies} from "next/headers";
import Image from "next/image";
import Link from "next/link";

const userData = async () => {
  const cookie = await cookies();
  const user = await fetch(`http://localhost:4000/auth/myprofile`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${cookie.get("REFRESH_TOKEN")?.value}`,
    },
  });
  return user.json();
};

export default async function Page({
  params,
}: {
  params: Promise<{userId: string}>;
}) {
  const {userId} = await params;
  const user: IUserTypes = await userData();
  return (
    <div className="flex flex-col gap-5 w-full">
      <MyPageNav userId={userId} />
      <div className="flex flex-col gap-3 bg-darkcard p-5 rounded-md">
        {user.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt="아바타이미지"
            className=" self-center"
          />
        ) : (
          <div className="size-10 bg-blue-500 rounded-full self-center" />
        )}
        <div className="flex flex-col gap-3 [&>p]:flex [&>p]:flex-col [&>p]:*:first:font-bold">
          <p>
            <span>아이디</span>
            <span>{user.userName}</span>
          </p>
          <p>
            <span>이름(성)</span>
            <span>{user.firstName}</span>
          </p>
          <p>
            <span>이름</span>
            <span>{user.lastName}</span>
          </p>
          <p>
            <span>전화번호</span>
            <span>{user.phone}</span>
          </p>
          <p>
            <span>이메일</span>
            <span>{user.email}</span>
          </p>
        </div>
        <Link
          href={`/${userId}/my-company`}
          className="bg-blue-500 p-2 rounded-md self-center"
        >
          보유 회사 보기
        </Link>
      </div>
    </div>
  );
}
