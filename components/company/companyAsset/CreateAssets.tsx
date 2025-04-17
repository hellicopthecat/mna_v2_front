"use client";

import {useState} from "react";
import ToGoBtn from "@/components/layout/navigation/ToGoBtn";

export default function CreateAssets({
  companyId,
  assetId,
}: {
  companyId: string;
  assetId: string;
}) {
  return (
    <ul className="flex items-center gap-3 self-end">
      <li>
        <ToGoBtn
          linkTxt={`/company/${companyId}/${assetId}/create-assetliability`}
          txt="재산생성"
        />
      </li>
      <li>
        <ToGoBtn
          linkTxt={`/company/${companyId}/${assetId}/create-inex`}
          txt="지출거래생성"
        />
      </li>
    </ul>
  );
}
