import {
  MemoryFileSystem,
  useArgs,
  useEnviron,
  useProc,
  useRandom,
  WASI,
} from 'uwasi'
import fs from 'node:fs/promises'
import { useMemoryFS } from 'uwasi'
import path from 'node:path'
import { glob } from 'tinyglobby'
import { useFS } from 'uwasi'

export const setupSolar = async (
  args: string[] = [],
) => {
  const fileSystem = new MemoryFileSystem({
    '/': '',
  })
  const filePaths = await glob('./**/*.sol')

  for (const filePath of filePaths) {
    fileSystem.addFile(filePath, await fs.readFile(filePath))
  }

  let stdout = ''
  let stderr = ''
  const wasi = new WASI({
    args: ['-j1', ...args],
    features: [
      useEnviron,
      useArgs,
      useRandom(),
      useProc,
      useMemoryFS({
        withFileSystem: fileSystem,
        withStdio: {
          stderr(lines) {
            stderr += lines
          },
          stdout: (lines) => {
            stdout += lines
          },
        },
      }),
    ],
  })
  const bytes = await fs.readFile(
    path.join(import.meta.dirname!, './solar.wasm'),
  )
  const { instance } = await WebAssembly.instantiate(bytes, {
    wasi_snapshot_preview1: wasi.wasiImport,
  })

  wasi.start(instance)

  return { stderr, stdout }
}
