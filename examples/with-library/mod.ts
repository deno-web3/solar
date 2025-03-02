import { Solar } from 'solar'

const solar = new Solar()

const { contracts } = await solar.emitAbi('Example.sol')

console.log(contracts)
