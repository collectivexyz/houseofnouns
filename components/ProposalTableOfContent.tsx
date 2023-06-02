import styles from "./ProposalTableOfContent.module.css";

export interface TableOfContent {
  level: number;
  id?: string;
  name?: string;
}

interface Props {
  tableOfContent: TableOfContent[];
}

/* eslint-disable no-param-reassign */

export const normalizeTocLevels = (tableOfContent: TableOfContent[]): TableOfContent[] => {
  const levels = tableOfContent.map(x => x.level);
  const lowestLevel = Math.min(...levels);

  if (lowestLevel !== 1) {
    tableOfContent = tableOfContent.map(toc => {
      toc.level -= 1;
      return toc;
    });

    return normalizeTocLevels(tableOfContent);
  }

  // change first element's level to align with the lowest
  if (tableOfContent[0]?.level !== lowestLevel) {
    tableOfContent[0].level = lowestLevel;
  }

  return tableOfContent;
};

export const ProposalTableOfContent = ({ tableOfContent }: Props) => {
  return (
    <div className={`text-sm ${styles.tableOfContent}`}>{getUnorderedList(tableOfContent)}</div>
  );
};

const getUnorderedList = (tableOfContent: TableOfContent[]) => {
  // eslint-disable-next-line no-param-reassign
  tableOfContent = normalizeTocLevels(tableOfContent);

  return (
    <div>
      <ul>
        {tableOfContent.map(currentItem => {
          return (
            <li
              data-level={currentItem.level}
              key={currentItem.id}
              className={`${paddingsPerLevel[currentItem.level]} list-inside list-disc py-0.5`}
            >
              <a
                href={`#${currentItem.id}`}
                className="text-light-gray hover:text-black"
                onClick={e => onHeaderClick(e, currentItem)}
              >
                {stripContent(currentItem.name)}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const stripContent = (content: string) => {
  return stripTextFromLinks(content.replaceAll("*", ""));
};

const stripTextFromLinks = (content: string) => {
  const markdownLinkRegexp = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)$/;
  const markdownLink = content.match(markdownLinkRegexp);
  if (markdownLink) {
    const [_fullMatch, text, _url] = markdownLink;
    if (text) {
      return text;
    }
  }

  return content;
};

const paddingsPerLevel = {
  1: "pl-2",
  2: "pl-4",
  3: "pl-6",
  4: "pl-8",
  5: "pl-10",
  6: "pl-12",
};

const scrollElementIntoView = (targetElement: HTMLElement) => {
  targetElement.scrollIntoView({ behavior: "smooth" });
};

const onHeaderClick = (
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  currentItem: TableOfContent
) => {
  event.preventDefault();

  const { id: originalId, name } = currentItem;

  let targetElement = document.getElementById(originalId);
  if (!targetElement) {
    const specialCharacters = /[?*+~.,;()[\]{}'/"!:@&]/g;
    const generatedId = name.toLowerCase().replaceAll(" ", "-").replaceAll(specialCharacters, "");
    targetElement = document.getElementById(generatedId);
  }

  if (!targetElement) {
    return;
  }

  const collapsibleWrapper: HTMLDivElement = targetElement.closest('[data-group-id="collapsable"]');
  const isCollapsed = collapsibleWrapper?.style?.height !== "auto";
  if (isCollapsed) {
    collapsibleWrapper.click();

    // wait until the collapsible is expanded (transition takes 0.25s)
    setTimeout(() => scrollElementIntoView(targetElement), 250);
  } else {
    scrollElementIntoView(targetElement);
  }
};
