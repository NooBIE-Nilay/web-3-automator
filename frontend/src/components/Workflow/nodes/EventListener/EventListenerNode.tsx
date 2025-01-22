import React, { memo } from "react";
import { NodeProps } from "reactflow";
import { Wallet } from "lucide-react";
import BaseNode from "../Base/BaseNode";

function EventListenerNode({ data, ...props }: NodeProps) {
  return <BaseNode data={data} icon={Wallet} {...props} />;
}

export default memo(EventListenerNode);
