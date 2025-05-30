import TotalInEx from "@/components/company/companyAsset/totalInEx/TotalInEx";
import ListLayout from "@/components/layout/company/ListLayout";
import {ACCESSTOKEN} from "@/constants/constant";
import {IIncomeExpend} from "@/types/asset/assetType";
import {IAssetsParamsType} from "@/types/company/assetsParamsType";
import {IResponseErrorType} from "@/types/response/responseType";
import {cookies} from "next/headers";
const getTotalInEx = async (assetId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/income-expend/totalInEx/${assetId}`,
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
  return data as IIncomeExpend[];
};
export default async function Page({
  params,
}: {
  params: Promise<IAssetsParamsType>;
}) {
  const {companyId, assetId} = await params;
  const data = await getTotalInEx(assetId);
  return (
    <ListLayout goBack={`/company/${companyId}/${assetId}`}>
      <ul className="flex flex-col gap-2">
        <TotalInEx data={data} />
      </ul>
    </ListLayout>
  );
}
