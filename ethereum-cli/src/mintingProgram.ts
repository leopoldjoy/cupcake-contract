var Contract = require("web3-eth-contract")
var mintingProgram = require("../interfaces/mintingProgram.json")
import { ethers } from "ethers"
import { constructAndSignTxn, sendAndConfirmTxn } from "./utils"
import { DEV_RPC_URL, DEV_WALLET_PK } from "./constants"

export class MintingProgram {
  static address = "0x39Ec448b891c476e166b3C3242A90830DB556661"
  static abi = mintingProgram
  provider: any
  contract: typeof Contract
  caller: string

  constructor(endpoint: string, callerAddress: string) {
    Contract.setProvider(endpoint)
    this.provider = new ethers.providers.JsonRpcProvider(DEV_RPC_URL)
    this.contract = new Contract(MintingProgram.abi, MintingProgram.address)
    this.caller = callerAddress
  }

  async mint(toAddress: string, tokenId: number, tokenUri: string) {
    const rawTxn = await this.contract.methods
      .mint(toAddress, tokenId, tokenUri)
      .encodeABI({ from: this.caller })
    const txn = await constructAndSignTxn(
      this.provider,
      MintingProgram.address,
      this.caller,
      DEV_WALLET_PK,
      rawTxn
    )
    return await sendAndConfirmTxn(this.provider, txn)
  }

  async approve(delegate: string, tokenId: number) {
    const rawTxn = await this.contract.methods
      .approve(delegate, tokenId)
      .encodeABI({ from: this.caller })
    const txn = await constructAndSignTxn(
      this.provider,
      MintingProgram.address,
      this.caller,
      DEV_WALLET_PK,
      rawTxn
    )
    return await sendAndConfirmTxn(this.provider, txn)
  }

  async transfer(toAddress: string, tokenId: number) {
    const result = await this.contract.methods
      .transferFrom(this.caller, toAddress, tokenId)
      .send({ from: this.caller })
  }
}