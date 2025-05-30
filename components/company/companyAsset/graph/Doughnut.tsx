"use client";
import {IDoughnutDataProps, IDoughnutProps} from "@/types/graph/graphTypes";
import {HtmlHTMLAttributes, useEffect, useRef} from "react";

export default function Doughnut({
  data,
  ...args
}: {
  data: IDoughnutProps;
  args?: HtmlHTMLAttributes<HTMLUListElement>;
}) {
  const doughnutRef = useRef(null);
  useEffect(() => {
    if (!doughnutRef.current) return;
    const doughnut = doughnutRef.current as HTMLElement;
    const totalCircle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    totalCircle.setAttribute("fill", "none");
    totalCircle.setAttribute("stroke", data.wholeValue.color + "");
    totalCircle.setAttribute("stroke-width", 50 + "");
    totalCircle.setAttribute("cx", 100 + "");
    totalCircle.setAttribute("cy", 100 + "");
    totalCircle.setAttribute("r", 60 + "");
    // totalCircle.setAttribute("rotate", "rotate(-90deg)");
    doughnut.appendChild(totalCircle);

    data.innerValue.forEach((val) => {
      const pie = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      const value = Number((val.value / data.wholeValue.value).toFixed(2));
      console.log(value);
      pie.setAttribute("fill", "none");
      pie.setAttribute("stroke", val.color + "");
      pie.setAttribute("stroke-width", 30 + "");
      pie.setAttribute("stroke-dasharray", `${2 * Math.PI * 30 * value}`);
      pie.setAttribute("cx", 100 + "");
      pie.setAttribute("cy", 100 + "");
      pie.setAttribute("r", 60 + "");
      doughnut.appendChild(pie);
    });
  }, [data]);
  return (
    <div>
      <svg ref={doughnutRef} width={200} height={200}></svg>
      <svg width={200} height={200}>
        <circle
          strokeDasharray={0}
          stroke="red"
          strokeWidth={20}
          cx={100}
          cy={100}
          r={30}
        />
      </svg>
    </div>
  );
}
