import "server-only";

import { ICommunity } from "database/types";
import { honApiStatic } from "libs/honApi";

export async function getAllDaoSlugs() {
  // TODO Nouns Builder: get all slugs from the database / with any governance settings
  // let communities = await Communities().findMany({
  //   where: {
  //     governanceSettings: {
  //       isNot: {
  //         entities: [],
  //       },
  //     },
  //   },
  // });

  const { data: communities } = await honApiStatic<ICommunity[]>("daos", {});

  const daoSlugs = communities?.map(c => {
    return {
      slug: c.slug,
    };
  });

  // TODO Nouns Builer: determine whether to show header or not, based on URL
  // TODO Nouns Builder: pass this list elsewhere

  return daoSlugs;
}
