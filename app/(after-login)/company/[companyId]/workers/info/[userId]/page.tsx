import WorkerInfo from "@/components/company/workers/wokerInfo/WorkerInfo";
import {ACCESSTOKEN} from "@/constants/constant";
import {IResponseErrorType} from "@/types/response/responseType";
import {IUserTypes} from "@/types/user/userType";
import {cookies} from "next/headers";

interface IWorkerPageParams {
  companyId: string;
  userId: string;
}
const getWokrerInfo = async ({companyId, userId}: IWorkerPageParams) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company-workers/${companyId}/${userId}`,
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
  return data as IUserTypes;
};
const amImanager = async (companyId: string) => {
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
  const result = await response.json();
  return result as boolean;
};
const isOwner = async (companyId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company-manager/isOwner/${companyId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
      },
    }
  );
  const result = await response.json();
  return result as boolean;
};

export default async function Page({
  params,
}: {
  params: Promise<IWorkerPageParams>;
}) {
  const {companyId, userId} = await params;
  const userData = await getWokrerInfo({companyId, userId});
  const manager = await amImanager(companyId);
  const owner = await isOwner(companyId);
  return (
    <WorkerInfo
      data={userData}
      manager={manager}
      owner={owner}
      companyId={companyId}
    />
  );
}
