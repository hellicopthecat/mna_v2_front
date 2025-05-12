import {isError} from "@/libs/utils/util";
import {IResponseErrorType} from "@/types/response/responseType";
import {IUserTypes} from "@/types/user/userType";
import Image from "next/image";

export default function ManagerList({
  manager,
}: {
  manager: IUserTypes[] | IResponseErrorType;
}) {
  return (
    <ul className="flex flex-col gap-2">
      {isError(manager) ? (
        <li>매니저가 존재하지 않습니다.</li>
      ) : (
        manager.map((manage) => (
          <li
            key={manage.id}
            className="flex flex-col items-center  gap-5 p-2 rounded-md bg-slate-800 shadow-[2px_2px_3px] shadow-slate-600"
          >
            {manage.avatarUrl.includes(".jpg") ? (
              <Image src={manage.avatarUrl} alt="아바타" />
            ) : (
              <div className="size-16 rounded-full bg-green-600" />
            )}
            <span>{manage.userName}</span>
          </li>
        ))
      )}
    </ul>
  );
}
