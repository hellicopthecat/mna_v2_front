import TotalAssetList from "@/components/company/companyAsset/totalAsset/TotalAssetList";
import ListLayout from "@/components/layout/company/ListLayout";
import {ACCESSTOKEN} from "@/constants/constant";
import {IAssetLiability} from "@/types/asset/assetType";
import {IAssetsParamsType} from "@/types/company/assetsParamsType";
import {IResponseErrorType} from "@/types/response/responseType";
import {cookies} from "next/headers";

const getTotalAssets = async (assetId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/assets-liabilities/totalAsset/${assetId}`,
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
  return data as IAssetLiability[];
};

const isAmImanager = async (id: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company-manager/isManager/${id}`,
    {
      method: "GET",
      headers: {authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`},
    }
  );
  const data = await response.json();
  return data as boolean;
};

export default async function Page({
  params,
}: {
  params: Promise<IAssetsParamsType>;
}) {
  const {companyId, assetId} = await params;
  const data = await getTotalAssets(assetId);
  const isManager = await isAmImanager(companyId);

  return (
    <ListLayout goBack={`/company/${companyId}/${assetId}`}>
      <ul className="flex flex-col gap-2">
        <TotalAssetList data={data} isManager={isManager} />
      </ul>
    </ListLayout>
  );
}
