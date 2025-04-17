"use client";
import {ChevronRight} from "@/components/icons/Chevron";
import IncomeTrueBadge from "@/components/layout/badge/IncomeTrueBadge";
import PaymentsDoneBadge from "@/components/layout/badge/PaymentsDoneBadge";
import {IProductTypes} from "@/types/product/productType";
import Image from "next/image";
import {useState} from "react";

export default function ProductCard({data}: {data: IProductTypes[]}) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      {!data ? (
        <li>데이터가 없습니다.</li>
      ) : (
        data.map((val) => (
          <li key={val.id} className="flex gap-2 rounded-md overflow-hidden ">
            {val.itemPhoto.includes(".jpg") ? (
              <Image src={val.itemPhoto} alt="이미지사진" />
            ) : (
              <div className="bg-emerald-600 w-1/3 h-full" />
            )}
            <div className="w-full p-2">
              <div className="flex justify-between">
                <h3 className="text-3xl font-bold">{val.transactionTitle}</h3>
                <div className="flex items-center gap-2">
                  <IncomeTrueBadge incomeTrue={val.incomeExpend.incomeTrue} />
                  <PaymentsDoneBadge
                    paymentsDone={val.incomeExpend.paymentsDone}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <small>상품 이름 : {val.itemName}</small>
                <small>상품타입 : {val.itemType}</small>
                <small>모델명 : {val.itemModelName}</small>
              </div>
              <div>
                <h4>{(val.itemCount * val.itemPrice).toLocaleString()} 원</h4>
                <small> 수량 : {val.itemCount}</small>
                <small> 단일가 : {val.itemPrice}</small>
              </div>
              <div className="**:transition **:ease-in-out **:duration-300">
                <button
                  onClick={() => setOpen(open === val.id ? null : val.id)}
                  className="flex gap-2 items-center "
                >
                  <ChevronRight
                    className={`${
                      open === val.id ? "rotate-90" : "rotate-0"
                    } size-5`}
                  />
                  <span>거래내용보기</span>
                </button>
                <p
                  className={`${
                    open === val.id ? "scaly-y-100 h-full" : "scale-y-0 h-0"
                  } origin-top`}
                >
                  {val.itemDesc}
                </p>
              </div>
            </div>
          </li>
        ))
      )}
    </>
  );
}
