// This is the upgraded version of https://usehooks.com/useAsync/
import * as React from 'react';

export const useDefer = <Value, Error = string, Args extends any[] = any[]>(
  defer: (...args: Args) => Promise<Value>,
  deps: React.DependencyList = [],
  immediateArgs?: Args,
) => {
  const processesRef = React.useRef(0);

  const stateRef = React.useRef<State<Value, Error>>({ status: Status.IDLE });
  const [state, setState] = React.useState(stateRef.current);
  const update = (newState: State<Value, Error>) => {
    stateRef.current = newState;
    setState(newState);
  };

  const execute = React.useCallback((...args: Args) => {
    ++processesRef.current;
    update({
      ...stateRef.current,
      status: Status.PENDING
    });

    return defer(...args)
      .then((response: Value) => {
        update({
          status: --processesRef.current ? stateRef.current.status : Status.SUCCESS,
          value: response,
        });
        return response;
      })
      .catch((error: Error) => {
        if (!--processesRef.current) {
          update({
            status: Status.ERROR,
            error,
          })
        }
        return Promise.reject(error);
      });
  }, deps);

  React.useEffect(() => {
    if (immediateArgs) {
      execute(...immediateArgs);
    }
  }, [execute, ...(immediateArgs || [])]);

  return { ...state, execute };
};

export default useDefer;

export enum Status {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
};

interface State<Value, Error> {
  status: Status,
  value?: Value | undefined,
  error?: Error | undefined,
};