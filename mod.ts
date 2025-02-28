import { setupSolar } from './wasi.ts'

export class Solar {
  async version() {
    const { output } = await setupSolar(['-j1', '--version'])

    let version = ''

    for (const line of output.split('\n')) {
      if (line !== '' && line.includes('solar')) {
        version = line.split(':')[1].trim()
      }
    }
    return version
  }
  async compile(source: string) {
    const { output } = await setupSolar(['-j1', source], [source])
    return output
  }
}

const solar = new Solar()
console.log(await solar.version())
console.log(await solar.compile('./Counter.sol'))
