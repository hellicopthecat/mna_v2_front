"use client";

import {useRouter} from "next/navigation";

export default function ModalLayout({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const goBack = () => router.back();
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black/50 p-10">
      <div className="absolute z-40 w-full h-full" onClick={goBack} />
      {children}
    </div>
  );
}
