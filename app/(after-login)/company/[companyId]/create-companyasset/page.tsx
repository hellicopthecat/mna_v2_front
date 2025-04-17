"use client";

import {useActionState} from "react";
import {creaetCompanyAssetAction} from "./actions";
import InputLayout from "@/components/layout/formLayout/inputLayout";
import {useParams} from "next/navigation";
const initialState = {
  errMsg: undefined,
  resErr: undefined,
};
export default function Page() {
  const {companyId} = useParams() as {companyId: string};
  const [initState, action, isPending] = useActionState(
    creaetCompanyAssetAction,
    initialState
  );
  return (
    <form action={action} className="flex flex-col gap-3 w-full">
      <input type="text" name="companyId" defaultValue={companyId} hidden />
      <InputLayout
        labelTxt="자산"
        inputId="budget"
        inputName="budget"
        inputType="number"
        placeholder="자산"
        errMsg={initState?.errMsg?.fieldErrors.budget}
      />
      <InputLayout
        labelTxt="계좌번호"
        inputId="accountNum"
        inputName="accountNum"
        inputType="text"
        placeholder="계좌번호"
        errMsg={initState?.errMsg?.fieldErrors.accountNum}
      />
      <InputLayout
        labelTxt="계좌이름"
        inputId="accountName"
        inputName="accountName"
        inputType="text"
        placeholder="계좌이름"
        errMsg={initState?.errMsg?.fieldErrors.accountName}
      />
      <InputLayout
        labelTxt="계좌설명"
        inputId="accountDesc"
        inputName="accountDesc"
        inputType="text"
        placeholder="계좌설명"
        errMsg={initState?.errMsg?.fieldErrors.accountDesc}
      />
      <button
        className={` w-full rounded-md py-2 ${
          isPending ? "bg-red-400" : "bg-blue-500"
        }`}
      >
        회계생성
      </button>
    </form>
  );
}
