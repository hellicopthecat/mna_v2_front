"use client";
import connectCompanyAction from "@/app/(after-login)/company/[companyId]/connected/find-company/_connect-company/actions";
import disconnectCompanyAction from "@/app/(after-login)/company/[companyId]/connected/find-company/_disconnect-company/actions";
import {Like, UnLike} from "@/components/icons/Hearts";
import {isError} from "@/libs/utils/util";
import {ICompanyTypes} from "@/types/company/companyType";
import {IResponseErrorType} from "@/types/response/responseType";
import Image from "next/image";
import {useState} from "react";

export default function FindCompanyList({
  myCompanyId,
  companies,
}: {
  myCompanyId: string;
  companies: ICompanyTypes[] | IResponseErrorType | undefined;
}) {
  const [like, setLike] = useState<number[] | null>(null);
  const onClick = async (id: number) => {
    const find = like?.some((val) => val === id);
    if (!find) {
      setLike((prev) => (prev ? [...prev, id] : [id]));
      const {ok, msg} = await connectCompanyAction(myCompanyId, id + "");
      if (ok) {
        alert(msg);
      } else {
        alert(msg);
      }
    }
    if (find) {
      setLike((prev) => (prev ? prev.filter((val) => val !== id) : []));
      const {ok, msg} = await disconnectCompanyAction(myCompanyId, id + "");
      if (ok) {
        alert(msg);
      } else {
        alert(msg);
      }
    }
  };

  return isError(companies) ? (
    <li>{companies.message}</li>
  ) : (
    companies?.map((company) => (
      <li key={company.id} className="bg-slate-800 rounded-md">
        <button
          className="w-full p-2 flex items-center justify-between cursor-pointer"
          onClick={() => onClick(company.id)}
        >
          <div className="flex items-center gap-6">
            {company.companyLogo.includes(".jpg") ? (
              <Image src={company.companyLogo} alt="로고" width={100} />
            ) : (
              <div className="size-10 bg-teal-500 rounded-full" />
            )}
            <h3 className="text-lg font-bold">{company.companyName}</h3>
          </div>
          {like?.find((val) => val === company.id) ? (
            <Like classNames="size-10" />
          ) : (
            <UnLike classNames="size-10" />
          )}
        </button>
      </li>
    ))
  );
}
