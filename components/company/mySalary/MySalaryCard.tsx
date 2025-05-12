import {ISalaryType} from "@/types/salary/salaryType";

export default function MySalaryCard({data}: {data: ISalaryType}) {
  return (
    <div className="bg-slate-700 p-2 rounded-md flex flex-col gap-2 fadeInCard">
      <div className="h-[50%] flex items-center gap-3">
        <div className="h-full w-2 bg-teal-400" />
        <h3 className="text-xl font-bold">
          {data.user.userName}님의 {data.company.companyName} 급여정보
        </h3>
      </div>
      <ul className="grid grid-cols-2 gap-5 *:flex *:flex-col *:gap-1 *:p-1 *:**:last:text-end *:**:first:before:inline-block *:**:first:before:content-[' '] *:**:first:before:bg-red-500 *:**:first:before:w-3 *:**:first:before:h-3 *:**:first:before:rounded-full *:**:first:before:mr-2 *:**:first:font-bold">
        <li>
          <span>세전급여</span>
          <span>{data.preTaxMonthlySalary.toLocaleString("ko-KR")} 원</span>
        </li>
        <li>
          <span>연봉</span>
          <span>{data.annualSalary.toLocaleString("ko-KR")} 원</span>
        </li>
        <li>
          <span>가족수</span>
          <span>{data.familyCount} 명</span>
        </li>
        <li>
          <span>자녀수</span>
          <span>{data.childCount} 명</span>
        </li>
        <li>
          <span>인적공제</span>
          <span>{data.familyDedution.toLocaleString("ko-KR")} 원</span>
        </li>
        <li>
          <span>자녀세금</span>
          <span>{data.childTax.toLocaleString("ko-KR")} 원</span>
        </li>
        <li>
          <span>근로소득공제금액</span>
          <span>{data.earnIncomeDedution.toLocaleString("ko-KR")} 원</span>
        </li>
        <li>
          <span>근로소득금액</span>
          <span>{data.earnIncomeAmount.toLocaleString("ko-KR")} 원</span>
        </li>
        <li>
          <span>근로소득세액공제</span>
          <span>{data.earnIncomeTaxCredit.toLocaleString("ko-KR")} 원</span>
        </li>
        <li>
          <span>연금보험료공제</span>
          <span>
            {data.pensionInsuranceDedution.toLocaleString("ko-KR")} 원
          </span>
        </li>
        <li>
          <span>특별소득공제</span>
          <span>{data.specialIncomeDedution.toLocaleString("ko-KR")} 원</span>
        </li>
        <li>
          <span>과세표준</span>
          <span>{data.taxBase.toLocaleString("ko-KR")} 원</span>
        </li>
        <li>
          <span>산출세액</span>
          <span>{data.taxCalculate.toLocaleString("ko-KR")} 원</span>
        </li>
        <li>
          <span>결정세액</span>
          <span>{data.taxDetermined.toLocaleString("ko-KR")} 원</span>
        </li>
        <li>
          <span>간이세액</span>
          <span>{data.simplifiedTax.toLocaleString("ko-KR")} 원</span>
        </li>
      </ul>
    </div>
  );
}
