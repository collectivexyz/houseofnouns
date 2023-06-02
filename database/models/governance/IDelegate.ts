import { Delegate, Profile } from "prisma-governance";

export interface IDelegate extends Delegate {
  profile?: Pick<Profile, "profilePicture" | "username">;
  tokens?: any[];
}
