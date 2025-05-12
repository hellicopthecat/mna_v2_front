"use client";
import {isError} from "@/libs/utils/util";
import {IResponseErrorType} from "@/types/response/responseType";
import {IVacationTypes} from "@/types/vacation/vacationType";
import {useState} from "react";
import WorkerVacationInfo from "./WorkerVacationInfo";
import WorkerVacationEdit from "./WorkerVacationEdit";

export default function WorkerVacationCard({
  data,
}: {
  data: IVacationTypes[] | IResponseErrorType;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <ul>
      {isError(data) ? (
        <li>{data.message}</li>
      ) : (
        data.map((val) => (
          <li
            key={val.id}
            className="odd:bg-slate-600 even:bg-slate-700 p-2 rounded-md "
          >
            <button
              onClick={() => setOpen(val.id)}
              className="flex items-center justify-between w-full cursor-pointer"
            >
              <h3 className="font-bold text-2xl">{val.user?.userName}</h3>
              <div className="flex flex-col *:flex *:items-center *:gap-2 *:self-end">
                <div>
                  <span>총 휴가일 수</span>
                  <span>{val.totalVacation} 일</span>
                </div>
                <div>
                  <span>남은연차</span>
                  <span>{val.restAnnualVacation} 일</span>
                </div>
                <div>
                  <span>남은기타연차</span>
                  <span>{val.restOtherVacation} 일</span>
                </div>
              </div>
            </button>
            {open && (
              <div className="bg-black/75 w-full h-full absolute  left-0 top-0 flex justify-center items-center">
                <div
                  onClick={() => {
                    setOpen(null);
                    setEdit(false);
                  }}
                  className="w-full h-full absolute z-40"
                />
                <div className="relative z-50 bg-slate-600 p-2 rounded-md w-96 flex flex-col gap-2">
                  <h4 className="text-center font-bold text-xl">
                    {`${val.user.firstName} ${val.user.lastName} 님의 휴가현황`}
                  </h4>
                  {!edit ? (
                    <WorkerVacationInfo data={val} />
                  ) : (
                    <WorkerVacationEdit data={val} editMode={setEdit} />
                  )}
                  {!edit && (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setEdit(true)}
                        className="bg-blue-500 rounded-md p-2"
                      >
                        편집
                      </button>
                      <button
                        onClick={() => setOpen(null)}
                        className="bg-slate-700 rounded-md p-2"
                      >
                        취소
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </li>
        ))
      )}
    </ul>
  );
}
