"use client";

import { IDelegate, IVote } from "database/types";
import { honApiStatic } from "libs/honApi";
import { useCallback, useEffect, useState } from "react";
import { Drawer } from "ui/molecules/Drawer";
import Image from "next/image";
import { Avatar, Skeleton } from "ui/atoms";
import { getTitle } from "database/models/governance/Proposal";
import { transformProposal } from "database/models/governance/Proposal";
import { getPossibleVoteOptions, getVoteMappings } from "libs/governance";

interface IProfileDrawerProps {
  delegateAddress: string;
  dao: {
    entityId?: string;
    slug?: string;
  };
  isOpen: boolean;
  closeDrawer: () => void;
  initialDelegateProfile?: Partial<IDelegate>;
}

export function ProfileDrawer(props: IProfileDrawerProps) {
  const { delegateAddress, dao, isOpen, closeDrawer, initialDelegateProfile } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [delegateProfile, setDelegateProfile] = useState(initialDelegateProfile);
  const [voteHistory, setVoteHistory] = useState<IVote[]>([]);

  const voteOptions = getPossibleVoteOptions("nouns");

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const [{ data: profile }, { data: votes }] = await Promise.all([
        await honApiStatic<IDelegate>(`wallets/${delegateAddress}`, {
          slug: dao.slug,
          entityId: dao.entityId,
        }),
        await honApiStatic<IVote[]>(
          `votes`,
          {
            voter: delegateAddress,
            slug: dao.slug,
            entityId: dao.entityId,
          },
          {
            cache: "no-store",
          }
        ),
      ]);

      setDelegateProfile(profile);
      console.log("Votes res: ", votes);
      setVoteHistory(votes);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [delegateAddress, dao.slug, dao.entityId]);

  useEffect(() => {
    if (!isOpen) return;

    loadProfile();
  }, [isOpen, loadProfile]);

  return (
    <Drawer isOpen={isOpen} closeDrawer={closeDrawer} title={""}>
      <div className="flex flex-col gap-4">
        {delegateProfile?.profile && (
          <Avatar
            id={delegateAddress}
            imageUrl={delegateProfile.profile?.profilePicture}
            borderRadius="xl"
            size={140}
          />
        )}
        {delegateProfile?.profile?.username && (
          <div className="text-2xl font-bold">{delegateProfile.profile.username}</div>
        )}
        <hr className="opacity-10" />

        <div className="flex flex-col gap-2">
          <b className="text-2xl">Stats</b>

          {delegateProfile?.totalVotes && (
            <span className=" flex flex-row gap-2 text-lg">
              <b>Voting power: </b>
              {delegateProfile.totalVotes}
            </span>
          )}

          {delegateProfile?.stats && (
            <span className="flex flex-row gap-2 text-lg">
              <b>Proposals voted in: </b>
              {delegateProfile.stats?.totalProposalsVoted}
            </span>
          )}

          {/* <div className="flex flex-row gap-4">
            {delegateProfile?.tokens
              ?.filter(
                token => token?.image?.mediaEncoding?.large || token?.image?.mediaEncoding?.original
              )
              ?.map(token => {
                return (
                  <div className="mb-4 flex flex-col gap-1">
                    {" "}
                    <Image
                      src={
                        token?.image?.mediaEncoding?.large ||
                        token?.image?.mediaEncoding?.original ||
                        token?.image?.url
                      }
                      alt="NFT"
                      width="80"
                      height="80"
                      className="rounded-xl"
                    />
                    {token?.name || "Token " + token.tokenId}
                  </div>
                );
              })}
          </div> */}
        </div>
        <hr className="opacity-10" />

        {voteHistory?.length ? (
          <div className="flex flex-col gap-2">
            <b className="text-2xl">Past votes</b>
            {voteHistory?.map(vote => {
              const title = getTitle("", vote?.proposal?.description);

              const proposalIdIsNumeric = !!(
                !Number.isNaN(parseFloat(vote?.proposal?.proposalId)) &&
                parseFloat(vote?.proposal?.proposalId)
              );

              return (
                <div
                  className="flex cursor-pointer flex-col gap-2 rounded-xl p-2 text-lg transition duration-200 hover:bg-neutral-100"
                  key={vote.id}
                >
                  <div className="flex flex-row items-start justify-between ">
                    <span className="flex max-w-[70%] flex-row gap-2">
                      {proposalIdIsNumeric && (
                        <span className="text-light-gray">{vote?.proposalId}</span>
                      )}
                      <span className="font-semibold">{title}</span>
                    </span>
                    <div
                      className="inline-flex h-auto rounded-xl px-2 py-1 text-sm font-light"
                      style={{
                        backgroundColor: voteOptions.find(
                          ({ optionId }) => optionId === vote.optionId
                        )?.color,
                        color: "white",
                      }}
                    >
                      {getVoteMappings("nouns")[vote.optionId]}
                    </div>
                  </div>
                  {vote?.reason && <div className="text-sm">{vote.reason}</div>}
                </div>
              );
            })}
          </div>
        ) : (
          <Skeleton height={42} className="rounded-xl" count={10} />
        )}
      </div>
    </Drawer>
  );
}

interface IOpenProfileDrawerProps {
  delegateAddress: string;
  delegateProfile?: Partial<IDelegate>;
  dao: {
    entityId?: string;
    slug?: string;
  };
  children: React.ReactNode;
}

export function OpenProfileDrawer(props: IOpenProfileDrawerProps) {
  // wraps around child, opens a profile drawer when clicked
  const { delegateAddress, delegateProfile, dao, children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const closeDrawer = useCallback(() => setIsOpen(false), []);
  const openDrawer = useCallback(() => setIsOpen(true), []);

  return (
    <>
      <span onClick={openDrawer} className="cursor-pointer">
        {children}
      </span>
      <ProfileDrawer
        delegateAddress={delegateAddress}
        dao={dao}
        isOpen={isOpen}
        closeDrawer={closeDrawer}
        initialDelegateProfile={delegateProfile}
      />
    </>
  );
}
