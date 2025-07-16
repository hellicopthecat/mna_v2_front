"use client";

import deleteInExActions from "@/app/(after-login)/company/[companyId]/[assetId]/totalInEx/_deleteInEx/actions";

export default function DeleteInEx({id}: {id: number}) {
  const onDeleteInEx = async (id: number) => {
    const ok = confirm("삭제하시겠습니까?");
    if (ok) {
      const {msg} = await deleteInExActions(id);
      alert(msg);
    }
    return;
  };
  return (
    <button
      onClick={() => onDeleteInEx(id)}
      className="bg-red-900 hover:bg-red-950"
    >
      삭제
    </button>
  );
}
