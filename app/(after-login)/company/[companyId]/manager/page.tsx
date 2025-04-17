import ListLayout from "@/components/layout/company/ListLayout";
import ToGoBtn from "@/components/layout/navigation/ToGoBtn";
import {REFRESHTOKEN} from "@/constants/constant";
import {IUserTypes} from "@/types/user/userType";
import {cookies} from "next/headers";
import Image from "next/image";

const getCompanyManager = async (companyId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company/manager/${companyId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
      },
    }
  );
  const data: IUserTypes[] = await response.json();
  return data;
};
export default async function Page({
  params,
}: {
  params: Promise<{companyId: string}>;
}) {
  const {companyId} = await params;
  const data = await getCompanyManager(companyId);
  console.log(data);
  return (
    <ListLayout goBack={`/company/${companyId}`}>
      <ToGoBtn
        linkTxt={`/company/${companyId}/manager/addManager`}
        txt="매니저등록"
      />
      <ul className="flex flex-col gap-2">
        {!data ? (
          <li>매니저가 존재하지 않습니다.</li>
        ) : (
          data.map((manager) => (
            <li
              key={manager.id}
              className="flex flex-col items-center  gap-5 p-2 rounded-md bg-slate-800 shadow-[2px_2px_3px] shadow-slate-600"
            >
              {manager.avatarUrl.includes(".jpg") ? (
                <Image src={manager.avatarUrl} alt="아바타" />
              ) : (
                <div className="size-16 rounded-full bg-green-600" />
              )}
              <span>{manager.userName}</span>
            </li>
          ))
        )}
      </ul>
    </ListLayout>
  );
}
