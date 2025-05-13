"use server";
import {REFRESHTOKEN} from "@/constants/constant";
import {ICompanyTypes} from "@/types/company/companyType";
import {IResponseErrorType} from "@/types/response/responseType";
import {cookies} from "next/headers";
import {z} from "zod";

const findCompanyActionSchema = z.object({
  companyId: z.string(),
  companyName: z.string().min(3, {message: "3자 이상이여야합니다."}),
});
export interface IFindCompanyStateTypes {
  errMsg: undefined | z.inferFlattenedErrors<typeof findCompanyActionSchema>;
  resErr: undefined | string;
  data: undefined | IResponseErrorType | ICompanyTypes[];
}
export default async function findCompanyAction(
  prevState: IFindCompanyStateTypes,
  formData: FormData
) {
  const cookie = await cookies();
  const data = {
    companyId: formData.get("companyId"),
    companyName: formData.get("companyName"),
  };

  try {
    const result = await findCompanyActionSchema.safeParseAsync(data);
    if (!result.success) {
      return {
        errMsg: result.error.flatten(),
        resErr: undefined,
        data: undefined,
      };
    }
    const response = await fetch(
      `http://localhost:4000/company-connect/find/${result.data.companyId}/${result.data.companyName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
        },
      }
    );
    const jsonData = await response.json();
    if (!response.ok) {
      return {
        errMsg: undefined,
        resErr: "데이터를 불러오는데 실패했습니다.",
        data: jsonData as IResponseErrorType,
      };
    }
    return {
      errMsg: undefined,
      resErr: undefined,
      data: jsonData as ICompanyTypes[],
    };
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    return {
      errMsg: undefined,
      resErr: err.message,
      data: undefined,
    };
  }
}
