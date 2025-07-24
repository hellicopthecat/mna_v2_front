"use server";

import {ACCESSTOKEN} from "@/constants/constant";
import {IResponseErrorType} from "@/types/response/responseType";
import {cookies} from "next/headers";

export default async function unRegistWorkerAction(
  companyId: string,
  workerId: string
) {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company-workers/unregist/${companyId}/${workerId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
      },
    }
  );
  const result = await response.json();
  if (!response.ok) {
    return {
      msg:
        (result as IResponseErrorType).message ||
        "직원 등록 해제에 실패하였습니다.",
      ok: false,
    };
  }
  return {
    msg: (result as {msg: string}).msg,
    ok: true,
  };
}
