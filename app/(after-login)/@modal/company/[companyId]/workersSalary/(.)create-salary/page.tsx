import CreateSalary from "@/components/company/workersSalary/CreateSalary";
import {ACCESSTOKEN} from "@/constants/constant";
import {IResponseErrorType} from "@/types/response/responseType";
import {IUserTypes} from "@/types/user/userType";
import {cookies} from "next/headers";
const getCompanyWorkers = async (companyId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company-workers-salary/create-worker-salary/${companyId}`,
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
  const data = await getCompanyWorkers(companyId);
  return <CreateSalary companyId={companyId} data={data} />;
}
