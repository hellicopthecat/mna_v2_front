"use server";

import {ACCESSTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {z} from "zod";

const createCompanyAssetSchema = z.object({
  budget: z.number(),
  accountNum: z.string(),
  accountName: z.string(),
  accountDesc: z.string(),
});

interface ICreateCompanyAssetStateType {
  errMsg: undefined | z.inferFlattenedErrors<typeof createCompanyAssetSchema>;
  resErr: undefined | string;
}
export async function creaetCompanyAssetAction(
  prevState: ICreateCompanyAssetStateType,
  formData: FormData
): Promise<ICreateCompanyAssetStateType> {
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
    const response = await fetch(
      `http://localhost:4000/company-assets/${companyId}`,
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
        resErr: "자산을 만드는데 실패했습니다.",
      };
    }

    redirect(`/company/${companyId}`);
  } catch (error) {
    const err = error as Error;
    return {
      errMsg: undefined,
      resErr: err.message,
    };
  }
}
