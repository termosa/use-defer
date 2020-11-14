# use-defer

> Simplify work with async functions with memoization and state

[![NPM](https://img.shields.io/npm/v/use-defer.svg)](https://www.npmjs.com/package/use-defer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-defer
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'use-defer'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [termosa](https://github.com/termosa)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
