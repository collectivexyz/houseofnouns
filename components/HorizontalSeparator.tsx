interface Props {
  size?: "sm" | "md" | "lg";
}

export const HorizontalSeparator = ({ size = "lg" }: Props) => {
  const sizeClasses = {
    sm: "py-1 lg:py-2",
    md: "py-2 lg:py-3",
    lg: "py-3 lg:py-6",
  };

  return (
    <div className={sizeClasses[size]}>
      <hr className="dark:border-d-neutral-400 border-neutral-100 opacity-50" />
    </div>
  );
};
