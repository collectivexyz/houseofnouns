import cx from "classnames";
import { IVote } from "database/types";
import { ProposalVoteCategory, VoteOption } from "libs/governance";
import { Dispatch, SetStateAction } from "react";
import Check from "ui/pixel-icons/Check";
import Close from "ui/pixel-icons/Close";
import Minus from "ui/pixel-icons/Minus";

const getVoteIcon = (vote: ProposalVoteCategory) => {
  switch (vote) {
    case ProposalVoteCategory.FOR:
      return <Check width={14} height={14} className="mr-1" />;
    case ProposalVoteCategory.AGAINST:
      return <Close width={14} height={14} className="mr-1" />;
    case ProposalVoteCategory.ABSTAIN:
      return <Minus width={14} height={14} className="mr-1" />;
    default:
      return <></>;
  }
};

const VoteButton = ({ myVote, currentVote, setSelectedVoteOption, option, alreadyVoted }) => {
  const { color, name, optionId } = option;
  const isCurrentVoteButton = currentVote === optionId;

  return (
    <div
      onClick={() => {
        if (!myVote) {
          setSelectedVoteOption(optionId);
        }
      }}
      className={cx(
        "border-1 flex w-1/3 items-center justify-center rounded-[40px] border py-3 text-center text-sm transition duration-200",
        {
          "!border-nouns-light-gray !text-nouns-light-gray opacity-50":
            alreadyVoted && !isCurrentVoteButton,
          "cursor-default": alreadyVoted,
          "cursor-pointer": !alreadyVoted,
        }
      )}
      style={{
        backgroundColor: isCurrentVoteButton ? color : "white",
        color: isCurrentVoteButton ? "white" : color,
      }}
    >
      {getVoteIcon(name)} {name}
    </div>
  );
};

interface Props {
  voteOptions: VoteOption[];
  myVote: IVote;
  setSelectedVoteOption: Dispatch<SetStateAction<string>>;
  currentVote: string;
  alreadyVoted: boolean;
}
export const VoteButtons = ({
  voteOptions,
  myVote,
  setSelectedVoteOption,
  currentVote,
  alreadyVoted,
}: Props) => {
  return (
    <div className="flex flex-row space-x-2">
      {voteOptions.map((option: VoteOption, index) => {
        return (
          <VoteButton
            key={index}
            myVote={myVote}
            setSelectedVoteOption={setSelectedVoteOption}
            currentVote={currentVote}
            option={option}
            alreadyVoted={alreadyVoted}
          />
        );
      })}
    </div>
  );
};
