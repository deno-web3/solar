import { open } from 'node:fs/promises'

export const exists = async (path: string) => {
  try {
    await open(path, 'r')
    return true
  } catch {
    return false
  }
}
