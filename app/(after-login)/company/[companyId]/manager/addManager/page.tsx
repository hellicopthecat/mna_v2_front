import AddManagerList from "@/components/company/manager/addManager/AddManagerList";
import {ACCESSTOKEN} from "@/constants/constant";
import {IResponseErrorType} from "@/types/response/responseType";
import {IUserTypes} from "@/types/user/userType";
import {cookies} from "next/headers";
const getCompanyWorker = async (companyId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company-manager/exceptManager/${companyId}`,
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
  const exceptManager = await getCompanyWorker(companyId);

  return <AddManagerList workers={exceptManager} companyId={companyId} />;
}
