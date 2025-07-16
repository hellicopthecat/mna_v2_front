"use server";

import {ACCESSTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";

export default async function deleteInExActions(id: number) {
  const cookie = await cookies();
  try {
    const response = await fetch(`http://localhost:4000/income-expend/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
      },
    });
    if (!response.ok) {
      return {
        msg: "수입지출서를 삭제하는데 실패했습니다.",
      };
    }
    const {msg} = (await response.json()) as {msg: string};
    return {
      msg,
    };
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    return {
      msg: "수입지출서를 삭제하는데 서버에 오류가 발생했습니다.",
    };
  }
}
