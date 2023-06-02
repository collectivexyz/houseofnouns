"use client";

import { ChangeEvent, ChangeEventHandler, HTMLProps, useEffect, useRef, useState } from "react";
import { FormElement } from "../FormElement";
import clx from "classnames";

export interface Props extends Omit<HTMLProps<HTMLTextAreaElement>, "size"> {
  autosize?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit?: () => void;
  error?: string;
  name: string;
  label?: string;
  showBorder?: boolean;
  size?: "base" | "md" | "lg" | "sm";
}

export const TextArea = (props: Props) => {
  const {
    className,
    autosize,
    onChange,
    onSubmit,
    label,
    error,
    name,
    size = "base",
    showBorder = true,
    ...rest
  } = props;
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [minHeight, setMinHeight] = useState<number>();

  const hasError = !!error;

  useEffect(() => {
    if (!autosize) return;
    setMinHeight(ref.current?.clientHeight);
  }, [autosize]);

  // Submit form with CMD/CTRL + Enter
  useEffect(() => {
    const textarea = ref.current;
    if (!onSubmit || !textarea) return;
    const listener = (e: KeyboardEvent) =>
      e.key === "Enter" && e.metaKey ? onSubmit() : undefined;

    textarea.addEventListener("keydown", listener);
    return () => textarea.removeEventListener("keydown", listener);
  }, [onSubmit]);

  const recalculateHeight = () => {
    if (ref.current) {
      ref.current.style.height = "0px";
      ref.current.style.height = `${Math.max(minHeight || 0, ref?.current?.scrollHeight)}px`;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (autosize) recalculateHeight();
    if (onChange) onChange(e);
  };

  useEffect(() => {
    if (!minHeight) return; // Skip initial set
    if (autosize) recalculateHeight();
  }, [props.value, autosize, minHeight]);

  if (!ref) return null;

  return (
    <div className={className}>
      <FormElement.Fieldset hasError={hasError} showBorder={showBorder}>
        <textarea
          name={name}
          ref={ref}
          className={clx(
            "hide-scrollbar dark:placeholder-d-neutral-100 peer w-full resize-none border-0 bg-transparent placeholder-neutral-600 focus:outline-none",
            {
              "py-2.5 text-sm leading-[18px]": size === "base",
              "py-2.5 text-sm font-medium lg:py-3.5 lg:text-base": size === "lg",
              "text-sm placeholder:text-sm lg:text-base placeholder:lg:text-base": size === "md",
              "text-sm": size === "sm",
            }
          )}
          onChange={e => handleChange(e)}
          aria-invalid={hasError}
          aria-describedby={error ? `${name}-error` : undefined}
          placeholder="Write something here"
          {...rest}
        />
        {label && <FormElement.Label hasError={hasError}>{label}</FormElement.Label>}
      </FormElement.Fieldset>

      {error && <FormElement.Error name={name}>{error}</FormElement.Error>}
    </div>
  );
};

export default TextArea;
