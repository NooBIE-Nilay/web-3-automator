import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";

// Configure location to CDP API Key.
Coinbase.configureFromJson({
  filePath: `cdp_api_key.json`,
});
const baseMainnetWalletId = "ac6c81d7-57f4-440b-b6a1-ebbb2a29d181";
let mintAddress = null;

async function executeDeployAndMintNFT(workflow, node, inputs) {
  try {
    const nextNodeId = workflow.edges.find((edge) => edge.source === node.id).target;
    const name = node.data.config.name;
    const symbol = node.data.config.symbol;
    const baseURI = node.data.config.baseURI;

    let wallet = await Wallet.fetch(baseMainnetWalletId);

    await wallet.loadSeed("current_seed.json");

    let address = await wallet.getDefaultAddress();

    console.log(`using wallet ${address}`);

    if (mintAddress == null) {
      const nft = await wallet.deployNFT({
        name: name,
        symbol: symbol,
        baseURI: baseURI,
      });
      await nft.wait();

      mintAddress = await nft.getContractAddress();
    }

    const nftContractAddress = mintAddress;

    // Mint 3 token to destinationAddress by calling invokeContract
    const mintTx = await wallet.invokeContract({
      contractAddress: nftContractAddress,
      method: "mint",
      args: {
        to: inputs,
        quantity: "1",
      },
    });
    await mintTx.wait();

    if (mintTx.getStatus() === "complete") {
      console.log(`mintTx successfully completed: `, mintTx.toString());
      return [{ nftContractAddress: nftContractAddress, to: inputs }, nextNodeId];
    } else {
      console.log(`mintTx failed on-chain: `, mintTx.toString());
      return [null, nextNodeId];
    }
  } catch (error) {
    console.log("mintNft error ", error);
    return [null, nextNodeId];
  }
}

export { executeDeployAndMintNFT };
