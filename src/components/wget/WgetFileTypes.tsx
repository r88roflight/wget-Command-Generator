import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { WgetOptions } from "@/types/wget";
import { FILE_TYPE_OPTIONS } from "@/types/wget";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetFileTypes = ({ options, setOptions }: Props) => {
  const handleFileTypeChange = (value: string) => {
    const newFileTypes = options.fileTypes.includes(value)
      ? options.fileTypes.filter(type => type !== value)
      : [...options.fileTypes, value];

    const selectedOptions = FILE_TYPE_OPTIONS.filter(option => 
      newFileTypes.includes(option.value)
    );

    const includePatterns = selectedOptions.flatMap(option => option.patterns);
    
    setOptions({
      ...options,
      fileTypes: newFileTypes,
      includePattern: includePatterns.join(",")
    });
  };

  const handleSelectAll = () => {
    const allFileTypes = FILE_TYPE_OPTIONS.map(option => option.value);
    const allPatterns = FILE_TYPE_OPTIONS.flatMap(option => option.patterns);
    
    setOptions({
      ...options,
      fileTypes: allFileTypes,
      includePattern: allPatterns.join(",")
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-white">File Types to Download</Label>
        <button
          onClick={handleSelectAll}
          type="button"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Select All
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {FILE_TYPE_OPTIONS.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={options.fileTypes.includes(option.value)}
              onCheckedChange={() => handleFileTypeChange(option.value)}
              className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
            />
            <Label
              htmlFor={option.value}
              className="text-sm font-medium leading-none text-white cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};