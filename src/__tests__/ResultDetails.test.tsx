import { describe, expect, it, Mock, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDetailQuery } from '../redux/api';

vi.mock('../redux/api', () => ({
  useDetailQuery: vi.fn(),
}));

describe('useDetailQuery Hook', () => {
  it('should return loading state', () => {
    (useDetailQuery as Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    const { result } = renderHook(() =>
      useDetailQuery({ id: '123' }, { skip: false })
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
  });

  it('should return data when request is successful', () => {
    const mockData = { id: '123', title: 'Test GIF' };

    (useDetailQuery as Mock).mockReturnValue({
      data: mockData,
      error: undefined,
      isLoading: false,
    });

    const { result } = renderHook(() =>
      useDetailQuery({ id: '123' }, { skip: false })
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeUndefined();
  });

  it('should return an error when request fails', () => {
    const mockError = { message: 'Failed to fetch' };

    (useDetailQuery as Mock).mockReturnValue({
      data: undefined,
      error: mockError,
      isLoading: false,
    });

    const { result } = renderHook(() =>
      useDetailQuery({ id: '123' }, { skip: false })
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toEqual(mockError);
  });
});
