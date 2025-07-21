import ListLayout from "@/components/layout/company/ListLayout";
import CompanyListLayout from "@/components/myPage/company/CompanyListLayout";
import {ACCESSTOKEN} from "@/constants/constant";
import {ICompanyTypes} from "@/types/company/companyType";
import {IResponseErrorType} from "@/types/response/responseType";
import {cookies} from "next/headers";

const joinedCompany = async () => {
  const cookie = await cookies();
  const response = await fetch("http://localhost:4000/company/joined", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    return data as IResponseErrorType;
  }
  return data as ICompanyTypes[];
};

export default async function Page() {
  const company = await joinedCompany();

  return (
    <ListLayout goBack="/my-page">
      <CompanyListLayout company={company} />
    </ListLayout>
  );
}
