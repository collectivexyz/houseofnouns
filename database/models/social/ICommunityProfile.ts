import { CommunityProfileFull } from "./CommunityProfile";

export interface ICommunityProfile extends CommunityProfileFull {
  getLinks: () => Promise<Array<{ url: string; title: string; imageUrl?: string }>>;
}
