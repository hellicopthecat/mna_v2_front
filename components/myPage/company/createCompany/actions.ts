"use server";

import {REFRESHTOKEN} from "@/constants/constant";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {typeToFlattenedError, z} from "zod";

const createCompanySchema = z.object({
  companyName: z
    .string({required_error: "회사명을 작성하세요."})
    .min(5, {message: "5자 이상"}),
  companyLogo: z
    .instanceof(File)
    .refine(
      (file) => ["image/png", "image/jpg", "image/jpeg"].includes(file.type),
      {
        message: "png/jpg/jpeg만 가능",
      }
    ),
  zonecode: z.string(),
  sido: z.string(),
  sigungu: z.string(),
  roadname: z.string(),
  roadAddress: z.string(),
  restAddress: z.string(),
  bname: z.string(),
  bname1: z.string(),
  bname2: z.string(),
  jibunAddress: z.string(),
});
interface ICreateCompanyErrorType {
  companyName: string[];
  companyLogo: string[];
  zonecode: string[];
  sido: string[];
  sigungu: string[];
  roadname: string[];
  roadAddress: string[];
  restAddress: string[];
  bname: string[];
  bname1: string[];
  bname2: string[];
  jibunAddress: string[];
}
interface ICreateCompanyStateType {
  errMsg: undefined | typeToFlattenedError<ICreateCompanyErrorType>;
  resErr: undefined | string;
}

export default async function createCompany(
  prevState: ICreateCompanyStateType,
  formData: FormData
): Promise<ICreateCompanyStateType> {
  let id: string;
  const cookieStore = await cookies();
  const data = {
    companyName: formData.get("companyName"),
    companyLogo: formData.get("companyLogo"),
    zonecode: formData.get("zonecode"),
    sido: formData.get("sido"),
    sigungu: formData.get("sigungu"),
    roadname: formData.get("roadname"),
    roadAddress: formData.get("roadAddress"),
    restAddress: formData.get("restAddress"),
    bname: formData.get("bname"),
    bname1: formData.get("bname1"),
    bname2: formData.get("bname2"),
    jibunAddress: formData.get("jibunAddress"),
  };
  try {
    const result = await createCompanySchema.safeParseAsync(data);
    if (!result.success) {
      return {
        errMsg: result.error.flatten(),
        resErr: undefined,
      };
    }
    const response = await fetch("http://localhost:4000/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookieStore.get(REFRESHTOKEN)?.value}`,
      },
      body: JSON.stringify({...result.data, companyLogo: "hoho"}),
    });
    if (!response.ok) {
      return {
        errMsg: undefined,
        resErr: "회사생성에 실패했습니다.",
      };
    }
    const {userId} = (await response.json()) as {userId: string};
    id = userId;
  } catch (error) {
    const err = error as Error;
    return {
      errMsg: undefined,
      resErr: err.message,
    };
  }
  redirect(`/${id}`);
}
