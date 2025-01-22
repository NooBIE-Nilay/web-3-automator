import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";
import { ethers } from "ethers";

// Configure location to CDP API Key.
Coinbase.configureFromJson({
  filePath: `cdp_api_key.json`,
});
const baseMainnetWalletId = "ac6c81d7-57f4-440b-b6a1-ebbb2a29d181";

async function returnCoinbaseWallet(workflow, node, inputs) {
  const nextNodeId = workflow.edges.find((edge) => edge.source === node.id).target;

  let wallet = await Wallet.fetch(baseMainnetWalletId);
  await wallet.loadSeed("current_seed.json");
  let address = await wallet.getDefaultAddress();

  return [address, nextNodeId];
}

async function tradeCoinbase(workflow, node, inputs) {
  const nextNodeId = workflow.edges.find((edge) => edge.source === node.id).target;

  let wallet = await Wallet.fetch(baseMainnetWalletId);
  await wallet.loadSeed("current_seed.json");
  try {

    console.log("trading ", node.data.config.amount, node.data.config.fromToken, inputs);

    let trade = await wallet.createTrade({
      amount: node.data.config.amount,
      fromAssetId: ethers.getAddress(node.data.config.fromToken),
      toAssetId: ethers.getAddress(inputs),
    });
    await trade.wait();

    if (trade.getStatus() === "complete") {
      console.log(`Trade successfully completed: `, trade.toString());
      return [{ amount: node.data.config.amount, fromAssetId: node.data.config.fromToken, toAssetId: inputs }, nextNodeId];
    } else {
      console.log(`Trade failed on-chain: `, trade.toString());
    }
  } catch (error) {
    console.log("tradeCoinbase error ", error);
    return [null, nextNodeId];
  }
}

export { returnCoinbaseWallet, tradeCoinbase };
