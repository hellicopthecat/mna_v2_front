"use server";

import {ACCESSTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";

export default async function deleteAssetsAction(
  id: number
): Promise<{msg: string}> {
  const cookie = await cookies();
  try {
    const response = await fetch(
      `http://localhost:4000/assets-liabilities/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
        },
      }
    );
    const {msg} = (await response.json()) as {msg: string};

    if (!response.ok) {
      return {
        msg: "자산을 삭제하는데 실패하였습니다.",
      };
    }
    return {msg};
    // return {msg: ""};
  } catch (error) {
    return {
      msg: "자산을 삭제하는데 서버에 오류가 났습니다.",
    };
  }
}
