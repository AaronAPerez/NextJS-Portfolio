import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@/hooks';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial value when key does not exist', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'));
    
    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(localStorage.getItem('test')).toBe(JSON.stringify('updated'));
  });

  it('should remove value from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'));
    
    act(() => {
      result.current[1]('value');
    });

    act(() => {
      result.current[2](); // removeValue
    });

    expect(result.current[0]).toBe('initial');
    expect(localStorage.getItem('test')).toBeNull();
  });
});