import { Draft, Profile } from "prisma-social";

export interface IDraft extends Draft {
  profile: Profile;
}
