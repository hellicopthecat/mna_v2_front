import TotalAssetList from "@/components/company/companyAsset/totalAsset/TotalAssetList";
import ListLayout from "@/components/layout/company/ListLayout";
import {REFRESHTOKEN} from "@/constants/constant";
import {IAssetLiability} from "@/types/asset/assetType";
import {IAssetsParamsType} from "@/types/company/assetsParamsType";
import {cookies} from "next/headers";
const getTotalAssets = async (assetId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/assets-liabilities/totalAsset/${assetId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
      },
    }
  );
  const data: IAssetLiability[] = await response.json();
  return data;
};
export default async function Page({
  params,
}: {
  params: Promise<IAssetsParamsType>;
}) {
  const {companyId, assetId} = await params;
  const data = await getTotalAssets(assetId);
  return (
    <ListLayout goBack={`/company/${companyId}/${assetId}`}>
      <ul className="flex flex-col gap-2">
        <TotalAssetList data={data} />
      </ul>
    </ListLayout>
  );
}
