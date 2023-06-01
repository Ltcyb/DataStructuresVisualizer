import { useState } from "react";
import Draggable from "react-draggable";

type EdgeProps = {
  uuid: string;
  p1: { x: number; y: number };
  p2: { x: number; y: number };
  weight: number;
  setWeight: (uuid: string, x: number) => void;
  selected: boolean;
  setSelected: (uuid: string, bool: boolean) => void;
  disabled: boolean;
};

export function Edge({
  uuid,
  p1,
  p2,
  weight = 0,
  setWeight,
  selected,
  setSelected,
  disabled,
}: EdgeProps) {
  return (
    <svg>
      <line></line>
      <text>
        <input
          className="border-2 border-black bg-white"
          placeholder="0"
          value={weight}
          onChange={(e) => {
            setWeight(uuid, Number(e.target.value));
          }}
          disabled={disabled}
        />
      </text>
    </svg>
  );
}
