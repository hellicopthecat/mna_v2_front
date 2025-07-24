"use client";

import editUserActions, {
  IEditUserActionState,
} from "@/app/(after-login)/my-page/edit-user/actions";
import InputLayout from "@/components/layout/formLayout/inputLayout";
import {IUserTypes} from "@/types/user/userType";
import {useRouter} from "next/navigation";
import {useActionState} from "react";

const initState = {
  errMsg: undefined,
  msg: undefined,
  ok: false,
};

export default function EditUserForm({data}: {data: IUserTypes}) {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    async (
      prevState: IEditUserActionState,
      formData: FormData
    ): Promise<IEditUserActionState> => {
      formData.set("id", data.id + "");
      const {msg, ok, errMsg} = await editUserActions(prevState, formData);
      if (!ok) {
        alert(msg);
        return {msg, ok, errMsg};
      }
      alert(msg);
      router.push("/my-page");
      return {msg, ok, errMsg};
    },
    initState
  );
  return (
    <form action={action} className="flex flex-col gap-5">
      <InputLayout
        inputId="userName"
        inputName="userName"
        inputType="text"
        labelTxt="활동명"
        defaultValue={data.userName}
        placeholder="활동명을 입력하세요."
        errMsg={state.errMsg?.fieldErrors.userName}
      />
      <InputLayout
        inputId="firstName"
        inputName="firstName"
        inputType="text"
        labelTxt="이름(성)"
        defaultValue={data.firstName}
        placeholder="이름(성)을 입력하세요."
        errMsg={state.errMsg?.fieldErrors.firstName}
      />
      <InputLayout
        inputId="lastName"
        inputName="lastName"
        inputType="text"
        labelTxt="이름"
        defaultValue={data.lastName}
        placeholder="이름을 입력하세요."
        errMsg={state.errMsg?.fieldErrors.lastName}
      />
      <InputLayout
        inputId="phone"
        inputName="phone"
        inputType="text"
        labelTxt="전화번호"
        defaultValue={data.phone}
        placeholder="전화번호을 입력하세요."
        errMsg={state.errMsg?.fieldErrors.phone}
      />
      <button disabled={pending}>{pending ? "처리중..." : "편집"}</button>
      <button
        type="button"
        disabled={pending}
        onClick={() => router.push("/my-page")}
      >
        취소
      </button>
    </form>
  );
}
