import CreateAssets from "@/components/company/companyAsset/CreateAssets";
import GoBackBtn from "@/components/layout/navigation/GoBackBtn";
import ToGoBtn from "@/components/layout/navigation/ToGoBtn";
import {REFRESHTOKEN} from "@/constants/constant";
import {IAssetTypes} from "@/types/asset/assetType";
import {IAssetsParamsType} from "@/types/company/assetsParamsType";
import {cookies} from "next/headers";

const getCompanyAsset = async (assetId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company-assets/${assetId}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
      },
    }
  );
  const asset = await response.json();
  return asset;
};
export default async function Page({
  params,
}: {
  params: Promise<IAssetsParamsType>;
}) {
  const {companyId, assetId} = await params;
  const asset: IAssetTypes = await getCompanyAsset(assetId);
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        <GoBackBtn href={`/company/${companyId}`} />
        <CreateAssets companyId={companyId} assetId={assetId} />
      </div>
      <section className="flex justify-between">
        <span>{asset.budget?.toLocaleString() + ""} 원</span>
        <div className="flex flex-col">
          <p className="flex items-center gap-3">
            <span>{asset.accountName}</span>
            <span>{asset.accountNum}</span>
          </p>
          <small className="self-end">{asset.accountDesc}</small>
        </div>
      </section>
      <ul className="flex flex-col items-center gap-5 *:w-full">
        <li className="flex w-full">
          <ToGoBtn
            linkTxt={`/company/${companyId}/${assetId}/totalAsset`}
            txt="총자산내역보러가기"
          />
        </li>
        <li className="flex w-full">
          <ToGoBtn
            linkTxt={`/company/${companyId}/${assetId}/totalInEx`}
            txt="총수입지출항목"
          />
        </li>
      </ul>
    </div>
  );
}
