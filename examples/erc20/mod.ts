import { Solar } from '../../mod.ts'

const solar = new Solar()

const { contracts } = await solar.emitAbi('./MyToken.sol')

console.log(contracts)
