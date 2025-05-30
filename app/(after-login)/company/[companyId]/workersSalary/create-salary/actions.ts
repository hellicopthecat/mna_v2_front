"use server";

import {ACCESSTOKEN} from "@/constants/constant";
import {IResponseErrorType} from "@/types/response/responseType";
import {cookies} from "next/headers";
import {z} from "zod";

const createVacationSchema = z.object({
  preTaxMonthlySalary: z.coerce.string(),
  familyCount: z.coerce.string(),
  childCount: z.coerce.string(),
});
export interface ICreateSalaryStates {
  companyId: undefined | string;
  userId: undefined | string;
  errMsg: undefined | z.inferFlattenedErrors<typeof createVacationSchema>;
  resErr: undefined | string;
}
export default async function createSalaryAction(
  prevState: ICreateSalaryStates,
  formData: FormData
): Promise<ICreateSalaryStates> {
  const cookie = await cookies();
  const data = {
    preTaxMonthlySalary: formData.get("preTaxMonthlySalary"),
    familyCount: formData.get("familyCount"),
    childCount: formData.get("childCount"),
  };
  try {
    const result = await createVacationSchema.safeParseAsync(data);
    if (!result.success) {
      return {
        companyId: prevState.companyId,
        userId: prevState.userId,
        errMsg: result.error.flatten(),
        resErr: undefined,
      };
    }
    const response = await fetch(
      `http://localhost:4000/salary/${prevState.companyId}/${prevState.userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
        },
        body: JSON.stringify(result.data),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      return {
        companyId: prevState.companyId,
        userId: prevState.userId,
        errMsg: undefined,
        resErr: (responseData as IResponseErrorType).message,
      };
    }
    return {
      companyId: "",
      userId: "",
      errMsg: undefined,
      resErr: undefined,
    };
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    return {
      companyId: undefined,
      userId: undefined,
      errMsg: undefined,
      resErr: err.message,
    };
  }
}
