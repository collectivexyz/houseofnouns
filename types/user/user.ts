import { Scope } from "prisma-social";
import { IUserIdentity } from "./identity";
import { IPfp } from "./pfp";

export interface IUser {
  _id: string;

  username: string;
  userId: string;
  dateCreated?: Date;
  email?: string;
  identities?: IUserIdentity[];
  emailConsent?: boolean;
  emailVerified?: boolean;
  newsLetterConsent?: boolean;

  ethAddresses?: Array<string>;
  flowAddresses?: Array<string>;

  bio?: string;
  imageURL?: string;
  coverUrl?: string;
  skills?: Array<string>;
  followingCount?: number;
  followersCount?: number;

  pfp?: IPfp;
  enabledNotifications?: NotificationRule[];
}

export type NotificationRule = {
  __typename?: "NotificationRule";
  scope: Scope;
  type: NotificationTypeEnum;
};

export const enum NotificationTypeEnum {
  PostMention = "PostMention",
  PostReply = "PostReply",
  ProposalNew = "ProposalNew",
}
