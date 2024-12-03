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
  const handleFileTypeChange = (value: string, isExclude: boolean = false) => {
    if (isExclude) {
      const newExcludeTypes = options.excludeFileTypes.includes(value)
        ? options.excludeFileTypes.filter(type => type !== value)
        : [...options.excludeFileTypes, value];

      const selectedOptions = FILE_TYPE_OPTIONS.filter(option => 
        newExcludeTypes.includes(option.value)
      );
      
      const excludePatterns = selectedOptions.flatMap(option => option.patterns);
      
      setOptions({
        ...options,
        excludeFileTypes: newExcludeTypes,
        excludePattern: excludePatterns.join(",")
      });
    } else {
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
    }
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
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <Label className="text-white">Include File Types</Label>
          <button
            onClick={handleSelectAll}
            type="button"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Select All
          </button>
        </div>
        <div className="flex justify-between gap-4">
          {FILE_TYPE_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`include-${option.value}`}
                checked={options.fileTypes.includes(option.value)}
                onCheckedChange={() => handleFileTypeChange(option.value)}
                className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
              />
              <Label
                htmlFor={`include-${option.value}`}
                className="text-sm font-medium leading-none text-white cursor-pointer whitespace-nowrap"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-white mb-4 block">Exclude File Types</Label>
        <div className="flex justify-between gap-4">
          {FILE_TYPE_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`exclude-${option.value}`}
                checked={options.excludeFileTypes.includes(option.value)}
                onCheckedChange={() => handleFileTypeChange(option.value, true)}
                className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
              />
              <Label
                htmlFor={`exclude-${option.value}`}
                className="text-sm font-medium leading-none text-white cursor-pointer whitespace-nowrap"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};