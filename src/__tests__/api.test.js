import api from '../services/api';

jest.mock('axios', () => {
  const mockAxiosInstance = {
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };
  return {
    create: jest.fn(() => mockAxiosInstance),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    defaults: { headers: { common: {} } },
  };
});

describe('API Service', () => {
  test('interceptors are set up', () => {
    expect(api.interceptors.request.use).toHaveBeenCalled();
    expect(api.interceptors.response.use).toHaveBeenCalled();
  });

  test('request interceptor adds Authorization header if token exists', () => {
    localStorage.setItem('token', 'secret');
    const interceptor = api.interceptors.request.use.mock.calls[0][0];
    const config = { headers: {} };
    const result = interceptor(config);
    expect(result.headers.Authorization).toBe('Token secret');
  });

  test('request interceptor handles missing token', () => {
    localStorage.clear();
    const interceptor = api.interceptors.request.use.mock.calls[0][0];
    const config = { headers: {} };
    const result = interceptor(config);
    expect(result.headers.Authorization).toBeUndefined();
  });

  test('response interceptor handles success', () => {
    const interceptor = api.interceptors.response.use.mock.calls[0][0];
    const response = { data: 'ok' };
    expect(interceptor(response)).toBe(response);
  });

  test('response interceptor handles 401/403 errors', async () => {
    const errorInterceptor = api.interceptors.response.use.mock.calls[0][1];

    localStorage.setItem('token', 't1');
    try {
      await errorInterceptor({ response: { status: 401 } });
    } catch (e) {
      // expected
    }
    expect(localStorage.getItem('token')).toBeNull();

    localStorage.setItem('token', 't2');
    try {
      await errorInterceptor({ response: { status: 403 } });
    } catch (e) {
      // expected
    }
    expect(localStorage.getItem('token')).toBeNull();

    localStorage.setItem('token', 'keep');
    try {
      await errorInterceptor({ response: { status: 500 } });
    } catch (e) {
      // expected
    }
    expect(localStorage.getItem('token')).toBe('keep');
  });
});
