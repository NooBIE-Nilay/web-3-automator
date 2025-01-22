import { EventEmitter } from "events";
import { eventEmitterStore } from "./EventEmitterStore.js";
import { executeMoralisErc20WalletTransfersNode } from "./nodes/app/moralis.js";
import { executeSelectDataNode } from "./nodes/transformation/selectData.js";
import { executeTelegramNotification } from "./nodes/app/telegram.js";
import { returnCoinbaseWallet, tradeCoinbase } from "./nodes/web3/coinbase.js";
import { executeDeployAndMintNFT } from "./nodes/web3/deployAndMintNFT.js";
import { executeFetchGoogleSheetColumn } from "./nodes/app/googlesheet.js";

export class WorkflowExecutor extends EventEmitter {
  constructor(workflow) {
    super();
    this.workflow = workflow;
    this.nodeResults = new Map();
    this.nodeOutputs = {};
    this.eventEmitter = eventEmitterStore.getEmitter();
    this.intervalFlag = false;
  }

  async stop() {
    this.intervalFlag = false;
  }

  async execute() {
    try {
      this.workflow.status = "running";
      this.emit("workflowStart", { workflowId: this.workflow.id });

      const startNode = this.workflow.nodes.find((node) => node.id === "start");
      if (startNode.data.config.trigger == "interval") {
        this.intervalFlag = true;
        while (this.intervalFlag) {
          console.log("running in interval");
          await this.executeNodes(startNode.id, null);
          await new Promise((resolve) => setTimeout(resolve, startNode.data.config.value));
        }
      } else {
        await this.executeNodes(startNode.id, null);
      }
      this.workflow.status = "completed";
      console.log("Workflow completed");
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

  async executeNodes(nodeId, input) {
    try {
      const nodes = new Map(this.workflow.nodes.map((node) => [node.id, node]));
      let output = input;
      let nextNodeId = nodeId;
      while (nodes.get(nextNodeId).type !== "replace") {
        [output, nextNodeId] = await this.executeNode(nodes.get(nextNodeId), output);
      }
      return [output, nextNodeId];
    } catch (error) {
      throw error;
    }
  }

  async executeNode(node, input) {
    try {
      node.status = "running";
      this.emit("nodeStart", { nodeId: node.id });

      console.log("executing node ", node.id);
      // delay 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Execute the node based on its type
      const [output, nextNodeId] = await this.executeNodeLogic(node, input);

      console.log("node output for ", node.id, output);

      node.status = "completed";
      node.output = output;
      this.nodeResults.set(node.id, output);

      this.emit("nodeComplete", {
        nodeId: node.id,
        output,
      });

      return [output, nextNodeId];
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
      case "start": {
        console.log(this.workflow.edges);
        console.log(this.workflow.edges.find((edge) => edge.source === node.id));
        const nextNodeId = this.workflow.edges.find((edge) => edge.source === node.id).target;
        return [null, nextNodeId];
      }
      case "coinbaseWallet": {
        return await returnCoinbaseWallet(this.workflow, node, inputs);
      }
      case "moralis": {
        return await executeMoralisErc20WalletTransfersNode(this.workflow, node, inputs);
      }
      case "selectData": {
        return await executeSelectDataNode(this.workflow, node, inputs);
      }
      case "loop": {
        const results = [];
        for (const input of inputs) {
          const [loopResult, _] = await this.executeNodes(node.data.loopId, input);
          results.push(loopResult);
        }
        const output = results;
        const nextNodeId = node.data.doneId;
        return [output, nextNodeId];
      }
      case "coinbase": {
        return await tradeCoinbase(this.workflow, node, inputs);
      }
      case "telegram": {
        return await executeTelegramNotification(this.workflow, node, inputs);
      }
      case "googleSheets": {
        return await executeFetchGoogleSheetColumn(this.workflow, node, inputs);
      }
      case "deployNFT": {
        return await executeDeployAndMintNFT(this.workflow, node, inputs);
      }
      default:
        return this.executeActionNode(node, inputs, "unknown type");
    }
  }

  executeConditionNode(node, inputs) {
    const trueNodeId = node.data.trueId;
    const falseNodeId = node.data.falseId;
    // Example implementation
    if (node.data.config.condition === "true") return [true, trueNodeId];
    else return [false, falseNodeId];
  }

  async executeActionNode(node, inputs, type) {
    // Example implementation

    console.log(`executing func ${type}`);
    await new Promise((resolve) => setTimeout(resolve, 8000));
    // set output after execution after current node
    this.nodeOutputs[node.id] = [{ message: `this is node output for node ${node.id}` }];
    // const { action } = config;
    return { success: true, id: node.id };
  }
}
