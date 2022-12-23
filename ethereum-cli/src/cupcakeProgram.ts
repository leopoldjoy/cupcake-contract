import { constructAndSignTxn, sendAndConfirmTxn } from "./utils";
import { ethers } from "ethers"
import { DEV_RPC_URL, DEV_WALLET_PK } from "./constants";
var Contract = require('web3-eth-contract');
var cupcakeProgramInterface = require("../interfaces/cupcakeProgram.json")

export class CupcakeProgram {
  static address = "0x333372A1082243BC36Caa7525523F7c389828142"
  static abi = cupcakeProgramInterface
  provider: any
  contract: typeof Contract
  caller: string

  constructor(endpoint: string, callerAddress: string) {
    Contract.setProvider(endpoint)
    this.provider = new ethers.providers.JsonRpcProvider(DEV_RPC_URL)
    this.contract = new Contract(CupcakeProgram.abi, CupcakeProgram.address)
    this.caller = callerAddress
  }

  async createSprinkle(
    tagType: number, 
    tokenAddress: string, 
    erc721TokenId: number, 
    tagAuthority: string, 
    totalSupply: number, 
    perUser: number, 
    fungiblePerClaim: number, 
    uid: string,
    isNotErc1155: boolean,
    subscriptionId: number,
    vrfConsumerBaseV2: string,
    metadataURIs: string[]
  ) {
    const rawTxn = await this.contract.methods
      .addOrRefillTag(
        [
          tagType,
          tokenAddress,
          erc721TokenId,
          tagAuthority,
          totalSupply,
          perUser,
          fungiblePerClaim,
          uid,
          subscriptionId,
          vrfConsumerBaseV2
        ],
        isNotErc1155,
        metadataURIs
      )
      .encodeABI({ from: this.caller })
    const txn = await constructAndSignTxn(
      this.provider,
      CupcakeProgram.address,
      this.caller,
      DEV_WALLET_PK,
      rawTxn
    )
    return await sendAndConfirmTxn(this.provider, txn)
  }

  async claimSprinkle(
    toAddress: string, uid: string, isNotErc1155: boolean, newTokenId: number, keyHash: string
  ) {
    const rawTxn = await this.contract.methods
      .claimTag(
        toAddress,
        uid,
        this.caller,
        isNotErc1155,
        newTokenId,
        keyHash
      )
      .encodeABI({ from: this.caller })
    const txn = await constructAndSignTxn(
      this.provider,
      CupcakeProgram.address,
      this.caller,
      DEV_WALLET_PK,
      rawTxn
    )
    return await sendAndConfirmTxn(this.provider, txn)
  }

  async cancelAndEmptySprinkles(uid: string, isNotErc1155: boolean) {
    const rawTxn = await this.contract.methods
      .cancelAndEmpty(
        uid,
        isNotErc1155
      )
      .encodeABI({ from: this.caller })
    const txn = await constructAndSignTxn(
      this.provider,
      CupcakeProgram.address,
      this.caller,
      DEV_WALLET_PK,
      rawTxn
    )
    return await sendAndConfirmTxn(this.provider, txn)
  }
}