"use server";

import {ACCESSTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";
import {z} from "zod";
const editUserActionSchema = z.object({
  userName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
});

export interface IEditUserActionState {
  errMsg: undefined | z.inferFlattenedErrors<typeof editUserActionSchema>;
  msg: undefined | string;
  ok: boolean;
}

export default async function editUserActions(
  prevState: IEditUserActionState,
  formData: FormData
) {
  const cookie = await cookies();
  const data = {
    id: formData.get("id"),
    userName: formData.get("userName"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: formData.get("phone"),
  };
  try {
    const result = await editUserActionSchema.safeParseAsync(data);
    if (!result.success) {
      return {
        errMsg: result.error.flatten(),
        msg: "잘못입력하셨습니다.",
        ok: false,
      };
    }

    const response = await fetch(`http://localhost:4000/user/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
      },
      body: JSON.stringify(result.data),
    });
    if (!response.ok) {
      return {
        errMsg: undefined,
        msg: "회원정보가 수정에 실패했습니다.",
        ok: false,
      };
    }
    return {
      errMsg: undefined,
      msg: "회원정보가 수정되었습니다.",
      ok: true,
    };
  } catch (error) {
    return {
      errMsg: undefined,
      msg: "서버에 오류가 났습니다.",
      ok: false,
    };
  }
}
