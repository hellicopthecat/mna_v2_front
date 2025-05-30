"use server";

import {ACCESSTOKEN} from "@/constants/constant";
import {IAuthResponseType} from "@/types/auth/authType";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {typeToFlattenedError, z} from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
interface ILoginInputError {
  email: string[];
  password: string[];
}
export interface ILoginStateType {
  errMsg: undefined | typeToFlattenedError<ILoginInputError>;
  resErr: undefined | string;
}
export async function loginAction(
  state: ILoginStateType,
  formData: FormData
): Promise<ILoginStateType> {
  const cookieStore = await cookies();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const result = await loginSchema.safeParseAsync(data);
    if (!result.success) {
      return {
        errMsg: result.error.flatten(),
        resErr: undefined,
      };
    }
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(result.data),
    });
    const {accessToken, refreshToken} =
      (await response.json()) as IAuthResponseType;
    cookieStore.set(ACCESSTOKEN, accessToken + "", {
      httpOnly: false,
      sameSite: "strict",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24,
    });
    cookieStore.set("REFRESH_TOKEN", refreshToken + "", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  } catch (error) {
    const err = error as Error;
    return {
      errMsg: undefined,
      resErr: err.message,
    };
  }
  redirect("/my-page");
}
