import {IIncomeExpend} from "../asset/assetType";
import {ICompanyTypes} from "../company/companyType";

export interface IProductTypes {
  id: number;
  createdAt: Date;
  updateAt: Date;
  transactionTitle: string; //거래제목
  itemName: string; // 상품이름
  itemModelName: string; // 상품모델명
  itemPhoto: string;
  itemType: string;
  itemCount: number;
  itemPrice: number;
  itemDesc: string;
  company: ICompanyTypes;
  incomeExpend: IIncomeExpend;
}
