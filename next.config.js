const { withSentryConfig } = require("@sentry/nextjs");

const modularizeImports = require("./modularizeImports");
const imageDomains = require("./imageDomains");
const {
  PrismaEnginePlugin,
} = require("./database/prisma/utils/engine-webpack");

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/proposals/:path*",
        destination: "/nouns/proposals/:path*",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
  poweredByHeader: false,
  transpilePackages: ["ui"],
  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: [
      "prisma-social",
      "prisma-governance",
      "prisma-eth",
    ],
  },
  images: {
    ...imageDomains,
  },
  modularizeImports,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaEnginePlugin()];
    }
    return config;
  },
};

module.exports = withSentryConfig(
  nextConfig,
  { silent: true },
  { hideSourcemaps: false }
);
