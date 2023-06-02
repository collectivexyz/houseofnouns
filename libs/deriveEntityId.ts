import { transformCommunity } from "database/models/social/Community";

export const deriveEntityId = async (searchParams: URLSearchParams) => {
  try {
    const entityId = searchParams.get("entityId");
    const address = searchParams.get("address");
    const slug = searchParams.get("slug");

    if (entityId) return entityId;
    if (address) return "ethereum-mainnet-nouns-" + address.toLowerCase();
    if (!slug) throw new Error("No entityId, address, or slug provided.");

    const { data: dao } = await fetch(process.env.NEXT_PUBLIC_HON_API_URL + "daos/" + slug).then(
      res => res.json()
    );

    if (!dao) {
      throw new Error("No DAO found for that slug.");
    }

    if (dao.entityId) return dao.entityId;

    const entity = transformCommunity(dao).governanceEntityForStage("proposals");
    if (!entity) throw new Error();
    return entity.entityId;
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message || "Error getting entity ID" }), {
      status: 500,
    });
  }
};
