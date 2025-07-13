"use client";
import {IChartDataProps, IDoughnutProps} from "@/types/graph/graphTypes";
import {Fragment, useMemo, useState} from "react";

interface ISegment extends IChartDataProps {
  dash: string;
  offset: number;
}
export default function Doughnut({data}: {data: IDoughnutProps}) {
  const [show, setShow] = useState<number | null>(null);
  const segments = useMemo<ISegment[]>(() => {
    const R = 45; //반지름
    const C = 2 * Math.PI * R; // 둘레
    let acc = 0; // 누적길이
    return data.innerValue.map((v, i, array) => {
      let len; // 도넛 둘레에서 이 조각이 차지하는 길
      if (i === array.length - 1) {
        len = C - acc;
      } else {
        len = (v.value / data.wholeValue.value) * C;
      }
      const dash = `${len} ${C - len}`;
      const seg: ISegment = {
        ...v,
        dash,
        offset: -acc,
      };
      acc += len;
      return seg;
    });
  }, [data]);
  return (
    <svg viewBox="0 0 100 100">
      <circle
        fill="transparent"
        stroke={data.wholeValue.color}
        strokeWidth={30}
        cx={50}
        cy={50}
        r={30}
      />
      <g transform="rotate(-90 50 50)">
        {segments.map((seg, i) => (
          <Fragment key={i}>
            <circle
              cx={50}
              cy={50}
              r={45}
              fill="none"
              stroke={seg.color}
              strokeWidth={10}
              strokeDasharray={seg.dash}
              strokeDashoffset={seg.offset}
              strokeLinecap="butt"
              onMouseEnter={() => setShow(i)}
              onMouseLeave={() => setShow(null)}
            />
            {show === i && (
              <text
                x={25}
                y={50}
                transform="rotate(90 50 50)"
                className="text-[0.4em] "
                fill="white"
              >
                {seg.name} : {seg.value.toLocaleString()} 원
              </text>
            )}
          </Fragment>
        ))}
      </g>
    </svg>
  );
}
