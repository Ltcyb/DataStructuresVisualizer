import { RefObject, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

const MAX_NODES = 10;

export function Graph() {
  const spaceRef = useRef(null);

  const [nodes, setNodes] = useState<any[]>([]);

  const addNode = () => {
    if (spaceRef.current && nodes.length <= MAX_NODES) {
      setNodes([
        ...nodes,
        <CircleNode
          key={crypto.randomUUID()}
          offsetParent={spaceRef.current}
        />,
      ]);
    }
  };

  const removeNode = () => {
    const temp = [...nodes];
    temp.pop();
    setNodes(temp);
  };

  return (
    <div className="max-h-full min-h-full min-w-full max-w-full">
      <div className="h-screen w-full flex-none p-2" ref={spaceRef}>
        {nodes}
      </div>
      <nav className="fixed bottom-0 left-1/2">
        <ul className="flex flex-row place-content-center gap-4 self-center p-2">
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
  offsetParent: HTMLDivElement;
};

function CircleNode({ offsetParent }: CircleNodeProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef} offsetParent={offsetParent} bounds="parent">
      <div
        className={`flex h-20 w-20 items-center justify-center rounded-full border-2 border-black bg-white`}
        ref={nodeRef}
      >
        <input
          className="h-7 w-10 resize-none text-center outline-none"
          placeholder="0"
          ref={inputRef}
          value={value}
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
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
    </Draggable>
  );
}
