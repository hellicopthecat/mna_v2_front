"use client";
import createVacationAction, {
  ICreateVacationStates,
} from "@/app/(after-login)/company/[companyId]/workersVacations/create-vacation/actions";
import WorkerListLayout from "@/components/layout/company/WorkerListLayout";
import ModalLayout from "@/components/layout/modalLayout/ModalLayout";
import {getToday} from "@/libs/utils/util";
import {IResponseErrorType} from "@/types/response/responseType";
import {IUserTypes} from "@/types/user/userType";
import {IVacationTypes} from "@/types/vacation/vacationType";
import {useActionState, useState} from "react";

const initState = {
  companyId: "",
  userId: "",
  errMsg: undefined,
  resErr: undefined,
};
export default function CreateVacation({
  data,
  companyId,
}: {
  data: IUserTypes[] | IResponseErrorType;
  companyId: string;
}) {
  const [open, setOpen] = useState<null | number>(null);
  const [createMode, setCreateMode] = useState(false);
  const [user, setUser] = useState<IUserTypes | null>(null);
  const [state, action] = useActionState(
    async (prevState: ICreateVacationStates, formData: FormData) => {
      return await createVacationAction(prevState, formData);
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
    vacation: IVacationTypes[],
    companyId: number,
    userId: number
  ) => {
    const existVacation = vacation.find(
      (vacation) => vacation.company.id === companyId
    );
    if (existVacation) {
      closeModals();
    }
    initState.companyId = companyId + "";
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
              휴가를 생성하시겠습니까?
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  openForm(
                    user?.vacation as IVacationTypes[],
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
              휴가 생성을 위해 다음을 작성하세요
            </h3>
            <div className="flex flex-col gap-1">
              <label htmlFor="joinCompanyDate">입사일</label>
              <input
                id="joinCompanyDate"
                type="date"
                name="joinCompanyDate"
                defaultValue={getToday()}
                max={getToday()}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="other">기타휴가일수</label>
              <input id="other" type="text" name="other" defaultValue={0} />
            </div>

            <div className="flex items-center gap-2">
              <button className="bg-blue-500 p-2 rounded-md w-full">
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
          </form>
        )}
      </WorkerListLayout>
    </ModalLayout>
  );
}
