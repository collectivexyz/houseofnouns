export enum ProposalVoteCategory {
  FOR = "For",
  AGAINST = "Against",
  ABSTAIN = "Abstain",
}

export interface VoteOption {
  color: string;
  name: ProposalVoteCategory;
  optionId: string;
}

export enum ProposalVoteColor {
  FOR = "#068940",
  AGAINST = "#D22209",
  ABSTAIN = "#C6C8CF",
}
/**
 * Returns which optionId to use for a given vote category.
 * For example, "For" in Nouns governance is "1", but in Snapshot it is "2".
 *
 * @param option: which vote category (for, against, abstain) to get the optionId for
 * @param governanceType: which governance type to use (nouns or snapshot)
 * @returns: the optionId to use for the given vote category
 */
function getOptionId(option: ProposalVoteCategory, governanceType: "nouns" | "snapshot"): string {
  switch (option) {
    case ProposalVoteCategory.FOR:
      return "1";
    case ProposalVoteCategory.ABSTAIN:
      if (governanceType === "nouns") {
        return "2";
      }
      if (governanceType === "snapshot") {
        return "3";
      }
      break;
    case ProposalVoteCategory.AGAINST:
      if (governanceType === "nouns") {
        return "0";
      }
      if (governanceType === "snapshot") {
        return "2";
      }
      break;
    default:
      return "";
  }
  return "";
}

/**
 * Returns a mapping of optionId to vote category. Similar to the above function.
 *
 * @param governanceType: which governance type to use (nouns or snapshot)
 * @returns: a mapping of optionId -> vote category
 */
export const getVoteMappings = (
  governanceType: "nouns" | "snapshot"
): { [key: number]: ProposalVoteCategory } => {
  switch (governanceType) {
    case "snapshot":
      return {
        1: ProposalVoteCategory.FOR,
        3: ProposalVoteCategory.ABSTAIN,
        2: ProposalVoteCategory.AGAINST,
      };
    case "nouns":
    default:
      return {
        0: ProposalVoteCategory.AGAINST,
        1: ProposalVoteCategory.FOR,
        2: ProposalVoteCategory.ABSTAIN,
      };
  }
};

/**
 * Returns the possible vote options for a given governance type by computing the optionId for each vote category.
 *
 * @param governanceType
 * @returns
 */
export const getPossibleVoteOptions = (governanceType: "nouns" | "snapshot"): VoteOption[] => {
  return [
    {
      color: ProposalVoteColor.FOR,
      name: ProposalVoteCategory.FOR,
      optionId: getOptionId(ProposalVoteCategory.FOR, governanceType),
    },
    {
      color: ProposalVoteColor.ABSTAIN,
      name: ProposalVoteCategory.ABSTAIN,
      optionId: getOptionId(ProposalVoteCategory.ABSTAIN, governanceType),
    },
    {
      color: ProposalVoteColor.AGAINST,
      name: ProposalVoteCategory.AGAINST,
      optionId: getOptionId(ProposalVoteCategory.AGAINST, governanceType),
    },
  ];
};

export const getMaxReasonLength = (governanceType: "nouns" | "snapshot"): number | null => {
  switch (governanceType) {
    case "snapshot":
      // https://github.com/snapshot-labs/snapshot.js/blob/85218c225f826e24943bc070c9ae867ffff02b8d/src/schemas/vote.json#L30
      return 140;
    default:
      return null;
  }
};
