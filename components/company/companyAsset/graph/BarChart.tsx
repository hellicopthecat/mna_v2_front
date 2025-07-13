"use client";
import {IBarProps, IChartDataProps} from "@/types/graph/graphTypes";
import {useState} from "react";

export default function BarChart({data}: {data: IBarProps}) {
  const [show, setShow] = useState<number | null>(null);
  const items: IChartDataProps[] = Object.values(data);
  const maxValue = Math.max(...items.map((value) => value.value), 1);
  const yTicks = 5;

  const viewW = 100;
  const viewH = 100;
  const padL = 15;
  const padB = 8;
  const chartW = viewW - padL - 4;
  const chartH = viewH - padB - 8;

  const barGap = chartW / items.length;
  const barWidth = barGap * 0.6;
  return (
    <svg viewBox={`0 0 ${viewW} ${viewH}`}>
      <line
        x1={padL}
        y1={viewH - padB}
        x2={viewW}
        y2={viewH - padB}
        stroke="white"
        strokeWidth={0.7}
      ></line>
      <line
        x1={padL}
        x2={padL}
        y1={0}
        y2={viewH - padB}
        stroke="white"
        strokeWidth={0.7}
      ></line>

      {Array.from({length: yTicks + 1}, (_, i) => {
        const ratio = i / yTicks;
        const y = viewH - padB - chartH * ratio;
        const tickV = Math.round((maxValue * ratio) / 100) * 100;
        return (
          <g key={i}>
            <line
              x1={padL}
              x2={viewW}
              y1={y}
              y2={y}
              stroke="#eee"
              strokeWidth={0.2}
            ></line>
            <text
              x={padL - 2}
              y={y + 1.5}
              fontSize={3}
              fill="#ccc"
              textAnchor="end"
            >
              {tickV.toLocaleString()}
            </text>
          </g>
        );
      })}
      {items.map((it, i) => {
        const x = padL + barGap * i + (barGap - barWidth) / 2;
        const h = (it.value / maxValue) * chartH;
        const y = viewH - padB - h;
        return (
          <g key={it.name}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={h}
              rx={1.5}
              fill={it.color || "#68c1ff"}
              onMouseEnter={() => setShow(i)}
              onMouseLeave={() => setShow(null)}
            />
            <text
              x={x + barWidth / 2}
              y={viewH - padB + 5}
              fontSize={3}
              fill="#eee"
              textAnchor="middle"
            >
              {it.name}
            </text>
            {show === i && (
              <text x={x - 3} y={viewH - h - padB - 2} fontSize={4} fill="#eee">
                {it.value.toLocaleString()} 원
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
