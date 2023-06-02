import { ImageResponse } from "@vercel/og";
import { generateVoteImage } from "components/VoteImage";
import { NextRequest } from "next/server";

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const username = searchParams.get("username");
    const rawReason = searchParams.get("reason");
    const profilePicture = searchParams.get("profilePicture");
    const presetVoteType = searchParams.get("presetVoteType");
    const numVotes = searchParams.get("numVotes");
    const proposalId = searchParams.get("proposalId");
    const proposalTitle = searchParams.get("proposalTitle");

    if (!username) {
      return new Response("Not found - Invalid params", { status: 404 });
    }

    //filter ⌐◨-◨ out of reason text - doesnt work in next
    let reason = rawReason?.replace(/⌐◨-◨/g, "") || "";
    //remove trailing newline and whitespace
    reason = reason.trimEnd();

    const MAX_WIDTH = 1200;

    let width = proposalTitle?.length > 60 ? 850 : 750;
    let height = 570;
    let fontSize = 28;

    if (username.length > 17) {
      width = 750;
    }

    if (reason?.length > 50) {
      width = 800;
      fontSize = 42;
    }

    if (reason.length > 250) {
      width = 1000;
      fontSize = 36;
    }

    if (reason.length > 400) {
      width = 1000;
      fontSize = 32;
    }
    if (reason.length > 600) {
      width = 1100;
      fontSize = 31;
    }

    if (reason.length > 750) {
      width = 1100;
      fontSize = 28;
    }

    if (reason.length > 850) {
      width = 1100;
      fontSize = 26;
    }

    if (reason.length > 1000) {
      width = MAX_WIDTH;
      fontSize = 24;
    }

    if (reason.length > 1250) {
      width = MAX_WIDTH;
      fontSize = 18;
    }

    if (reason.length > 2250) {
      width = MAX_WIDTH;
      fontSize = 14;
    }

    if (reason.length < 70) {
      height = 400;
    }

    if (reason.length < 140) {
      height = 525;
    }

    if (!reason) {
      height = 245;
    }

    //calculate number of lines in reason text given font size, number of characters, and width
    const widthMinusPadding = width - 85;

    //reason split by newlines
    const reasonLines = reason.split("\n");

    //split reason by newlines
    const numLines = reasonLines
      .map(item => {
        return getNumLines(item, fontSize, widthMinusPadding);
      })
      .reduce((a, b) => a + b, 0);

    //set height to be 40px reason padding plus fontSize * numLines + 124px for username info + 30 title padding
    const topBarHeight = 55;
    const usernameAreaHeight = 164;
    const reasonPadding = 30;
    const reasonHeight = fontSize * numLines * 1.3;

    //incredibly hacky to get good height on dif votes, no good way to do this w/out dom
    const bottomPadding = reasonLines?.length > 1 || numLines < 2 ? 0 : 20;

    //remove

    height =
      topBarHeight +
      usernameAreaHeight +
      (reason ? reasonPadding * 2 : 0) +
      reasonHeight +
      bottomPadding;

    //if numlines > 20, remove 40
    if (numLines > 21) {
      height -= 40;
    }

    return new ImageResponse(
      generateVoteImage({
        username,
        reason,
        profilePicture,
        presetVoteType,
        numVotes,
        proposalId,
        fontSize: `${fontSize}px`,
        proposalTitle,
      }),
      {
        width,
        height,
      }
    );
  } catch (e) {
    console.error(e);
  }
}

export const config = {
  runtime: "edge",
};

export const getNumLines = (text: string, fontSize: number, width: number) => {
  const numCharactersPerLine = Math.floor(width / (fontSize * 0.6));
  const pixelsPerLine = fontSize * 0.6 * numCharactersPerLine;

  const words = text.split(" ");
  let numLines = 0;
  let currentLine = "";

  for (const word of words) {
    const wordLengthPixels = word.length * fontSize * 0.47;
    const currentLineLengthPixels = currentLine.length * fontSize * 0.47;

    // check if adding the current word to the current line would make the line too long
    if (currentLineLengthPixels + wordLengthPixels > pixelsPerLine) {
      // if the line would be too long, increment the line count and start a new line
      numLines += 1;
      currentLine = "";
    }
    // add the current word to the current line
    currentLine += word + " ";
  }

  // add the last line
  if (currentLine.length > 0) {
    numLines += 1;
  }

  return numLines;
};
