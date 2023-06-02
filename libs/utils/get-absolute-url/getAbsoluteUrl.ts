/**
 * Opensea asset url generator method
 *
 */
export const getAbsoluteUrl = (path = "", hook = false): string => {
  if (path.startsWith("http")) {
    return path;
  }

  let url = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";

  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }

  // fix for github codespaces
  if (url.includes("githubpreview.dev") && !hook) {
    url = "http://localhost:3000";
  }

  url += path;

  if (url.startsWith("http")) {
    return url;
  }

  return url.includes("localhost") ? `http://${url}` : `https://${url}`;
};

export default getAbsoluteUrl;
