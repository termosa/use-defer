import useDefer from './'
import { renderHook, act } from "@testing-library/react-hooks";

// mock timer using jest
jest.useFakeTimers();

describe('useDefer', () => {
  it('Goes through all steps', async () => {
    const asyncSquareCalculation =
      (number: number): Promise<number> => new Promise(resolve => window.setTimeout(resolve, 500, number * number));

    const { result } = renderHook(() => useDefer(asyncSquareCalculation));

    expect(result.current.status).toBe('idle');
    expect(result.current.value).toBe(null);
    expect(result.current.error).toBe(null);

    let execution: Promise<number>;
    act(() => {
      execution = result.current.execute(3)
    });

    // Fast-forward 0.5 sec
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Check after total 0.5 sec
    expect(result.current.status).toBe('pending');
    expect(result.current.value).toBe(null);
    expect(result.current.error).toBe(null);

    // Fast-forward 0.5 more sec
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Ensure promise to be resolved
    await act(async () => {
      await execution;
    });

    // Check after total 1 sec
    expect(result.current.status).toBe('success');
    expect(result.current.value).toBe(9);
    expect(result.current.error).toBe(null);
  })
})
