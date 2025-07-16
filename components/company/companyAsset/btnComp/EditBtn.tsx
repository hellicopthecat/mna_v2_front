import {Dispatch, SetStateAction} from "react";

export default function EditBtn({
  id,
  fn,
}: {
  id: number;
  fn: Dispatch<SetStateAction<number | null>>;
}) {
  return (
    <button onClick={() => fn(id)} className="bg-indigo-900 ">
      편집
    </button>
  );
}
