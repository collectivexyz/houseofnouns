import { FunctionKeys, NonFunctionKeys } from "utility-types";

export type Serialized<T extends object, A extends FunctionKeys<T> = never> = Pick<
  T,
  NonFunctionKeys<T>
> &
  /* @ts-ignore */
  Record<A, Awaited<ReturnType<T[A]>>>;
