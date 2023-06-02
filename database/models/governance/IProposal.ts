import { Profile, Proposal, Vote } from "prisma-governance";
import { IGovernanceEntity } from "./IGovernanceEntity";
import { IVote } from "./IVote";

export interface IProposal extends Proposal {
  ask: number;
  budget: { amount: number; unit: "eth" | "usd" };
  profile?: Pick<Profile, "profilePicture" | "username">;
  votes?: IVote[];
  dao?: IGovernanceEntity;
  myVote?: string;
}
