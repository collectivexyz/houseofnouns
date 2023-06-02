import clsx from "classnames";
import { HorizontalSeparator } from "components";
import { IProposal } from "database/types";
import { BigNumber, utils } from "ethers";
import { defaultAbiCoder, keccak256, toUtf8Bytes } from "ethers/lib/utils.js";
import { formatPrice } from "libs/utils/numbers";
import { shortenIfEthAddress } from "libs/utils/account";
import { Suspense } from "react";

import { Avatar, Text, Tooltip } from "ui/atoms";

import { Discussion } from "ui/organisms";
import { DiscussionSkeleton } from "ui/organisms/Discussion/DiscussionSkeleton";
import { ProposalContent } from "./ProposalContent";
import { IProposalTab } from "./ProposalMobileMenu";
import { ProposalSection } from "./ProposalSection";
import { OpenProfileDrawer } from "components/ProfileDrawer";
import { Currency } from "types";

interface Props {
  proposal: IProposal;
  tab?: IProposalTab;
}

export async function ProposalBody({ proposal, tab }: Props) {
  const proposalIdIsNumeric = !!(
    !Number.isNaN(parseFloat(proposal.proposalId)) && parseFloat(proposal.proposalId)
  );

  const { amount, unit } = proposal.budget;

  return (
    <div className="space-y-6">
      <div
        className={clsx("rounded-b-5 rounded-t-5 rounded-[20px] bg-white", {
          "max-lg:hidden": tab !== "proposal",
        })}
      >
        <div className="p-4 pb-3 lg:p-6 lg:pb-0">
          <Text as="h2">
            {proposalIdIsNumeric && (
              <span className="text-light-gray pr-2">{proposal.proposalId}</span>
            )}
            {proposal.title}
          </Text>

          <div className="mt-4 flex flex-col space-y-4">
            <div className="grid grid-cols-2 gap-4 lg:flex lg:items-center lg:justify-between">
              <div className="col-span-2 flex flex-col space-y-1">
                <span className="text-light-gray">By</span>
                <OpenProfileDrawer
                  delegateAddress={proposal.proposer}
                  delegateProfile={{ profile: proposal.profile }}
                  dao={{ entityId: proposal.entityId }}
                >
                  <div className="flex flex-row items-center space-x-1.5">
                    <Avatar
                      id={proposal.proposer}
                      imageUrl={proposal.profile?.profilePicture}
                      borderRadius="xl"
                    />
                    <strong className="font-medium">
                      {shortenIfEthAddress(proposal.profile?.username || proposal.proposer)}
                    </strong>
                  </div>
                </OpenProfileDrawer>
              </div>
              <div className="flex flex-row gap-4">
                <Tooltip
                  subtitle={processProposalTransactions(
                    proposal.targets,
                    proposal.calldatas,
                    proposal.values,
                    proposal.signatures
                  )}
                >
                  <div>
                    <span className="text-light-gray">Tx</span>
                    <div className="font-medium">{proposal.targets?.length}</div>
                  </div>
                </Tooltip>
                {!!amount && (
                  <div>
                    {/* <Tooltip className="flex flex-col space-y-1" title={`${usdBudget}`}> */}
                    <span className="text-light-gray">Budget</span>
                    <div className="font-medium">{formatPrice(amount, unit as Currency)}</div>
                    {/* </Tooltip> */}
                  </div>
                )}
              </div>
              {/* {social?.length > 0 && <ProposalLinksSocial links={social} />} */}
            </div>
          </div>

          {/* {trailer && (
            <div className="mt-4">
              <ProposalTrailer url={trailer.url} />
            </div>
          )} */}

          <HorizontalSeparator />
        </div>

        <ProposalContent>
          {processProposalDescriptionText(proposal.description || "", proposal.title || "") +
            "\n\n### Transactions \n" +
            processProposalTransactions(
              proposal.targets,
              proposal.calldatas,
              proposal.values,
              proposal.signatures
            )}
        </ProposalContent>
      </div>

      <ProposalSection
        title="Discussion"
        id="discussion"
        className={clsx({
          "max-lg:hidden": tab !== "discussion",
        })}
      >
        <Suspense fallback={<DiscussionSkeleton />}>
          {/* @ts-expect-error Server Component */}
          <Discussion scope={{ id: proposal.uniqueId, type: "proposal" }} />
        </Suspense>
      </ProposalSection>
      {/* 
      {(links?.length > 0 || permissions?.canUpdateCommunityGovernance) && (
        <ProposalSection title="Media & Links" id="media">
          <ProposalLinks
            canManage={permissions?.canUpdateCommunityGovernance}
            links={links}
            proposalId={proposal.proposalId}
            entityId={proposal.entityId}
          />
        </ProposalSection>
      )} */}
    </div>
  );
}

export const processProposalDescriptionText = (descriptionText: string, proposalTitle: string) => {
  descriptionText = descriptionText
    .replace(proposalTitle, "")
    .replace(/#{1,3} \n/gm, "")
    .replace("&&", "");

  // replace all instances of <p><br></p> with nothing
  descriptionText = descriptionText.replace(/<p><br><\/p>/gm, "");

  return descriptionText;
};

export const processProposalTransactions = (
  targets: string[],
  calldatas: string[],
  values: string[],
  signatures: string[]
) => {
  // format each transaction nicely and return as a string
  // e.g. 0x412344312412451211.transfer()

  const transactions = targets.map((target: string, i: number) => {
    const signature: string = signatures[i] || "";
    const value: BigNumber = BigNumber.from(values[i]);

    const callData = calldatas[i];

    // Split at first occurrence of '('
    const [name, types] = signature.substring(0, (signature?.length || 1) - 1)?.split(/\((.*)/s);
    if (!name || !types) {
      // If there's no signature and calldata is present, display the raw calldata
      if (callData && callData !== "0x") {
        return {
          target,
          callData: concatSelectorToCalldata(signature, callData),
          value: value.gt(0) ? `{ value: ${utils.formatEther(value)} ETH } ` : "",
        };
      }

      return {
        target,
        functionSig: name === "" ? "transfer" : name === undefined ? "unknown" : name,
        callData: types ? types : value ? `${utils.formatEther(value)} ETH` : "",
      };
    }

    try {
      // Split using comma as separator, unless comma is between parentheses (tuple).
      const decoded = defaultAbiCoder.decode(types.split(/,(?![^(]*\))/g), callData);
      return {
        target,
        functionSig: name,
        callData: decoded.join(),
        value: value.gt(0) ? `{ value: ${utils.formatEther(value)} ETH }` : "",
      };
    } catch (error) {
      // We failed to decode. Display the raw calldata, appending function selectors if they exist.
      return {
        target,
        callData: concatSelectorToCalldata(signature, callData),
        value: value.gt(0) ? `{ value: ${utils.formatEther(value)} ETH } ` : "",
      };
    }
  });

  return transactions
    .map((transaction, index) => {
      return `${index + 1}. ${transaction.target}.${transaction.functionSig}(${
        transaction.callData
      }) ${transaction.value || ""}`;
    })
    .join("\n");
};

const concatSelectorToCalldata = (signature: string, callData: string) => {
  if (signature) {
    return `${keccak256(toUtf8Bytes(signature)).substring(0, 10)}${callData.substring(2)}`;
  }
  return callData;
};
