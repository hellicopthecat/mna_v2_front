"use client";

import editProductActions, {
  IEditProductStates,
} from "@/app/(after-login)/company/[companyId]/product/_editProduct/actions";
import InputLayout from "@/components/layout/formLayout/inputLayout";
import CSRModalLayout from "@/components/layout/modalLayout/CSRModalLayout";
import {IProductTypes} from "@/types/product/productType";
import {Dispatch, SetStateAction, useActionState} from "react";
interface IEditProductProps {
  data: IProductTypes;
  goBack: Dispatch<SetStateAction<number | null>>;
}
const initialState = {
  errMsg: undefined,
  resErr: undefined,
};
export default function EditProduct({data, goBack}: IEditProductProps) {
  const [state, action, pending] = useActionState(
    async (prevState: IEditProductStates, formData: FormData) => {
      formData.set("id", data.id + "");
      const {errMsg, resErr} = await editProductActions(prevState, formData);
      if (!errMsg && !resErr) {
        alert("상품을 수정하였습니댜.");
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
        className="bg-slate-600 p-5 z-50 flex flex-col gap-3 rounded-md w-[80%]"
      >
        <InputLayout
          inputId="transactionTitle"
          inputName="transactionTitle"
          inputType="text"
          labelTxt="거래제목"
          defaultValue={data.transactionTitle}
          placeholder="거래제목을 입력하세요"
          errMsg={state.errMsg?.fieldErrors.transactionTitle}
          required
        />
        <InputLayout
          inputId="itemName"
          inputName="itemName"
          inputType="text"
          labelTxt="상품이름"
          defaultValue={data.itemName}
          placeholder="상품이름을 입력하세요."
          errMsg={state.errMsg?.fieldErrors.itemName}
          required
        />
        <InputLayout
          inputId="itemModelName"
          inputName="itemModelName"
          inputType="text"
          labelTxt="상품모델명"
          defaultValue={data.itemModelName}
          placeholder="상품모델명을 입력하세요."
          errMsg={state.errMsg?.fieldErrors.itemModelName}
          required
        />
        <InputLayout
          inputId="itemPhoto"
          inputName="itemPhoto"
          inputType="text"
          labelTxt="상품사진"
          errMsg={state.errMsg?.fieldErrors.itemPhoto}
        />
        <InputLayout
          inputId="itemType"
          inputName="itemType"
          inputType="text"
          labelTxt="상품타입"
          defaultValue={data.itemType}
          placeholder="상품타입을 입력하세요"
          errMsg={state.errMsg?.fieldErrors.itemType}
        />
        <InputLayout
          inputId="itemCount"
          inputName="itemCount"
          inputType="number"
          labelTxt="상품수"
          defaultValue={data.itemCount}
          placeholder="상품수를 입력하세요."
          errMsg={state.errMsg?.fieldErrors.itemCount}
          required
        />
        <InputLayout
          inputId="itemPrice"
          inputName="itemPrice"
          inputType="number"
          labelTxt="상품가격"
          defaultValue={data.itemPrice}
          placeholder="상품가격을 입력하세요."
          errMsg={state.errMsg?.fieldErrors.itemPrice}
          required
        />
        <InputLayout
          inputId="paymentType"
          inputName="paymentType"
          inputType="number"
          labelTxt="결제타입"
          defaultValue={data.incomeExpend.paymentType}
          placeholder="결제타입을 입력하세요."
          errMsg={state.errMsg?.fieldErrors.paymentType}
        />
        <InputLayout
          inputId="itemDesc"
          inputName="itemDesc"
          inputType="text"
          labelTxt="상품설명"
          defaultValue={data.itemDesc}
          placeholder="상품설명을 입력하세요."
          errMsg={state.errMsg?.fieldErrors.itemDesc}
        />
        <div className="flex gap-5 justify-around self-center">
          <InputLayout
            inputId="income"
            inputName="incomeTrue"
            inputType="radio"
            labelTxt="수입"
            value="income"
            defaultChecked={data.incomeExpend.incomeTrue}
            placeholder="상품설명을 입력하세요."
            column={false}
          />
          <InputLayout
            inputId="expend"
            inputName="incomeTrue"
            inputType="radio"
            labelTxt="지출"
            value="expend"
            defaultChecked={!data.incomeExpend.incomeTrue}
            placeholder="상품설명을 입력하세요."
            column={false}
          />
        </div>
        <div className="flex gap-5 justify-between self-center">
          <InputLayout
            inputId="itemDesc"
            inputName="paymentsDone"
            inputType="radio"
            labelTxt="지불됨"
            value="PAID"
            defaultChecked={data.incomeExpend.paymentsDone === "PAID"}
            column={false}
            placeholder="상품설명을 입력하세요."
          />
          <InputLayout
            inputId="itemDesc"
            inputName="paymentsDone"
            inputType="radio"
            labelTxt="지불안됨"
            value="NONPAID"
            defaultChecked={data.incomeExpend.paymentsDone === "NONPAID"}
            column={false}
            placeholder="상품설명을 입력하세요."
          />
          <InputLayout
            inputId="itemDesc"
            inputName="paymentsDone"
            inputType="radio"
            labelTxt="결제대기"
            value="WAIT"
            defaultChecked={data.incomeExpend.paymentsDone === "WAIT"}
            column={false}
            placeholder="상품설명을 입력하세요."
          />
        </div>
        <div className="flex *:w-full *:rounded-md *:p-2 gap-2">
          <button
            className={`${
              pending ? "bg-slate-800" : "bg-slate-500"
            } hover:bg-slate-700`}
            disabled={pending}
          >
            {pending ? "처리중.." : "확인"}
          </button>
          <button className="bg-gray-500" disabled={pending} onClick={pageBack}>
            취소
          </button>
        </div>
      </form>
    </CSRModalLayout>
  );
}
