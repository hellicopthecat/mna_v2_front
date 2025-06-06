"use server";

import {ACCESSTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";

export default async function disconnectCompanyAction(
  myCompanyId: string,
  targetCompanyId: string
) {
  const cookie = await cookies();
  try {
    const resposne = await fetch(
      `http://localhost:4000/company-connect/disconnect`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
        },
        body: JSON.stringify({myCompanyId, targetCompanyId}),
      }
    );
    const data: {msg: string} = await resposne.json();
    return {
      ok: true,
      msg: data.msg,
      resErr: undefined,
    };
  } catch (error) {
    const err = error as Error;
    return {
      ok: false,
      msg: "관심회사 등록해지에 실패하였습니다.",
      resErr: err.message,
    };
  }
}
