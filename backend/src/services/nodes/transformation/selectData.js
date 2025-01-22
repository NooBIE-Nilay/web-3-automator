async function executeSelectDataNode(workflow, node, inputs) {
    // Example implementation
    const nextNodeId = workflow.edges.find((edge) => edge.source === node.id).target;
    if (Array.isArray(inputs)) {
      const selector = node.data.config.field;
      const data = inputs.map((input) => input[selector]);
      return [data, nextNodeId];
    } else if (typeof inputs === "object") {
      const selector = node.data.config.field;
      const data = inputs[selector];
      return [data, nextNodeId];
    }
}

export { executeSelectDataNode };
