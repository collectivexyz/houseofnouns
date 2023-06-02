import { IDelegate } from "database/types";
import { shortenIfEthAddress } from "libs/utils";
import { Delegate, Profile } from "prisma-governance";
import { Avatar } from "ui/atoms";
import VotesLabel from "./VotesLabel";

interface IAbsenteesList {
  delegates: IDelegate[];
}

// TODO load commmunity profiles for absentees
export const AbsenteesList = ({ delegates }: IAbsenteesList) => {
  const delegatesFound = delegates?.length > 0;

  return (
    <>
      {delegatesFound &&
        delegates.map((delegate, index) => {
          return (
            <div key={delegate.address} className="group/vote">
              <div>
                <Avatar
                  id={delegate.address}
                  imageUrl={delegate.profile?.profilePicture}
                  size={30}
                  borderRadius="lg"
                />
                <a
                  href={`https://etherscan.io/address/${delegate.address}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="max-w-[100px] truncate">
                    {shortenIfEthAddress(delegate.profile?.username || delegate.address)}
                  </span>
                </a>
              </div>

              {delegate.totalVotes > 0 && (
                <div className="mt-2 flex space-x-1">
                  <VotesLabel weight={delegate.totalVotes} />
                </div>
              )}
            </div>
          );
        })}
    </>
  );
};
