import {ICompanyTypes} from "../company/companyType";

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
  ownedCompany: ICompanyTypes[];
  managedCompany: ICompanyTypes[];
  workAtCompany: ICompanyTypes[];
  // salary: Salary[];
  // vacation: Vacation[];
}
