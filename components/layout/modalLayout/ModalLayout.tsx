"use client";

import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function ModalLayout({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const goBack = () => router.back();
  useEffect(() => {
    const pressEscFn = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };
    window.addEventListener("keydown", pressEscFn);
    return () => window.removeEventListener("keydown", pressEscFn);
  }, [router]);
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black/50 p-10">
      <div className="absolute z-40 w-full h-full" onClick={goBack} />
      {children}
    </div>
  );
}
