import {Dispatch, SetStateAction} from "react";

export default function CSRModalLayout({
  children,
  goBack,
}: {
  children: React.ReactNode;
  goBack: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black/50 p-10">
      <div
        className="absolute z-40 w-full h-full"
        onClick={() => goBack(false)}
      />
      {children}
    </div>
  );
}
