"use server";
import {REFRESHTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";
import {z} from "zod";
const addManagerActionSchema = z.object({
  companyId: z.string(),
  workerId: z.string(),
});
export interface IAddManagerActionType {
  ok: undefined | boolean;
  errMsg: undefined | string;
}
export default async function addManagerAction(
  prevState: IAddManagerActionType,
  formData: FormData
): Promise<IAddManagerActionType> {
  const cookie = await cookies();
  const data = {
    companyId: formData.get("companyId"),
    workerId: formData.get("workerId"),
  };

  try {
    const result = await addManagerActionSchema.safeParseAsync(data);
    if (!result.success) {
      return {
        ok: false,
        errMsg: "회사아이디와 등록할 사원이 아닙니다.",
      };
    }
    const resposne = await fetch(`http://localhost:4000/company/addManager`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
      },
      body: JSON.stringify(result.data),
    });
    if (!resposne.ok) {
      return {
        ok: false,
        errMsg: "등록에 실패했습니다.",
      };
    }
    return {
      ok: true,
      errMsg: undefined,
    };
  } catch (error) {
    const err = error as Error;
    return {
      ok: false,
      errMsg: err.message || "서버에 이상이 있습니다.",
    };
  }
}
