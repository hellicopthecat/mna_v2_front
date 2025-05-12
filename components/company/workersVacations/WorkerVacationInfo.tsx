import {IVacationTypes} from "@/types/vacation/vacationType";

export default function WorkerVacationInfo({data}: {data: IVacationTypes}) {
  return (
    <ul className="flex flex-col gap-1 *:flex *:items-center *:justify-between **:first:font-bold **:last:font-medium">
      <li>
        <span>입사일</span>
        <span>
          {new Date(+data.joinCompanyDate).toLocaleDateString("ko-KR")}
        </span>
      </li>
      <li>
        <span>출근일수</span>
        <span>{data.appearence} 일</span>
      </li>
      <li>
        <span>연차</span>
        <span>{data.annual} 일</span>
      </li>
      <li>
        <span>기타휴가일수</span>
        <span>{data.other} 일</span>
      </li>
      <li>
        <span>잔여연차</span>
        <span>{data.restAnnualVacation} 일</span>
      </li>
      <li>
        <span>잔여기타휴가일수</span>
        <span>{data.restOtherVacation} 일</span>
      </li>
      <li className="mt-5">
        <span>총 연차</span>
        <span>{data.totalVacation} 일</span>
      </li>
    </ul>
  );
}
