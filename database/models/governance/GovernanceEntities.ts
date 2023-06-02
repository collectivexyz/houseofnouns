import "server-only";

import { cache } from "react";
import { governance } from "../..";

export function GovernanceEntities() {
  return Object.assign(governance.entity, {
    findById,
  });
}

const findById = cache(async (entityId: string) => {
  return await governance.entity.findFirst({ where: { entityId } });
});
