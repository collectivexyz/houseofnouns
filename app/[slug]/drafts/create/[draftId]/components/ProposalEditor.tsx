"use client";

import {
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createHeadingPlugin,
  createItalicPlugin,
  createParagraphPlugin,
  createPlugins,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createUnderlinePlugin,
  createDeserializeMdPlugin,
  createImagePlugin,
  createLinkPlugin,
  Plate,
  TEditableProps,
  HeadingToolbar,
  PlateProvider,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  serializeHtml,
} from "@udecode/plate";
import { serialize } from "remark-slate";
import { useCallback, useState } from "react";
import {
  CodeBlockElement,
  createPlateUI,
  ELEMENT_CODE_BLOCK,
  ELEMENT_PARAGRAPH,
  StyledElement,
  withProps,
} from "@udecode/plate";
import { initialProposalValue } from "./initialProposalValue";
import { createMyPlugins, MyValue } from "./plateTypes";
import { FixedEditorToolbar } from "./FixedEditorToolbar";
import { FloatingEditorToolbar } from "./FloatingEditorToolbar";
import { ProposalContent } from "app/[slug]/proposals/[proposalId]/components/proposal/ProposalContent";

const processProposalDescriptionText = (descriptionText: string) => {
  descriptionText = descriptionText.replace(/#{1,3} \n/gm, "").replace("&&", "");

  // replace all instances of <p><br></p> with nothing
  descriptionText = descriptionText.replace(/<p><br><\/p>/gm, "");

  return descriptionText;
};

const editableProps: TEditableProps<MyValue> = {
  placeholder: "Type...",
};

export const plateUI = createPlateUI({
  [ELEMENT_CODE_BLOCK]: CodeBlockElement,
  [ELEMENT_PARAGRAPH]: withProps(StyledElement, {
    // as: 'p',
    styles: {
      root: {
        margin: 0,
        padding: "4px 0",
      },
    },
    prefixClassNames: "p",
  }),
  [ELEMENT_H1]: withProps(StyledElement, {
    styles: {
      root: {
        margin: "0",
        fontSize: "1.5em",
        fontWeight: "500",
        lineHeight: "1.3",
      },
    },
  }),
  [ELEMENT_H2]: withProps(StyledElement, {
    styles: {
      root: {
        margin: "0",
        fontSize: "1.4em",
        fontWeight: "500",
        lineHeight: "1.3",
      },
    },
  }),
  [ELEMENT_H3]: withProps(StyledElement, {
    styles: {
      root: {
        margin: "0",
        fontSize: "1.3em",
        fontWeight: "500",
        lineHeight: "1.3",
      },
    },
  }),
});

const plugins = createMyPlugins(
  [
    createDeserializeMdPlugin(),
    createImagePlugin(),
    createLinkPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHeadingPlugin(),
    createParagraphPlugin(),
    createBoldPlugin(),
    createCodePlugin(),
    createItalicPlugin(),
    createStrikethroughPlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createUnderlinePlugin(),
  ],
  { components: plateUI }
);

export default function ProposalEditor() {
  const initialValue = [{ children: [{ text: "" }] }];

  const [tab, setTab] = useState<"preview" | "markdown">("preview");
  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const getMarkdown = value => {
    return (
      value
        ?.map?.(v => {
          console.log("Serializing: ", v);
          console.log("Serialized: ", serialize2(v));

          return serialize2(v);
        })
        .join("  \n") || ""
    );
  };

  const serialize2 = node => {
    // value is a list of nodes with text and type
    // if type is h1, prepend # to text
    // if type is h2, prepend ## to text
    // if type is h3, prepend ### to text
    // if type is p, prepend nothing to text
    // if type is bold, wrap text in **text**
    // if type is italic, wrap text in *text*
    // if type is underline, wrap text in <u>text</u>
    // implementation:

    if (node.type === "h1") {
      return `# ${node.text || node.children.map(v => serialize(v)).join("")}`;
    }
    if (node.type === "h2") {
      return `## ${node.text || node.children.map(v => serialize(v)).join("")}}`;
    }
    if (node.type === "h3") {
      return `### ${node.text || node.children.map(v => serialize(v)).join("")}}`;
    }

    if (node.bold) {
      return `**${node.text || node.children.map(v => serialize(v)).join("")}}**`;
    }

    return node.text || node.children.map(v => serialize(v)).join("");
  };

  const getFullProposal = () => {
    return `# ${title}\n\n${getMarkdown(content)}`;
  };

  const onChange = change => {
    setContent(change);
  };

  return (
    <div className="max-w-[700px] rounded-[24px] bg-white p-6">
      {/* title box */}
      <input
        className="rounded-[12px] border border-neutral-200 p-2 text-2xl font-medium focus:outline-none"
        placeholder={"Insert a title..."}
        value={title}
        onChange={e => {
          setTitle(e.target.value);
        }}
      />
      <div>
        <button onClick={() => setTab("preview")}>Preview</button>
        <button onClick={() => setTab("markdown")}>Markdown</button>
      </div>
      {tab === "markdown" && (
        <div className="rounded-[12px] border border-neutral-200 p-2">
          <PlateProvider<MyValue>
            // @ts-ignore
            initialValue={content}
            plugins={plugins}
            onChange={onChange}
          >
            <Plate<MyValue> editableProps={editableProps} plugins={plugins}>
              <FloatingEditorToolbar />
            </Plate>
          </PlateProvider>
        </div>
      )}
      {tab === "preview" && (
        <ProposalContent>{processProposalDescriptionText(getMarkdown(content))}</ProposalContent>
      )}
    </div>
  );
}
