"use server";

import {typeToFlattenedError, z} from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
interface ILoginInputError {
  email: undefined | string[];
  password: undefined | string[];
}
export interface ILoginStateType {
  errMsg: undefined | string | typeToFlattenedError<ILoginInputError>;
}
export async function loginAction(
  prevState: ILoginStateType,
  formData: FormData
) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const result = await loginSchema.safeParseAsync(data);
    if (!result.success) {
      console.log("err", result.error.flatten());
      return {
        errMsg: result.error.flatten(),
      };
    }
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(result.data),
    });
    const uid = await response.json();
    console.log(uid);
  } catch (error) {
    const err = error as Error;
    return {
      errMsg: err.message,
    };
  }
}
