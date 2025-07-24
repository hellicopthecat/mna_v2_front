import {IUserTypes} from "@/types/user/userType";
import Image from "next/image";
import Link from "next/link";

interface IWorkerListProps {
  data: IUserTypes[];
  companyId: string;
}

export default function WorkerList({data, companyId}: IWorkerListProps) {
  return data.map((val) => (
    <li
      key={val.id}
      className="odd:bg-slate-500 even:bg-slate-600 p-3 rounded-md "
    >
      <Link
        href={`/company/${companyId}/workers/info/${val.id}`}
        className="flex justify-between items-center"
      >
        {val.avatarUrl.includes(".jpg") ? (
          <Image src={val.avatarUrl} alt="아바타이미지" />
        ) : (
          <div className="size-7 odd:bg-teal-600 even:bg-cyan-600 rounded-full shadow-xl shadow-slate-800" />
        )}
        <div className="text-end">
          <h3 className="font-bold text-2xl">{val.userName}</h3>
          <small>{val.email}</small>
        </div>
      </Link>
    </li>
  ));
}
