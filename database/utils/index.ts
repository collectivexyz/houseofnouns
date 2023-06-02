export * from "./serialize";
export * from "./paginate";

export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}
