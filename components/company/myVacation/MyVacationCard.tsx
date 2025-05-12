import {IVacationTypes} from "@/types/vacation/vacationType";

export default function MyVacationCard({data}: {data: IVacationTypes}) {
  return (
    <div className="flex flex-col gap-2 bg-slate-600 p-2 rounded-md fadeInCard">
      <h3 className="before:inline-block before:content-[' '] before:bg-teal-500 before:w-2 before:h-4 before:mr-2 font-bold text-xl">
        {data.user.userName} 님의 {data.company.companyName} 연차정보
      </h3>

      <ul className="flex flex-col gap-2 *:flex *:flex-col *:gap-1 *:**:last:text-end *:**:first:font-bold *:**:first:before:inline-block *:**:first:before:content-[' '] *:**:first:before:w-2 *:**:first:before:h-2 *:**:first:before:bg-red-400 *:**:first:before:rounded-full *:**:first:before:mr-2">
        <li>
          <span>입사일</span>
          <span>
            {new Date(Number(data.joinCompanyDate)).toLocaleDateString("ko-KR")}
          </span>
        </li>
        <li>
          <span>출근일수</span>
          <span>{data.appearence} 일</span>
        </li>
        <li>
          <span>연차수</span>
          <span>{data.annual} 일</span>
        </li>
        <li>
          <span>기타 휴가일수</span>
          <span>{data.other} 일</span>
        </li>
        <li>
          <span>남은연차</span>
          <span>{data.restAnnualVacation} 일</span>
        </li>
        <li>
          <span>남은기타휴가</span>
          <span>{data.restOtherVacation} 일</span>
        </li>
        <li>
          <span>총연차수</span>
          <span>{data.totalVacation} 일</span>
        </li>
      </ul>
    </div>
  );
}
