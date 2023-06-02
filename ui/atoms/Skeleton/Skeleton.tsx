import classNames from "classnames";

interface Props {
  className?: string;
  count?: number;
  height?: number | string;
  width?: number | string;
  rounded?: boolean;
}

export const Skeleton = (props: Props) => {
  const { count = 1, className, height = 20, rounded = false, width = "100%" } = props;

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          className={classNames(
            "dark:bg-d-neutral-600 max-w-full flex-shrink-0 animate-pulse bg-neutral-200",
            className,
            { "rounded-lg": rounded }
          )}
          key={`skeleton_${index}_${count}_${height}`}
          style={{ width, height }}
        />
      ))}
    </>
  );
};

export default Skeleton;
