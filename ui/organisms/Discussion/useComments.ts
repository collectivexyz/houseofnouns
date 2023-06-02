import { useRoutesApi } from "libs/api/useRoutesApi";
import { Post, Scope } from "prisma-social";

export function useComments(scope: Scope, skip = false) {
  const { data = [], ...rest } = useRoutesApi<Post[]>(
    `/routes/discussion/comments?type=${scope.type}&id=${scope.id}`,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    },
    skip
  );

  return {
    scope,
    comments: data,
    commentsCount: data.reduce((acc, comment) => (acc += 1 + comment.childrenCount), 0),
    ...rest,
  };
}
