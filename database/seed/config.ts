import subDays from "date-fns/subDays";
import { Database, SeedService } from "./service";
import { uniq } from "lodash";

type CollectionConfig = { db: Database; name: string; filter?: object };

const COMMUNITY_SLUG = {
  $in: [
    "nouns",
    "thatsgnarly",
    "thatsnounish",
    "nounsesports",
    "ontheroofs",
    "nounsart",
    "shreddingsassy",
    "ninetieskids",
  ],
} as const;

const daysAgo = (days: number) => ({ $gt: subDays(new Date(), days) });

export const collectionConfig: CollectionConfig[] = [
  // Revolution
  { db: Database.Revolution, name: "auctions" },
  { db: Database.Revolution, name: "contests" },
  { db: Database.Revolution, name: "drops" },
  { db: Database.Revolution, name: "editions" },
  { db: Database.Revolution, name: "payoutSplits" },
  {
    db: Database.Revolution,
    name: "profiles",
    filter: { usernameUpdatedAt: daysAgo(7) },
  },
  { db: Database.Revolution, name: "revolutions" },
  { db: Database.Revolution, name: "submissions" },
  {
    db: Database.Revolution,
    name: "upvotes",
    filter: { createdAt: daysAgo(7) },
  },
  { db: Database.Revolution, name: "tags" },

  // Social
  {
    db: Database.Social,
    name: "communityProfiles",
    filter: {
      communitySlug: COMMUNITY_SLUG,
    },
  },
  {
    db: Database.Social,
    name: "posts",
    filter: { createdAt: daysAgo(90) },
  },
  {
    db: Database.Social,
    name: "notifications",
    filter: { createdAt: daysAgo(14) },
  },
  {
    db: Database.Social,
    name: "profiles",
    filter: { usernameUpdatedAt: daysAgo(14) },
  },

  // Eth
  {
    db: Database.Eth,
    name: "blocks",
    //mainnet and goerli for now
    filter: { timestamp: daysAgo(1), chainId: { $in: [1, 5, 137] } },
  },

  {
    db: Database.Eth,
    name: "events",
    filter: async (seed: SeedService) => {
      const editions = await seed
        .getRemoteCollection(Database.Revolution, "editions")
        ?.find({}, { projection: { networkAddress: 1, chainId: 1 } })
        .toArray();

      const chainIds = uniq(editions?.map(e => e.chainId || 1) || []);

      const addresses = uniq(editions?.map(e => e.networkAddress.toLowerCase()) || []);

      return {
        chainId: { $in: chainIds },
        address: { $in: addresses },
      };
    },
  },

  {
    db: Database.Eth,
    name: "nfts",
    filter: { tags: { $exists: true } },
  },
];
