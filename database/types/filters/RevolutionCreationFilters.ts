export type ICreationsFilter = "new" | "next-up" | "top" | "mine";
export type ICreationsSortBy =
  | "createdAt"
  | "-createdAt"
  | "votes"
  | "-votes"
  | "lastVoteAt"
  | "-lastVoteAt";
export type ICreationsTimePeriod = "hour" | "day" | "week" | "month" | "year" | "all";
