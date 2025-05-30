"use server";

import {REFRESHTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";
import {z} from "zod";

const createInExSchema = z.object({
  incomeTrue: z.string(),
  title: z
    .string({required_error: "거래제목을 작성해주세요."})
    .min(1, {message: "거래제목을 작성해주세요."}),
  cost: z.coerce
    .string({required_error: "금액을 입력해주세요."})
    .refine((val) => Number(val) > 100, {message: "100원 이상이여야합니다."}),
  businessDate: z
    .string({required_error: "거래일자를 작성해주세요."})
    .min(1, {message: "거래일자를 작성해주세요."}),
  paymentType: z
    .string({required_error: "지불방법을 작성해주세요."})
    .min(1, {message: "지불방법을 작성해주세요."}),
  businessDesc: z.string(),
  paymentsDone: z.string(),
});
export interface ICreateInExActionState {
  errMsg: undefined | z.inferFlattenedErrors<typeof createInExSchema>;
  resErr: undefined | string;
}
export default async function createInExAction(
  prevState: ICreateInExActionState,
  formData: FormData
): Promise<ICreateInExActionState> {
  const cookie = await cookies();
  const ids = {
    companyId: formData.get("companyId"),
    assetId: formData.get("assetId"),
  };
  const data = {
    incomeTrue: formData.get("incomeTrue"),
    title: formData.get("title"),
    cost: formData.get("cost"),
    businessDate: formData.get("businessDate"),
    paymentType: formData.get("paymentType"),
    businessDesc: formData.get("businessDesc"),
    paymentsDone: formData.get("paymentsDone"),
  };
  try {
    const result = await createInExSchema.safeParseAsync(data);
    if (!result.success) {
      return {
        errMsg: result.error.flatten(),
        resErr: undefined,
      };
    }

    const resposne = await fetch(
      `http://localhost:4000/income-expend/${ids.assetId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
        },
        body: JSON.stringify(result.data),
      }
    );
    if (!resposne.ok) {
      return {
        errMsg: undefined,
        resErr: "지출거래생성에 실패하였습니다.",
      };
    }
    return {
      errMsg: undefined,
      resErr: undefined,
    };
  } catch (error) {
    const err = error as Error;
    return {
      errMsg: undefined,
      resErr: err.message,
    };
  }
}
