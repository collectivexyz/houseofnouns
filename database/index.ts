import "server-only";

import { PrismaClient as GovernanceClient } from "prisma-governance";
import { PrismaClient as EthClient } from "prisma-eth";
import { Prisma, PrismaClient as SocialClient } from "prisma-social";

import { logQuery } from "./log-query";
export * from "./utils";

declare global {
  var governance: GovernanceClient | undefined;
  var social: SocialClient | undefined;
  var eth: EthClient | undefined;
}

const log: Prisma.PrismaClientOptions["log"] = [
  { emit: "event", level: "query" },
  { emit: "stdout", level: "error" },
  { emit: "stdout", level: "info" },
  { emit: "stdout", level: "warn" },
];

export const governance = global.governance || new GovernanceClient({ log });
export const social = global.social || new SocialClient({ log });
export const eth = global.eth || new EthClient({ log });

// Attach clients to global to avoid issues with hot refresh
if (process.env.NODE_ENV !== "production") {
  // Attach loggers only once
  if (!global.governance) {
    governance.$on("query" as any, (params: any) =>
      logQuery({ ...params, db: "Governance" })
    );
    social.$on("query" as any, (params: any) =>
      logQuery({ ...params, db: "Social" })
    );

    eth.$on("query" as any, (params: any) =>
      logQuery({ ...params, db: "ETH" })
    );
  }

  global.governance = governance;
  global.social = social;
  global.eth = eth;
}
