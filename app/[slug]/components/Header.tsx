"use client";

import classNames from "classnames";
import { ICommunity } from "database/types";
import Fuse from "fuse.js";
import { useUser } from "libs/hooks/useUser";
import { shortenIfEthAddress } from "libs/utils";
import { getAbsoluteUrl } from "libs/utils/get-absolute-url";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { Dropdown } from "ui/atoms/Dropdown/Dropdown";
import ChevronDown from "ui/pixel-icons/ChevronDown";
import Logout from "ui/pixel-icons/Logout";

interface Props {
  selected?: ICommunity;
  options: ICommunity[];
  treasury?: ReactNode;
}

export default function Header(props: Props) {
  const { selected, options, treasury } = props;
  const name = selected?.name || "Select a DAO";
  const logo = selected?.aesthetics?.logoImageUrl || getAbsoluteUrl("/images/honlogo.jpg");
  const { user, isAuthenticated, login, logout, isLoading } = useUser();

  const [showLoginButton, setShowLoginButton] = useState(false);

  const fuse = new Fuse(options, {
    threshold: 0.3,
    keys: ["name", "description"],
    distance: 100,
  });

  const [daoSearch, setDaoSearch] = useState();

  useEffect(() => {
    setShowLoginButton(!isLoading && !isAuthenticated);
  }, [isLoading, isAuthenticated]);

  return (
    <div className="bg-d-primary flex shrink-0 items-center p-2.5 text-white lg:h-16">
      <div className="mx-auto flex w-full flex-wrap items-center justify-between 2xl:container">
        <div className="flex flex-row items-center gap-2">
          {name !== "Select a DAO" && (
            <>
              <Link href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getAbsoluteUrl("/images/honlogo.jpg")}
                  width="64"
                  height="64"
                  alt="Home"
                  className="h-8 w-8 rounded-lg transition duration-100 hover:scale-110"
                />
              </Link>
              {/* vertical white line */}
              <div className="h-8 w-0.5 rounded-xl bg-white opacity-20" />
            </>
          )}

          <Dropdown>
            {
              // @ts-ignore
              ({ open }) => {
                return (
                  <>
                    <Dropdown.Button>
                      <div className="flex flex-row items-center gap-1 py-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {logo && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={logo}
                            width="64"
                            height="64"
                            alt={name}
                            className="mr-1 h-8 w-8 rounded-lg"
                          />
                        )}
                        {name}

                        <ChevronDown
                          className={classNames("h-4 w-4 transition duration-200", {
                            "-rotate-180 transform": open,
                            "rotate-0 transform": !open,
                          })}
                        />
                      </div>
                    </Dropdown.Button>
                    <Dropdown.Items className="max-h-[340px] w-64 overflow-y-scroll">
                      <hr className="w-[90%] opacity-50" />
                      {/* searchbar */}
                      <div className="flex flex-row items-center gap-2 py-2">
                        <input
                          type="text"
                          className="mx-2 my-1 w-full rounded-lg  bg-white px-2 py-1 text-sm text-black duration-150"
                          placeholder="Search DAOs"
                          value={daoSearch}
                          // @ts-ignore
                          onChange={e => setDaoSearch(e.target.value)}
                        />
                      </div>
                      {/* sorted so that "Nouns" is up top */}
                      {(daoSearch ? fuse.search(daoSearch).map(x => x.item) : options)
                        .sort((a, b) => (a.name === "Nouns" ? -1 : b.name === "Nouns" ? 1 : 0))
                        .map(option => (
                          <Link key={`dropdown_o_${option.communityId}`} href={`/${option.slug}`}>
                            <Dropdown.Item>
                              <div className="flex flex-row items-center gap-2">
                                {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                                <img
                                  src={option.aesthetics?.logoImageUrl}
                                  width="64"
                                  height="64"
                                  className="h-8 w-8 rounded-lg"
                                />
                                {option.name}
                              </div>
                            </Dropdown.Item>
                          </Link>
                        ))}
                    </Dropdown.Items>
                  </>
                );
              }
            }
          </Dropdown>
        </div>

        <div className="flex items-center justify-between space-x-2 pt-1 sm:w-1/4 sm:justify-end sm:space-x-4 sm:pt-0">
          {treasury && <span>{treasury}</span>}

          {!user && (
            <button
              className="rounded-xl border border-white px-2 py-1 text-sm text-white duration-150 hover:bg-white/10 lg:py-2"
              onClick={() => login()}
            >
              Connect Wallet
            </button>
          )}

          {user && (
            <Dropdown className="text-black">
              <Dropdown.Button className="flex items-center text-white">
                {/* <UserAvatar size="24" borderRadius="md" /> */}
                <span className="ml-2 mr-1.5 text-sm font-medium lg:text-base">
                  {shortenIfEthAddress(user.username)}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Dropdown.Button>
              <Dropdown.Items>
                <Dropdown.Item icon={Logout} onClick={() => logout()}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Items>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
}
