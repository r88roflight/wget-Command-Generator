import { useState } from "react";
import { WgetOptions } from "@/types/wget";

export const useWgetCommand = () => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<WgetOptions>({
    url: "",
    recursive: false,
    maxDepth: 5,
    waitTime: 1,
    followLinks: true,
    includePattern: "",
    excludePattern: "",
    saveDirectory: "",
    fileTypes: []
  });

  const generateCommand = () => {
    const flags = [];
    
    if (options.recursive) {
      flags.push("-r");
      flags.push(`--level=${options.maxDepth}`);
    }
    
    if (options.waitTime > 0) {
      flags.push(`--wait=${options.waitTime}`);
    }
    
    if (options.followLinks) {
      flags.push("--follow-ftp");
    }
    
    if (options.includePattern) {
      flags.push(`--accept=${options.includePattern}`);
    }
    
    if (options.excludePattern) {
      flags.push(`--reject=${options.excludePattern}`);
    }
    
    flags.push("--no-clobber"); // Don't overwrite existing files
    flags.push("--continue"); // Resume downloads
    flags.push("--content-disposition"); // Honor Content-Disposition headers
    flags.push("--adjust-extension"); // Add appropriate extensions to files
    
    return `wget ${flags.join(" ")} "${options.url}"`;
  };

  return {
    options,
    setOptions,
    loading,
    setLoading,
    generateCommand,
  };
};