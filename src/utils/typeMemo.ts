import { memo } from 'react';

const typedMemo: <T>(c: T) => T = memo;

export default typedMemo;
