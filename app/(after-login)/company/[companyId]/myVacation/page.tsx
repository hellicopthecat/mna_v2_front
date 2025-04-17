import ListLayout from "@/components/layout/company/ListLayout";
import {REFRESHTOKEN} from "@/constants/constant";
import {IVacationTypes} from "@/types/vacation/vacationType";
import {cookies} from "next/headers";

const getMyVacation = async (companyId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company-workers/${companyId}/myVacation`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
      },
    }
  );

  const data: IVacationTypes = await response.json();
  return data;
};
export default async function Page({
  params,
}: {
  params: Promise<{companyId: string}>;
}) {
  const {companyId} = await params;
  const data = await getMyVacation(companyId);

  return (
    <ListLayout goBack={`/company/${companyId}`}>
      <div>
        {!data.id ? (
          <p>인사담당자가 아직 휴가를 생성하지 않았습니다.</p>
        ) : (
          <div>{data.user.userName}</div>
        )}
      </div>
    </ListLayout>
  );
}
