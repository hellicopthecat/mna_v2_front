"use client";
import findWorkerModal from "@/app/(after-login)/company/[companyId]/workers/findWorker/actions";
import ModalLayout from "@/components/layout/modalLayout/ModalLayout";
import {isError} from "@/libs/utils/util";
import {useActionState, useEffect, useState} from "react";
import FindWorkerCard from "./FindWorkerCard";
import {IUserTypes} from "@/types/user/userType";

const initialState = {
  errMsg: undefined,
  resErr: undefined,
  userData: undefined,
};
export default function FindWorkerModal({
  companyId,
  token,
}: {
  companyId: string;
  token: string;
}) {
  const [userName, setUserName] = useState("");
  const [state, action, pending] = useActionState(
    findWorkerModal,
    initialState
  );
  useEffect(() => {
    const formData = new FormData();
    formData.set("userName", userName);
    action(formData);
  }, [userName, action]);

  return (
    <ModalLayout>
      <div className="z-50 w-full h-3/4 flex flex-col gap-10 bg-slate-800 p-4 rounded-md">
        <form
          action={action}
          className=" flex items-center justify-between gap-3 text-nowrap bg-slate-500 p-4 rounded-md"
        >
          <label htmlFor="userName">
            <div className="size-2 rounded-full bg-red-500" />
          </label>
          <input
            id="userName"
            name="userName"
            type="text"
            placeholder="유저이름을 입력하세요."
            defaultValue={userName}
            onChange={(event) => setUserName(event.target.value)}
            className="border-2 border-x-0 border-t-0 border-b-blue-500 px-2 w-full"
          />
          <button className="bg-blue-500 p-2 rounded-md">찾기</button>
        </form>
        <div className="w-full h-full p-4 bg-slate-500 rounded-md overflow-y-auto">
          {pending ? (
            <p>...</p>
          ) : isError(state.userData) ? (
            <>
              <p>{state.userData.message}</p>
              <p>{state.resErr}</p>
            </>
          ) : (
            <ul className="flex flex-col gap-3">
              <FindWorkerCard
                data={state.userData as IUserTypes[]}
                companyId={companyId}
                token={token}
              />
            </ul>
          )}
        </div>
      </div>
    </ModalLayout>
  );
}
