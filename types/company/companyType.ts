import {IAssetTypes} from "../asset/assetType";
import {IProductTypes} from "../product/productType";
import {IUserTypes} from "../user/userType";
import {IVacationTypes} from "../vacation/vacationType";

export interface ICompanyTypes {
  id: number;
  createdAt: Date;
  updateAt: Date;
  companyName: string;
  companyLogo: string;
  zonecode: string;
  sido: string;
  sigungu: string;
  roadname: string;
  roadAddress: string;
  restAddress: string;
  bname: string;
  bname1: string;
  bname2: string;
  jibunAddress: string;
  companyOwner: IUserTypes;
  companyManager: IUserTypes[];
  companyWorker: IUserTypes[];
  connectedCompany: ICompanyTypes[];
  connectingCompany: ICompanyTypes[];
  companyAssets: IAssetTypes;
  companyProduct: IProductTypes[];
  workerVacation: IVacationTypes[];
  // workerSalary: [Salary]
}
