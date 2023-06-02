import add from "date-fns/add";

const AVERAGE_BLOCK_TIME_IN_SECS = 13;

export const calculateProposalDate = (currentBlockNumber: number, proposalBlockNumber: number) => {
  const timestamp = new Date();
  const seconds = AVERAGE_BLOCK_TIME_IN_SECS * (proposalBlockNumber - currentBlockNumber);
  const dateAdded = add(timestamp, { seconds });
  return dateAdded;
};
