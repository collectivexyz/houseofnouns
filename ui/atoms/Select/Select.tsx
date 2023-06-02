import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import { HTMLProps, useEffect, useState } from "react";
import ChevronDown from "../../icons/ChevronDown";
import Tick from "../../icons/Tick";
import { FormElement } from "../FormElement";
import { Tag } from "../Tag";

interface IOption {
  label: string;
  value: string;
}

interface IProps extends Omit<HTMLProps<HTMLSelectElement>, "onChange" | "defaultValue"> {
  onChange?: (selected: IOption | IOption[]) => void;
  error?: string;
  label?: string;
  options: IOption[];
  defaultValue?: IOption | IOption[];
  name: string;
  disabled?: boolean;
}

export const Select = (props: IProps) => {
  const {
    label,
    placeholder,
    multiple = false,
    defaultValue,
    onChange,
    options,
    error,
    name,
    value,
    disabled = false,
  } = props;

  const [selected, setSelected] = useState<IOption | IOption[] | undefined>(defaultValue);
  const hasError = !!error;

  const hasSelected = multiple ? !!selected && (selected as IOption[]).length > 0 : !!selected;

  // Sync UI with value coming potentially from outside (e.g. Formik)
  useEffect(() => {
    if (!value) {
      setSelected(undefined);
    } else if (multiple) {
      setSelected(options?.filter(option => (value as string[]).includes(option.value)));
    } else {
      setSelected(options?.find(option => option.value === value));
    }
  }, [multiple, options, value]);

  return (
    <div className={disabled ? "opacity-50" : ""}>
      <Listbox
        value={selected}
        onChange={v => {
          setSelected(v);
          if (onChange) onChange(v);
        }}
        as={FormElement.Fieldset}
        hasError={hasError}
        disabled={disabled || options.length === 0}
        multiple={multiple}
        showBorder={true}
      >
        <Listbox.Button className="flex w-full items-center focus:outline-none">
          <div className="flex-grow text-left text-sm">
            {!hasSelected && (
              <div className="dark:text-d-neutral-200 py-2.5 leading-[18px] text-neutral-500">
                {placeholder || "Choose"}
              </div>
            )}
            {hasSelected && !multiple && (
              <div className="py-2.5 leading-[18px]">{(selected as IOption).label}</div>
            )}
            {hasSelected && multiple && (
              <div className="pb-1.5 pt-0.5">
                {(selected as IOption[]).map(option => (
                  <Tag key={option.value} variant="light" size="xs" className="mr-1 mt-0.5">
                    {option.label}
                  </Tag>
                ))}
              </div>
            )}
          </div>
          <div className="flex-shrink-0">
            <ChevronDown
              width="16"
              height="16"
              className="dark:text-d-neutral-200 text-neutral-500"
            />
          </div>
        </Listbox.Button>

        <Listbox.Options className="dark:bg-d-neutral-800 peer absolute inset-x-0 z-50 mt-2 max-h-[200px] overflow-auto rounded-lg bg-white p-[5px] shadow-xl focus:outline-none">
          {options.map(option => {
            return (
              <Listbox.Option disabled={disabled} key={option.value} value={option}>
                {({ active: hovered }) => (
                  <div
                    className={classNames(
                      "flex w-full cursor-pointer items-center rounded-lg px-2.5 py-1.5",
                      {
                        "dark:bg-d-neutral-900 bg-neutral-50 text-neutral-900 dark:text-white":
                          hovered,
                        "dark:text-d-neutral-100 text-neutral-900": !hovered,
                      }
                    )}
                  >
                    <span className="mr-2 h-4 w-4">
                      <Tick width="16" height="16" className="ui-selected:block hidden" />
                    </span>
                    <span className="text-sm">{option.label}</span>
                  </div>
                )}
              </Listbox.Option>
            );
          })}
        </Listbox.Options>
        {label && <FormElement.Label hasError={hasError}>{label}</FormElement.Label>}
      </Listbox>
      {error && <FormElement.Error name={name}>{error}</FormElement.Error>}
    </div>
  );
};
