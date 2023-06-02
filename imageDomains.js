module.exports = {
  domains: [
    "nftstorage.link",
    "openseauserdata.com",
    "ipfs.io",
    "instagram.com",
    "youtube.com",
    "discord.com",
    "gnars.com",
    "thatsgnar.ly",
    "zora.co",
    "skatecuida.org",
  ],
  remotePatterns: [
    { hostname: "*.mypinata.cloud" },
    { hostname: "*.youtube.com" },
    { hostname: "**.nftstorage.link" },
    { hostname: "*.instagram.com" },
    { hostname: "*.imgur.com" },
    { hostname: "*.seadn.io" },
    { hostname: "*.alchemy.com" },
    { hostname: "*.rarible.org" },
    { hostname: "*.googleusercontent.com" },
    { hostname: "*.s3.amazonaws.com" },
    { hostname: "*.twimg.com" },
    { hostname: "*.cdninstagram.com" },
    { hostname: "localhost" },
    { hostname: "*.zora.co" },
    { hostname: "*.mux.com" },
  ],
  dangerouslyAllowSVG: true,
  contentDispositionType: "attachment",
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
};