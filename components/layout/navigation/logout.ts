"use server";

import {ACCESSTOKEN, REFRESHTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export const logOutBtn = async (userId: string) => {
  const cookieStore = await cookies();
  const logoutResponse = await fetch("http://localhost:4000/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${cookieStore.get(REFRESHTOKEN)?.value}`,
    },
    body: JSON.stringify({userId}),
  });
  console.log("logout response", logoutResponse);
  cookieStore.delete(ACCESSTOKEN);
  cookieStore.delete(REFRESHTOKEN);
  redirect("/");
};
