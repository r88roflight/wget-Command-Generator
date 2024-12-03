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
    fileTypes: [],
    excludeFileTypes: [],
    includeParents: true,
    // New options with defaults
    userAgent: "",
    limitRate: "",
    outputFile: "",
    logFile: "",
    username: "",
    password: "",
    cookieFile: "",
    saveCookies: false,
    retries: 3,
    timeout: 30,
    continueDownload: true,
    noHostDirs: false,
    cutDirs: 0,
    noClobber: true,
    debug: false,
    convertLinks: false,
    adjustExtension: true,
    proxyEnabled: false,
    proxyUser: "",
    proxyPass: "",
    timestamping: false,
    randomWait: false,
    httpsOnly: false,
    ignoreRobots: false,
    backupConverted: false,
    deleteAfter: false,
    verifySSL: true
  });

  const generateCommand = () => {
    const flags = [];
    
    if (options.recursive) {
      flags.push("-r");
      flags.push(`--level=${options.maxDepth}`);
      if (!options.includeParents) {
        flags.push("--no-parent");
      }
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

    // New options
    if (options.userAgent) {
      flags.push(`--user-agent="${options.userAgent}"`);
    }

    if (options.limitRate) {
      flags.push(`--limit-rate=${options.limitRate}`);
    }

    if (options.username && options.password) {
      flags.push(`--user=${options.username}`);
      flags.push(`--password=${options.password}`);
    }

    if (options.retries > 0) {
      flags.push(`--tries=${options.retries}`);
    }

    if (options.timeout > 0) {
      flags.push(`--timeout=${options.timeout}`);
    }

    if (options.continueDownload) {
      flags.push("--continue");
    }

    if (options.convertLinks) {
      flags.push("--convert-links");
    }

    if (options.adjustExtension) {
      flags.push("--adjust-extension");
    }

    if (options.httpsOnly) {
      flags.push("--https-only");
    }

    if (options.randomWait) {
      flags.push("--random-wait");
    }

    if (options.noClobber) {
      flags.push("--no-clobber");
    }

    if (options.debug) {
      flags.push("--debug");
    }

    if (options.timestamping) {
      flags.push("--timestamping");
    }

    if (options.ignoreRobots) {
      flags.push("--execute robots=off");
    }

    if (options.backupConverted) {
      flags.push("--backup-converted");
    }

    if (options.deleteAfter) {
      flags.push("--delete-after");
    }

    if (options.verifySSL) {
      flags.push("--secure-protocol=auto");
    }
    
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