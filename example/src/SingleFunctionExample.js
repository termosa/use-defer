import React from 'react';
import useDefer from 'use-defer';


const generateNumber = max => new Promise((resolve, reject) => {
  if (max > 0) setTimeout(resolve, 2e3, Math.round(Math.random() * max));
  else setTimeout(reject, 2e3, 'Max value must be greater than zero');
});

const defaultMax = 100;

const SingleFunctionExample = () => {
  const [max, setMax] = React.useState('');

  const { value, error, status } = useDefer(
    generateNumber,           // Async function that returns promise
    [max],                    // Dependencies
    [max ? +max : defaultMax] // Initial arguments
  );

  return (
    <div>
      <div>
        <input
          type="number"
          value={max}
          placeholder={defaultMax.toString()}
          onChange={e => setMax(e.target.value)}
        />
        {status === 'pending' ? <span> processing</span> : null}
      </div>
      {value !== undefined ? <div>Last result: {value}</div> : null}
      {error ? <div>Error: {error}</div> : null}
    </div>
  );
};

export default SingleFunctionExample;

export const code =
`const SingleFunctionExample = () => {
  const [max, setMax] = React.useState('');

  const { value, error, status } = useDefer(
    generateNumber,           // Async function that returns promise
    [max],                    // Dependencies
    [max ? +max : defaultMax] // Initial arguments
  );

  return (
    <div>
      <div>
        <input
          type="number"
          value={max}
          placeholder={defaultMax.toString()}
          onChange={e => setMax(e.target.value)}
        />
        {status === 'pending' ? <span> processing</span> : null}
      </div>
      {value !== undefined ? <div>Last result: {value}</div> : null}
      {error ? <div>Error: {error}</div> : null}
    </div>
  );
};`;