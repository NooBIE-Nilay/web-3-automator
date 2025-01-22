import { v4 as uuidv4 } from 'uuid';

export class Workflow {
  constructor(name, nodes = [], edges = []) {
    this.id = uuidv4();
    this.name = name;
    this.nodes = nodes;
    this.edges = edges;
    this.status = 'created';
  }
}

export class WorkflowNode {
  constructor(type, config) {
    this.id = uuidv4();
    this.type = type;
    this.config = config;
    this.status = 'pending';
    this.output = null;
  }
}