"use server";

import {REFRESHTOKEN} from "@/constants/constant";
import {IResponseErrorType} from "@/types/response/responseType";
import {IUserTypes} from "@/types/user/userType";
import {cookies} from "next/headers";
import {z} from "zod";
const findWorkerSchema = z.string().min(1, {message: "이름을 작성하세요"});
export interface IFindWorkerTypes {
  errMsg: undefined | z.inferFlattenedErrors<typeof findWorkerSchema>;
  resErr: undefined | string;
  userData: undefined | IUserTypes[] | IResponseErrorType;
}
export default async function findWorkerModal(
  prevState: IFindWorkerTypes,
  formData: FormData
): Promise<IFindWorkerTypes> {
  const cookie = await cookies();
  const data = formData.get("userName");
  try {
    const result = await findWorkerSchema.safeParseAsync(data);
    if (result.error) {
      return {
        errMsg: result.error.flatten(),
        resErr: undefined,
        userData: undefined,
      };
    }
    if (/\\/.test(result.data)) {
      return {
        errMsg: undefined,
        resErr: undefined,
        userData: {message: "\\는 사용할수없습니다."},
      };
    }
    const response = await fetch(
      `http://localhost:4000/user/byUsername/${result.data}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
        },
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      return {
        errMsg: undefined,
        resErr: undefined,
        userData: responseData as IResponseErrorType,
      };
    }
    return {
      errMsg: undefined,
      resErr: undefined,
      userData: responseData as IUserTypes[],
    };
  } catch (error) {
    const err = error as Error;
    return {
      errMsg: undefined,
      resErr: err.message,
      userData: undefined,
    };
  }
}
