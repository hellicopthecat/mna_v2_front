"use server";
import {REFRESHTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";
import {z} from "zod";

const findCompanyActionSchema = z
  .string()
  .min(5, {message: "5자 이상이여야합니다."});
export interface IFindCompanyStateTypes {
  errMsg: undefined | z.inferFlattenedErrors<typeof findCompanyActionSchema>;
  resErr: undefined | string;
}
export default function findCompanyAction(
  prevState: IFindCompanyStateTypes,
  formData: FormData
) {
  const cookie = await cookies();
  const data = formData.get("companyName");
  try {
    const result = await findCompanyActionSchema.safeParseAsync(data);
    if (!result.success) {
      return {
        errMsg: result.error.flatten(),
        resErr: undefined,
      };
    }
    const response = await fetch(`http://localhost:4000/company/findByName`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
      },
      body: JSON.stringify({
        companyName: result.data,
      }),
    });
    if (!response.ok) {
      return {
        errMsg: undefined,
        resErr: "데이터를 불러오는데 실패했습니다.",
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
