import { useState } from "react";
import { WgetOptions } from "@/types/wget";

export const useWgetCommand = () => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<WgetOptions>({
    url: "",
    recursive: false,
    maxDepth: 5,
    waitTime: 0,
    followLinks: true,
    includePattern: "",
    excludePattern: "",
    saveDirectory: "",
    fileTypes: [],
    excludeFileTypes: [],
    includeParents: true,
    userAgent: "",
    limitRate: "",
    outputFile: "",
    logFile: "",
    username: "",
    password: "",
    cookieFile: "",
    saveCookies: false,
    retries: 0,
    timeout: 0,
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
    verifySSL: true,
    spiderMode: false,
    mirror: false,
    pageRequisites: false,
    executeCommand: "",
    domains: "",
    excludeDomains: "",
    noParent: false,
    relativePaths: false,
    backupOriginal: false,
    strictComments: false,
    infiniteRecursion: false,
    dontRemoveListings: false,
    quotaCommand: "",
    bindAddress: "",
    cacheDir: "",
    noCache: false,
    noCheckCertificate: false,
    noVerbose: false,
    followFtp: false,
    contentDisposition: false,
    continueTransfer: false,
  });

  const generateCommand = () => {
    const flags = [];
    
    if (options.url) {
      if (options.spiderMode) {
        flags.push("--spider");
      }

      if (options.mirror) {
        flags.push("--mirror");
      }

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

      if (options.adjustExtension) {
        flags.push("--adjust-extension");
      }

      if (options.noClobber) {
        flags.push("--no-clobber");
      }

      if (options.continueTransfer) {
        flags.push("--continue");
      }

      if (options.contentDisposition) {
        flags.push("--content-disposition");
      }

      if (options.followFtp) {
        flags.push("--follow-ftp");
      }

      // Add save directory if specified
      if (options.saveDirectory) {
        flags.push(`-P ${options.saveDirectory}`);
      }
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