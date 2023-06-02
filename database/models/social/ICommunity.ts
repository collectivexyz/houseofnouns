import { Community } from "prisma-social";

export interface ICommunity extends Community {
  treasuryAddress: string;
  governanceEntityForStage: (
    stage: string
  ) => Community["governanceSettings"]["entities"][0] | null;
  governanceTypeForStage: (stage: string) => "nouns" | "snapshot";
}
