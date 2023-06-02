import { Post } from "prisma-social";
import { ExpandableText } from "../../atoms/ExpandableText";
import { Markdown } from "../../atoms/Markdown";

type Props = Pick<Post, "content" | "markdown">;

const richTextToPlaintext = (richText: string, stripNewlines = false) => {
  const stripped = richText
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  return stripNewlines ? stripped.replace(/\n/g, " ") : stripped;
};

export const CommentBody = (props: Props) => {
  const { content, markdown } = props;

  return (
    <div className="break-word dark:text-d-neutral-50 whitespace-pre-line pr-2 lg:pr-0">
      {markdown ? (
        <Markdown>{markdown}</Markdown>
      ) : (
        <ExpandableText text={richTextToPlaintext(content, true)} />
      )}
    </div>
  );
};
