import CreateInExForm from "@/components/company/companyAsset/createForm/createInEx/CreateInExForm";
import {IAssetsParamsType} from "@/types/company/assetsParamsType";

export default async function Page({
  params,
}: {
  params: Promise<IAssetsParamsType>;
}) {
  const {companyId, assetId} = await params;
  return <CreateInExForm companyId={companyId} assetId={assetId} />;
}
