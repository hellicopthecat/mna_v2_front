"use server";

import {ACCESSTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";
import {z} from "zod";

const deleteCompanySchema = z
  .string({
    message: "'동의합니다'를 입력해주세용.",
  })
  .length(5, {message: "5자 이상은 허용될수없습니다."})
  .refine((arg: string) => arg === "동의합니다", {
    message: "'동의합니다'를 입력해주세요.",
  });
export interface IDeleteCompanyActionState {
  msg: undefined | string;
  ok: boolean;
}
export default async function deleteCompanyAction(
  prevState: IDeleteCompanyActionState,
  formData: FormData
): Promise<IDeleteCompanyActionState> {
  const cookie = await cookies();
  const data = {
    id: formData.get("id"),
    agree: formData.get("agree"),
  };

  try {
    const result = await deleteCompanySchema.safeParseAsync(data.agree);

    if (!result.success) {
      return {
        msg: result.error.errors[0].message,
        ok: false,
      };
    }
    const resposne = await fetch(`http://localhost:4000/company/${data.id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
      },
    });
    if (!resposne.ok) {
      return {
        msg: "회사를 삭제하는데 실패했습니다.",
        ok: false,
      };
    }
    return {msg: "회사를 삭제했습니다.", ok: true};
  } catch (error) {
    const err = error as Error;
    return {
      msg: "회사를 삭제하는데 서버에 오류가 생겼습니다.",
      ok: false,
    };
  }
}
