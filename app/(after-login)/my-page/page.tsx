import MyPageUserInfo from "@/components/myPage/MyPageUserInfo";
import MyPageNav from "@/components/myPage/navigation/MyPageNav";
import {ACCESSTOKEN} from "@/constants/constant";
import {isError} from "@/libs/utils/util";
import {IResponseErrorType} from "@/types/response/responseType";
import {IUserTypes} from "@/types/user/userType";
import {cookies} from "next/headers";

const userData = async () => {
  const cookie = await cookies();
  const response = await fetch(`http://localhost:4000/auth/myprofile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    return data as IResponseErrorType;
  }
  return data as IUserTypes;
};

export default async function Page() {
  const user = await userData();
  return (
    <div className="flex flex-col gap-5 w-full">
      {isError(user) ? (
        <p>회원을 불러오는데 실패하였습니다.</p>
      ) : (
        <>
          <MyPageNav />
          <MyPageUserInfo user={user} />
        </>
      )}
    </div>
  );
}
