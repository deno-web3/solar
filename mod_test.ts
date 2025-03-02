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
  describe('emitHashes', () => {
    it('should emit hashes as string', async () => {
      const hashes = await solar.emitHashes('examples/erc20/MyToken.sol')

      expect(typeof hashes).toBe('string')

      expect(() => {
        JSON.parse(hashes)
      }).not.toThrow()
    })
    it('should throw error if file not found', async () => {
      await expect(solar.emitHashes('somerandomtoken.sol')).rejects
        .toThrow(
          'file somerandomtoken.sol not found',
        )
    })
  })
  describe('emit', () => {
    it('should emit ABI and hashes as string', async () => {
      const emit = await solar.emit('examples/erc20/MyToken.sol')

      expect(typeof emit).toBe('string')

      expect(() => {
        JSON.parse(emit)
      }).not.toThrow()
    })
    it('should throw error if file not found', async () => {
      await expect(solar.emit('somerandomtoken.sol')).rejects
        .toThrow(
          'file somerandomtoken.sol not found',
        )
    })
    it('should throw error if file not found', async () => {
      await expect(solar.emit('somerandomtoken.sol')).rejects
        .toThrow(
          'file somerandomtoken.sol not found',
        )
    })
  })
})
