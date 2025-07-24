import {ISalaryType} from "@/types/salary/salaryType";

export default function WorkerInfoVacation({data}: {data: ISalaryType[]}) {
  const isEmpty =
    !data ||
    data.length === 0 ||
    (data.length === 1 && Object.keys(data[0]).length === 0);
  return isEmpty ? (
    <div>
      <h3>급여</h3>
      <p>생성된 급여가 없습니다.</p>
    </div>
  ) : (
    data.map((val) => (
      <div
        key={val.id}
        className="[&>p]:flex [&>p]:flex-col [&>p>span]:last:self-end [&>p>span]:first:font-bold"
      >
        <h3 className="font-bold text-2xl before:inline-block before:content-[''] before:w-2 before:h-4 before:bg-amber-500 before:mr-2 mb-3">
          급여
        </h3>
        <p>
          <span>연봉</span>
          <span>{val.annualSalary.toLocaleString()}</span>
        </p>
        <p>
          <span>세전급여</span>
          <span>{val.preTaxMonthlySalary.toLocaleString()}</span>
        </p>
        <p>
          <span>자녀수</span>
          <span>{val.childCount}명</span>
        </p>
      </div>
    ))
  );
}
