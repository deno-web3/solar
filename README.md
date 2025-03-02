# Solar 🌞

experimental [Solar](https://github.com/paradigmxyz/solar) Solidity compiler bindings for Deno, Bun and Node.js.

- ~15% faster than Solc
- smaller package size

## Install

with Deno:

```sh
deno add jsr:@deno-web3/solar
```

with Bun:

```
bunx jsr add @deno-web3/solar
```

with Node.js:

```sh
pnpm dlx jsr add @deno-web3/solar
```

## Usage

```ts
import { Solar } from 'solar'
import type { EmitAbiOutput } from 'solar/types'

const solar = new Solar()

const { contracts } = JSON.parse(await solar.emit('./Example.sol')) as EmitAbiOutput

console.log(contracts)
```