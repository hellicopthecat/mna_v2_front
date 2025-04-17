import CreateAssetLiabilityForm from "@/components/company/companyAsset/createForm/createAssetLiability/CreateAssetLiabilityForm";
import {IAssetsParamsType} from "@/types/company/assetsParamsType";

export default async function Page({
  params,
}: {
  params: Promise<IAssetsParamsType>;
}) {
  const {companyId, assetId} = await params;
  return <CreateAssetLiabilityForm companyId={companyId} assetId={assetId} />;
}
