"use server";

import {ACCESSTOKEN, REFRESHTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export const logOutBtn = async () => {
  const cookie = await cookies();
  const logoutResponse = await fetch("http://localhost:4000/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
    },
  });
  if (!logoutResponse.ok) {
    const a = await logoutResponse.json();
    console.log(a);
  }
  cookie.delete(ACCESSTOKEN);
  cookie.delete(REFRESHTOKEN);
  redirect("/");
};
