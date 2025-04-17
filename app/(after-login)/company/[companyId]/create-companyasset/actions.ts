"use server";

import {REFRESHTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {typeToFlattenedError, z} from "zod";
interface ICreateCompnayErrorType {
  budget: string[];
  accountNum: string[];
  accountName: string[];
  accountDesc: string[];
}
interface ICreateCompanyAssetStateType {
  errMsg: undefined | typeToFlattenedError<ICreateCompnayErrorType>;
  resErr: undefined | string;
}

const createCompanyAssetSchema = z.object({
  budget: z.number(),
  accountNum: z.string(),
  accountName: z.string(),
  accountDesc: z.string(),
});

export async function creaetCompanyAssetAction(
  prevState: ICreateCompanyAssetStateType,
  formData: FormData
) {
  const cookie = await cookies();
  const companyId = formData.get("companyId");
  const data = {
    budget: Number(formData.get("budget")),
    accountNum: formData.get("accountNum"),
    accountName: formData.get("accountName"),
    accountDesc: formData.get("accountDesc"),
  };
  try {
    const result = await createCompanyAssetSchema.safeParseAsync(data);
    if (!result.success) {
      return {
        errMsg: result.error.flatten(),
        resErr: undefined,
      };
    }
    await fetch(`http://localhost:4000/company-assets/${companyId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
      },
      body: JSON.stringify(result.data),
    });
  } catch (error) {
    const err = error as Error;
    return {
      errMsg: undefined,
      resErr: err.message,
    };
  }
  redirect(`/company/${companyId}`);
}
