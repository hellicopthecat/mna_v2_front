"use client";

import {useRouter} from "next/navigation";
import ModalLayout from "../../../../layout/modalLayout/ModalLayout";
import {IAssetsParamsType} from "@/types/company/assetsParamsType";
import {useActionState, useState} from "react";
import createInExAction, {
  ICreateInExActionState,
} from "@/app/(after-login)/company/[companyId]/[assetId]/create-inex/actions";
import InputLayout from "@/components/layout/formLayout/inputLayout";
import {TPaymentsDoneType} from "@/types/asset/assetType";

const initState = {
  errMsg: undefined,
  resErr: undefined,
};
export default function CreateInExForm({
  companyId,
  assetId,
}: IAssetsParamsType) {
  //hooks
  const router = useRouter();
  const [income, setIncome] = useState(true);
  const [paymentsDone, setPaymentsDone] = useState<TPaymentsDoneType>(
    TPaymentsDoneType.WAIT
  );
  const [state, action] = useActionState(
    async (prevState: ICreateInExActionState, formData: FormData) => {
      formData.set("companyId", companyId);
      formData.set("assetId", assetId);
      const {errMsg, resErr} = await createInExAction(prevState, formData);
      if (!errMsg && !resErr) {
        alert("지출거래가 생성되었습니다.");
        goBack();
      }
      return {errMsg, resErr};
    },
    initState
  );
  //fn
  const goBack = () => router.back();
  return (
    <ModalLayout>
      <form
        action={action}
        className="relative z-50 w-96 flex flex-col gap-5 p-5 border border-blue-500 rounded-md bg-[#181a1b]"
      >
        <h3 className="text-3xl font-bold text-center">지출거래생성</h3>
        <InputLayout
          inputId="title"
          inputName="title"
          inputType="text"
          labelTxt="거래명"
          placeholder="거래명을 입력해주세요."
          errMsg={state.errMsg?.fieldErrors.title}
        />
        <InputLayout
          inputId="cost"
          inputName="cost"
          inputType="number"
          labelTxt="거래금액"
          placeholder="거래금액을 입력해주세요."
          errMsg={state.errMsg?.fieldErrors.cost}
        />
        <InputLayout
          inputId="businessDate"
          inputName="businessDate"
          inputType="text"
          labelTxt="거래일자"
          placeholder="거래일자를 입력해주세요."
          errMsg={state.errMsg?.fieldErrors.businessDate}
        />
        <InputLayout
          inputId="paymentType"
          inputName="paymentType"
          inputType="text"
          labelTxt="지불방법"
          placeholder="지불방법을 입력해주세요."
          errMsg={state.errMsg?.fieldErrors.paymentType}
        />
        <InputLayout
          inputId="businessDesc"
          inputName="businessDesc"
          inputType="text"
          labelTxt="거래설명"
          placeholder="거래설명을 입력해주세요."
          errMsg={state.errMsg?.fieldErrors.businessDesc}
        />
        <div className="flex justify-around">
          <div className="flex items-center gap-2">
            <label htmlFor="income">수입</label>
            <input
              id="income"
              type="radio"
              name="incomeTrue"
              onChange={() => setIncome(true)}
              defaultChecked={income}
              value="on"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="expend">지출</label>
            <input
              id="expend"
              type="radio"
              name="incomeTrue"
              onChange={() => setIncome(false)}
              defaultChecked={!income}
              value="off"
            />
          </div>
        </div>
        <div className="flex justify-around">
          <div className="flex items-center gap-2">
            <label htmlFor="income">대기</label>
            <input
              id="income"
              type="radio"
              name="paymentsDone"
              onChange={() => setPaymentsDone(TPaymentsDoneType.WAIT)}
              defaultChecked={paymentsDone === TPaymentsDoneType.WAIT}
              value={TPaymentsDoneType.WAIT}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="expend">지불됨</label>
            <input
              id="expend"
              type="radio"
              name="paymentsDone"
              onChange={() => setPaymentsDone(TPaymentsDoneType.PAID)}
              defaultChecked={paymentsDone === TPaymentsDoneType.PAID}
              value={TPaymentsDoneType.PAID}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="expend">비지불</label>
            <input
              id="expend"
              type="radio"
              name="paymentsDone"
              onChange={() => setPaymentsDone(TPaymentsDoneType.NONPAID)}
              defaultChecked={paymentsDone === TPaymentsDoneType.NONPAID}
              value={TPaymentsDoneType.NONPAID}
            />
          </div>
        </div>
        <button className="bg-sky-500 rounded-md p-2">생성</button>
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
