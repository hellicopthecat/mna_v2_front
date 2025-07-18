"use server";

import {ACCESSTOKEN, REFRESHTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export const logOutBtn = async () => {
  const cookie = await cookies();
  try {
    const logoutResponse = await fetch("http://localhost:4000/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
      },
    });
    if (!logoutResponse.ok) {
      const a = await logoutResponse.json();
      console.log(a);
    }
    cookie.delete(ACCESSTOKEN);
    cookie.delete(REFRESHTOKEN);
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
  }
  redirect("/");
};
