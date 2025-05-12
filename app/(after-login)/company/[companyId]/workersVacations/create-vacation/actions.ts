"use server";

import {REFRESHTOKEN} from "@/constants/constant";
import {IResponseErrorType} from "@/types/response/responseType";
import {cookies} from "next/headers";
import {z} from "zod";

const createVacationSchema = z.object({
  joinCompanyDate: z
    .string()
    .transform((val) => new Date(val).getTime().toString()),
  other: z.string(),
});
export interface ICreateVacationStates {
  companyId: undefined | string;
  userId: undefined | string;
  errMsg: undefined | z.inferFlattenedErrors<typeof createVacationSchema>;
  resErr: undefined | string;
}
export default async function createVacationAction(
  prevState: ICreateVacationStates,
  formData: FormData
): Promise<ICreateVacationStates> {
  const cookie = await cookies();
  const data = {
    joinCompanyDate: formData.get("joinCompanyDate"),
    other: formData.get("other"),
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
    console.log(result.data);
    const response = await fetch(
      `http://localhost:4000/vacation/${prevState.companyId}/${prevState.userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
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
    return {
      companyId: undefined,
      userId: undefined,
      errMsg: undefined,
      resErr: err.message,
    };
  }
}
