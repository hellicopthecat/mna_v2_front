"use client";
import createProductAction, {
  ICreateProductTypes,
} from "@/app/(after-login)/company/[companyId]/product/create-product/actions";
import InputLayout from "@/components/layout/formLayout/inputLayout";
import ModalLayout from "@/components/layout/modalLayout/ModalLayout";
import {TPaymentsDoneType} from "@/types/asset/assetType";
import {useRouter} from "next/navigation";
import {useActionState} from "react";
const initialState = {
  errMsg: undefined,
  resErr: undefined,
};
export default function CreateProduct({companyId}: {companyId: string}) {
  const router = useRouter();
  const [state, action] = useActionState(
    async (prevState: ICreateProductTypes, formData: FormData) => {
      formData.set("companyId", companyId);
      const {errMsg, resErr} = await createProductAction(prevState, formData);
      if (!errMsg && !resErr) {
        alert("상품생성이 완료되었습니다.");
        router.back();
      }
      return {errMsg, resErr};
    },
    initialState
  );
  return (
    <ModalLayout>
      <form
        action={action}
        className="relative z-50  flex flex-col w-full gap-2 bg-[#181a1b] border border-blue-500 p-5 rounded-md"
      >
        <h3 className="text-3xl font-bold text-center">상품 생성</h3>
        <input type="text" name="companyId" defaultValue={companyId} hidden />
        <InputLayout
          inputId="transactionTitle"
          inputName="transactionTitle"
          inputType="text"
          labelTxt="거래제목"
          placeholder="거래제목"
          errMsg={state.errMsg?.fieldErrors.transactionTitle}
        />
        <InputLayout
          inputId="itemName"
          inputName="itemName"
          inputType="text"
          labelTxt="상품이름"
          placeholder="상품이름"
          errMsg={state.errMsg?.fieldErrors.itemName}
        />
        <InputLayout
          inputId="itemModelName"
          inputName="itemModelName"
          inputType="text"
          labelTxt="상품모델명"
          placeholder="상품모델명"
          errMsg={state.errMsg?.fieldErrors.itemModelName}
        />
        <InputLayout
          inputId="itemPhoto"
          inputName="itemPhoto"
          inputType="file"
          labelTxt="상품사진"
          errMsg={state.errMsg?.fieldErrors.itemPhoto}
        />
        <InputLayout
          inputId="itemType"
          inputName="itemType"
          inputType="text"
          labelTxt="상품타입"
          placeholder="상품타입"
          errMsg={state.errMsg?.fieldErrors.itemType}
        />
        <InputLayout
          inputId="itemCount"
          inputName="itemCount"
          inputType="number"
          labelTxt="상품개수"
          placeholder="상품개수"
          errMsg={state.errMsg?.fieldErrors.itemCount}
        />
        <InputLayout
          inputId="itemPrice"
          inputName="itemPrice"
          inputType="number"
          labelTxt="가격"
          placeholder="가격"
          errMsg={state.errMsg?.fieldErrors.itemPrice}
        />
        <InputLayout
          inputId="itemDesc"
          inputName="itemDesc"
          inputType="text"
          labelTxt="상품설명"
          placeholder="상품설명"
          errMsg={state.errMsg?.fieldErrors.itemDesc}
        />
        <InputLayout
          inputId="paymentType"
          inputName="paymentType"
          inputType="text"
          labelTxt="결제수단"
          placeholder="결제수단"
          errMsg={state.errMsg?.fieldErrors.paymentType}
        />
        <div className="flex items-center justify-around self-center gap-10">
          <InputLayout
            inputId="incomeTrue"
            inputName="incomeTrue"
            inputType="radio"
            column={false}
            labelTxt="수입"
            defaultChecked
            value="income"
            errMsg={[]}
          />
          <InputLayout
            inputId="incomeTrue"
            inputName="incomeTrue"
            inputType="radio"
            column={false}
            labelTxt="지출"
            value="expend"
            errMsg={[]}
          />
        </div>
        <div className="flex items-center justify-around self-center gap-10">
          <InputLayout
            inputId="paymentsDone"
            inputName="paymentsDone"
            inputType="radio"
            column={false}
            labelTxt="지불"
            placeholder="지불"
            defaultChecked
            value={TPaymentsDoneType.PAID}
            errMsg={[]}
          />
          <InputLayout
            inputId="paymentsDone"
            inputName="paymentsDone"
            inputType="radio"
            column={false}
            labelTxt="비지불"
            placeholder="비지불"
            value={TPaymentsDoneType.NONPAID}
            errMsg={[]}
          />
          <InputLayout
            inputId="paymentsDone"
            inputName="paymentsDone"
            inputType="radio"
            column={false}
            labelTxt="대기"
            placeholder="대기"
            value={TPaymentsDoneType.WAIT}
            errMsg={[]}
          />
        </div>
        <button className="bg-blue-500 p-2 w-full rounded-md">생성</button>
        <button
          type="button"
          className="bg-blue-500 p-2 w-full rounded-md"
          onClick={() => router.back()}
        >
          취소
        </button>
      </form>
    </ModalLayout>
  );
}
