import {ICompanyTypes} from "@/types/company/companyType";
import {cookies} from "next/headers";
import Image from "next/image";
import Link from "next/link";

const companyData = async () => {
  const cookie = await cookies();
  const user = await fetch(`http://localhost:4000/auth/myCompany`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${cookie.get("REFRESH_TOKEN")?.value}`,
    },
  });
  return user.json();
};
export default async function Page() {
  const myCompany: ICompanyTypes[] = await companyData();
  return (
    <ul className="grid grid-cols-3 gap-3">
      {myCompany.map((company) => (
        <li key={company.id} className="bg-darkcard p-3 rounded-md">
          <Link
            href={`/company/${company.id}`}
            className="flex items-center gap-3"
          >
            {!company.companyLogo ? (
              <Image src={company.companyLogo} alt="회사로고" />
            ) : (
              <div className="size-5 rounded-full bg-green-500" />
            )}
            <h3 className="text-3xl font-bold">{company.companyName}</h3>
            {}
          </Link>
        </li>
      ))}
    </ul>
  );
}
