"use client";

import editInExAction, {
  IEditInExActionState,
} from "@/app/(after-login)/company/[companyId]/[assetId]/totalInEx/_editInEx/actions";
import InputLayout from "@/components/layout/formLayout/inputLayout";
import CSRModalLayout from "@/components/layout/modalLayout/CSRModalLayout";
import {IIncomeExpend} from "@/types/asset/assetType";
import {Dispatch, SetStateAction, useActionState} from "react";
interface IEditInExProps {
  data: IIncomeExpend;
  goBack: Dispatch<SetStateAction<number | null>>;
}
const initialState = {
  errMsg: undefined,
  resErr: undefined,
};
export default function EditInEx({data, goBack}: IEditInExProps) {
  const [state, action, pending] = useActionState(
    async (prevState: IEditInExActionState, formData: FormData) => {
      formData.set("id", data.id + "");
      const {errMsg, resErr} = await editInExAction(prevState, formData);
      if (!errMsg && !resErr) {
        pageBack();
      }
      return {errMsg, resErr};
    },
    initialState
  );

  //fn
  const pageBack = () => goBack(null);

  return (
    <CSRModalLayout goBack={pageBack}>
      <form
        action={action}
        className="bg-slate-700 z-50 rounded-md p-5 flex flex-col gap-5"
      >
        <InputLayout
          inputId="title"
          inputName="title"
          inputType="text"
          labelTxt="제목"
          value={data.title}
          placeholder={data.title || "제목을 입력하세요."}
          errMsg={state.errMsg?.fieldErrors.title}
          required
        />
        <InputLayout
          inputId="cost"
          inputName="cost"
          inputType="number"
          labelTxt="가격"
          value={data.cost + ""}
          placeholder={data.cost + "" || "가격을 입력하세요"}
          errMsg={state.errMsg?.fieldErrors.cost}
          required
        />
        <InputLayout
          inputId="businessDate"
          inputName="businessDate"
          inputType="text"
          labelTxt="거래일자"
          value={data.businessDate}
          placeholder={data.businessDate || "거래일자를 수기로 작성해주세요."}
          errMsg={state.errMsg?.fieldErrors.businessDate}
        />
        <InputLayout
          inputId="paymentType"
          inputName="paymentType"
          inputType="text"
          labelTxt="거래방법"
          value={data.paymentType}
          placeholder={data.paymentType || "거래방법을 입력하세요."}
          errMsg={state.errMsg?.fieldErrors.paymentType}
        />
        <InputLayout
          inputId="businessDesc"
          inputName="businessDesc"
          inputType="text"
          labelTxt="거래설명"
          value={data.businessDesc}
          placeholder={data.businessDesc || "거래설명을 작성해주세요"}
          errMsg={state.errMsg?.fieldErrors.businessDesc}
        />
        <div className="flex justify-around">
          <InputLayout
            inputId="income"
            inputName="incomeTrue"
            inputType="radio"
            labelTxt="수입"
            value="on"
            defaultChecked={data.incomeTrue}
            column={false}
          />
          <InputLayout
            inputId="expend"
            inputName="incomeTrue"
            inputType="radio"
            labelTxt="지출"
            value="off"
            defaultChecked={!data.incomeTrue}
            column={false}
          />
        </div>
        <div className="flex justify-between gap-3">
          <InputLayout
            inputId="payments_wait"
            inputName="paymentsDone"
            inputType="radio"
            labelTxt="결제대기"
            value="WAIT"
            defaultChecked={data.paymentsDone === "WAIT"}
            column={false}
          />
          <InputLayout
            inputId="payments_paid"
            inputName="paymentsDone"
            inputType="radio"
            labelTxt="지불됨"
            value="PAID"
            defaultChecked={data.paymentsDone === "PAID"}
            column={false}
          />
          <InputLayout
            inputId="payments_nonpaid"
            inputName="paymentsDone"
            inputType="radio"
            labelTxt="지불안됨"
            value="NONPAID"
            defaultChecked={data.paymentsDone === "NONPAID"}
            column={false}
          />
        </div>
        <div
          className={`flex gap-3 *:w-full *:p-2 ${
            pending ? "*:first:bg-gray-700" : "*:first:bg-slate-600"
          } *:first:hover:bg-slate-500 *:last:bg-slate-800 *:last:hover:bg-slate-900 *:rounded-md *:cursor-pointer`}
        >
          <button disabled={pending}>편집</button>
          <button onClick={pageBack}>취소</button>
        </div>
      </form>
    </CSRModalLayout>
  );
}
