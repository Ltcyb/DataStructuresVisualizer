import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

export function Graph() {
  const [nodes, setNodes] = useState([<CircleNode id={crypto.randomUUID()} />]);

  const addNode = () => {
    setNodes([...nodes, <CircleNode id={crypto.randomUUID()} />]);
  };

  const removeNode = () => {
    const temp = [...nodes];
    temp.pop();
    setNodes(temp);
  };

  return (
    <div className="flex">
      <div className="border-2 border-black">{nodes}</div>
      <nav>
        <ul className="absolute bottom-0 flex flex-row place-items-center gap-4 p-4">
          <li>
            <button className="bg-green-400 p-2" onClick={addNode}>
              Add Node
            </button>
          </li>
          <li>
            <button className="bg-red-400 p-2" onClick={removeNode}>
              Delete Node
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

type CircleNodeProps = {
  id: string;
};

function CircleNode({ id }: CircleNodeProps) {
  return (
    <Draggable key={id}>
      <div
        className={`flex h-20 w-20 items-center justify-center rounded-full border-2 border-black bg-white`}
      >
        <input
          className="h-7 w-10 resize-none text-center outline-none"
          placeholder="0"
          maxLength={4}
          onKeyDown={(e) =>
            !/[0-9]/.test(e.key) &&
            e.key !== "Backspace" &&
            e.key !== "ArrowUp" &&
            e.key !== "ArrowDown" &&
            e.key !== "ArrowRight" &&
            e.key !== "ArrowLeft" &&
            e.preventDefault()
          }
        />
      </div>
    </Draggable>
  );
}
