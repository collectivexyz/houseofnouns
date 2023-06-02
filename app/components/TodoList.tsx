import { IProposal } from "database/types";
import { honApi, honApiStatic } from "libs/honApi";
import { Markdown, Text } from "ui/atoms";
import { serializeSync } from "database/utils";
import { transformProposal } from "database/models/governance/Proposal";

import { TodoTabs } from "./TodoTabs";
import { Blocks } from "database/models/eth/Blocks";

const processProposalDescriptionText = (descriptionText: string, proposalTitle: string) => {
  descriptionText = descriptionText
    .replace(proposalTitle, "")
    .replace(/#{1,3} \n/gm, "")
    .replace("&&", "");

  // replace all instances of <p><br></p> with nothing
  descriptionText = descriptionText.replace(/<p><br><\/p>/gm, "");

  return descriptionText;
};

export async function TodoList({ addresses }: { addresses: string[] }) {
  const results = await Promise.all(
    addresses.map(async address => {
      const res = await honApiStatic<IProposal[]>(
        `wallets/${address}/todos`,
        {},
        {
          cache: "no-store",
        }
      );
      return res;
    })
  );
  // join all the results' data together
  const proposals = results
    .map(r => r.data)
    .flat()
    .filter(p => !!p)
    .map(transformProposal)
    .map(serializeSync);

  const todos = proposals
    .filter(p => p.status === "active")
    .filter(
      p =>
        !p.votes.some(v =>
          addresses.map(address => address.toLowerCase()).includes(v.voter.toLowerCase())
        )
    );
  const completed = proposals
    .filter(p => p.status === "active")
    .filter(p =>
      p.votes.some(v =>
        addresses.map(address => address.toLowerCase()).includes(v.voter.toLowerCase())
      )
    );
  const upcoming = proposals.filter(p => p.status === "pending");

  const blockNumber = await Blocks().getLatestBlockNumber();

  return (
    <div className="flex w-full flex-col gap-4 md:w-[640px]">
      <Text as="h1">Activity</Text>
      <TodoTabs blockNumber={blockNumber} todos={todos} completed={completed} upcoming={upcoming} />
    </div>
  );
}
