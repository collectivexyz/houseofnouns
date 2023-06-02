import { Community } from "prisma-social";
import { ICommunity } from "./ICommunity";

export function transformCommunity(community: Community): ICommunity {
  return Object.assign(community, {
    treasuryAddress: community.governanceSettings.treasuries[0].address.toLowerCase(),
    governanceEntityForStage(stage: string) {
      return community.governanceSettings.entities.find(entity => entity.stage === stage) || null;
    },
    governanceTypeForStage(stage: string) {
      try {
        const entity = this.governanceEntityForStage(stage);
        const derivedType = entity?.entityId?.split("-")[2];
        if (derivedType !== "nouns" && derivedType !== "snapshot") {
          return "nouns";
        }
        return derivedType;
      } catch {
        return "nouns";
      }
    },
  });
}
