"use server";

import {ACCESSTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";
import {z} from "zod";

const editInExSchema = z.object({
  title: z.string({required_error: "제목을 입력하세요."}),
  cost: z.coerce.string({required_error: "가격을 입력하세요"}),
  businessDate: z.string(),
  paymentType: z.string(),
  businessDesc: z.string(),
  incomeTrue: z.enum(["on", "off"]),
  paymentsDone: z.enum(["WAIT", "PAID", "NONPAID"]),
});
export interface IEditInExActionState {
  errMsg: undefined | z.inferFlattenedErrors<typeof editInExSchema>;
  resErr: undefined | string;
}
export default async function editInExAction(
  prevState: IEditInExActionState,
  formData: FormData
): Promise<IEditInExActionState> {
  const cookie = await cookies();
  const data = {
    id: formData.get("id"),
    title: formData.get("title"),
    cost: formData.get("cost"),
    businessDate: formData.get("businessDate"),
    paymentType: formData.get("paymentType"),
    businessDesc: formData.get("businessDesc"),
    incomeTrue: formData.get("incomeTrue"),
    paymentsDone: formData.get("paymentsDone"),
  };

  try {
    const result = await editInExSchema.safeParseAsync(data);
    if (!result.success) {
      return {
        errMsg: result.error.flatten(),
        resErr: undefined,
      };
    }
    const response = await fetch(
      `http://localhost:4000/income-expend/${data.id}`,
      {
        method: "PATCH",
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
        resErr: "데이터를 수정하는데 서버에 오류가 났습니다.",
      };
    }
    return {
      errMsg: undefined,
      resErr: undefined,
    };
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
    return {
      errMsg: undefined,
      resErr: "서버에 오류가 났습니다.",
    };
  }
}
