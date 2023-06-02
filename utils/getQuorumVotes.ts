import { IProposal } from "database/types";

export const getQuorumVotes = function (proposal: IProposal): number {
  if (!proposal.nounsDynamicQuorum) {
    return proposal.strategy?.quorumVotes!;
  }
  const totalSupply = parseInt(proposal.nounsDynamicQuorum.totalSupply);
  const minQuorumVotesBPS = parseInt(proposal.nounsDynamicQuorum.minQuorumVotesBPS);
  const maxQuorumVotesBPS = parseInt(proposal.nounsDynamicQuorum.maxQuorumVotesBPS);
  const quorumCoefficient = parseInt(proposal.nounsDynamicQuorum.quorumCoefficient);

  //straight from nouns governance smart contract
  const againstVotesBPS = Math.floor((10000 * proposal.options["0"].voteCount) / totalSupply);
  const quorumAdjustmentBPS = Math.floor((quorumCoefficient * againstVotesBPS) / 1e6);
  const adjustedQuorumBPS = minQuorumVotesBPS + quorumAdjustmentBPS;
  const quorumBPS = Math.min(maxQuorumVotesBPS, adjustedQuorumBPS);

  return Math.floor((quorumBPS * totalSupply) / 1e4);
};
