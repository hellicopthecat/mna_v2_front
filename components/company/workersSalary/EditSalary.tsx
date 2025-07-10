"use client";

import editSalaryAction from "@/app/(after-login)/company/[companyId]/workersSalary/_edit-salary/actions";
import InputLayout from "@/components/layout/formLayout/inputLayout";
import CSRModalLayout from "@/components/layout/modalLayout/CSRModalLayout";
import {ISalaryType} from "@/types/salary/salaryType";
import {Dispatch, SetStateAction, useActionState} from "react";

const initialState = {
  errMsg: undefined,
  resErr: undefined,
};
export default function EditSalary({
  data,
  goBack,
}: {
  data: ISalaryType;
  goBack: Dispatch<SetStateAction<boolean>>;
}) {
  const [state, actions, isPending] = useActionState(editSalaryAction, {
    id: data.id,
    ...initialState,
  });
  return (
    <CSRModalLayout goBack={goBack}>
      <form
        action={actions}
        className="bg-slate-700 p-5 rounded-md w-80 z-50 flex flex-col gap-5"
      >
        <h2 className="text-2xl font-semibold before:inline-flex before:content-[''] before:size-4 before:rounded-full before:bg-cyan-700 before:mr-2">
          급여수정
        </h2>
        <InputLayout
          inputId="preTaxMonthlySalary"
          inputName="preTaxMonthlySalary"
          inputType="number"
          labelTxt="세전급여"
          placeholder={data.preTaxMonthlySalary + ""}
          defaultValue={data.preTaxMonthlySalary}
          errMsg={state.errMsg?.fieldErrors.preTaxMonthlySalary}
        />
        <InputLayout
          inputId="familyCount"
          inputName="familyCount"
          inputType="number"
          labelTxt="가족수"
          placeholder={data.familyCount + ""}
          defaultValue={data.familyCount}
          errMsg={state.errMsg?.fieldErrors.familyCount}
        />
        <InputLayout
          inputId="childCount"
          inputName="childCount"
          inputType="number"
          labelTxt="자녀수"
          placeholder={data.childCount + ""}
          defaultValue={data.childCount}
          errMsg={state.errMsg?.fieldErrors.childCount}
        />
        <div className="flex justify-between gap-3">
          <button
            disabled={isPending}
            className={`w-full ${
              isPending ? "bg-slate-700" : "bg-slate-500"
            } py-2 rounded-md hover:bg-slate-400 cursor-pointer`}
          >
            편집
          </button>
          <button
            className="w-full bg-slate-600 py-2 rounded-md hover:bg-slate-500 cursor-pointer"
            type="button"
            onClick={() => goBack(false)}
          >
            취소
          </button>
        </div>
      </form>
    </CSRModalLayout>
  );
}
