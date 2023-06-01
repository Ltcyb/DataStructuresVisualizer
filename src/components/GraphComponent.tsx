import { useEffect, useReducer, useRef, useState } from "react";
import { CircleNode } from "./graph-stuff/CircleNode";
import { ControlPosition } from "react-draggable";
import { Edge } from "./graph-stuff/Edge";

const MAX_NODES = 10;

type Node = {
  uuid: string;
  value: string;
  position: ControlPosition;
  selected: boolean;
  disabled: boolean;
};

type Edge = {
  uuid: string;
  weight: number;
  node1: ControlPosition;
  node2: ControlPosition;
  selected: boolean;
  disabled: boolean;
};

export function Graph() {
  //nodes logic
  const [nodes, nodesDispatch] = useReducer(nodesReducer, []);
  const [edges, edgesDispatch] = useReducer(edgesReducer, []);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    nodesDispatch({
      type: "disable",
      disabled: disabled,
    });
    edgesDispatch({
      type: "disable",
      disabled: disabled,
    });
  }, [disabled]);

  const setSelected = (uuid: string, selected: boolean) => {
    nodesDispatch({
      type: "setSelected",
      uuid: uuid,
      selected: selected,
    });
    edgesDispatch({
      type: "setSelected",
      uuid: uuid,
      selected: selected,
    });
  };

  const setPosition = (uuid: string, position: ControlPosition) => {
    nodesDispatch({
      type: "setPosition",
      uuid: uuid,
      position: position,
    });
  };

  const setValue = (uuid: string, value: string) => {
    nodesDispatch({
      type: "setValue",
      uuid: uuid,
      value: value,
    });
  };

  const addNode = () => {
    nodesDispatch({
      type: "add",
      value: "0",
      selected: false,
      disabled: disabled,
      position: { x: 0, y: 0 },
    });
  };

  //use find to change somehting in arraay + map to replace old
  const removeNode = () => {
    nodesDispatch({
      type: "remove",
    });
  };

  const addEdge = () => {
    edgesDispatch({
      type: "add",
      nodes: nodes,
      selected: false,
      weight: 0,
      disabled: disabled,
    });
  };

  const removeEdge = () => {
    edgesDispatch({
      type: "remove",
    });
  };

  const setWeight = (uuid: string, weight: number) => {
    edgesDispatch({
      type: "setWeight",
      uuid: uuid,
      weight: weight,
    });
  };

  return (
    <div className="relative flex max-h-full min-h-full min-w-full max-w-full">
      <div className="flex max-h-screen min-h-screen min-w-full max-w-full">
        {nodes.map((item) => (
          <CircleNode
            key={item.uuid}
            uuid={item.uuid}
            value={item.value}
            setValue={setValue}
            position={item.position}
            setPosition={setPosition}
            selected={item.selected}
            setSelected={setSelected}
            disabled={item.disabled}
          />
        ))}

        {edges.map((item) => (
          <Edge
            key={item.uuid}
            uuid={item.uuid}
            weight={item.weight}
            setWeight={setWeight}
            p1={item.node1}
            p2={item.node2}
            selected={item.selected}
            setSelected={setSelected}
            disabled={item.disabled}
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
              disabled={nodes.length >= MAX_NODES || disabled}
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
              disabled={nodes.length <= 0 || disabled}
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
              disabled={nodes.length <= 1 || disabled}
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
              disabled={edges.length <= 0 || disabled}
            >
              Delete Edge
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function nodesReducer(nodes: Node[], action: any): Node[] {
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
      const result = temp.filter((item) => !item.selected);
      return result;
    }

    case "setSelected": {
      const id = nodes.findIndex((item) => item.uuid === action.uuid);

      if (id < 0) return [...nodes];

      const temp = [...nodes];

      temp[id]!.selected = action.selected;

      return temp;
    }

    case "setPosition": {
      const id = nodes.findIndex((item) => item.uuid === action.uuid);

      if (id < 0) return [...nodes];

      const temp = [...nodes];

      for (let i = 0; i < temp.length; i++) {
        if (i !== id) {
          const xDiff = action.position.x - temp[i]!.position.x;
          const yDiff = action.position.y - temp[i]!.position.y;
          const dist = Math.hypot(xDiff, yDiff);
          if (dist < 100) {
            action.position = {
              x: temp[i]!.position.x + xDiff * (100 / dist),
              y: temp[i]!.position.y + yDiff * (100 / dist),
            };
          }
        }
      }

      temp[id]!!!!!!!!!!!!!.position = action.position;

      return temp;
    }

    case "setValue": {
      const id = nodes.findIndex((item) => item.uuid === action.uuid);

      if (id < 0) return [...nodes];

      const temp = [...nodes];
      temp[id]!.value = action.value;
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

function edgesReducer(edges: Edge[], action: any): Edge[] {
  switch (action.type) {
    case "add": {
      const temp = action.nodes.filter((item: Node) => item.selected);

      if (temp.length === 2) {
        return [
          ...edges,
          {
            uuid: crypto.randomUUID(),
            node1: temp[0]?.position,
            node2: temp[1]?.position,
            weight: action.weight,
            selected: action.selected,
            disabled: action.disabled,
          },
        ];
      }
    }

    case "remove": {
      const temp = [...edges];
      const result = temp.filter((item) => !item.selected);
      return result;
    }

    case "setSelected": {
      const id = edges.findIndex((item) => item.uuid === action.uuid);

      if (id < 0) return [...edges];

      const temp = [...edges];
      temp[id]!.selected = action.selected;

      return temp;
    }

    case "setWeight": {
      const id = edges.findIndex((item) => item.uuid === action.uuid);

      if (id < 0) return [...edges];

      const temp = [...edges];
      temp[id]!.weight = action.weight;

      return temp;
    }

    case "disable": {
      const temp = [...edges];
      temp.forEach((n) => {
        n.disabled = action.disabled;
      });
      return temp;
    }
  }

  throw Error("Unknown action: " + action.type);
}
