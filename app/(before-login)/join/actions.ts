"use server";
import {redirect} from "next/navigation";
import {typeToFlattenedError, z} from "zod";

const joinSchema = z.object({
  email: z.string().email(),
  userName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  password: z.string(),
  checkPass: z.string(),
});
interface IJoinFieldError {
  email: string[];
  userName: string[];
  firstName: string[];
  lastName: string[];
  phone: string[];
  password: string[];
  checkPass: string[];
}
export interface IStateProps {
  errMsg: undefined | typeToFlattenedError<IJoinFieldError> | string;
}
export async function joinAction(
  state: IStateProps,
  formData: FormData
): Promise<IStateProps> {
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
    const schemaValidate = await joinSchema.safeParseAsync(data);
    if (!schemaValidate.success) {
      return {
        errMsg: schemaValidate.error.flatten(),
      };
    }
    const response = await fetch("http://localhost:4000/auth/join", {
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
      method: "POST",
    });
    console.log("response", await response.json());
  } catch (error) {
    console.log(error);
    const err = error as Error;
    return {
      errMsg: err.message,
    };
  }
  redirect("/");
}
