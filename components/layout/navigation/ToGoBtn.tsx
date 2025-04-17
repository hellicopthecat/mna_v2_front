import Link from "next/link";
import {AnchorHTMLAttributes} from "react";

interface ITogoBtnProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  linkTxt: string;
  txt: string;
  classNames?: string;
}
export default function ToGoBtn({
  linkTxt,
  txt,
  classNames,
  ...args
}: ITogoBtnProps) {
  return (
    <Link
      href={linkTxt}
      className={`bg-blue-500 p-2 rounded-md text-center w-full ${classNames}`}
      {...args}
    >
      {txt}
    </Link>
  );
}
