import GoBackBtn from "@/components/layout/navigation/GoBackBtn";
import EditUserForm from "@/components/myPage/editUser/EditUserForm";
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
    <div className="flex flex-col gap-3">
      {isError(user) ? (
        <p>회원데이터를 불러오는데 실패했습니다.</p>
      ) : (
        <>
          <GoBackBtn href="/my-page" />
          <EditUserForm data={user} />
        </>
      )}
    </div>
  );
}
