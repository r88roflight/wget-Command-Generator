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
  const handleFileTypeChange = (extension: string, isExclude: boolean = false) => {
    if (isExclude) {
      const newExcludeTypes = options.excludeFileTypes.includes(extension)
        ? options.excludeFileTypes.filter(type => type !== extension)
        : [...options.excludeFileTypes, extension];
      
      setOptions({
        ...options,
        excludeFileTypes: newExcludeTypes,
        excludePattern: newExcludeTypes.length > 0 ? newExcludeTypes.map(ext => `*.${ext}`).join(",") : ""
      });
    } else {
      const newFileTypes = options.fileTypes.includes(extension)
        ? options.fileTypes.filter(type => type !== extension)
        : [...options.fileTypes, extension];
      
      setOptions({
        ...options,
        fileTypes: newFileTypes,
        includePattern: newFileTypes.length > 0 ? newFileTypes.map(ext => `*.${ext}`).join(",") : ""
      });
    }
  };

  const handleSelectAll = () => {
    const allExtensions = FILE_TYPE_OPTIONS.flatMap(category => category.patterns);
    const allSelected = allExtensions.every(ext => options.fileTypes.includes(ext));
    
    if (allSelected) {
      setOptions({
        ...options,
        fileTypes: [],
        includePattern: ""
      });
    } else {
      setOptions({
        ...options,
        fileTypes: allExtensions,
        includePattern: allExtensions.map(ext => `*.${ext}`).join(",")
      });
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <Label className="text-base sm:text-lg font-semibold text-white">Include File Types</Label>
          <Button
            onClick={handleSelectAll}
            type="button"
            variant="outline"
            size="sm"
            className="text-xs text-zinc-400 hover:text-white transition-colors h-7 w-full sm:w-auto"
          >
            {FILE_TYPE_OPTIONS.flatMap(category => category.patterns).every(ext => options.fileTypes.includes(ext))
              ? "Deselect All"
              : "Select All"}
          </Button>
        </div>
        <div className="space-y-6">
          {FILE_TYPE_OPTIONS.map((category) => (
            <div key={category.value} className="space-y-2">
              <Label className="text-white font-medium block mb-2">{category.label}</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-2 pl-2 sm:pl-4">
                {category.patterns.map((extension) => (
                  <div key={extension} className="flex items-center space-x-2">
                    <Checkbox
                      id={`include-${extension}`}
                      checked={options.fileTypes.includes(extension)}
                      onCheckedChange={() => handleFileTypeChange(extension)}
                      className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
                    />
                    <Label
                      htmlFor={`include-${extension}`}
                      className="text-sm font-medium leading-none text-white cursor-pointer"
                    >
                      .{extension}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base sm:text-lg font-semibold text-white mb-4 block">Exclude File Types</Label>
        <div className="space-y-6">
          {FILE_TYPE_OPTIONS.map((category) => (
            <div key={category.value} className="space-y-2">
              <Label className="text-white font-medium block mb-2">{category.label}</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-2 pl-2 sm:pl-4">
                {category.patterns.map((extension) => (
                  <div key={extension} className="flex items-center space-x-2">
                    <Checkbox
                      id={`exclude-${extension}`}
                      checked={options.excludeFileTypes.includes(extension)}
                      onCheckedChange={() => handleFileTypeChange(extension, true)}
                      className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
                    />
                    <Label
                      htmlFor={`exclude-${extension}`}
                      className="text-sm font-medium leading-none text-white cursor-pointer"
                    >
                      .{extension}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};