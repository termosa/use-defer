import React from 'react'

import useDefer from 'use-defer'

const generateNumber = max => new Promise((resolve, reject) => {
  if (max > 0) setTimeout(resolve, 2e3, Math.round(Math.random() * max));
  else setTimeout(reject, 2e3, 'Max value must be greater than zero');
});

const defaultMax = 100;

const App = () => {
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
export default App
