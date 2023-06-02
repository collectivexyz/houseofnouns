import { IVisionariesOrderBy } from "../../../types/filters/VisionariesFilters";

export const getVisionariesOrderBy = (sortBy: IVisionariesOrderBy) => {
  switch (sortBy) {
    case "numOwned":
      return [{ revolutionOwnershipStats: { numOwned: "desc" } }] as const;
    case "totalEarned":
      return [
        { revolutionEarnedStats: { totalEarned: "desc" } },
        { creatorStats: { numCreated: "desc" } },
      ] as const;
    case "numCreated":
      return [{ creatorStats: { numCreated: "desc" } }] as const;
    case "totalOnboarded":
      return [{ onboarderStats: { totalOnboarded: "desc" } }] as const;
    default:
      return [{ updatedAt: "desc" }] as const;
  }
};

export const getVisionariesFilterEmpty = (sortBy: IVisionariesOrderBy) => {
  switch (sortBy) {
    case "totalEarned":
      return { revolutionEarnedStats: { isSet: true } } as const;
    case "numCreated":
      return { creatorStats: { isSet: true } } as const;
    case "totalOnboarded":
      return { onboarderStats: { isSet: true } } as const;
    default:
      return {};
  }
};
