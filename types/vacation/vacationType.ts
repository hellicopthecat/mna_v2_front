import {ICompanyTypes} from "../company/companyType";
import {IUserTypes} from "../user/userType";

export interface IVacationTypes {
  id: number;
  createdAt: Date;
  updateAt: Date;
  joinCompanyDate: string;
  appearence: number;
  annual: number;
  other: number;
  restAnnualVacation: number;
  restOtherVacation: number;
  totalVacation: number;
  //   description: VacationDesc[];
  user: IUserTypes;
  company: ICompanyTypes;
}
