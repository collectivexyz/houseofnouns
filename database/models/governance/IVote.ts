import { Vote, Profile } from "prisma-governance";
import { IProposal } from "./IProposal";

export interface IVote extends Vote {
  profile?: Pick<Profile, "username" | "profilePicture">;
  proposal?: IProposal;
}
