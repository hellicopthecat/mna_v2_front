import {IUserTypes} from "@/types/user/userType";
import Image from "next/image";
import Link from "next/link";

export default function MyPageUserInfo({user}: {user: IUserTypes}) {
  return (
    <div className="flex flex-col gap-3 bg-darkcard p-5 rounded-md ">
      {/* avatar */}
      <div className="outline-2 outline-offset-4 outline-indigo-500 rounded-full self-center">
        {user.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt="아바타이미지"
            className="self-center"
          />
        ) : (
          <div className="size-52 bg-blue-500 rounded-full " />
        )}
      </div>
      {/* user info */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">{user.userName}</h2>

        <p className="text-lg text-gray-400 flex justify-center gap-2">
          <span>{user.firstName}</span>
          <span>{user.lastName}</span>
        </p>

        <div className="text-gray-400 space-y-1 text-sm">
          <p>📞 {user.phone}</p>
          <p>📧 {user.email}</p>
        </div>
      </div>

      <Link
        href={"/my-page/edit-user"}
        className="self-center ring ring-slate-400 px-3 py-2 rounded-lg"
      >
        회원정보수정
      </Link>

      <div className="flex flex-col gap-3 *:rounded-md *:text-center *:w-full">
        <Link href={`/my-page/my-company`} className="bg-blue-500 p-2 ">
          보유 회사 보기 ({user.ownedCompany.length})
        </Link>
        <Link href={`/my-page/joined-company`} className="bg-indigo-500 p-2">
          직원으로 등록된 회사 보기 ({user.workAtCompany.length})
        </Link>
      </div>
    </div>
  );
}
