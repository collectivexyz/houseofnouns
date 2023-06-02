import { formatBigNum } from "libs/utils/numbers";
import { getTotalBalance } from "libs/web3/balance";
import Link from "next/link";
import { Tooltip } from "ui/atoms";

interface Props {
  treasuryAddress: string;
}

export const TreasuryBalance = async (props: Props) => {
  const { treasuryAddress } = props;

  const balance = await getTotalBalance(treasuryAddress, [
    "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84", // Lido
  ]);

  return (
    <Tooltip subtitle="Treasury">
      <div className="flex flex-row items-center space-x-1 ">
        <Link href={`https://etherscan.io/address/${treasuryAddress}`} target="_blank">
          <b>Ξ {formatBigNum(Math.round(balance))}</b>
        </Link>
      </div>
    </Tooltip>
  );
};
