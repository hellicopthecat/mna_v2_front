import {ICompanyTypes} from "../company/companyType";
import {IUserTypes} from "../user/userType";

export interface ISalaryType {
  id: number;
  createdAt: string;
  updateAt: string;
  preTaxMonthlySalary: number;
  familyCount: number;
  childCount: number;
  /** 연봉 */
  annualSalary: number;
  /**근로소득공제금액 */
  earnIncomeDedution: number;
  /**근로소득금액 */
  earnIncomeAmount: number;
  /**인적공제 */
  familyDedution: number;
  /**연금보험료공제 */
  pensionInsuranceDedution: number;
  /**특별소득공제 */
  specialIncomeDedution: number;
  /**과세표준 */
  taxBase: number;
  /**산출세엑 */
  taxCalculate: number;
  /**근로소득세액공제 */
  earnIncomeTaxCredit: number;
  /**결정세액  */
  taxDetermined: number;
  /**간이세액 */
  simplifiedTax: number;
  //자녀세금
  childTax: number;
  user: IUserTypes;
  company: ICompanyTypes;
}
