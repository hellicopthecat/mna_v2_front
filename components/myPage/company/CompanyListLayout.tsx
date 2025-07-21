import {isError} from "@/libs/utils/util";
import {ICompanyTypes} from "@/types/company/companyType";
import {IResponseErrorType} from "@/types/response/responseType";
import Image from "next/image";
import Link from "next/link";

export default function CompanyListLayout({
  company,
}: {
  company: ICompanyTypes[] | IResponseErrorType;
}) {
  return (
    <ul className="grid grid-cols-1 gap-3 xl:mx-auto w-full">
      {isError(company) ? (
        <li></li>
      ) : (
        company.map((com) => (
          <li
            key={com.id}
            className="bg-darkcard p-3 rounded-md overflow-hidden "
          >
            <Link
              href={`/company/${com.id}`}
              className="flex items-center gap-3"
            >
              {!com.companyLogo ? (
                <Image src={com.companyLogo} alt="회사로고" />
              ) : (
                <div className="size-5 rounded-full bg-green-500" />
              )}
              <h3 className="text-3xl font-bold">{com.companyName}</h3>
              {}
            </Link>
          </li>
        ))
      )}
    </ul>
  );
}
