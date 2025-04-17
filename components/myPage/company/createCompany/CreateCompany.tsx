"use client";

import {useActionState, useEffect, useState} from "react";
import createCompany from "./actions";
import InputLayout from "@/components/layout/formLayout/inputLayout";
import {
  intitKakaoAddress,
  onClickAddressBtn,
  unMountKakaoAddress,
} from "@/plugins/kakaoAddress";

interface ICompanyAddressStateProps {
  sido: string;
  sigungu: string;
  bname: string;
  bname1: string;
  bname2: string;
  jibunAddress: string;
  roadAddress: string;
  roadname: string;
  zonecode: string;
}
const initState = {
  errMsg: undefined,
  resErr: undefined,
};

export default function CreateComanyForm() {
  const [addressState, setDtoState] = useState<ICompanyAddressStateProps>({
    sido: "",
    sigungu: "",
    roadname: "",
    roadAddress: "",
    zonecode: "",
    bname: "",
    bname1: "",
    bname2: "",
    jibunAddress: "",
  });
  const [state, action, pending] = useActionState(createCompany, initState);
  const submitForm = (payload: FormData) => {
    action(payload);
    setDtoState({
      sido: "",
      sigungu: "",
      roadname: "",
      roadAddress: "",
      zonecode: "",
      bname: "",
      bname1: "",
      bname2: "",
      jibunAddress: "",
    });
  };
  useEffect(() => {
    intitKakaoAddress();
    return () => {
      unMountKakaoAddress();
    };
  }, []);

  return (
    <div className="mx-auto flex flex-col justify-center gap-5 h-full">
      <h2 className="text-center font-bold text-3xl">회사생성</h2>
      <form
        action={submitForm}
        className="flex flex-col gap-3 p-5  border-y-2 border-[#3b99e1]"
      >
        <InputLayout
          labelTxt="회사이름"
          inputId="companyName"
          inputName="companyName"
          inputType="text"
          placeholder="회사이름"
          errMsg={state.errMsg?.fieldErrors.companyName}
        />
        <InputLayout
          labelTxt="회사로고"
          inputId="companyLogo"
          inputName="companyLogo"
          inputType="file"
          errMsg={state.errMsg?.fieldErrors.companyLogo}
        />
        <button
          type="button"
          className="bg-indigo-500 p-2 rounded-md"
          onClick={() => onClickAddressBtn(setDtoState)}
        >
          주소찾기
        </button>
        <InputLayout
          labelTxt="우편번호"
          inputId="zonecode"
          inputName="zonecode"
          inputType="text"
          value={addressState.zonecode}
          placeholder="우편번호"
          readOnly
        />
        <InputLayout
          labelTxt="시/도"
          inputId="sido"
          inputName="sido"
          inputType="text"
          value={addressState.sido}
          placeholder="시/도"
          readOnly
        />
        <InputLayout
          labelTxt="시/군/구"
          inputId="sigungu"
          inputName="sigungu"
          inputType="text"
          value={addressState.sigungu}
          placeholder="시/군/구"
          readOnly
        />
        <InputLayout
          labelTxt="도로명"
          inputId="roadname"
          inputName="roadname"
          inputType="text"
          value={addressState.roadname}
          placeholder="도로명"
          readOnly
        />
        <InputLayout
          labelTxt="도로명주소"
          inputId="roadAddress"
          inputName="roadAddress"
          inputType="text"
          value={addressState.roadAddress}
          placeholder="도로명주소"
          readOnly
        />
        <InputLayout
          labelTxt="나머지 주소"
          inputId="restAddress"
          inputName="restAddress"
          inputType="text"
          placeholder="나머지 주소"
          errMsg={state.errMsg?.fieldErrors.restAddress}
        />
        <InputLayout
          labelTxt="법정동/법정리"
          inputId="bname"
          inputName="bname"
          inputType="text"
          value={addressState.bname}
          placeholder="법정동/법정리"
          readOnly
          notShow
        />
        <InputLayout
          labelTxt="법정리 읍/면"
          inputId="bname1"
          inputName="bname1"
          inputType="text"
          value={addressState.bname1}
          placeholder="법정리 읍/면"
          readOnly
          notShow
        />
        <InputLayout
          labelTxt="법정동/법정리"
          inputId="bname2"
          inputName="bname2"
          inputType="text"
          value={addressState.bname2}
          placeholder="법정동/법정리"
          readOnly
          notShow
        />
        <InputLayout
          labelTxt="지번 주소"
          inputId="jibunAddress"
          inputName="jibunAddress"
          inputType="text"
          value={addressState.jibunAddress}
          placeholder="지번 주소"
          readOnly
          notShow
        />
        <button
          className={`${pending ? "bg-red-500" : "bg-blue-600"} p-2 rounded-md`}
        >
          회사 생성
        </button>
      </form>
    </div>
  );
}
