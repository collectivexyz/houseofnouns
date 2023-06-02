"use client";

import { ChangeEvent, HTMLProps } from "react";
import { toast } from "../../organisms/Notifications";

export const FILE_SIZE = 25 * 1024 * 1024; // 25MB

interface Props extends Omit<HTMLProps<HTMLInputElement>, "onChange"> {
  onChange: (files: File[]) => void;
  maxFileSize?: number;
}

export const FileInput = (props: Props) => {
  const { children, className, onChange, maxFileSize = FILE_SIZE, ...rest } = props;

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const files = Array.from(event.target.files);

    if (files.some(({ size }) => size > maxFileSize)) {
      toast.error(`Files larger than ${maxFileSize / 1024 / 1024} MB are unsupported`);
    }

    onChange(files.filter(({ size }) => size <= maxFileSize));
  };

  return (
    <label className={`cursor-pointer ${className}`}>
      {children}
      <input type="file" className="hidden" onChange={handleChange} {...rest} />
    </label>
  );
};

export default FileInput;
