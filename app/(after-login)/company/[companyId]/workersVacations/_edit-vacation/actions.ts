"use server";
import {REFRESHTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";
import {z} from "zod";

const editVacationSchema = z.object({
  joinCompanyDate: z
    .string()
    .transform((val) => new Date(val).getTime().toString()),
  other: z.coerce.string(),
});
export interface IEditVacationActionState {
  vacationId: undefined | string;
  errMsg: undefined | z.inferFlattenedErrors<typeof editVacationSchema>;
  resErr: undefined | string;
}
export default async function editVacationActions(
  prevState: IEditVacationActionState,
  formData: FormData
): Promise<IEditVacationActionState> {
  const cookie = await cookies();
  const data = {
    joinCompanyDate: formData.get("joinCompanyDate"),
    other: formData.get("other"),
  };

  try {
    const result = await editVacationSchema.safeParseAsync(data);
    if (!result.success) {
      return {
        vacationId: prevState.vacationId,
        errMsg: result.error.flatten(),
        resErr: undefined,
      };
    }
    const response = await fetch(
      `http://localhost:4000/vacation/${prevState.vacationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${cookie.get(REFRESHTOKEN)?.value}`,
        },
        body: JSON.stringify(result.data),
      }
    );
    if (!response.ok) {
      return {
        vacationId: prevState.vacationId,
        errMsg: undefined,
        resErr: undefined,
      };
    }
    return {
      vacationId: undefined,
      errMsg: undefined,
      resErr: undefined,
    };
  } catch (error) {
    const err = error as Error;
    return {
      vacationId: prevState.vacationId,
      errMsg: undefined,
      resErr: err.message,
    };
  }
}
