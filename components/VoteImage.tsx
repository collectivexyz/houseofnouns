import { shortenIfEthAddress } from "libs/utils/account";
import { getAbsoluteUrl } from "libs/utils/get-absolute-url";
import pluralize from "pluralize";

/* eslint-disable @next/next/no-img-element */

interface Props {
  username: string;
  reason?: string;
  profilePicture?: string;
  presetVoteType: string;
  numVotes: string;
  proposalId: string;
  fontSize?: string;
  proposalTitle?: string;
}

export function generateVoteImage(props: Props) {
  const {
    profilePicture,
    username,
    reason,
    presetVoteType,
    numVotes,
    proposalId,
    proposalTitle,
    fontSize = "24px",
  } = props;

  const voteLabelColor =
    presetVoteType === "for"
      ? "bg-green-500"
      : presetVoteType === "against"
      ? "bg-red-500"
      : "bg-neutral-500";

  //construct an element with the text and line breaks replaced with <br>, without using document
  const reasonWithBreaks = (
    <div tw="flex flex-col">
      {reason.split("\n").map((item, key) => {
        return (
          <div tw="flex" key={key}>
            {item}
            <br />
            <div tw="mt-5" />
          </div>
        );
      })}
    </div>
  );

  return (
    <div tw="w-full h-full flex flex-col bg-[#e4c945] relative p-3">
      <div tw="text-lg flex flex-row items-center text-black justify-between w-full px-2 leading-none tracking-tight">
        <div tw="flex flex-row items-center">
          <img
            width={`${288 / 4}`}
            height={`${111 / 4}`}
            src={getAbsoluteUrl("/images/noggles.png")}
            alt=" "
            tw="mr-4"
          />
          <div tw="flex text-black text-xl mr-4 bg-[#e4c945] rounded-md">{proposalTitle}</div>
        </div>
        <div tw="flex text-xl font-bold text-black">#{proposalId}</div>
      </div>

      <div tw="relative flex flex-col w-full bg-white p-8 mt-4 rounded-[35px]">
        <div tw="flex w-full items-start justify-start">
          <div tw="flex rounded-2xl overflow-hidden">
            <img
              width="124"
              height="124"
              src={profilePicture || getAbsoluteUrl("/images/nouns-profile.jpg")}
              alt=" "
              tw="rounded-2xl"
            />
          </div>
          <div tw="flex-col flex ml-7 w-full">
            <div tw="text-5xl text-black leading-none tracking-tight">
              {shortenIfEthAddress(username)}
            </div>

            <div tw="flex">
              <span
                tw={`mt-3 text-white ${voteLabelColor} flex-row items-center rounded-[40px] py-1 px-4 text-2xl font-light uppercase`}
              >
                {presetVoteType}
              </span>
              <span tw="mt-3 ml-2 flex-row items-center rounded-[40px] py-1 px-4 text-2xl font-light uppercase bg-neutral-100">
                {numVotes} {pluralize("vote", parseInt(numVotes, 10))}
              </span>
            </div>
          </div>
        </div>
        {reason && (
          <div tw="flex flex-col items-start justify-center mt-3 -mb-2">
            <h5 tw={`mt-3 mb-0 text-black text-[${fontSize}]`}>{reasonWithBreaks}</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export function getVoteImageUrl(props: Props): string {
  const {
    profilePicture,
    username,
    reason,
    presetVoteType,
    numVotes,
    proposalId,
    proposalTitle,
    fontSize = "24px",
  } = props;

  const url = new URL(getAbsoluteUrl("/api/voteImage"));
  url.searchParams.append("reason", reason || "");
  url.searchParams.append("username", username);
  url.searchParams.append("profilePicture", profilePicture || "");
  url.searchParams.append("presetVoteType", presetVoteType);
  url.searchParams.append("numVotes", numVotes || "0");
  url.searchParams.append("proposalId", proposalId || "");
  url.searchParams.append("proposalTitle", proposalTitle || "");
  url.searchParams.append("fontSize", fontSize);

  return url.href;
}
