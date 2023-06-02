import { ICommunity } from "database/types";
import { honApi, honApiStatic } from "libs/honApi";
import Image from "next/image";
import Link from "next/link";
import { Text } from "ui/atoms";

export async function DaoList({ addresses }: { addresses: string[] }) {
  const results = await Promise.all(
    addresses.map(address => {
      return honApiStatic<ICommunity[]>(
        `wallets/${address}/daos`,
        {},
        {
          revalidate: 60 * 60,
        }
      );
    })
  );
  const daos = results
    .map(r => r.data)
    .flat()
    .filter(dao => !!dao);
  return (
    <div className="flex min-w-[240px] flex-col gap-4">
      <Text as="h1">My DAOs</Text>

      {!!daos?.length && (
        <div className="shadow-smooth-lg flex flex-col gap-2 rounded-xl bg-white p-2">
          {daos?.map(dao => (
            <Link href={`/${dao?.slug}`}>
              <span className="flex cursor-pointer flex-row items-center gap-2 rounded-xl bg-white p-2 transition duration-200 hover:bg-neutral-200">
                {/* @ts-ignore */}
                {/* // eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                  width={40}
                  height={40}
                  src={dao.aesthetics.logoImageUrl}
                  alt={""}
                  className="rounded-lg"
                />
                {dao.name}
              </span>
            </Link>
          ))}
        </div>
      )}
      {!daos?.length && <span> This wallet is not associated with any DAOs.</span>}
    </div>
  );
}
