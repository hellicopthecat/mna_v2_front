"use client";
import {ISalaryType} from "@/types/salary/salaryType";
import WorkersSalaryInfo from "./WorkersSalaryInfo";
import {useState} from "react";
import EditSalary from "./EditSalary";

export default function WorkersSalaryListCard({
  data,
  isManager,
}: {
  data: ISalaryType;
  isManager: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  return (
    <li
      className={`group odd:bg-blue-950 even:bg-teal-950 p-2 rounded-md flex flex-col gap-3 ${
        open ? "max-h-full" : "max-h-[57px]"
      } trasition ease-in-out duration-300 overflow-hidden`}
    >
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">{`${data.user.firstName} ${data.user.lastName}`}</span>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`p-2 rounded-md trasition ease-in-out duration-300 cursor-pointer group-odd:hover:bg-blue-800 group-even:hover:bg-teal-800 ${
            open ? "group-odd:bg-blue-800 group-even:bg-teal-800" : ""
          }`}
        >
          급여정보보기
        </button>
      </div>
      <WorkersSalaryInfo data={data} open={open} />
      {isManager && (
        <>
          <button
            onClick={() => setModal(true)}
            className="bg-indigo-800 py-2 rounded-md text-center"
          >
            편집
          </button>
          {modal && <EditSalary data={data} goBack={setModal} />}
        </>
      )}
    </li>
  );
}
