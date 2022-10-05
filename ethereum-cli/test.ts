import { Wallet } from "ethers"
import { constants, cupcakeProgram } from "./src"
import { MintingProgram } from "./src/mintingProgram"
const { DEV_RPC_URL, DEV_WALLET } = constants
const { CupcakeProgram } = cupcakeProgram

async function test(tokenId: number, uri: string, uid: string) {
  console.log("input:", tokenId, uri)
  const cupcakeProgram = new CupcakeProgram(DEV_RPC_URL, DEV_WALLET)
  const mintingProgram = new MintingProgram(DEV_RPC_URL, DEV_WALLET)

  const numSprinkles = await cupcakeProgram.readNumSprinkles()
  console.log("Num sprinkles:", numSprinkles)

  const newToken = await mintingProgram.mint(DEV_WALLET, tokenId, uri)
  console.log("New token:", newToken)

  const approveTokenResponse = await mintingProgram.approve(CupcakeProgram.address, tokenId)
  console.log("Approve token response:", approveTokenResponse) 

  const newSprinkleAuthority = Wallet.createRandom()
  console.log("new sprinkle auth secret:", newSprinkleAuthority.privateKey)

  const newSprinkle = await cupcakeProgram.createSprinkle(
    2,
    MintingProgram.address,
    tokenId,
    newSprinkleAuthority.address,
    1000,
    10,
    0,
    "0x" + uid,
    true
  )
  console.log("New sprinkle:", newSprinkle)

  const claimSprinkleResponse = await cupcakeProgram.claimSprinkle(
    DEV_WALLET, 
    "0x" + uid, 
    true, 
    929
  )
  console.log("claim sprinkle response", claimSprinkleResponse)
}

test(
  777, 
  "https://arweave.net/u3mMh2V8TvSHYLSWL1pnnpBYG2xWcYmd7JYjk76FJpc", 
  "cc00112233445566"
)