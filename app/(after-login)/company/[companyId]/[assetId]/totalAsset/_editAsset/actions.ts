"use server";

import {ACCESSTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";
import {z} from "zod";
const editAssetActionSchema = z.object({
  assetLiabilityName: z.string(),
  assetLiabilityType: z.string(),
  assetValue: z.coerce.string(),
  assetLiabilityDesc: z.string(),
  current: z.enum(["on", "off"]),
  assetOrLiability: z.enum(["on", "off"]),
});
export interface IEditAssetsState {
  errMsg: undefined | z.inferFlattenedErrors<typeof editAssetActionSchema>;
  resErr: undefined | string;
}
export default async function editAssetActions(
  prevState: IEditAssetsState,
  formData: FormData
): Promise<IEditAssetsState> {
  const cookie = await cookies();
  const data = {
    id: formData.get("id"),
    assetLiabilityName: formData.get("assetLiabilityName"),
    assetLiabilityType: formData.get("assetLiabilityType"),
    assetValue: formData.get("assetValue"),
    assetLiabilityDesc: formData.get("assetLiabilityDesc"),
    current: formData.get("current"),
    assetOrLiability: formData.get("assetOrLiability"),
  };
  try {
    const result = await editAssetActionSchema.safeParseAsync(data);
    if (!result.success) {
      return {
        errMsg: result.error.flatten(),
        resErr: undefined,
      };
    }
    const response = await fetch(
      `http://localhost:4000/assets-liabilities/${data.id}`,
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
        resErr: "자산을 편집하는데 오류가 발생되었습니다.",
      };
    }
    return {
      errMsg: undefined,
      resErr: undefined,
    };
  } catch (error) {
    return {
      errMsg: undefined,
      resErr: "자산을 편집하는데 서버에 오류가 났습니다.",
    };
  }
}
