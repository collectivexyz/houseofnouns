import classNames from "classnames";
import { ChangeEventHandler, forwardRef, HTMLProps, ReactNode } from "react";
import { FormElement } from "../FormElement";
import styles from "./TextInput.module.css";

export interface TextInputProps extends Omit<HTMLProps<HTMLInputElement>, "size"> {
  name: string;
  error?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  size?: "base" | "lg" | "sm" | "xl";
  prepend?: ReactNode;
  append?: ReactNode;
  prependStyling?: string;
  variant?: "default" | "gray" | "transparent";
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    className,
    error,
    prepend,
    append,
    iconLeft,
    iconRight,
    name,
    prependStyling = "border-r mr-2.5 pr-2.5",
    type = "text",
    size = "base",
    variant = "default",
    label,
    ...rest
  } = props;
  const hasError = !!error;

  return (
    <div>
      <fieldset
        className={classNames(styles.container, styles[variant], {
          [styles.error]: hasError,
        })}
      >
        {prepend && (
          <div
            className={classNames(" dark:border-d-neutral-200 border-neutral-100", prependStyling)}
          >
            {prepend}
          </div>
        )}
        {iconLeft && <div className={`${styles.icon} mr-2.5`}>{iconLeft}</div>}
        <input
          id={name}
          name={name}
          type={type}
          aria-invalid={hasError}
          aria-describedby={error ? `${name}-error` : undefined}
          ref={ref}
          className={classNames(styles.input, className, "peer", styles[size], {
            "dark:placeholder-d-neutral-100 placeholder-neutral-600": variant !== "transparent",
            "placeholder-black/50 dark:placeholder-white/50": variant === "transparent",
          })}
          {...rest}
        />
        {iconRight && <div className={`${styles.icon} ml-2.5`}>{iconRight}</div>}
        {append && (
          <div className="dark:border-d-neutral-200 ml-2.5 border-l border-neutral-100 pl-2.5">
            {append}
          </div>
        )}
        {label && <FormElement.Label hasError={hasError}>{label}</FormElement.Label>}
      </fieldset>

      {error && <FormElement.Error name={name}>{error}</FormElement.Error>}
    </div>
  );
});

TextInput.displayName = "TextInput";
