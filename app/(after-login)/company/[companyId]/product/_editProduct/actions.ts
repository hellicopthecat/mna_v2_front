"use server";

import {ACCESSTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";
import {json} from "stream/consumers";
import {z} from "zod";

const editProductSchema = z.object({
  transactionTitle: z.string({required_error: "필수입력입니다."}),
  itemName: z.string({required_error: "필수입력입니다."}),
  itemModelName: z.string({required_error: "필수입력입니다."}),
  itemPhoto: z.string(),
  itemType: z.string(),
  itemCount: z.coerce.string({required_error: "필수입력입니다."}),
  itemPrice: z.coerce.string({required_error: "필수입력입니다."}),
  itemDesc: z.string(),
  incomeTrue: z.enum(["income", "expend"]),
  paymentsDone: z.enum(["PAID", "NONPAID", "WAIT"]),
  paymentType: z.string(),
});

export interface IEditProductStates {
  errMsg: undefined | z.inferFlattenedErrors<typeof editProductSchema>;
  resErr: undefined | string;
}

export default async function editProductActions(
  prevState: IEditProductStates,
  formData: FormData
): Promise<IEditProductStates> {
  const cookie = await cookies();
  const data = {
    id: formData.get("id"),
    transactionTitle: formData.get("transactionTitle"),
    itemName: formData.get("itemName"),
    itemModelName: formData.get("itemModelName"),
    itemPhoto: formData.get("itemPhoto"),
    itemType: formData.get("itemType"),
    itemCount: formData.get("itemCount"),
    itemPrice: formData.get("itemPrice"),
    itemDesc: formData.get("itemDesc"),
    incomeTrue: formData.get("incomeTrue"),
    paymentsDone: formData.get("paymentsDone"),
    paymentType: formData.get("paymentType"),
  };
  try {
    const result = await editProductSchema.safeParseAsync(data);
    if (!result.success) {
      return {
        errMsg: result.error.flatten(),
        resErr: undefined,
      };
    }
    const resposne = await fetch(`http://localhost:4000/product/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
      },
      body: JSON.stringify(result.data),
    });
    if (!resposne.ok) {
      return {
        errMsg: undefined,
        resErr: "상품을 업데이트하는데 실패했습니다.",
      };
    }

    return {
      errMsg: undefined,
      resErr: undefined,
    };
  } catch (error) {
    return {
      errMsg: undefined,
      resErr: "상품을 업데이트하는데 서버에 오류가 발생했습니다.",
    };
  }
}
