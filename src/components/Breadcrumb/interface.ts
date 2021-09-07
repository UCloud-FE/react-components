import { tuple } from 'src/type';

export const StyleTypes = tuple('block-hover', 'hover', 'active');
export type StyleType = typeof StyleTypes[number];
