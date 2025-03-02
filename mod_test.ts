import { describe, it } from '@std/testing/bdd'
import { expect } from '@std/expect'
import { Solar } from 'solar'

const solar = new Solar()

describe('Solar', () => {
  describe('version', () => {
    it('should return version', async () => {
      const version = await solar.version()

      expect(version).toEqual('0.1.1')
    })
  })
  describe('emitAbi', () => {
    it('should emit ABI as string', async () => {
      const abi = await solar.emitAbi('examples/erc20/MyToken.sol')

      expect(typeof abi).toBe('string')

      expect(() => {
        JSON.parse(abi)
      }).not.toThrow()
    })
    it('should throw error if file not found', async () => {
      await expect(solar.emitAbi('somerandomtoken.sol')).rejects
        .toThrow(
          'file somerandomtoken.sol not found',
        )
    })
  })
})
