async function executeMoralisErc20WalletTransfersNode(workflow, node, inputs) {
    // Example implementation
    const nextNodeId = workflow.edges.find((edge) => edge.source === node.id).target;
    const address = node.data.config.address;

    const result = await fetch(
      `https://deep-index.moralis.io/api/v2.2/${address}/erc20/transfers?chain=base&order=DESC`,
      {
        headers: {
          accept: "application/json",
          "X-API-Key":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImY3ZjVhNjM5LWNkOGEtNGQyNy1iY2EzLTJiMjc0NjM1OTU0ZSIsIm9yZ0lkIjoiNDE5NzkzIiwidXNlcklkIjoiNDMxNzEzIiwidHlwZUlkIjoiNDRjNDJhNzgtZDJlNS00MTY5LTkzMTQtNzdlN2VlNjU5YTk2IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MzM1Njg2ODUsImV4cCI6NDg4OTMyODY4NX0.6NlQ3iUEakLlvNILF6WR388bAmsnYo1E6slAW_LuXv8",
        },
      }
    );
    const transfers = await result.json();
    return [transfers, nextNodeId];
}

export { executeMoralisErc20WalletTransfersNode };