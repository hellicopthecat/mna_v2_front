import TotalInEx from "@/components/company/companyAsset/totalInEx/TotalInEx";
import ListLayout from "@/components/layout/company/ListLayout";
import {REFRESHTOKEN} from "@/constants/constant";
import {IIncomeExpend} from "@/types/asset/assetType";
import {IAssetsParamsType} from "@/types/company/assetsParamsType";
import {cookies} from "next/headers";
const getTotalInEx = async (assetId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/income-expend/totalInEx/${assetId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
      },
    }
  );
  const data: IIncomeExpend[] = await response.json();
  return data;
};
export default async function Page({
  params,
}: {
  params: Promise<IAssetsParamsType>;
}) {
  const {companyId, assetId} = await params;
  const data = await getTotalInEx(assetId);
  console.log(data);
  return (
    <ListLayout goBack={`/company/${companyId}/${assetId}`}>
      <ul className="flex flex-col gap-2">
        <TotalInEx data={data} />
      </ul>
    </ListLayout>
  );
}
