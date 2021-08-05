import type { Size } from 'src/type';
import { Sizes, tuple } from 'src/style';

export const StyleTypes = tuple('default', 'card');
export type StyleType = typeof StyleTypes[number];
export type { Size };
export type Value = string | number;
export type ValueMap = Map<Value, boolean>;
export { Sizes };
