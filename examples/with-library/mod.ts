import { Solar } from 'solar'
import type { EmitAbiOutput } from 'solar/types'

const solar = new Solar()

const { contracts } = JSON.parse(
  await solar.emit('./Example.sol'),
) as EmitAbiOutput

console.log(contracts)
