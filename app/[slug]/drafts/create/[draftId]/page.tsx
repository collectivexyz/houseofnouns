// editor for drafts
// publish new version if draft is already published

import ProposalEditor from "./components/ProposalEditor";

export default function CreateDraftPage({ params }: { params: { draftId: string } }) {
  const { draftId } = params;

  // load the draft if it exists
  // const draft = await getDraft(slug, draftId);
  // if it does not exist, create a new draft
  // if (!draft) {
  //   draft = await createDraft(slug);
  // }

  // ensure the currently authenticated user has permission to edit this draft (or create a new one)
  // if not, prompt them to log in

  return (
    <div className="px-24 py-16">
      <ProposalEditor />
      {/* Sidebar: select versions, publish, add collaborators */}
    </div>
  );
}
