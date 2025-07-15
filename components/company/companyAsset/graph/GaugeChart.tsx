"use client";

import {IChartLibraryDataProps} from "@/types/graph/graphTypes";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {ssr: false});

export default function GaugeChart({options, series}: IChartLibraryDataProps) {
  return <ReactApexChart options={options} series={series} type="radialBar" />;
}
