import {IResponseErrorType} from "@/types/response/responseType";
import {IUserTypes} from "@/types/user/userType";

import Image from "next/image";
import {useRouter} from "next/navigation";

export default function FindWorkerCard({
  data,
  companyId,
  token,
}: {
  data: IUserTypes[];
  companyId: string;
  token: string;
}) {
  const router = useRouter();
  const addWorker = async (userId: string) => {
    const ok = confirm("사원등록을 하시겠습니까?");
    if (ok) {
      const response = await fetch(
        `http://localhost:4000/company-workers/${companyId}/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const data = (await response.json()) as IResponseErrorType;
        alert(data.message);
        return;
      }
      alert("직원 등록되었습니다.");
      router.back();
    }
  };
  return data?.map((val) => (
    <li
      key={val.id}
      className="odd:bg-slate-600 even:bg-slate-700 hover:bg-slate-800 transition ease-in-out duration-300 shadow-[3px_3px_5px] shadow-slate-700 p-2 rounded-md"
    >
      <button
        onClick={() => addWorker(val.id + "")}
        className="flex justify-between items-center w-full cursor-pointer"
      >
        {val.avatarUrl ? (
          <Image src={val.avatarUrl} alt="아바타이미지" />
        ) : (
          <div className="size-10 bg-teal-600 rounded-full" />
        )}
        <div className="flex flex-col">
          <h4 className="text-end font-bold">{val.firstName}</h4>
          <small className="text-end">{val.email}</small>
        </div>
      </button>
    </li>
  ));
}
