"use client";
import findCompanyAction from "@/app/(after-login)/company/[companyId]/connected/find-company/actions";
import InputLayout from "@/components/layout/formLayout/inputLayout";
import ModalLayout from "@/components/layout/modalLayout/ModalLayout";
import {ICompanyTypes} from "@/types/company/companyType";
import {IResponseErrorType} from "@/types/response/responseType";
import {useEffect, useState, useTransition} from "react";
import FindCompanyList from "./FindCompanyList";
const initState = {
  errMsg: undefined,
  resErr: undefined,
  data: undefined,
};
export default function FindCompany({companyId}: {companyId: string}) {
  const [companyName, setCompanyName] = useState("");
  const [errState, setErrState] = useState<string[] | null>(null);
  const [companies, setCompanies] = useState<
    ICompanyTypes[] | IResponseErrorType | null
  >(null);

  const [pending, transition] = useTransition();
  useEffect(() => {
    setCompanies(null);
    setErrState(null);
    transition(async () => {
      const formData = new FormData();
      formData.set("companyName", companyName);
      formData.set("companyId", companyId);
      const {errMsg, data} = await findCompanyAction(initState, formData);
      if (errMsg) {
        setErrState(errMsg.formErrors);
      }
      setCompanies(data);
    });
  }, [companyName, companyId]);
  return (
    <ModalLayout>
      <div className="flex flex-col gap-2 bg-slate-700 w-full h-96 p-2 rounded-md z-50">
        <form className="w-full flex gap-5">
          <InputLayout
            inputId="companyName"
            inputName="companyName"
            inputType="text"
            labelTxt="회사이름"
            placeholder="찾으시려는 회사이름을 입력하세요."
            onChange={(event) => setCompanyName(event.target.value)}
            column={false}
          />
          <button
            className={`text-nowrap p-2 rounded-md  ${
              pending ? "bg-slate-400" : "bg-blue-500"
            }`}
            disabled={pending}
          >
            {pending ? "검색중" : "검색"}
          </button>
        </form>
        <ul className="flex flex-col gap-1">
          {pending ? (
            <li>검색중입니다..</li>
          ) : (
            errState &&
            errState.map((err, index) => (
              <span key={index} className="text-red-500">
                {err}
              </span>
            ))
          )}
          <FindCompanyList myCompanyId={companyId} companies={companies} />
        </ul>
      </div>
    </ModalLayout>
  );
}
