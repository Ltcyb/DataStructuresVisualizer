import {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { CircleNode } from "./graph-stuff/CircleNode";
import { ControlPosition } from "react-draggable";

const MAX_NODES = 10;

type Node = {
  uuid: string;
  selected: boolean;
  disabled: boolean;
  value: string;
  position: ControlPosition;
};

export function Graph() {
  //nodes logic
  const [nodes, dispatch] = useReducer(nodeReducer, []);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    dispatch({
      type: "disable",
      disabled: disabled,
    });
  }, [disabled]);

  const setSelected = (uuid: string, selected: boolean) => {
    dispatch({
      type: "setSelected",
      uuid: uuid,
      selected: selected,
    });
  };

  const setPosition = (uuid: string, position: ControlPosition) => {
    dispatch({
      type: "setPosition",
      uuid: uuid,
      position: position,
    });
  };

  const setValue = (uuid: string, value: string) => {
    dispatch({
      type: "setValue",
      uuid: uuid,
      value: value,
    });
  };

  const addNode = () => {
    dispatch({
      type: "add",
      value: "0",
      selected: false,
      disabled: disabled,
      position: { x: 0, y: 0 },
    });
  };

  //use find to change somehting in arraay + map to replace old
  const removeNode = () => {
    dispatch({
      type: "remove",
    });
  };

  //edges logic
  const [edges, setEdges] = useState<any[]>([]);

  const addEdge = () => {
    if (nodes.length > 1) {
      console.log("add edge");
    }
  };

  const removeEdge = () => {
    console.log("removed edge");
  };

  return (
    <div className="relative flex max-h-full min-h-full min-w-full max-w-full">
      <div className="flex max-h-screen min-h-screen min-w-full max-w-full p-2">
        {nodes.map((item) => (
          <CircleNode
            key={item.uuid}
            uuid={item.uuid}
            selected={item.selected}
            position={item.position}
            setSelected={setSelected}
            setPosition={setPosition}
            disabled={item.disabled}
            value={item.value}
            setValue={setValue}
          />
        ))}
      </div>

      <nav className="absolute bottom-0 flex w-full flex-row place-content-center gap-8">
        <ul className="flex flex-row place-content-center gap-4 p-2">
          <li>
            <button
              className={`rounded-lg ${
                nodes.length >= MAX_NODES || disabled
                  ? "bg-gray-400"
                  : "bg-green-400"
              } p-2`}
              onClick={addNode}
            >
              Add Node
            </button>
          </li>
          <li>
            <button
              className={`rounded-lg ${
                nodes.length > 0 && !disabled ? "bg-red-400" : "bg-gray-400"
              } p-2`}
              onClick={removeNode}
              disabled={nodes.length <= 0 && disabled}
            >
              Delete Node
            </button>
          </li>
        </ul>

        <ul className="flex flex-row place-content-center p-2">
          <li>
            <button
              className="rounded-lg bg-blue-400 p-2"
              onClick={() => setDisabled(!disabled)}
            >
              {disabled ? "Unlock Graph" : "Lock Graph"}
            </button>
          </li>
        </ul>

        <ul className="flex flex-row place-content-center gap-4 p-2">
          <li>
            <button
              className={`rounded-lg ${
                nodes.length > 1 && !disabled ? "bg-green-400" : "bg-gray-400"
              } p-2`}
              onClick={addEdge}
              disabled={nodes.length <= 1 && disabled}
            >
              Add Edge
            </button>
          </li>
          <li>
            <button
              className={`rounded-lg ${
                edges.length > 0 && !disabled ? "bg-red-400" : "bg-gray-400"
              } p-2`}
              onClick={removeEdge}
              disabled={edges.length <= 0 && disabled}
            >
              Delete Edge
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function nodeReducer(nodes: Node[], action): Node[] {
  switch (action.type) {
    case "add": {
      if (nodes.length < MAX_NODES) {
        return [
          ...nodes,
          {
            uuid: crypto.randomUUID(),
            selected: action.selected,
            value: action.value,
            position: action.position,
            disabled: action.disabled,
          },
        ];
      }
    }

    case "remove": {
      const temp = [...nodes];
      const result = temp.filter((n) => !n.selected);
      return result;
    }

    case "setSelected": {
      const id = nodes.findIndex((item) => item.uuid === action.uuid);

      if (id < 0) return [...nodes];

      const temp = [...nodes];
      temp[id].selected = action.selected;

      return temp;
    }

    case "setPosition": {
      const id = nodes.findIndex((item) => item.uuid === action.uuid);

      if (id < 0) return [...nodes];

      const temp = [...nodes];

      temp[id].position = action.position;

      return temp;
    }

    case "setValue": {
      const id = nodes.findIndex((item) => item.uuid === action.uuid);

      if (id < 0) return [...nodes];

      const temp = [...nodes];
      temp[id].value = action.value;
      console.log(action.value);
      return temp;
    }

    case "disable": {
      const temp = [...nodes];
      temp.forEach((n) => {
        n.disabled = action.disabled;
      });
      return temp;
    }
  }

  throw Error("Unknown action: " + action.type);
}
