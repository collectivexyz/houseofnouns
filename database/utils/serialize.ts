import { FunctionKeys } from "utility-types";
import { Serialized } from "../types";

export async function serialize<T extends object, A extends FunctionKeys<T>>(
  object: T,
  addFields: A[] = []
) {
  const copy = serializeSync(object) as Serialized<T, A>;

  await Promise.all(
    addFields.map(async field => {
      try {
        copy[field.toString() as keyof Serialized<T, A>] = await (
          object[field.toString() as keyof T] as unknown as () => Promise<any>
        )();
      } catch (e) {}
    })
  );

  return copy;
}

export async function serializeMany<T extends object, F extends FunctionKeys<T>>(
  objects: T[],
  addFields: F[] = []
) {
  return await Promise.all(objects.map(object => serialize(object, addFields)));
}

export function serializeSync<D extends any>(data: D | null): D {
  if (!data) return {} as D;
  return JSON.parse(JSON.stringify(data));
}
