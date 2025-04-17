import {ICompanyTypes} from "../company/companyType";

export interface IAssetTypes {
  id: number;
  createdAt: Date;
  updateAt: Date;
  company: ICompanyTypes;
  budget: number; //예산
  accountNum: string;
  accountName: string;
  accountDesc: string;
  //   재무항목
  totalAssetsDesc: IAssetLiability[]; // 자산 및 부채 내역
  /* computed */
  // 자산 및 부채 금액
  totalAssets: string;
  // 유동자산내역
  currentAssetsDesc: IAssetLiability[];
  // 유동자산
  currentAssets: string;
  // 비유동자산내역
  nonCurrentAssetsDesc: IAssetLiability[];
  // 비유동자산
  nonCurrentAssets: string;
  // 유동부채
  currentLiabilitiesDesc: IAssetLiability[];
  // 유동부채
  currentLiabilities: string;
  // 비유동부채내역
  nonCurrentLiabilitiesDesc: IAssetLiability[];
  // 비유동부채
  nonCurrentLiabilities: string;
  // 부채
  liabilities: string;
  // 순자산
  netAssets: string;
  // 자본
  capital: string;
  // 수입지출항목
  allIncomeExpend: IIncomeExpend[];
  //수입항목
  incomeModel: IIncomeExpend[];
  //수입금액 - 총수익
  incomeMoney: string;
  //지출항목
  expendModel: IIncomeExpend[];
  // 총 비용
  expendMoney: string;
  waitIncomeModel: IIncomeExpend[];
  waitIncomeMoney: string;
  waitExpendModel: IIncomeExpend[];
  waitExpendMoney: string;
  // 손익계산
  // 순이익
  netIncome: string;
  // 재무지표
  // 자기자본비율
  equityRatio: string; // 이익률
  profitMargin: string;
  // 부채비율
  debtRatio: string;
  // 자기자본이익률
  roe: string;
}

export interface IAssetLiability {
  id: number;
  createdAt: string;
  updateAt: string;
  assetLiabilityDesc: string;
  assetLiabilityName: string;
  assetLiabilityType: string;
  assetOrLiability: boolean;
  assetValue: number;
  current: boolean;
}

export interface IIncomeExpend {
  id: number;
  createdAt: Date;
  updateAt: Date;
  incomeTrue: boolean;
  title: string;
  businessDate: string;
  businessDesc: string;
  cost: number;
  paymentType: string;
  paymentsDone: TPaymentsDoneType;
  // product: {};
}

export enum TPaymentsDoneType {
  WAIT = "WAIT",
  PAID = "PAID",
  NONPAID = "NONPAID",
}
