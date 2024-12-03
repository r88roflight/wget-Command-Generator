import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { WgetOptions } from "@/types/wget";
import { FILE_TYPE_OPTIONS } from "@/types/wget";
import { Button } from "@/components/ui/button";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetFileTypes = ({ options, setOptions }: Props) => {
  const handleFileTypeChange = (value: string, isExclude: boolean = false) => {
    const selectedOption = FILE_TYPE_OPTIONS.find(opt => opt.value === value);
    if (!selectedOption) return;

    if (isExclude) {
      const newExcludeTypes = options.excludeFileTypes.includes(value)
        ? options.excludeFileTypes.filter(type => type !== value)
        : [...options.excludeFileTypes, value];
      
      const allPatterns = newExcludeTypes
        .map(type => FILE_TYPE_OPTIONS.find(opt => opt.value === type)?.patterns || [])
        .flat();

      setOptions({
        ...options,
        excludeFileTypes: newExcludeTypes,
        excludePattern: allPatterns.length > 0 ? allPatterns.join(",") : ""
      });
    } else {
      const newFileTypes = options.fileTypes.includes(value)
        ? options.fileTypes.filter(type => type !== value)
        : [...options.fileTypes, value];
      
      const allPatterns = newFileTypes
        .map(type => FILE_TYPE_OPTIONS.find(opt => opt.value === type)?.patterns || [])
        .flat();

      setOptions({
        ...options,
        fileTypes: newFileTypes,
        includePattern: allPatterns.length > 0 ? allPatterns.join(",") : ""
      });
    }
  };

  const handleSelectAll = () => {
    const allFileTypes = FILE_TYPE_OPTIONS.map(option => option.value);
    const allPatterns = FILE_TYPE_OPTIONS.map(option => option.patterns).flat();
    
    setOptions({
      ...options,
      fileTypes: allFileTypes,
      includePattern: allPatterns.join(",")
    });
  };

  const handleClearAll = () => {
    setOptions({
      ...options,
      fileTypes: [],
      includePattern: ""
    });
  };

  const allSelected = FILE_TYPE_OPTIONS.every(option => 
    options.fileTypes.includes(option.value)
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <Label className="text-white">Include File Types</Label>
          <div className="space-x-2">
            <Button
              onClick={allSelected ? handleClearAll : handleSelectAll}
              type="button"
              variant="outline"
              size="sm"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {allSelected ? "Clear All" : "Select All"}
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FILE_TYPE_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-start space-x-2">
              <Checkbox
                id={`include-${option.value}`}
                checked={options.fileTypes.includes(option.value)}
                onCheckedChange={() => handleFileTypeChange(option.value)}
                className="mt-1 border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
              />
              <Label
                htmlFor={`include-${option.value}`}
                className="text-sm font-medium leading-tight text-white cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-white mb-4 block">Exclude File Types</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FILE_TYPE_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-start space-x-2">
              <Checkbox
                id={`exclude-${option.value}`}
                checked={options.excludeFileTypes.includes(option.value)}
                onCheckedChange={() => handleFileTypeChange(option.value, true)}
                className="mt-1 border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
              />
              <Label
                htmlFor={`exclude-${option.value}`}
                className="text-sm font-medium leading-tight text-white cursor-pointer"
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