import {IVacationTypes} from "@/types/vacation/vacationType";

export default function WorkerInfoVacation({data}: {data: IVacationTypes[]}) {
  const isEmpty =
    !data ||
    data.length === 0 ||
    (data.length === 1 && Object.keys(data[0]).length === 0);
  return isEmpty ? (
    <div>
      <h3 className="font-bold text-2xl before:inline-block before:content-[''] before:w-2 before:h-4 before:bg-sky-500 before:mr-2 mb-3">
        휴가
      </h3>
      <p>생성된 휴가가 없습니다.</p>
    </div>
  ) : (
    data.map((val) => (
      <div
        key={val.id}
        className="[&>p]:flex [&>p]:flex-col [&>p>span]:last:self-end [&>p>span]:first:font-bold"
      >
        <h3 className="font-bold text-2xl before:inline-block before:content-[''] before:w-2 before:h-4 before:bg-sky-500 before:mr-2 mb-3">
          휴가
        </h3>
        <p>
          <span>입사일</span>
          <span>
            {new Date(+val.joinCompanyDate).toLocaleDateString("ko-kr")}
          </span>
        </p>
        <p>
          <span>출근일</span>
          <span>{val.appearence}</span>
        </p>
        <p>
          <span>연차</span>
          <span>{val.annual}</span>
        </p>
        <p>
          <span>기타연차</span>
          <span>{val.other}</span>
        </p>
        <p>
          <span>남은 연차</span>
          <span>{val.restAnnualVacation}</span>
        </p>
        <p>
          <span>남은 기타연차</span>
          <span>{val.restOtherVacation}</span>
        </p>
        <p>
          <span>총 휴가일수</span>
          <span>{val.totalVacation}</span>
        </p>
      </div>
    ))
  );
}
