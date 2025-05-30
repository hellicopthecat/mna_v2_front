import WorkerList from "@/components/company/workers/workerList/WorkerList";
import ListLayout from "@/components/layout/company/ListLayout";
import ToGoBtn from "@/components/layout/navigation/ToGoBtn";
import {ACCESSTOKEN} from "@/constants/constant";
import {isError} from "@/libs/utils/util";
import {IResponseErrorType} from "@/types/response/responseType";
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
        authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    return data as IResponseErrorType;
  }
  return data as IUserTypes[];
};
export default async function Page({
  params,
}: {
  params: Promise<{companyId: string}>;
}) {
  const {companyId} = await params;
  const data = await getCompanyWorker(companyId);
  return (
    <ListLayout goBack={`/company/${companyId}`}>
      <ToGoBtn
        linkTxt={`/company/${companyId}/workers/findWorker`}
        txt="사원찾기"
      />
      <ul className="flex flex-col gap-2">
        {isError(data) ? <li>{data.message}</li> : <WorkerList data={data} />}
      </ul>
    </ListLayout>
  );
}
