import { useAll, WASI } from 'uwasi'
import fs from 'node:fs/promises'
import path from 'node:path'

export const setupSolar = async (args: string[], files: string[] = []) => {
  const preopens = Object.fromEntries(
    files.map((file) => [file, path.resolve(file)]),
  )

  let output = ''
  const wasi = new WASI({
    args,
    preopens,
    features: [useAll({
      stdout: (lines) => {
        output += lines
      },
    })],
  })
  const bytes = await fs.readFile('./solar.wasm')
  const { instance } = await WebAssembly.instantiate(bytes, {
    wasi_snapshot_preview1: wasi.wasiImport,
  })

  wasi.start(instance)
  return { output }
}
