"use server";
import {ACCESSTOKEN} from "@/constants/constant";
import {IAuthResponseType} from "@/types/auth/authType";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {z} from "zod";

const joinSchema = z.object({
  email: z.string().email(),
  userName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  password: z.string(),
  checkPass: z.string(),
});

export interface IJoinStateType {
  errMsg: undefined | z.inferFlattenedErrors<typeof joinSchema>;
  resMsg: undefined | string;
}
export async function joinAction(
  state: IJoinStateType,
  formData: FormData
): Promise<IJoinStateType> {
  const cookieStore = await cookies();
  const data = {
    email: formData.get("email"),
    userName: formData.get("userName"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    checkPass: formData.get("checkPass"),
  };

  try {
    const result = await joinSchema.safeParseAsync(data);
    if (!result.success) {
      return {
        errMsg: result.error.flatten(),
        resMsg: undefined,
      };
    }
    const response = await fetch("http://localhost:4000/auth/join", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(result.data),
    });
    const {accessToken, refreshToken} =
      (await response.json()) as IAuthResponseType;
    cookieStore.set(ACCESSTOKEN, accessToken, {
      httpOnly: false,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    });
    cookieStore.set("REFRESH_TOKEN", refreshToken + "", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  } catch (error) {
    console.log(error);
    const err = error as Error;
    return {
      errMsg: undefined,
      resMsg: err.message,
    };
  }
  redirect("/my-page");
}
