import { Profile } from "prisma-social";

export interface IEditionMintEvent {
  bidCreatedAt: Date;
  bidder: string;
  quantity: number;
  transactionHash: string;
  profile?: Pick<Profile, "username" | "profilePicture" | "address"> | null;
}
