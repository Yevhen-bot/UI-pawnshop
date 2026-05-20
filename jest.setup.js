import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock window.location correctly for jsdom
const originalLocation = window.location;
delete window.location;
window.location = Object.defineProperties(
  {},
  {
    ...Object.getOwnPropertyDescriptors(originalLocation),
    assign: { value: jest.fn(), writable: true },
    replace: { value: jest.fn(), writable: true },
    pathname: { value: '/', writable: true },
    search: { value: '', writable: true },
  },
);

// Mock alert
window.confirm = jest.fn(() => true);
