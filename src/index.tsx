// This is the upgraded version of https://usehooks.com/useAsync/
import * as React from 'react';

export const useDefer = <Value, Error = string, Args extends any[] = any[]>(
  defer: (...args: Args) => Promise<Value>,
  deps: React.DependencyList = [],
  immediateArgs?: Args,
) => {
  const processesRef = React.useRef(0);

  const [status, setStatus] = React.useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle');
  const [value, setValue] = React.useState<Value | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  const execute = React.useCallback((...args: Args) => {
    ++processesRef.current;

    setStatus('pending');
    setError(null);

    return defer(...args)
      .then((response: Value) => {
        if (!--processesRef.current) {
          setStatus('success');
        }
        setValue(response);
        return response;
      })
      .catch((error: Error) => {
        if (!--processesRef.current) {
          setStatus('error');
          setError(error);
        }
        return Promise.reject(error);
      });
  }, deps);

  React.useEffect(() => {
    if (immediateArgs) {
      execute(...immediateArgs);
    }
  }, [execute, ...(immediateArgs || [])]);

  return { execute, status, value, error };
};


export default useDefer;