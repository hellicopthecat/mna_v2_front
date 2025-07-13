export interface IChartDataProps {
  name: string;
  value: number;
  color?: string;
}
export interface IDoughnutProps {
  wholeValue: IChartDataProps;
  innerValue: IChartDataProps[];
}

export interface IBarProps {
  currentAssets: IChartDataProps;
  nonCurrentAssets: IChartDataProps;
  currentLiabilities: IChartDataProps;
  nonCurrentLiabilities: IChartDataProps;
}
