import CreateAssets from "@/components/company/companyAsset/CreateAssets";
import Doughnut from "@/components/company/companyAsset/graph/Doughnut";
import GoBackBtn from "@/components/layout/navigation/GoBackBtn";
import ToGoBtn from "@/components/layout/navigation/ToGoBtn";
import {ACCESSTOKEN} from "@/constants/constant";
import {isError} from "@/libs/utils/util";
import {IAssetTypes} from "@/types/asset/assetType";
import {IAssetsParamsType} from "@/types/company/assetsParamsType";
import {IDoughnutProps} from "@/types/graph/graphTypes";
import {IResponseErrorType} from "@/types/response/responseType";
import {cookies} from "next/headers";

const getCompanyAsset = async (assetId: string) => {
  const cookie = await cookies();
  const response = await fetch(
    `http://localhost:4000/company-assets/${assetId}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${cookie.get(ACCESSTOKEN)?.value}`,
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    return data as IResponseErrorType;
  }
  return data as IAssetTypes;
};
export default async function Page({
  params,
}: {
  params: Promise<IAssetsParamsType>;
}) {
  const {companyId, assetId} = await params;
  const data = await getCompanyAsset(assetId);
  const doughnutData = (data: IAssetTypes): IDoughnutProps => {
    return {
      wholeValue: {
        name: "총 자산",
        value: +data.totalAssets + +data.netAssets,
        color: "red",
      },
      innerValue: [
        {
          name: "총 부채",
          value: +data.liabilities,
          color: "blue",
        },
        {
          name: "순 자산",
          value: +data.netAssets,
          color: "green",
        },
      ],
    };
  };
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        <GoBackBtn href={`/company/${companyId}`} />
        <CreateAssets companyId={companyId} assetId={assetId} />
      </div>
      <section className="flex flex-col gap-2">
        {isError(data) ? (
          <div>
            <p>데이터를 불러오는데 실패하였습니다.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between">
              <span>{data.budget?.toLocaleString() + ""} 원</span>
              <div className="flex flex-col">
                <p className="flex items-center gap-3">
                  <span>{data.accountName}</span>
                  <span>{data.accountNum}</span>
                </p>
                <small className="self-end">{data.accountDesc}</small>
              </div>
            </div>
            <ul className="flex flex-col items-center gap-5 *:w-full">
              <li className="flex w-full">
                <ToGoBtn
                  linkTxt={`/company/${companyId}/${assetId}/totalAsset`}
                  txt="총자산내역보러가기"
                />
              </li>
              <li className="flex w-full">
                <ToGoBtn
                  linkTxt={`/company/${companyId}/${assetId}/totalInEx`}
                  txt="총수입지출항목"
                />
              </li>
            </ul>
            <div>
              <Doughnut data={doughnutData(data)} />
            </div>
          </>
        )}
      </section>
    </div>
  );
}
