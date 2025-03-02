import { setupSolar } from './wasi.ts'
import path from 'node:path'

export class Solar {
  async version(): Promise<string> {
    const { stdout, stderr } = await setupSolar(['-j1', '--version'])

    if (stderr) {
      throw new Error(stderr)
    }

    let version = ''

    for (const line of stdout.split('\n')) {
      if (line !== '' && line.includes('solar')) {
        version = line.split(':')[1].trim()
      }
    }
    return version
  }
  async emitAbi(source: string): Promise<string> {
    const { stderr, stdout } = await setupSolar([
      '-j1',
      path.relative('.', source),
      '--emit',
      'abi',
    ])
    if (stderr) {
      throw new Error(stderr)
    }

    return stdout
  }
}
