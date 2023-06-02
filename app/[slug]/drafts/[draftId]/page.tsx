import { IDraft } from "database/types";
import { honApi } from "libs/honApi";
import { shortenIfEthAddress } from "libs/utils";
import { Avatar, Text } from "ui/atoms";

export default async function SingleDraftView({ params }) {
  // get draft
  // get comments for draft
  const { data: draft } = await honApi<IDraft>(`drafts/${params.draftId}`);

  return (
    <div
      className={
        "lg:h-body lg:hide-scrollbar py-4 px-2 lg:col-span-2 lg:block lg:overflow-y-auto lg:px-0 lg:py-8"
      }
    >
      <div className="flex max-w-[700px] flex-col gap-4 rounded-[24px] bg-white p-6">
        <Text as="h2">{draft?.title}</Text>

        <div className="col-span-2 flex flex-col space-y-1">
          <span className="text-light-gray">By</span>
          <div className="flex items-center space-x-1.5">
            <Avatar
              id={draft.address}
              imageUrl={draft?.profile?.profilePicture}
              borderRadius="xl"
            />
            <strong className="font-medium">
              {shortenIfEthAddress(draft?.profile?.username || draft.address)}
            </strong>
          </div>
        </div>

        <hr className="mx-2 opacity-10" />
      </div>
    </div>
  );
}
