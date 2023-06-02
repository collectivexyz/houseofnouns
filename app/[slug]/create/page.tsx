import ProposalEditor from "../drafts/create/[draftId]/components/ProposalEditor";

export default function CreatePage(props) {
  const { searchParams = {} } = props;
  const { slug } = searchParams;

  return (
    <div className="px-24 py-16">
      <ProposalEditor />
      {/* Sidebar: select versions, publish, add collaborators */}
    </div>
  );
}
