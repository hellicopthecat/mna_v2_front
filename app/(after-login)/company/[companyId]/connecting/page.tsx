import ListLayout from "@/components/layout/company/ListLayout";
import {ACCESSTOKEN} from "@/constants/constant";
import {isError} from "@/libs/utils/util";
import {ICompanyTypes} from "@/types/company/companyType";
import {IResponseErrorType} from "@/types/response/responseType";
import {cookies} from "next/headers";
import Image from "next/image";
import Link from "next/link";

const getConnectingCompany = async (id: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company-connect/connecting/${id}`,
    {
      method: "GET",
      headers: {
        "Contetn-Type": "application/json",
        authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    return data as IResponseErrorType;
  }
  return data as ICompanyTypes[];
};
export default async function Page({
  params,
}: {
  params: Promise<{companyId: string}>;
}) {
  const {companyId} = await params;
  const data = await getConnectingCompany(companyId);
  return (
    <ListLayout goBack={`/company/${companyId}`}>
      <ul>
        {isError(data) ? (
          <li>
            <p>{data.message}</p>
          </li>
        ) : (
          data.map((company) => (
            <li
              key={company.id}
              className="flex items-center justify-between bg-slate-600 p-2 rounded-md"
            >
              <div className="flex items-center gap-3">
                {company.companyLogo.includes(".jpg") ? (
                  <Image src={company.companyLogo} alt="로고" />
                ) : (
                  <div className="size-5 bg-teal-500 rounded-full" />
                )}
                <h3 className="font-bold text-xl">{company.companyName}</h3>
              </div>
              <Link href={`/company/${company.id}`}>바로가기</Link>
            </li>
          ))
        )}
      </ul>
    </ListLayout>
  );
}
