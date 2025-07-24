import {ICompanyTypes} from "../company/companyType";
import {ISalaryType} from "../salary/salaryType";
import {IVacationTypes} from "../vacation/vacationType";

export interface IUserTypes {
  id: number;
  createdAt: Date;
  updateAt: Date;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatarUrl: string;
  password: string;
  ownedCompany: ICompanyTypes[];
  managedCompany: ICompanyTypes[];
  workAtCompany: ICompanyTypes[];
  salary: ISalaryType[];
  vacation: IVacationTypes[];
}
