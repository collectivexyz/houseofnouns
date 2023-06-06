"use client";

import { ConnectButton } from "components/ConnectButton";
import { getAbsoluteUrl } from "libs/utils/get-absolute-url";
import Image from "next/image";
import Link from "next/link";
import Fuse from "fuse.js";
import { useState } from "react";
import { useIsMobile } from "libs/hooks/useIsScreenSize";

export function getDaoUrl(slug: string, isMobile: boolean) {
  return `/${slug}/proposals`;
}

export function AllDaoList(props) {
  const { options } = props;

  const fuse = new Fuse(options, {
    threshold: 0.3,
    keys: ["name", "aesthetics.description"],
    distance: 100,
    shouldSort: false,
  });

  const [daoSearch, setDaoSearch] = useState("");

  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-xl">
        <ConnectButton className="cursor-pointer underline">
          Sign in
        </ConnectButton>{" "}
        to see your personalized feed
      </span>
      <div className="shadow-smooth-lg w-[90%] rounded-lg bg-white p-2 md:w-[400px]">
        <input
          type="text"
          className="w-full rounded-lg bg-white px-4 py-2 text-lg text-black duration-150"
          placeholder="Search DAOs"
          value={daoSearch}
          onChange={(e) => setDaoSearch(e.target.value)}
        />
        <div className="max-h-[400px] overflow-scroll  md:max-h-[540px] ">
          {(daoSearch
            ? fuse.search(daoSearch).map((x) => x.item)
            : options
          )?.map((option) => {
            return (
              <Link href={getDaoUrl(option.slug, isMobile)} key={option.name}>
                <div className="flex min-h-[60px] cursor-pointer flex-row items-center gap-2 rounded-lg p-2 transition duration-200 hover:bg-neutral-200">
                  <Image
                    src={
                      option?.aesthetics?.logoImageUrl ||
                      getAbsoluteUrl("/images/noggles.png")
                    }
                    alt=""
                    className="rounded-xl"
                    width={40}
                    height={40}
                  />
                  <div className="flex flex-col">
                    {option.name}
                    <span className="text-light-gray text-sm">
                      {option.aesthetics.description
                        ?.split(" ")
                        .splice(0, 8)
                        .join(" ") +
                        (option.aesthetics.description?.length > 36
                          ? "..."
                          : "")}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
