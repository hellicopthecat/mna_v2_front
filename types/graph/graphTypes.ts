export interface IDoughnutDataProps {
  name: string;
  value: number;
  color?: string;
}
export interface IDoughnutProps {
  wholeValue: IDoughnutDataProps;
  innerValue: IDoughnutDataProps[];
}
