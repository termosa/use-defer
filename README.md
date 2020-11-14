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

import useDefer from 'use-defer'
// Or: import { useDefer } from 'use-defer'

const generateNumber = max => new Promise((resolve, reject) => {
  if (max > 0) setTimeout(resolve, 2e3, Math.round(Math.random() * max));
  else setTimeout(reject, 2e3, 'Max value must be greater than zero');
});

const defaultMax = 100;

const Example = () => {
  const [max, setMax] = React.useState('');

  const { value, error, status } = useDefer(generateNumber, [max], [max ? +max : defaultMax]);

  return (
    <div>
      <div>
        <input type="number" value={max} placeholder={defaultMax.toString()} onChange={e => setMax(e.target.value)} />
        {status === 'pending' ? <span> Processing request</span> : null}
      </div>
      {value !== null ? <div>Last result: {value}</div> : null}
      {error !== null ? <div>Error: {error}</div> : null}
    </div>
  )
}
```

## License

MIT © [termosa](https://github.com/termosa)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
