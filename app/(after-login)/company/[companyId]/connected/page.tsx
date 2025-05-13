import ConnectedCompanyList from "@/components/company/connectCompany/ConnectedCompanyList";
import ListLayout from "@/components/layout/company/ListLayout";
import ToGoBtn from "@/components/layout/navigation/ToGoBtn";
import {REFRESHTOKEN} from "@/constants/constant";
import {ICompanyTypes} from "@/types/company/companyType";
import {IResponseErrorType} from "@/types/response/responseType";
import {cookies} from "next/headers";

const getConnectedCompany = async (companyId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company-connect/connected/${companyId}`,
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
  return data as ICompanyTypes[];
};
export default async function Page({
  params,
}: {
  params: Promise<{companyId: string}>;
}) {
  const {companyId} = await params;
  const data = await getConnectedCompany(companyId);
  return (
    <ListLayout goBack={`/company/${companyId}`}>
      <ToGoBtn
        linkTxt={`/company/${companyId}/connected/find-company`}
        txt="회사찾기"
      />
      <ConnectedCompanyList data={data} companyId={companyId} />
    </ListLayout>
  );
}
