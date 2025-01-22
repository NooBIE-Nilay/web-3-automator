import { EventEmitter } from "events";

export class WorkflowExecutor extends EventEmitter {
  constructor(workflow) {
    super();
    this.workflow = workflow;
    this.nodeResults = new Map();
  }

  async execute() {
    try {
      this.workflow.status = "running";
      this.emit("workflowStart", { workflowId: this.workflow.id });

      const sortedNodes = this.topologicalSort();

      // console.log("sorted nodes ", sortedNodes);
      // Node executions
      let startNode = sortedNodes[0];
      console.log("starting node ", startNode);
      await this.executeNodes(startNode.id);

      this.workflow.status = "completed";
      this.emit("workflowComplete", {
        workflowId: this.workflow.id,
        results: Object.fromEntries(this.nodeResults),
      });
    } catch (error) {
      console.log("executin faild ", error);
      this.workflow.status = "failed";
      this.emit("workflowError", {
        workflowId: this.workflow.id,
        error: error.message,
      });
    }
  }

  async executeNodes(startNodeId) {
    try {
      // while (currentNode.next > 0) {}
      // // for (const node of sortedNodes) {
      // //   await this.executeNode(node);
      // // }

      const nodeList = this.getNodeList(startNodeId);
      console.log("executing node list ", nodeList);
      for (let i = 0; i < nodeList.length; i++) {
        await this.executeNode(nodeList[i]);
      }
    } catch (error) {
      throw error;
    }
  }

  async executeNode(node) {
    try {
      node.status = "running";
      this.emit("nodeStart", { nodeId: node.id });

      // Get input from parent nodes
      const inputs = this.getNodeInputs(node);

      // Execute the node based on its type
      const result = await this.executeNodeLogic(node, inputs);

      node.status = "completed";
      node.output = result;
      this.nodeResults.set(node.id, result);

      this.emit("nodeComplete", {
        nodeId: node.id,
        result,
      });
    } catch (error) {
      node.status = "failed";
      this.emit("nodeError", {
        nodeId: node.id,
        error: error.message,
      });
      throw error;
    }
  }

  async executeNodeLogic(node, inputs) {
    // This is where you'd implement different node types
    // console.log("curr node ", node);
    switch (node.type) {
      case "transform":
        return this.executeTransformNode(node.config, inputs);
      case "condition":
        return this.executeConditionNode(node.config, inputs);
      case "action":
        return this.executeActionNode(node.config, inputs, node.type);
      case "swap":
        return this.executeActionNode(node.config, inputs, node.type);
      case "wallet-erc20-transfers":
        return this.executeActionNode(node.config, inputs, node.type);
      case "loop":
        console.log("executing loop ");
        for (let i = 0; i < 3; i++) {
          await this.executeNodes(node.data.config.target);
        }
        console.log("executing loop  done");
        // return this.executeActionNode(node.config, inputs, node.type);
        return () => {};

      case "notification":
        return this.executeActionNode(node.config, inputs, node.type);
      default:
        return this.executeActionNode(node.config, inputs, "unknown type");
    }
  }

  executeTransformNode(config, inputs) {
    // Example implementation
    const { transformation } = config;
    return { transformed: inputs };
  }

  executeConditionNode(config, inputs) {
    // Example implementation
    const { condition } = config;
    return { result: true };
  }

  async executeActionNode(config, inputs, type) {
    // Example implementation

    console.log(`executing func ${type}`);
    await new Promise((resolve) => setTimeout(resolve, 8000));

    // const { action } = config;
    return { success: true };
  }

  getNodeInputs(node) {
    const inputs = {};
    // const parentEdges = this.workflow.edges.filter(
    //   (edge) => edge.target === node.id
    // );

    // for (const edge of parentEdges) {
    //   const parentResult = this.nodeResults.get(edge.source);
    //   if (parentResult) {
    //     inputs[edge.source] = parentResult;
    //   }
    // }

    return inputs;
  }

  getNodeList(startNodeId) {
    const order = [];
    const nodes = new Map(this.workflow.nodes.map((node) => [node.id, node]));
    let currNodeId = startNodeId;

    while (currNodeId > 0) {
      order.push(nodes.get(currNodeId));
      currNodeId = nodes.get(currNodeId).next;
    }

    return order;
  }
  topologicalSort() {
    const visited = new Set();
    const temp = new Set();
    const order = [];
    const nodes = new Map(this.workflow.nodes.map((node) => [node.id, node]));

    // const visit = (nodeId) => {
    //   if (temp.has(nodeId)) {
    //     throw new Error("Workflow contains cycles");
    //   }
    //   if (!visited.has(nodeId)) {
    //     temp.add(nodeId);

    //     // Get all edges where this node is the source
    //     const edges = this.workflow.edges.filter(
    //       (edge) => edge.source === nodeId
    //     );

    //     for (const edge of edges) {
    //       visit(edge.target);
    //     }

    //     temp.delete(nodeId);
    //     visited.add(nodeId);
    //     order.unshift(nodes.get(nodeId));
    //   }
    // };

    for (const node of this.workflow.nodes) {
      // if (!visited.has(node.id)) {
      //   visit(node.id);
      // }
      order.push(nodes.get(node.id));
    }

    return order;
  }
}
