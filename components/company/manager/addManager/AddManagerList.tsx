"use client";
import addManagerAction from "@/app/(after-login)/company/[companyId]/manager/addManager/actions";
import ModalLayout from "@/components/layout/modalLayout/ModalLayout";
import {isError} from "@/libs/utils/util";
import {IResponseErrorType} from "@/types/response/responseType";
import {IUserTypes} from "@/types/user/userType";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useState, useTransition} from "react";
const initialState = {
  ok: undefined,
  errMsg: undefined,
};
export default function AddManagerList({
  workers,
  companyId,
}: {
  workers: IUserTypes[] | IResponseErrorType;
  companyId: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState<number | null>(null);
  const [isPending, transitionFn] = useTransition();

  const actionFn = (workerId: number) => {
    transitionFn(async () => {
      const formData = new FormData();
      formData.append("companyId", companyId + "");
      formData.append("workerId", workerId + "");
      const {ok, errMsg} = await addManagerAction(initialState, formData);
      if (!ok) {
        alert(errMsg);
      } else {
        alert("등록되었습니다.");
        setOpen(null);
        router.back();
      }
    });
  };
  return (
    <ModalLayout>
      <ul className="relative z-50 w-full flex flex-col gap-3 p-2 rounded-md bg-slate-600 *:odd:bg-slate-800 *:even:bg-slate-700 *:odd:hover:bg-slate-900 *:even:hover:bg-slate-900 fadeInCard">
        {isError(workers) ? (
          <li>{workers.message}</li>
        ) : (
          workers.map((worker) => (
            <li
              key={worker.id}
              className="p-2 rounded-md transition ease-in-out duration-200"
            >
              <button
                onClick={() => setOpen(worker.id)}
                className="flex justify-between items-center w-full cursor-pointer"
              >
                {worker.avatarUrl.includes(".jpg") ? (
                  <Image src={worker.avatarUrl} alt="아바타이미지" />
                ) : (
                  <div className="size-7 rounded-full bg-blue-500" />
                )}
                <div className="flex flex-col gap-1 text-end">
                  <span>
                    {worker.firstName} {worker.lastName}
                  </span>
                  <span>{worker.userName}</span>
                  <small>{worker.email}</small>
                </div>
              </button>
              {open === worker.id && (
                <div
                  className={`absolute bg-slate-700 p-2 rounded-md w-full h-full left-0 top-0 flex flex-col items-center justify-center gap-6`}
                >
                  <h3>메니저로 등록하시겠습니까?</h3>
                  <div className="flex w-80 gap-5">
                    <button
                      type="button"
                      className="bg-blue-500 p-2 rounded-md w-full"
                      onClick={() => actionFn(worker.id)}
                      disabled={isPending}
                    >
                      {isPending ? "처리중.." : "확인"}
                    </button>
                    <button
                      type="button"
                      className="bg-blue-500 p-2 rounded-md w-full"
                      onClick={() => setOpen(null)}
                    >
                      취소
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </ModalLayout>
  );
}
