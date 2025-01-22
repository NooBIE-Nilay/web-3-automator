import express from "express";
import { WorkflowNode, Workflow } from "../models/Workflow.js";
import { WorkflowExecutor } from "../services/WorkflowExecutor.js";

export const workflowRouter = express.Router();

// In-memory storage (replace with a database in production)
const workflows = new Map();
const workflowExecutors = new Map();

// Create a new workflow
workflowRouter.post("/", (req, res) => {
  const { name, nodes, edges } = req.body;
  const workflow = new Workflow(name, nodes, edges);
  workflows.set(workflow.id, workflow);

  const executor = new WorkflowExecutor(workflow);

  // Start execution asynchronously
  executor.execute().catch((error) => {
    console.error("Workflow execution failed:", error);
  });

  workflowExecutors.set(workflow.id, executor);

  res.json({ message: "Workflow execution started", workflowId: workflow.id });
});

// Get all workflows
workflowRouter.get("/", (req, res) => {
  res.json(Array.from(workflows.values()));
});

// Get a specific workflow
workflowRouter.get("/:id", (req, res) => {
  const workflow = workflows.get(req.params.id);
  if (!workflow) {
    return res.status(404).json({ error: "Workflow not found" });
  }
  res.json(workflow);
});

// Update workflow nodes and edges
workflowRouter.put("/:id", (req, res) => {
  const workflow = workflows.get(req.params.id);
  if (!workflow) {
    return res.status(404).json({ error: "Workflow not found" });
  }

  const { nodes, edges } = req.body;
  workflow.nodes = nodes.map(
    (node) => new WorkflowNode(node.type, node.config)
  );
  workflow.edges = edges;

  res.json(workflow);
});

// Execute a workflow
workflowRouter.post("/:id/execute", (req, res) => {
  const workflow = workflows.get(req.params.id);
  if (!workflow) {
    return res.status(404).json({ error: "Workflow not found" });
  }

  const executor = new WorkflowExecutor(workflow);

  // Start execution asynchronously
  executor.execute().catch((error) => {
    console.error("Workflow execution failed:", error);
  });

  workflowExecutors.set(workflow.id, executor);

  res.json({ message: "Workflow execution started", workflowId: workflow.id });
});

// Stop a workflow

workflowRouter.post("/:id/stop", (req, res) => {
  const workflow = workflows.get(req.params.id);
  if (!workflow) {
    return res.status(404).json({ error: "Workflow not found" });
  }

  const executor = workflowExecutors.get(workflow.id);
  if (!executor) {
    return res.status(404).json({ error: "Workflow not running" });
  }

  executor.stop();

  res.json({ message: "Workflow stopping started", workflowId: workflow.id });

});
