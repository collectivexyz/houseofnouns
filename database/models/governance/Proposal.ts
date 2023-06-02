import { Proposal, Vote } from "prisma-governance";
import { Votes } from "./Votes";
import { getFundedAmountsForProposal } from "./libs/BudgetLib";
import { IProposal } from "../../types";

export function transformProposal(proposal: Proposal): IProposal {
  if (!proposal) return null;

  return Object.assign(proposal, {
    title: getTitle(proposal.title, proposal.description),

    ask: getAsk(proposal.options),

    budget: getBudget(proposal.options),
  });
}

export function getTitle(title: string | null, description: string) {
  if (title && title.length > 2) return title;

  // handle Nouns Builder HTML titles (formatted as: "title&&body")
  if (description.slice(0, 100).includes("&&")) {
    return description.slice(0, 100).split("&&")[0];
  }

  // description text sometimes contains extra quotes so we remove it
  if (description.startsWith('"') && description.endsWith('"')) {
    description = description.slice(1, -1);
  }

  // taken from nouns-monorepo
  description = description.replace(/\\n/g, "\n");

  const hashRegex = /^\s*#{1,6}\s+([^\n]+)/;
  const equalTitleRegex = /^\s*([^\n]+)\n(={3,25}|-{3,25})/;
  /**
   * Extract a markdown title from a proposal description that uses the `# Title` format
   * Returns null if no title found.
   */
  const extractHashTitle = (description: string) => description.match(hashRegex);
  /**
   * Extract a markdown title from a proposal description that uses the `Title\n===` format.
   * Returns null if no title found.
   */
  const extractEqualTitle = (description: string) => description.match(equalTitleRegex);

  /**
   * Extract title from a proposal's description/description. Returns null if no title found in the first line.
   * @param description proposal description
   */
  if (!description) return null;

  const hashResult = extractHashTitle(description);
  const equalResult = extractEqualTitle(description);
  const fallbackTitle = description.slice(0, 70);

  return hashResult ? hashResult[1] : equalResult ? equalResult[1] : fallbackTitle;
}

function getAsk(options: Proposal["options"]) {
  return Object.values(options).reduce(
    (acc: number, option: any) =>
      acc + (option.executionData?.reduce((t, i) => t + i.value?.eth, 0) || 0),
    0
  );
}

function getBudget(options: Proposal["options"]): { amount: number; unit: "eth" | "usd" } {
  const { payouts, eth, usdc } = getFundedAmountsForProposal(options);

  if (payouts?.length === 0) {
    return { amount: 0, unit: "eth" };
  }

  if (usdc) {
    return { amount: usdc, unit: "usd" };
  }

  return { amount: eth, unit: "eth" };
}
