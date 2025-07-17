"use client";

interface IDeleteBtn {
  id: number;
  fn(id: number): Promise<{msg: string}>;
}

export default function DeleteBtn({id, fn}: IDeleteBtn) {
  const onDeleteFn = async (id: number) => {
    const ok = confirm("삭제하시겠습니까?");
    if (ok) {
      const {msg} = await fn(id);
      alert(msg);
    }
    return;
  };
  return (
    <button
      onClick={() => onDeleteFn(id)}
      className="bg-red-900 hover:bg-red-950"
    >
      삭제
    </button>
  );
}
