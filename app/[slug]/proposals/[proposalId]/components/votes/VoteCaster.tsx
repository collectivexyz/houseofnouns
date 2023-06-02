"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import cx from "classnames";

// import { useCastVote } from "libs/governance/hooks";

// import { handleGovernanceError } from "libs/governance";

import { Text } from "ui/atoms";
// import { Modal } from "components/ds/molecules";
// import { Scale } from "components/ds/pixel-icons";
import { toast } from "ui/organisms/Notifications";
import { TextArea } from "ui/atoms";
import { getMaxReasonLength, getPossibleVoteOptions, useCastVote } from "libs/governance";
import { VoteButtons } from "./VoteButtons";
import { IGovernanceEntity, IProposal, IVote } from "database/types";
import { useUser } from "libs/hooks/useUser";
import useLocalStorage from "libs/hooks/useLocalStorage";
import { useIsMobile } from "libs/hooks/useIsScreenSize";

interface IVoteCasterProps {
  proposal: IProposal;
  votes?: IVote[];
  className?: string;
  entity: IGovernanceEntity;
}

export const VoteCaster = ({ proposal, entity, className, votes }: IVoteCasterProps) => {
  const { user, isAuthenticated, login, logout, isLoading } = useUser();
  const { address, isConnected } = useAccount();

  const myVote = votes?.find(vote => vote.voter.toLowerCase() === address?.toLowerCase());

  const [selectedVoteOption, setSelectedVoteOption] = useState("");

  const [submittedVoteTx, setSubmittedVoteTx] = useLocalStorage(
    `submittedVoteTx-${proposal.proposalId}`,
    { hash: "", reason: "", selectedVoteOption: "0" }
  );

  const awaitingConfirmation = submittedVoteTx?.hash && !myVote;

  const [reason, setReason] = useState("");
  const isMobile = useIsMobile();

  // const modalSlug = "vote-reason";
  //   const { openModal, closeModal } = useModal(modalSlug);

  const governanceType = proposal.type;
  const governanceAddress = entity?.details?.governanceContract;

  const possibleVoteOptions = getPossibleVoteOptions(governanceType as "nouns" | "snapshot");

  const { castVote, data } = useCastVote(
    {
      type: governanceType,
      governanceAddress,
      snapshotSpaceUrl: governanceAddress,
    },
    { proposalId: proposal.proposalId, optionId: selectedVoteOption || "1", reason } // TODO remove || 1
  );

  const handleCastVoteResponse = async data => {
    if (data?.hash) {
      setSubmittedVoteTx({ hash: data?.hash, reason, selectedVoteOption });
    }
  };

  useEffect(() => {
    if (data) {
      handleCastVoteResponse(data);
    }
  }, [data]);

  const onReasonInputChange = e => {
    if (!myVote) {
      setReason(e.target.value);
    }
  };

  const currentVote = myVote?.optionId || selectedVoteOption;
  const noWalletConnected = !isConnected && !awaitingConfirmation;
  const walletConnected = isConnected && !awaitingConfirmation;
  const notYetVoted = walletConnected && !myVote;
  const alreadyVoted = !!(walletConnected && myVote);
  const maxReasonLength = getMaxReasonLength(governanceType as "nouns" | "snapshot");

  return (
    <motion.div
      className={cx(
        "shadow-smooth-lg flex w-full shrink-0 grow-0 flex-col space-y-4 overflow-hidden rounded-t-[24px] bg-white p-4",
        className,
        {
          "sticky bottom-0 left-0 right-0": isMobile,
        }
      )}
      variants={{
        expanded: { height: "auto" },
        collapsed: { height: 80 },
      }}
      initial="collapsed"
      animate={currentVote ? "expanded" : "collapsed"}
      transition={{ duration: 0.2 }}
    >
      <VoteButtons
        voteOptions={possibleVoteOptions}
        myVote={myVote}
        setSelectedVoteOption={setSelectedVoteOption}
        currentVote={currentVote}
        alreadyVoted={alreadyVoted}
      />

      {(!myVote || myVote.reason) && (
        <>
          <div className="flex flex-row items-center justify-between">
            <TextArea
              name="reason"
              type="text"
              autosize
              className={cx(
                "disabled:text-nouns-light-gray px-2 pt-2.5 pb-1 text-black outline-none",
                "bg-nouns-light-gray max-h-[160px] flex-1 overflow-y-scroll rounded-[24px] bg-opacity-[8%]"
              )}
              value={myVote?.reason || reason}
              rows={1}
              showBorder={false}
              size="md"
              disabled={!!myVote || awaitingConfirmation}
              onChange={onReasonInputChange}
              placeholder={`Note your reason, e.g. "Love that it's cc0"`}
              maxLength={maxReasonLength}
            />
            {/* <div className="cursor-pointer px-2 hover:opacity-70" onClick={() => openModal()}>
              <Scale width="16" height="16" />
            </div> */}
          </div>

          {/* <Modal title="Note your reason" slug={modalSlug} width="900px" height="auto">
            <ReasonInput
              rows={20}
              vote={myVote}
              reason={reason}
              onChange={onReasonInputChange}
              classNames="bg-white max-h-full overflow-y-auto rounded-lg"
              maxLength={maxReasonLength}
            />

            <div className="mt-3">
              <ActionButton text="Save my reason" onClick={() => closeModal()} />
            </div>
          </Modal> */}
        </>
      )}

      {!!awaitingConfirmation && (
        <Link legacyBehavior href={`https://etherscan.io/tx/${submittedVoteTx?.hash}`}>
          <a target="_blank">
            <Text as="p" className="text-center text-xs">
              Awaiting confirmation...
            </Text>
          </a>
        </Link>
      )}

      {noWalletConnected && <ActionButton onClick={() => login()} text="Connect Wallet" />}

      {notYetVoted && (
        <ActionButton
          onClick={() => {
            try {
              castVote();
            } catch (e) {
              toast.error(
                "Governance failed with error: " +
                  JSON.stringify({
                    type: governanceType,
                    code: e.code,
                    message: e.message,
                  })
              );
            }
          }}
          text="Submit my vote"
        />
      )}

      {alreadyVoted && (
        <Text as="p" className="text-center text-xs">
          Your vote has been submitted.
        </Text>
      )}
    </motion.div>
  );
};

const ActionButton = ({ onClick, text }) => (
  <button
    onClick={onClick}
    className="border-1 bg-d-primary w-full rounded-[40px] border py-3 text-center text-sm font-semibold text-white transition duration-200"
  >
    {text}
  </button>
);
