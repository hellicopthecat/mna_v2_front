"use client";
import InputLayout from "@/components/layout/formLayout/inputLayout";
import {useActionState, useEffect, useState} from "react";
import createAssetLiabilityAction, {
  ICreateAssetLiabilityTypes,
} from "../../../../../app/(after-login)/company/[companyId]/[assetId]/create-assetliability/actions";
import ModalLayout from "../../../../layout/modalLayout/ModalLayout";
import {useRouter} from "next/navigation";
import {IAssetsParamsType} from "@/types/company/assetsParamsType";

const initialState = {
  errMsg: undefined,
  resErr: undefined,
};
export default function CreateAssetLiabilityForm({
  companyId,
  assetId,
}: IAssetsParamsType) {
  //hooks
  const router = useRouter();
  const [current, setCurrent] = useState(true);
  const [assetLiability, setAssetLiability] = useState(true);
  const [modal, setModal] = useState(false);
  const [state, action, pending] = useActionState(
    async (prevState: ICreateAssetLiabilityTypes, formData: FormData) => {
      setModal(true);
      return await createAssetLiabilityAction(prevState, formData);
    },
    initialState
  );
  //fn
  const goBack = () => router.back();
  //effeck hook
  useEffect(() => {
    if (modal && !state.errMsg && !state.resErr) {
      alert("자산부채모델이 생성되었습니다.");
      router.back();
    }
  }, [state, router, modal]);
  return (
    <ModalLayout>
      <form
        action={action}
        className="relative z-50 w-96 flex flex-col gap-5 p-5 border border-blue-500 rounded-md bg-[#181a1b]"
      >
        <h3 className="text-3xl font-bold text-center">재산 생성</h3>
        <input type="text" name="companyId" defaultValue={companyId} hidden />
        <input type="text" name="assetId" defaultValue={assetId} hidden />
        <div className="flex justify-around items-center">
          <div>
            <div className="flex items-center gap-2">
              <label htmlFor="current">유동 </label>
              <input
                id="current"
                name="current"
                type="radio"
                onChange={() => setCurrent(true)}
                checked={current}
                value="on"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="nonCurrent">부동</label>
              <input
                id="nonCurrent"
                name="current"
                type="radio"
                onChange={() => setCurrent(false)}
                checked={!current}
                value="off"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <label htmlFor="asset">자산</label>
              <input
                id="asset"
                name="assetOrLiability"
                type="radio"
                onChange={() => setAssetLiability(true)}
                checked={assetLiability}
                value="on"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="liability">부채</label>
              <input
                id="liability"
                name="assetOrLiability"
                type="radio"
                onChange={() => setAssetLiability(false)}
                checked={!assetLiability}
                value="off"
              />
            </div>
          </div>
        </div>
        <InputLayout
          inputId="assetLiabilityName"
          inputName="assetLiabilityName"
          inputType="text"
          labelTxt="자산제목"
          placeholder="자산제목"
          errMsg={state.errMsg?.fieldErrors.assetLiabilityName}
        />
        <InputLayout
          inputId="assetLiabilityType"
          inputName="assetLiabilityType"
          inputType="text"
          labelTxt="자산타입"
          placeholder="자산타입"
          errMsg={state.errMsg?.fieldErrors.assetLiabilityType}
        />
        <InputLayout
          inputId="assetLiabilityDesc"
          inputName="assetLiabilityDesc"
          inputType="text"
          labelTxt="자산설명"
          placeholder="자산설명"
          errMsg={state.errMsg?.fieldErrors.assetLiabilityDesc}
        />
        <InputLayout
          inputId="assetValue"
          inputName="assetValue"
          inputType="text"
          labelTxt="자산값"
          placeholder="자산값"
          errMsg={state.errMsg?.fieldErrors.assetValue}
        />
        <button
          type="submit"
          className={`${pending ? "bg-red-500" : "bg-sky-500"} rounded-md p-2`}
        >
          재산생성
        </button>
        <button
          type="button"
          onClick={goBack}
          className="bg-sky-500 rounded-md p-2"
        >
          취소
        </button>
      </form>
    </ModalLayout>
  );
}
