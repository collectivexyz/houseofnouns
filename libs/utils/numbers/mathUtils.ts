export const bigIntDivision = (a: bigint, b: bigint, precision: number) => {

    const bigIntMultiplier = BigInt(10 ** precision);
    const multiplier = Number(bigIntMultiplier);
    return (Number((a * bigIntMultiplier) / b) / multiplier);
};