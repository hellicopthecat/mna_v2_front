import ListLayout from "@/components/layout/company/ListLayout";
import {REFRESHTOKEN} from "@/constants/constant";
import {IUserTypes} from "@/types/user/userType";
import {cookies} from "next/headers";
const getCompanyWorker = async (companyId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company-workers/${companyId}`,
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
  const data = await getCompanyWorker(companyId);
  console.log(data);
  return (
    <ListLayout goBack={`/company/${companyId}`}>
      <ul>
        {!data || data.length === 0 ? (
          <li>사원이 없습니다.</li>
        ) : (
          <li>사원이 존재합니다.</li>
        )}
      </ul>
    </ListLayout>
  );
}
