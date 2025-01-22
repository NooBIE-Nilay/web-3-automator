import React, { memo } from "react";
import { NodeProps } from "reactflow";
import { Bitcoin } from "lucide-react";
import BaseNode, { Port } from "../Base/BaseNode";

const inputs: Port[] = [{ id: "input", label: "Input", type: "input" }];

const outputs: Port[] = [
  {
    id: "done",
    label: "Done",
    type: "output",
    style: { backgroundColor: "#22c55e" },
  },
  {
    id: "loop",
    label: "Loop",
    type: "output",
    style: { backgroundColor: "#6366f1" },
  },
];

function CoinbaseNode({ data, ...props }: NodeProps) {
  return <BaseNode data={data} icon={Bitcoin} {...props} />;
}

export default memo(CoinbaseNode);
