import { Transaction } from "ethereumjs-tx"
import { ethers } from "ethers"
import { DEFAULT_GAS_LIMIT, DEFAULT_GAS_PRICE, DEV_RPC_URL } from "./constants"

export async function constructAndSignTxn(
  provider: any,
  toAddress: string, 
  fromAddress: string, 
  fromPk: string,
  rawValue: string
) {
  const txCount = await provider.getTransactionCount(fromAddress)
  const tx = new Transaction(
    {
      nonce: ethers.utils.hexlify(txCount),
      to: toAddress,
      data: rawValue,
      gasLimit: DEFAULT_GAS_LIMIT,
      gasPrice: DEFAULT_GAS_PRICE
    },
    {
      chain: "goerli"
    }
  );
  tx.sign(Buffer.from(fromPk, "hex"))
  return "0x" + tx.serialize().toString("hex")
}

export async function sendAndConfirmTxn(provider: any, txn: any) {
  const { hash } = await provider.sendTransaction(txn)
  await provider.waitForTransaction(hash)
  return hash
}