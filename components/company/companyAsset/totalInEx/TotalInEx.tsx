"use client";
import {ChevronRight} from "@/components/icons/Chevron";
import IncomeTrueBadge from "@/components/layout/badge/IncomeTrueBadge";
import PaymentsDoneBadge from "@/components/layout/badge/PaymentsDoneBadge";
import {isError} from "@/libs/utils/util";
import {IIncomeExpend} from "@/types/asset/assetType";
import {IResponseErrorType} from "@/types/response/responseType";
import {useState} from "react";
import EditInEx from "./editInEx/EditInEx";
import EditBtn from "../btnComp/EditBtn";
import DeleteBtn from "../btnComp/DeleteBtn";
import deleteInExActions from "@/app/(after-login)/company/[companyId]/[assetId]/totalInEx/_deleteInEx/actions";

export default function TotalInEx({
  data,
  isManager,
}: {
  data: IIncomeExpend[] | IResponseErrorType;
  isManager: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [modal, setModal] = useState<number | null>(null);
  return (
    <>
      {isError(data) ? (
        <li>데이터가 존재하지 않습니다.</li>
      ) : (
        data.map((value) => (
          <li
            key={value.id}
            className="shadow-[5px_5px_8px] shadow-slate-800 p-2 rounded-md w-full flex flex-col gap-2"
          >
            <div className="flex justify-between">
              <h3 className="text-2xl font-bold">{value.title}</h3>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <IncomeTrueBadge incomeTrue={value.incomeTrue} />
                  <PaymentsDoneBadge paymentsDone={value.paymentsDone} />
                </div>
              </div>
            </div>
            <h4 className="self-end text-3xl font-bold">
              {value.cost.toLocaleString()} 원
            </h4>
            <div className="**:transition **:ease-in-out **:duration-300">
              <button
                className="flex items-center gap-1"
                onClick={() => setOpen(open === value.id ? null : value.id)}
              >
                <ChevronRight
                  className={`${
                    open === value.id ? "rotate-90" : "rotate-0"
                  } size-5`}
                />
                <span>거래 설명</span>
              </button>
              <div
                className={`${
                  open === value.id ? "scale-y-100 h-full" : "scale-y-0 h-0"
                } origin-top`}
              >
                <div className="flex items-center gap-1">
                  <small>거래일자 : {value.businessDate}</small>
                  <small>지불방식 : {value.paymentType}</small>
                </div>
                <p>{value.businessDesc}</p>
              </div>
            </div>
            {isManager && (
              <div className="flex gap-3 *:w-full *:transition-all *:ease-in-out *:duration-300 *:p-2 *:rounded-md *:cursor-pointer">
                <EditBtn id={value.id} fn={setModal} />
                <DeleteBtn id={value.id} fn={deleteInExActions} />
              </div>
            )}
            {modal === value.id && isManager && (
              <EditInEx goBack={setModal} data={value} />
            )}
          </li>
        ))
      )}
    </>
  );
}
