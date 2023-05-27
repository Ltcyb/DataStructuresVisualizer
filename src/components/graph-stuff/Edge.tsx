import { useState } from "react";

type EdgeProps = {
  p1: { x: number; y: number };
  p2: { x: number; y: number };
  weight?: number;
};

export function Edge({ p1, p2, weight = 0 }: EdgeProps) {
  const [value, setValue] = useState(weight.toString);

  return (
    <svg className="z-1" height={p2.y - p1.y} width={p2.x - p1.x}>
      <text
        fill="black"
        x={(p1.x + p2.x) / 2}
        y={(p2.y + p1.y) / 2}
        rotate="auto"
      >
        <input
          placeholder="0"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </text>
      <line
        strokeWidth={2}
        stroke="black"
        x1={p1.x}
        x2={p2.x}
        y1={p1.y}
        y2={p2.y}
      />
    </svg>
  );
}
