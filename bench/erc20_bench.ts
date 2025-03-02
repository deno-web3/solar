import { Solar } from 'solar'
import { wrapper } from '@deno-web3/solc'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const soljson = require('./soljson.cjs')

Deno.bench('ERC20 - Solar', () => {
  const solar = new Solar()
  solar.emitAbi('MyToken.sol')
})

Deno.bench('ERC20 - Solc', () => {
  const solc = wrapper(soljson)
  solc.compile('MyToken.sol')
})
