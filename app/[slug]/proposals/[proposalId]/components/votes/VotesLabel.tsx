import { Label } from "ui/molecules";

interface Props {
  weight: number;
  quorumVotes?: number;
}

export const VotesLabel = (props: Props) => {
  const { weight, quorumVotes } = props;

  if (!weight) return <></>;

  const quorom = quorumVotes ? (weight / quorumVotes) * 100 : null;

  return (
    <>
      <Label>{weight} VOTES</Label>
      {quorom && <Label>{quorom.toFixed(2)}% Quorum</Label>}
    </>
  );
};

export default VotesLabel;
