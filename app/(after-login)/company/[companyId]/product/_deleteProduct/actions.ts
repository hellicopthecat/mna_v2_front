"use server";

import {ACCESSTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";

export default async function deleteProductAction(
  id: number
): Promise<{msg: string}> {
  const cookie = await cookies();
  try {
    const response = await fetch(`http://localhost:4000/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
      },
    });
    if (!response.ok) {
      return {
        msg: "상품을 삭제하는데 오류가 발생했습니다.",
      };
    }
    const {msg} = await response.json();
    return {msg};
  } catch {
    return {
      msg: "상품을 삭제하는데 서버에 오류가 발생했습니다.",
    };
  }
}
