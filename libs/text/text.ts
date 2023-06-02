const TRUNCATE_SUFFIX = "...";

/**
 * Word count calculation method
 * @param {string} str
 * @returns {number} number of words found in string
 */
export const wordCount = (str: string): { length: number; words: string[] } => {
  const words = str.split(" ").filter((s: string) => s !== "");

  return { length: words.length, words };
};

const getTruncatedWordsSting = (text: string, max: number): string => {
  const { length, words } = wordCount(text);

  return length > max
    ? `${words.slice(0, max).join(" ")}${TRUNCATE_SUFFIX}`
    : text;
};
const getTruncatedLettersString = (text: string, max: number): string =>
  text?.length > max ? `${text?.substring(0, max)}${TRUNCATE_SUFFIX}` : text;
export type TruncateStringOptions = "letters" | "words";
/**
 * Text shortening method that caps string, and places '...' at end
 * @param {string} address
 * @returns {string} shortened eth address
 */
export const truncateString = (
  text: string,
  length: number,
  type: TruncateStringOptions = "letters"
): string => {
  switch (type) {
    case "words":
      return getTruncatedWordsSting(text, length);
    case "letters":
      return getTruncatedLettersString(text, length);
    default:
      return getTruncatedLettersString(text, length);
  }
};

export function capitalizeFirstLetter(text: string) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const shorten = (content: string, length?: number) => {
  const shortContent = (content || "").slice(0, length || 120);
  return shortContent.length < 120 ? shortContent : `${shortContent}...`;
};
