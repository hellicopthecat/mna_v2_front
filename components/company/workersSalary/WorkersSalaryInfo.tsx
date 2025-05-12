import {ISalaryType} from "@/types/salary/salaryType";

export default function WorkersSalaryInfo({
  data,
  open,
}: {
  data: ISalaryType;
  open: boolean;
}) {
  return (
    <ul
      className={`grid grid-cols-2 gap-3 *:flex *:items-center. *:justify-between origin-top transition duration-300 ease-in-out ${
        open ? "opacity-100" : "opacity-0"
      } **:first:font-bold **:last:font-medium`}
    >
      <li>
        <span>세전 월급여</span>
        <span>{data.preTaxMonthlySalary.toLocaleString()} 원</span>
      </li>
      <li>
        <span>연봉</span>
        <span>{data.annualSalary.toLocaleString()} 원</span>
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
        <span>근로소득금액</span>
        <span>{data.earnIncomeAmount.toLocaleString()} 원</span>
      </li>
      <li>
        <span>근로소득공제금액</span>
        <span>{data.earnIncomeDedution.toLocaleString()} 원</span>
      </li>
      <li>
        <span>근로소득세액공제</span>
        <span>{data.earnIncomeTaxCredit.toLocaleString()} 원</span>
      </li>
      <li>
        <span>인적공제</span>
        <span>{data.familyDedution.toLocaleString()} 원</span>
      </li>
      <li>
        <span>연금보험료공제</span>
        <span>{data.pensionInsuranceDedution.toLocaleString()} 원</span>
      </li>
      <li>
        <span>특별소득공제</span>
        <span>{data.specialIncomeDedution.toLocaleString()} 원</span>
      </li>
      <li>
        <span>과세표준</span>
        <span>{data.taxBase.toLocaleString()} 원</span>
      </li>
      <li>
        <span>산출세액</span>
        <span>{data.taxCalculate.toLocaleString()} 원</span>
      </li>
      <li>
        <span>결정세액</span>
        <span>{data.taxDetermined.toLocaleString()} 원</span>
      </li>
      <li>
        <span>간이세액</span>
        <span>{data.simplifiedTax.toLocaleString()} 원</span>
      </li>
      <li>
        <span>자녀세금</span>
        <span>{data.childTax.toLocaleString()} 원</span>
      </li>
    </ul>
  );
}
