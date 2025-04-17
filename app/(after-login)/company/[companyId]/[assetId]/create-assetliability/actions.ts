"use server";

import {REFRESHTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";
import {z} from "zod";

const createAssetLiabilitySchema = z.object({
  current: z.string(),
  assetOrLiability: z.string(),
  assetLiabilityName: z
    .string({required_error: "값을 입력해주세요."})
    .min(1, {message: "값을 입력해주세요."}),
  assetLiabilityType: z
    .string({required_error: "값을 입력해주세요."})
    .min(1, {message: "값을 입력해주세요."}),
  assetLiabilityDesc: z
    .string({required_error: "값을 입력해주세요."})
    .min(1, {message: "값을 입력해주세요."}),
  assetValue: z
    .string({required_error: "값을 입력해주세요."})
    .min(1, {message: "값을 입력해주세요."})
    .refine((val) => !typeof Number(val), {message: "숫자만 입력가능합니다."}),
});
export interface ICreateAssetLiabilityTypes {
  errMsg: undefined | z.inferFlattenedErrors<typeof createAssetLiabilitySchema>;
  resErr: undefined | string;
}
export default async function createAssetLiabilityAction(
  prevState: ICreateAssetLiabilityTypes,
  formData: FormData
): Promise<ICreateAssetLiabilityTypes> {
  const cookie = await cookies();
  const ids = {
    companyId: formData.get("companyId"),
    assetId: formData.get("assetId"),
  };
  const data = {
    current: formData.get("current"),
    assetOrLiability: formData.get("assetOrLiability"),
    assetLiabilityName: formData.get("assetLiabilityName"),
    assetLiabilityType: formData.get("assetLiabilityType"),
    assetLiabilityDesc: formData.get("assetLiabilityDesc"),
    assetValue: formData.get("assetValue"),
  };
  try {
    const result = await createAssetLiabilitySchema.safeParseAsync(data);
    if (!result.success) {
      return {
        errMsg: result.error.flatten(),
        resErr: undefined,
      };
    }
    const response = await fetch(
      `http://localhost:4000/assets-liabilities/${ids.assetId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
        },
        body: JSON.stringify(result.data),
      }
    );
    if (response.ok) {
      return {
        errMsg: undefined,
        resErr: undefined,
      };
    }
  } catch (error) {
    const err = error as Error;
    return {
      errMsg: undefined,
      resErr: err.message,
    };
  }
  return {
    errMsg: undefined,
    resErr: undefined,
  };
}
