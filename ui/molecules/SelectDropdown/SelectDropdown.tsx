import classNames from "classnames";
import ChevronDown from "../../pixel-icons/ChevronDown";
import { useEffect, useState } from "react";
import { Dropdown } from "../../atoms/Dropdown/Dropdown";

export interface Option {
  label: string | number;
  value: string | number;
  icon?: any;
}

interface Props {
  defaultValue?: Option;
  value?: Option;
  label?: any;
  onChange?: (option: Option) => void;
  options: Option[];
  showLabelOnMobile?: boolean;
  showSelectedOption?: boolean;
  size?: "sm" | "lg";
}

export const SelectDropdown = (props: Props) => {
  const {
    onChange,
    label,
    options,
    value,
    defaultValue,
    showLabelOnMobile = false,
    showSelectedOption = true,
    size = "sm",
  } = props;
  const [selectedOption, setSelectedOption] = useState<Option>(defaultValue || options[0]);

  useEffect(() => {
    if (value) setSelectedOption(value);
  }, [value]);

  const onClick = (option: Option): void => {
    setSelectedOption(option);
    if (onChange) onChange(option);
  };

  return (
    <Dropdown className="shrink-0 grow-0">
      <Dropdown.Button
        className={classNames(
          "bg-lead-300 group flex shrink-0 grow-0 cursor-pointer items-center rounded-2xl py-1 px-4 font-semibold text-black focus:outline-none"
        )}
      >
        {label && (
          <div
            className={classNames("md:mr-2 md:block", {
              "mr-2": showLabelOnMobile,
              hidden: !showLabelOnMobile,
            })}
          >
            {typeof label === "string" ? (label ? `${label}:` : "") : label}
          </div>
        )}
        {showSelectedOption && (
          <div className="mr-2 flex items-center space-x-1 text-black">
            {selectedOption.icon && (
              <selectedOption.icon
                width={size === "sm" ? "16" : "18"}
                height={size === "sm" ? "16" : "18"}
              />
            )}
            <span>{selectedOption.label}</span>
          </div>
        )}
        <ChevronDown
          width={size === "sm" ? "14" : "18"}
          height={size === "sm" ? "14" : "18"}
          className="ui-open:-rotate-180 duration-200 group-hover:text-black dark:group-hover:text-white"
        />
      </Dropdown.Button>
      <Dropdown.Items>
        {options.map(option => (
          <Dropdown.Item key={option.value} onClick={() => onClick(option)} icon={option.icon}>
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Items>
    </Dropdown>
  );
};

export default SelectDropdown;
