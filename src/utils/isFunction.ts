// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (v: any): v is (...args: any[]) => any => typeof v === 'function';
