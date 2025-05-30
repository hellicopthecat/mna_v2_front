"use server";

import {ACCESSTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";
import {z} from "zod";

const createProductSchema = z.object({
  transactionTitle: z.string(),
  itemName: z.string(),
  itemModelName: z.string(),
  itemPhoto: z.string(),
  itemType: z.string(),
  itemCount: z
    .string()
    .refine((val) => !isNaN(Number(val)), {message: "숫자가 아닙니다."}),
  itemPrice: z
    .string()
    .refine((val) => !isNaN(Number(val)), {message: "숫자가 아닙니다."}),
  itemDesc: z.string(),
  paymentType: z.string(),
  incomeTrue: z.string(),
  paymentsDone: z.string(),
});
export interface ICreateProductTypes {
  errMsg: undefined | z.inferFlattenedErrors<typeof createProductSchema>;
  resErr: undefined | string;
}
export default async function createProductAction(
  prevState: ICreateProductTypes,
  formData: FormData
): Promise<ICreateProductTypes> {
  const cookie = await cookies();
  const companyId = formData.get("companyId");

  const data = {
    transactionTitle: formData.get("transactionTitle"),
    itemName: formData.get("itemName"),
    itemModelName: formData.get("itemModelName"),
    itemPhoto: "d",
    itemType: formData.get("itemType"),
    itemCount: formData.get("itemCount"),
    itemPrice: formData.get("itemPrice"),
    itemDesc: formData.get("itemDesc"),
    paymentType: formData.get("paymentType"),
    incomeTrue: formData.get("incomeTrue"),
    paymentsDone: formData.get("paymentsDone"),
  };
  try {
    const result = await createProductSchema.safeParseAsync(data);
    if (!result.success) {
      console.log(result.error);
      return {
        errMsg: result.error.flatten(),
        resErr: undefined,
      };
    }
    const response = await fetch(
      `http://localhost:4000/product/create-product/${companyId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
        },
        body: JSON.stringify(result.data),
      }
    );
    if (!response.ok) {
      return {
        errMsg: undefined,
        resErr: "상품 생성중 오류가 발생했습니다.",
      };
    }
    return {
      errMsg: undefined,
      resErr: undefined,
    };
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    return {
      errMsg: undefined,
      resErr: err.message,
    };
  }
}
