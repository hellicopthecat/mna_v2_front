"use server";

import {ACCESSTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";
import {z} from "zod";

const editSalarySchema = z.object({
  preTaxMonthlySalary: z.coerce.string({required_error: "입력하세요."}),
  familyCount: z.coerce.string({required_error: "입력하세요."}),
  childCount: z.coerce.string({required_error: "입력하세요."}),
});
interface IEditSalaryAction {
  id: undefined | number;
  errMsg: undefined | z.inferFlattenedErrors<typeof editSalarySchema>;
  resErr: undefined | string;
}
export default async function editSalaryAction(
  prevState: IEditSalaryAction,
  formData: FormData
): Promise<IEditSalaryAction> {
  const cookie = await cookies();
  const data = {
    preTaxMonthlySalary: formData.get("preTaxMonthlySalary"),
    familyCount: formData.get("familyCount"),
    childCount: formData.get("childCount"),
  };
  try {
    const result = await editSalarySchema.safeParseAsync(data);
    if (!result.success) {
      return {
        id: prevState.id,
        errMsg: result.error.flatten(),
        resErr: undefined,
      };
    }
    const response = await fetch(
      `http://localhost:4000/salary/${prevState.id}`,
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
        id: prevState.id,
        errMsg: undefined,
        resErr: "서버 응답이 실패했습니다.",
      };
    }
    return {
      id: undefined,
      errMsg: undefined,
      resErr: undefined,
    };
  } catch (error) {
    const err = error as Error;
    return {
      id: prevState.id,
      errMsg: undefined,
      resErr: "데이터를 업데이트하는 중 오류가 발생했습니다.",
    };
  }
}
