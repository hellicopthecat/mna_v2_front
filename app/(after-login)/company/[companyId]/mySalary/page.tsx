import MySalaryCard from "@/components/company/mySalary/MySalaryCard";
import ListLayout from "@/components/layout/company/ListLayout";
import {ACCESSTOKEN} from "@/constants/constant";
import {isError} from "@/libs/utils/util";
import {IResponseErrorType} from "@/types/response/responseType";
import {ISalaryType} from "@/types/salary/salaryType";
import {cookies} from "next/headers";

const getMySalary = async (companyId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company-workers-salary/mySalary/${companyId}`,
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
  return data as ISalaryType;
};

export default async function Page({
  params,
}: {
  params: Promise<{companyId: string}>;
}) {
  const {companyId} = await params;
  const data = await getMySalary(companyId);
  return (
    <ListLayout goBack={`/company/${companyId}`}>
      {isError(data) ? <p>{data.message}</p> : <MySalaryCard data={data} />}
    </ListLayout>
  );
}
