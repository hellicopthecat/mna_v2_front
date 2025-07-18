"use client";
import {ChevronRight} from "@/components/icons/Chevron";
import IncomeTrueBadge from "@/components/layout/badge/IncomeTrueBadge";
import PaymentsDoneBadge from "@/components/layout/badge/PaymentsDoneBadge";
import {isError} from "@/libs/utils/util";
import {IProductTypes} from "@/types/product/productType";
import {IResponseErrorType} from "@/types/response/responseType";
import Image from "next/image";
import {useState} from "react";
import EditBtn from "../companyAsset/btnComp/EditBtn";
import EditProduct from "./editProduct/EditProduct";
import DeleteBtn from "../companyAsset/btnComp/DeleteBtn";
import deleteProductAction from "@/app/(after-login)/company/[companyId]/product/_deleteProduct/actions";

export default function ProductCard({
  data,
  isManager,
}: {
  data: IProductTypes[] | IResponseErrorType;
  isManager: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [modal, setModal] = useState<number | null>(null);
  return (
    <>
      {isError(data) ? (
        <li>데이터가 없습니다.</li>
      ) : (
        data.map((val) => (
          <li key={val.id} className="flex gap-2 rounded-md overflow-hidden">
            <div className="flex flex-1/5">
              {val.itemPhoto.includes(".jpg") ? (
                <Image src={val.itemPhoto} alt="이미지사진" />
              ) : (
                <div className="bg-emerald-600 w-full h-full" />
              )}
            </div>
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
              <div className="flex justify-between">
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
                {isManager && (
                  <div className="flex gap-3 *:px-3 *:py-1 *:rounded-md">
                    <EditBtn id={val.id} fn={setModal} />
                    <DeleteBtn id={val.id} fn={deleteProductAction} />
                  </div>
                )}
                {modal === val.id && isManager && (
                  <EditProduct data={val} goBack={setModal} />
                )}
              </div>
            </div>
          </li>
        ))
      )}
    </>
  );
}
