if (typeof window === 'undefined' || typeof document === 'undefined') {
  global.window = {};
  global.document = {};
}
export * from './common';
export * from './components';
