import WorkerVacationCard from "@/components/company/workersVacations/WorkerVacationCard";
import ListLayout from "@/components/layout/company/ListLayout";
import ToGoBtn from "@/components/layout/navigation/ToGoBtn";
import {ACCESSTOKEN} from "@/constants/constant";
import {IResponseErrorType} from "@/types/response/responseType";
import {IVacationTypes} from "@/types/vacation/vacationType";
import {cookies} from "next/headers";

const getWorkersVacation = async (companyId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company-workers-vacation/${companyId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    return data as IResponseErrorType;
  }
  return data as IVacationTypes[];
};
export default async function Page({
  params,
}: {
  params: Promise<{companyId: string}>;
}) {
  const {companyId} = await params;
  const data = await getWorkersVacation(companyId);
  return (
    <ListLayout goBack={`/company/${companyId}`}>
      <ToGoBtn
        linkTxt={`/company/${companyId}/workersVacations/create-vacation`}
        txt="휴가생성하기"
      />
      <WorkerVacationCard data={data} />
    </ListLayout>
  );
}
