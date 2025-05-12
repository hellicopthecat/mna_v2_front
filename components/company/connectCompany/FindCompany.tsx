"use client";
import InputLayout from "@/components/layout/formLayout/inputLayout";
import ModalLayout from "@/components/layout/modalLayout/ModalLayout";

export default function FindCompany() {
  return (
    <ModalLayout>
      <div className="bg-slate-700 w-full h-96 p-2 rounded-md z-50">
        <form action="" className="w-full flex gap-5">
          <InputLayout
            inputId="companyName"
            inputName="companyName"
            inputType="text"
            labelTxt="회사이름"
            placeholder="찾으시려는 회사이름을 입력하세요."
            column={false}
          />
          <button className="text-nowrap p-2 rounded-md bg-blue-500">
            검색
          </button>
        </form>
      </div>
    </ModalLayout>
  );
}
