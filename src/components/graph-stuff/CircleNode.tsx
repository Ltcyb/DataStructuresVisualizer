import { useRef, useState } from "react";

import Draggable from "react-draggable";
import { ControlPosition } from "react-draggable";

type CircleNodeProps = {
  className?: string;

  uuid: string;
  disabled: boolean;
  selected: boolean;
  setSelected: (uuid: string, b: boolean) => void;
  position: ControlPosition;
  setPosition: (uuid: string, p: ControlPosition) => void;
  value: string;
  setValue: (uuid: string, v: string) => void;
};

export function CircleNode({
  className = "",
  uuid,
  disabled,
  position,
  setPosition,
  selected,
  setSelected,
  value,
  setValue,
}: CircleNodeProps) {
  const [stringInput, setStringInput] = useState(false);
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      bounds="parent"
      onMouseDown={() => setSelected(uuid, !selected)}
      onDrag={() => setSelected(uuid, false)}
      onStop={(e, d) => {
        setPosition(uuid, { x: d.x, y: d.y });
      }}
      defaultClassName="absolute"
      disabled={disabled}
    >
      <div
        className={`${className} ${
          selected ? "border-blue-500" : "border-black"
        } flex h-20 w-20 items-center justify-center rounded-full border-4 bg-white`}
        ref={nodeRef}
      >
        <input
          className="h-7 w-10 resize-none text-center outline-none"
          placeholder="0"
          value={value}
          maxLength={stringInput ? 1 : 2}
          onKeyDown={(e) => {
            if (/[a-z]/i.test(value)) {
              return;
            }
            setStringInput(!/[0-9]/.test(e.key));
          }}
          onChange={(e) => {
            if (/[^a-zA-Z0-9 ]/g.test(e.target.value)) {
              return;
            } else if (!/[0-9]/.test(e.target.value)) {
              setValue(uuid, e.target.value.toUpperCase());
            } else {
              setValue(uuid, e.target.value);
            }
          }}
          onFocus={() => setSelected(uuid, true)}
          onBlur={() => setSelected(uuid, false)}
        />
      </div>
    </Draggable>
  );
}
