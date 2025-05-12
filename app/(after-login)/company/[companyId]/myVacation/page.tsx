import MyVacationCard from "@/components/company/myVacation/MyVacationCard";
import ListLayout from "@/components/layout/company/ListLayout";
import {REFRESHTOKEN} from "@/constants/constant";
import {isError} from "@/libs/utils/util";
import {IResponseErrorType} from "@/types/response/responseType";
import {IVacationTypes} from "@/types/vacation/vacationType";
import {cookies} from "next/headers";

const getMyVacation = async (companyId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company-workers-vacation/my-vacation/${companyId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
      },
    }
  );

  const data = await response.json();
  if (!response.ok) {
    return data as IResponseErrorType;
  }
  return data as IVacationTypes;
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
      {isError(data) ? <p>{data.message}</p> : <MyVacationCard data={data} />}
    </ListLayout>
  );
}
