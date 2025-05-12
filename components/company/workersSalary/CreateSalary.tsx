"use client";
import createSalaryAction, {
  ICreateSalaryStates,
} from "@/app/(after-login)/company/[companyId]/workersSalary/create-salary/actions";
import WorkerListLayout from "@/components/layout/company/WorkerListLayout";
import InputLayout from "@/components/layout/formLayout/inputLayout";
import ModalLayout from "@/components/layout/modalLayout/ModalLayout";
import {IResponseErrorType} from "@/types/response/responseType";
import {ISalaryType} from "@/types/salary/salaryType";
import {IUserTypes} from "@/types/user/userType";
import {useRouter} from "next/navigation";
import {useActionState, useState} from "react";

const initState = {
  companyId: "",
  userId: "",
  errMsg: undefined,
  resErr: undefined,
};
export default function CreateSalary({
  data,
  companyId,
}: {
  data: IUserTypes[] | IResponseErrorType;
  companyId: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState<null | number>(null);
  const [createMode, setCreateMode] = useState(false);
  const [user, setUser] = useState<IUserTypes | null>(null);
  const [state, action, pending] = useActionState(
    async (prevState: ICreateSalaryStates, formData: FormData) => {
      const {userId, companyId, errMsg, resErr} = await createSalaryAction(
        prevState,
        formData
      );
      if (!userId && !companyId && !errMsg && !resErr) {
        closeModals();
        router.back();
      }
      return {
        userId,
        companyId,
        errMsg,
        resErr,
      };
    },
    initState
  );
  //fn
  const closeModals = () => {
    initState.companyId = "";
    initState.userId = "";
    setOpen(null);
    setCreateMode(false);
    setUser(null);
  };
  const openForm = (
    salary: ISalaryType[],
    inputCompanyId: number,
    userId: number
  ) => {
    const existSalary = salary.find(
      (sal) => sal.company?.id === inputCompanyId
    );
    if (existSalary) {
      closeModals();
    }
    initState.companyId = inputCompanyId + "";
    initState.userId = userId + "";
    setCreateMode(true);
  };
  return (
    <ModalLayout>
      <WorkerListLayout
        data={data}
        open={open}
        openFn={setOpen}
        setUserFn={setUser}
      >
        {!createMode && (
          <div className="w-96 bg-slate-700 p-5 rounded-md flex flex-col gap-3">
            <h3 className="text-center font-bold text-xl">
              급여를 생성하시겠습니까?
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  openForm(
                    user?.salary as ISalaryType[],
                    Number(companyId),
                    Number(user?.id)
                  )
                }
                className="bg-blue-500 p-2 rounded-md w-full"
              >
                확인
              </button>
              <button
                type="button"
                className="bg-gray-500 p-2 rounded-md w-full"
                onClick={closeModals}
              >
                취소
              </button>
            </div>
          </div>
        )}
        {createMode && (
          <form
            action={action}
            className="w-96 bg-slate-700 p-5 rounded-md flex flex-col gap-3"
          >
            <h3 className="text-center font-bold text-lg">
              급여생성을 위해 다음을 작성하세요
            </h3>
            <div className="flex flex-col gap-2">
              <InputLayout
                inputId="preTaxMonthlySalary"
                inputName="preTaxMonthlySalary"
                inputType="number"
                labelTxt="세전월급"
                placeholder="세전월급여를 기입해주세요"
              />
              <InputLayout
                inputId="familyCount"
                inputName="familyCount"
                inputType="number"
                labelTxt="가족수"
                placeholder="전체 가족수를 기입해주세요"
              />
              <InputLayout
                inputId="childCount"
                inputName="childCount"
                inputType="number"
                labelTxt="자녀수"
                placeholder="자녀수를 기입해주세요"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`${
                  pending ? "bg-slate-400" : "bg-blue-500"
                } p-2 rounded-md w-full`}
              >
                {pending ? "처리중.." : "확인"}
              </button>
              <button
                type="button"
                className="bg-gray-500 p-2 rounded-md w-full"
                onClick={closeModals}
              >
                취소
              </button>
            </div>
          </form>
        )}
      </WorkerListLayout>
    </ModalLayout>
  );
}
