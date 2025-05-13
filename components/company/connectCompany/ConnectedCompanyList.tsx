"use client";
import disconnectCompanyAction from "@/app/(after-login)/company/[companyId]/connected/find-company/_disconnect-company/actions";
import {isError} from "@/libs/utils/util";
import {ICompanyTypes} from "@/types/company/companyType";
import {IResponseErrorType} from "@/types/response/responseType";
import Image from "next/image";

export default function ConnectedCompanyList({
  data,
  companyId,
}: {
  data: ICompanyTypes[] | IResponseErrorType;
  companyId: string;
}) {
  const onClickDisconnectCompany = async (targetCompany: number) => {
    const runConfirm = confirm("등록해지하겠습니까?");
    if (runConfirm) {
      const {ok, msg} = await disconnectCompanyAction(
        companyId,
        targetCompany + ""
      );
      if (ok) {
        alert(msg);
      } else {
        alert(msg);
      }
    }
    return;
  };
  return (
    <ul>
      {isError(data) ? (
        <li>
          <span>{data.message}</span>
        </li>
      ) : (
        data.map((company) => (
          <li key={company.id} className="bg-slate-600 rounded-md">
            <button
              className="w-full p-2 flex items-center gap-3 cursor-pointer"
              onClick={() => onClickDisconnectCompany(company.id)}
            >
              {company.companyLogo.includes(".jpg") ? (
                <Image src={company.companyLogo} alt="회사로고" />
              ) : (
                <div className="size-6 bg-teal-500 rounded-full" />
              )}
              <h3 className="font-bold text-xl">{company.companyName}</h3>
            </button>
          </li>
        ))
      )}
    </ul>
  );
}
