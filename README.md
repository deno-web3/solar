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

const solar = new Solar()

// emit ABI
const abi = await solar.emitAbi('MyToken.sol')
console.log(abi)
```