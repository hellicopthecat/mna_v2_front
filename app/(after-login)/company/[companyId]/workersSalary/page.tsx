import WorkersSalaryListCard from "@/components/company/workersSalary/WorkersSalaryListCard";
import ListLayout from "@/components/layout/company/ListLayout";
import ToGoBtn from "@/components/layout/navigation/ToGoBtn";
import {ACCESSTOKEN} from "@/constants/constant";
import {isError} from "@/libs/utils/util";
import {IResponseErrorType} from "@/types/response/responseType";
import {ISalaryType} from "@/types/salary/salaryType";
import {cookies} from "next/headers";

const getWorkersSalary = async (companyId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company-workers-salary/${companyId}`,
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
  return data as ISalaryType[];
};
const isManager = async (companyId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company-manager/isManager/${companyId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
      },
    }
  );
  const data = await response.json();
  return data as boolean;
};
export default async function Page({
  params,
}: {
  params: Promise<{companyId: string}>;
}) {
  const {companyId} = await params;
  const data = await getWorkersSalary(companyId);
  const manager = await isManager(companyId);

  return (
    <ListLayout goBack={`/company/${companyId}`}>
      {manager && (
        <ToGoBtn
          linkTxt={`/company/${companyId}/workersSalary/create-salary`}
          txt="급여 생성 하기"
        />
      )}
      <ul className="flex flex-col gap-2 fadeInCard">
        {isError(data) ? (
          <p>{data.message}</p>
        ) : (
          data.map((val) => (
            <WorkersSalaryListCard
              key={val.id}
              data={val}
              isManager={manager}
            />
          ))
        )}
      </ul>
    </ListLayout>
  );
}
