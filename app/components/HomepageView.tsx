import { DaoList } from "./DaoList";
import { TodoList } from "./TodoList";
import { getUser } from "libs/user/server";
import { ICommunity } from "database/types";

import { AllDaoList } from "./AllDaoList";
import { Suspense } from "react";
import { Skeleton } from "ui/atoms";

interface IProps {
  options: ICommunity[];
}

export default async function HomepageView(props: IProps) {
  const { options } = props;

  const user = await getUser();
  const addresses = user?.ethAddresses?.map(a => a.toLowerCase());

  return (
    <div className="flex flex-col items-center px-8 py-12">
      {addresses ? (
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <Suspense
            fallback={
              <Skeleton
                className="w-full min-w-[240px] rounded-xl md:w-[240px] md:max-w-[240px]"
                height={240}
              />
            }
          >
            {/* @ts-expect-error Server Component */}
            <DaoList addresses={addresses} />
          </Suspense>

          <Suspense
            fallback={
              <div className="flex w-[640px] max-w-full flex-col gap-2">
                <Skeleton className=" rounded-xl" height={80} count={6} />
              </div>
            }
          >
            {/* @ts-expect-error Server Component */}
            <TodoList addresses={addresses} />
          </Suspense>
        </div>
      ) : (
        <AllDaoList options={options} />
      )}
    </div>
  );
}
