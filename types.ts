export type AbiItem = {
  type: string
  name: string
  inputs: AbiItem[]
  outputs: AbiItem[]
  stateMutability?: string
  anonymous?: boolean
}

export type Abi = AbiItem[]

export type EmitAbiOutput = {
  contracts: Record<
    `${string}.sol:${string}`,
    { abi: Abi; hashes: Record<string, string> }
  >
  version: string
}
