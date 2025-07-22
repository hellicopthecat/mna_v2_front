"use client";

import deleteCompanyAction, {
  IDeleteCompanyActionState,
} from "@/app/(after-login)/company/[companyId]/deleteCompany/actions";
import {useRouter} from "next/navigation";
import {useActionState} from "react";

const initialState = {
  msg: undefined,
  ok: false,
};

export default function DeleteCompanyForm({companyId}: {companyId: string}) {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    async (
      prevState: IDeleteCompanyActionState,
      formData: FormData
    ): Promise<IDeleteCompanyActionState> => {
      formData.set("id", companyId);
      const {msg, ok} = await deleteCompanyAction(prevState, formData);
      if (!ok) {
        alert(msg);
        return {msg, ok};
      } else {
        alert(msg);
        router.push("/my-page");
        return {msg, ok};
      }
    },
    initialState
  );
  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-center">
        삭제를 하시면 <span className="text-red-500">모든 데이터를 유실</span>{" "}
        됩니다.
        <br />
        삭제를 하시려면 아래 빈칸에{" "}
        <span className="text-red-500 underline underline-offset-2">
          동의합니다
        </span>
        를 입력해주세요.
      </p>
      <hr className="w-full h-full text-slate-700" />
      <form action={action} className="flex flex-col gap-3 items-center w-full">
        <input
          type="text"
          name="agree"
          id="agree"
          placeholder="동의합니다"
          className="border-b border-b-yellow-500 p-2 w-full"
          maxLength={5}
        />
        <button
          disabled={pending}
          className="w-full border border-red-800 hover:border-red-500 text-red-800 hover:text-red-500 p-2 rounded-md transition-colors ease-in-out duration-300"
        >
          {pending ? "삭제중..." : "삭제"}
        </button>
      </form>
    </div>
  );
}
