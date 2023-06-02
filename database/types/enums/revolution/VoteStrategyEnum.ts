export enum VoteStrategyEnum {
  //1 vote per token, gnars og and gnars new
  thatsgnarly = "ThatsGnarly",
  thatsnounish = "ThatsNounish",
  ontheroofs = "OnTheRoofs",
  nounsesports = "NounsEsports",
  //1 vote per users who don't own tokens
  freevote = "FreeVote",
  shreddingsassy = "ShreddingSassy",
  ninetieskids = "NinetiesKids",
  nounsart = "NounsArt",
  hubinclusivo = "HubInclusivo",
  surfguru = "SurfGuru",
}

export function isValidVoteStrategyKey(key: string): key is keyof typeof VoteStrategyEnum {
  return Object.keys(VoteStrategyEnum).includes(key as VoteStrategyEnum);
}

export function getVotingStrategy(revolutionId: string) {
  if (!isValidVoteStrategyKey(revolutionId)) throw new Error("Invalid vote strategy");
  return VoteStrategyEnum[revolutionId];
}
