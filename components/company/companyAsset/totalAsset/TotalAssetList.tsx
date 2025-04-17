"use client";
import {ChevronRight} from "@/components/icons/Chevron";
import {IAssetLiability} from "@/types/asset/assetType";
import {useState} from "react";

export default function TotalAssetList({data}: {data: IAssetLiability[]}) {
  const [open, setOpen] = useState<null | number>(null);
  return (
    <>
      {!data ? (
        <li>데이터가 존재하지 않습니다.</li>
      ) : (
        data.map((value) => (
          <li
            key={value.id}
            className="shadow-[5px_5px_8px] shadow-slate-800 p-2 rounded-md w-full flex flex-col gap-2 "
          >
            <div className="flex justify-between">
              <h3 className="text-2xl font-bold">{value.assetLiabilityName}</h3>
              <div className="flex items-center gap-1">
                <span
                  className={`${
                    value.current ? "bg-emerald-500" : "bg-rose-500"
                  } p-1 rounded-lg`}
                >
                  {value.current ? "유동" : "부동"}
                </span>
                <span
                  className={`${
                    value.assetOrLiability ? "bg-blue-400" : "bg-amber-500"
                  } p-1 rounded-lg`}
                >
                  {value.assetOrLiability ? "자산" : "부채"}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <small>{value.assetLiabilityType}</small>
              <h4>{value.assetValue}</h4>
            </div>
            <div className="p-2 **:transition **:ease-in-out **:duration-300">
              <button
                className="flex items-center gap-1"
                onClick={() => setOpen(open === value.id ? null : value.id)}
              >
                <ChevronRight
                  className={`${
                    open === value.id ? "rotate-90" : "rotate-0"
                  } size-5`}
                />
                <span className="font-bold leading-5">자산설명보기</span>
              </button>
              <p
                className={`${
                  open === value.id ? "h-full scale-y-full" : "h-0 scale-y-0 "
                } origin-top text-sm`}
              >
                {value.assetLiabilityDesc}
              </p>
            </div>
          </li>
        ))
      )}
    </>
  );
}
