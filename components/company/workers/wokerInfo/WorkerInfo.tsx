"use client";
import ModalLayout from "@/components/layout/modalLayout/ModalLayout";
import {isError} from "@/libs/utils/util";
import {IResponseErrorType} from "@/types/response/responseType";
import {IUserTypes} from "@/types/user/userType";
import Image from "next/image";
import WorkerInfoVacation from "./WorkerInfoVacation";
import WorkerInfoSalary from "./WorkerInfoSalary";
import unRegistWorkerAction from "@/app/(after-login)/company/[companyId]/workers/info/[userId]/_unregistWorker/actions";
import {useRouter} from "next/navigation";

export default function WorkerInfo({
  data,
  manager,
  owner,
  companyId,
}: {
  data: IUserTypes | IResponseErrorType;
  manager: boolean;
  owner: boolean;
  companyId: string;
}) {
  const router = useRouter();
  const unRegistWorkerClick = async (id: number) => {
    const {ok, msg} = await unRegistWorkerAction(companyId, id + "");
    if (!ok) {
      alert(msg);
      return;
    } else {
      alert(msg);
      router.back();
    }
  };
  return (
    <ModalLayout>
      <div className="bg-slate-500 p-5 rounded-md z-50 w-[70%]">
        {isError(data) ? (
          <p>유저의 데이터를 불러올 수 없습니다.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {data.avatarUrl.includes(".jpg") ? (
              <Image src={data.avatarUrl} alt="아바타이미지" />
            ) : (
              <div className="size-20 bg-blue-500 rounded-full" />
            )}
            <div className="flex gap-5">
              <div>
                <h3 className="text-2xl font-bold">{data.userName}</h3>
                <p className="flex gap-2 opacity-75">
                  <span>{data.firstName}</span>
                  <span>{data.lastName}</span>
                </p>
              </div>
              <div className="flex flex-col gap-1 *:flex *:gap-3">
                <p>
                  <span>📧</span>
                  <span>{data.email}</span>
                </p>
                <p>
                  <span>📞</span>
                  <span>{data.phone}</span>
                </p>
              </div>
            </div>
            <hr />
            <div className="flex *:flex-1 gap-5">
              <WorkerInfoVacation data={data.vacation} />
              <WorkerInfoSalary data={data.salary} />
            </div>
            {(manager || owner) && (
              <button
                onClick={() => unRegistWorkerClick(data.id)}
                className="cursor-pointer self-end p-2 border border-red-700 text-red-700 rounded-xl hover:border-red-500 hover:text-red-500 hover:bg-slate-400 transition-colors ease-in-out duration-200 text-sm"
              >
                직원등록해제
              </button>
            )}
          </div>
        )}
      </div>
    </ModalLayout>
  );
}
