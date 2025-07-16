import CSRModalLayout from "@/components/layout/modalLayout/CSRModalLayout";
import {Dispatch, SetStateAction} from "react";
interface IEditAssetProps {
  goBack: Dispatch<SetStateAction<number | null>>;
}
export default function EditAsset({goBack}: IEditAssetProps) {
  const pageBack = () => goBack(null);
  return (
    <CSRModalLayout goBack={pageBack}>
      <div>hohoho</div>
    </CSRModalLayout>
  );
}
