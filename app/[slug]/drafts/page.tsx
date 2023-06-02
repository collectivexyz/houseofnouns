import Link from "next/link";

export default function DraftsPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  //   const drafts = await getDrafts();
  const drafts = [];

  return (
    <div>
      <h1>Drafts</h1>
      <Link href={`/${slug}/drafts/create`}>Create Draft</Link>
      {drafts.map(draft => (
        <span key={draft.id}>
          <Link href={`/${slug}/drafts/${draft.id}`}>
            <a>{draft.title}</a>
          </Link>
        </span>
      ))}
    </div>
  );
}
