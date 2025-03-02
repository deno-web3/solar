import { describe, it } from '@std/testing/bdd'
import { setupSolar } from './wasi.ts'
import { expect } from '@std/expect/expect'

describe('Solar', () => {
  it('should emit stderr if not empty', async () => {
    const { stderr } = await setupSolar(['--lol'])

    expect(
      stderr,
    ).toContain("tip: to pass '--lol' as a value, use '-- --lol'")
  })
  it('should emit stdout if not empty', async () => {
    const { stdout } = await setupSolar(['--version'])

    expect(stdout).toContain(`solar Version: 0.1.1`)
  })
})
