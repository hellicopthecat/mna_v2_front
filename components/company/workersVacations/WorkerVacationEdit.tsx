"use client";

import editVacationActions, {
  IEditVacationActionState,
} from "@/app/(after-login)/company/[companyId]/workersVacations/_edit-vacation/actions";
import {getToday, transformDate} from "@/libs/utils/util";
import {IVacationTypes} from "@/types/vacation/vacationType";
import {Dispatch, SetStateAction, useActionState, useEffect} from "react";
interface IWorkerVacationEdit {
  data: IVacationTypes;
  editMode: Dispatch<SetStateAction<boolean>>;
}
const initState = {
  vacationId: "",
  errMsg: undefined,
  resErr: undefined,
};
export default function WorkerVacationEdit({
  data,
  editMode,
}: IWorkerVacationEdit) {
  const [state, action] = useActionState(
    async (prevState: IEditVacationActionState, formData: FormData) => {
      const {vacationId, errMsg, resErr} = await editVacationActions(
        prevState,
        formData
      );
      if (!vacationId && !errMsg && !resErr) {
        editMode(false);
        return {
          vacationId,
          errMsg,
          resErr,
        };
      }
      return {
        vacationId,
        errMsg,
        resErr,
      };
    },
    initState
  );
  useEffect(() => {
    initState.vacationId = data.id + "";
  }, [data.id]);
  return (
    <form
      action={action}
      className="flex flex-col gap-2 *:flex *:items-center *:justify-between "
    >
      <div>
        <label htmlFor="joinCompanyDate">입사일</label>
        <input
          id="joinCompanyDate"
          name="joinCompanyDate"
          type="date"
          defaultValue={transformDate(data.joinCompanyDate)}
          max={getToday()}
        />
      </div>
      <div>
        <label htmlFor="other">기타휴가</label>
        <div className="flex gap-2">
          <input
            id="other"
            name="other"
            type="number"
            min={0}
            defaultValue={data.other}
            placeholder="기타휴일을 입력하세요."
            className="text-end focus:ring-2 focus:ring-inset focus:ring-red-500 outline-0"
          />
          <span>일</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button className="bg-blue-500 rounded-md p-2 w-full ">확인</button>
        <button
          type="button"
          onClick={() => editMode(false)}
          className="bg-slate-700 rounded-md p-2 w-full "
        >
          취소
        </button>
      </div>
    </form>
  );
}
