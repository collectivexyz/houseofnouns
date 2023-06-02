export function getProposalDiscussionUrl(
  slug: string,
  proposalId: string,
  isDesktop: boolean
): string {
  return isDesktop ? "#discussion" : `/${slug}/proposals/${proposalId}/discussion`;
}
