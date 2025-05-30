"use client";
import {isError} from "@/libs/utils/util";
import {IResponseErrorType} from "@/types/response/responseType";
import {IUserTypes} from "@/types/user/userType";
import Image from "next/image";
import {Dispatch, SetStateAction} from "react";

export default function WorkerListLayout({
  data,
  children,
  open,
  openFn,
  setUserFn,
}: {
  data: IUserTypes[] | IResponseErrorType;
  open: null | number;
  openFn: Dispatch<SetStateAction<number | null>>;
  setUserFn: Dispatch<SetStateAction<IUserTypes | null>>;
  children: React.ReactNode;
}) {
  return (
    <ul className="z-40 w-96 h-96 p-3 rounded-md bg-slate-700 overflow-y-auto flex flex-col gap-2">
      {isError(data) ? (
        <li>{data.message}</li>
      ) : (
        data.map((val) => (
          <li
            key={val.id}
            className="odd:bg-slate-500 even:bg-slate-600 p-3 rounded-md shadow-[3px_3px_4px] shadow-slate-800"
          >
            <button
              onClick={() => {
                openFn(val.id);
                setUserFn(val);
                console.log(val);
              }}
              className="flex justify-between items-center w-full cursor-pointer"
            >
              {val.avatarUrl?.includes(".jpg") ? (
                <Image src={val.avatarUrl} alt="아바타이미지" />
              ) : (
                <div className="size-7 odd:bg-teal-600 even:bg-cyan-600 rounded-full shadow-xl shadow-slate-800" />
              )}
              <div className="*:text-end">
                <h3 className="font-bold text-2xl">{val.userName}</h3>
                <small>{val.email}</small>
              </div>
            </button>
            {open && (
              <div className="absolute z-50 left-0 top-0 bg-black/75 w-full h-full flex justify-center items-center">
                {children}
              </div>
            )}
          </li>
        ))
      )}
    </ul>
  );
}
