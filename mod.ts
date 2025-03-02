import { Abi, EmitAbiOutput } from './types.ts'
import { setupSolar } from './wasi.ts'
import path from 'node:path'

export class Solar {
  async version() {
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
  async emitAbi(source: string): Promise<EmitAbiOutput> {
    const { stderr, stdout } = await setupSolar([
      '-j1',
      path.relative('.', source),
      '--emit',
      'abi',
    ])
    if (stderr) {
      throw new Error(stderr)
    }

    const { contracts, version } = JSON.parse(stdout) as {
      contracts: Record<string, { abi: Abi }>
      version: string
    }

    const output: EmitAbiOutput = {
      contracts: {},
      version,
    }

    for (const [name, { abi }] of Object.entries(contracts)) {
      const [fileName, contractName] = name.split(':') as [
        `${string}.sol`,
        string,
      ]
      output.contracts[fileName] = {
        ...output.contracts[fileName],
        [contractName]: abi as Abi,
      }
    }
    return output
  }
}
