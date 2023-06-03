const whitelistedImageDomains = require("../../../imageDomains");

const isImageDomainWhitelisted = (domain: string): boolean => {
  if (whitelistedImageDomains.domains.includes(domain)) {
    return true;
  }

  for (const { hostname } of whitelistedImageDomains.remotePatterns) {
    if (domain.endsWith(hostname.replace("*.", ""))) {
      return true;
    }
  }

  return false;
};

export const canUseNextImage = (imageUrl: string): boolean => {
  if (!imageUrl) return false;
  if (imageUrl.startsWith("/")) return true;

  try {
    return isImageDomainWhitelisted(new URL(imageUrl).hostname);
  } catch {
    return false;
  }
};
