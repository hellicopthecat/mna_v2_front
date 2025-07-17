"use client";
import editAssetActions, {
  IEditAssetsState,
} from "@/app/(after-login)/company/[companyId]/[assetId]/totalAsset/_editAsset/actions";
import InputLayout from "@/components/layout/formLayout/inputLayout";
import CSRModalLayout from "@/components/layout/modalLayout/CSRModalLayout";
import {IAssetLiability} from "@/types/asset/assetType";
import {Dispatch, SetStateAction, useActionState} from "react";
interface IEditAssetProps {
  data: IAssetLiability;
  goBack: Dispatch<SetStateAction<number | null>>;
}
const initialState = {
  errMsg: undefined,
  resErr: undefined,
};
export default function EditAsset({data, goBack}: IEditAssetProps) {
  const [state, actions, pending] = useActionState(
    async (prevState: IEditAssetsState, formData: FormData) => {
      formData.set("id", data.id + "");
      const {errMsg, resErr} = await editAssetActions(prevState, formData);
      alert("편집이 완료되었습니다.");
      pageBack();
      return {errMsg, resErr};
    },
    initialState
  );
  //fn
  const pageBack = () => goBack(null);
  return (
    <CSRModalLayout goBack={pageBack}>
      <form
        action={actions}
        className="flex flex-col gap-3 bg-slate-700 p-5 rounded-md z-50 w-[50%]"
      >
        <InputLayout
          inputId="assetLiabilityName"
          inputName="assetLiabilityName"
          inputType="text"
          defaultValue={data.assetLiabilityName}
          labelTxt="자산제목"
          placeholder="자산제목을 입력해주세요"
          errMsg={state.errMsg?.fieldErrors.assetLiabilityName}
        />
        <InputLayout
          inputId="assetLiabilityType"
          inputName="assetLiabilityType"
          inputType="text"
          defaultValue={data.assetLiabilityType}
          labelTxt="자산타입"
          placeholder="자산타입을 입력해주세요.(토지, 건물, 주식 등등..)"
          errMsg={state.errMsg?.fieldErrors.assetLiabilityType}
        />
        <InputLayout
          inputId="assetValue"
          inputName="assetValue"
          inputType="number"
          labelTxt="자산값"
          defaultValue={data.assetValue}
          placeholder="자산값을 입력해주세요."
          errMsg={state.errMsg?.fieldErrors.assetValue}
        />
        <InputLayout
          inputId="assetLiabilityDesc"
          inputName="assetLiabilityDesc"
          inputType="text"
          labelTxt="자산설명"
          defaultValue={data.assetLiabilityDesc}
          placeholder="자산설명을 입력해주세요."
          errMsg={state.errMsg?.fieldErrors.assetLiabilityDesc}
        />
        <div className="flex justify-around self-center gap-5">
          <InputLayout
            inputId="currentAsset"
            inputName="current"
            inputType="radio"
            labelTxt="유동"
            value="on"
            defaultChecked={data.current}
            column={false}
          />
          <InputLayout
            inputId="nonCurrentAsset"
            inputName="current"
            inputType="radio"
            labelTxt="부동"
            value="off"
            defaultChecked={!data.current}
            column={false}
          />
        </div>
        <div className="flex justify-around self-center gap-5">
          <InputLayout
            inputId="assetBool"
            inputName="assetOrLiability"
            inputType="radio"
            labelTxt="자산"
            value="on"
            defaultChecked={data.assetOrLiability}
            column={false}
          />
          <InputLayout
            inputId="liabilityBool"
            inputName="assetOrLiability"
            inputType="radio"
            labelTxt="부채"
            value="off"
            defaultChecked={!data.assetOrLiability}
            column={false}
          />
        </div>

        <div className="flex gap-3 *:w-full *:p-2 *:rounded-md *:cursor-pointer">
          <button
            disabled={pending}
            className={`${
              pending ? "bg-slate-800" : "bg-slate-500"
            } hover:bg-slate-700`}
          >
            {pending ? "처리중..." : "편집"}
          </button>
          <button
            disabled={pending}
            className={`bg-slate-600`}
            onClick={pageBack}
          >
            취소
          </button>
        </div>
      </form>
    </CSRModalLayout>
  );
}
