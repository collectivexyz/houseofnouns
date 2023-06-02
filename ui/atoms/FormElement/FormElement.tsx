import classNames from "classnames";
import { PropsWithChildren } from "react";

export const FormElement = () => null;

const Error = (props: PropsWithChildren<{ name: string }>) => {
  const { children, name } = props;
  return (
    <p className="dark:text-d-pink-300 mt-1.5 text-xs text-red-500" id={`${name}-error`}>
      {children}
    </p>
  );
};

// TODO: make sure we can pass disbaled, rn it get's cut out whe used with headless react ui Select
const Fieldset = (
  props: PropsWithChildren<{ hasError: boolean; disabled?: boolean; showBorder?: boolean }>
) => {
  const { children, hasError, showBorder } = props;
  return (
    <fieldset
      className={classNames(
        "relative flex rounded-xl bg-transparent transition-colors duration-150",
        {
          "border px-4": showBorder,
          "dark:border-d-neutral-400 border-neutral-100 focus-within:border-neutral-700 dark:focus-within:border-white":
            !hasError && showBorder,
          "dark:border-d-pink-300 border-red-500": hasError && showBorder,
        }
      )}
    >
      {children}
    </fieldset>
  );
};

const Label = (props: PropsWithChildren<{ hasError: boolean }>) => {
  const { children, hasError } = props;
  return (
    <legend
      className={classNames("ml-0 whitespace-nowrap px-px text-[11px] leading-none", {
        "dark:text-d-neutral-100 text-neutral-700 peer-focus:text-neutral-900 dark:peer-focus:text-white":
          !hasError,
        "dark:text-d-pink-300 text-red-500": hasError,
      })}
    >
      {children}
    </legend>
  );
};

FormElement.Error = Error;
FormElement.Fieldset = Fieldset;
FormElement.Label = Label;
