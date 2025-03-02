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
  contracts: Record<`${string}.sol`, Record<string, Abi>>
  version: string
}
