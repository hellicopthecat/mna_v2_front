import CreateAssets from "@/components/company/companyAsset/CreateAssets";
import BarChart from "@/components/company/companyAsset/graph/BarChart";
import Doughnut from "@/components/company/companyAsset/graph/Doughnut";
import GaugeChart from "@/components/company/companyAsset/graph/GaugeChart";
import GoBackBtn from "@/components/layout/navigation/GoBackBtn";
import ToGoBtn from "@/components/layout/navigation/ToGoBtn";
import {ACCESSTOKEN} from "@/constants/constant";
import {isError} from "@/libs/utils/util";
import {IAssetTypes} from "@/types/asset/assetType";
import {IAssetsParamsType} from "@/types/company/assetsParamsType";
import {
  IBarProps,
  IChartLibraryDataProps,
  IDoughnutProps,
} from "@/types/graph/graphTypes";
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
        color: "#1d1e4a",
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

  const barData = (data: IAssetTypes): IBarProps => {
    return {
      currentAssets: {
        name: "유동자산",
        value: +data.currentAssets,
        color: "",
      },
      nonCurrentAssets: {
        name: "부동자산",
        value: +data.nonCurrentAssets,
        color: "",
      },
      currentLiabilities: {
        name: "유동부채",
        value: +data.currentLiabilities,
        color: "",
      },
      nonCurrentLiabilities: {
        name: "부동부채",
        value: +data.nonCurrentLiabilities,
        color: "",
      },
    };
  };

  const gaugeData = (data: IAssetTypes): IChartLibraryDataProps => {
    return {
      series: [
        +data.equityRatio,
        +data.profitMargin,
        +data.debtRatio,
        +data.roe,
      ],
      options: {
        chart: {
          height: 100,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {fontSize: "22px"},
              value: {fontSize: "16px"},
              total: {show: true, label: "Total", color: "#eee"},
            },
            track: {background: "#7b7b7b"},
          },
        },
        labels: ["자기자본비율", "이익률", "부채비율", "자기자본이익률"],
      },
    };
  };
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        <GoBackBtn href={`/company/${companyId}`} />
        <CreateAssets companyId={companyId} assetId={assetId} />
      </div>
      <section className="flex flex-col gap-6">
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
            <ul className="flex flex-col gap-3 *:lg:w-[50%]">
              <li className="">
                <Doughnut data={doughnutData(data)} />
              </li>
              <li className="">
                <BarChart data={barData(data)} />
              </li>
              <li className="">
                <GaugeChart {...gaugeData(data)} />
                <div className="grid grid-cols-2 gap-1 text-nowrap">
                  <small>자기자본비율 : {data.equityRatio}%</small>
                  <small>이익률 : {data.profitMargin}%</small>
                  <small>부채비율 : {data.debtRatio}%</small>
                  <small>자기자본이익률 : {data.roe}%</small>
                </div>
              </li>
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
