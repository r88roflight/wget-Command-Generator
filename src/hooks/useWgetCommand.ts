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
      // Basic options
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

      if (options.randomWait) {
        flags.push("--random-wait");
      }

      // File type options
      if (options.fileTypes && options.fileTypes.length > 0) {
        flags.push(`--accept=${options.fileTypes.join(',')}`);
      }

      if (options.excludeFileTypes && options.excludeFileTypes.length > 0) {
        flags.push(`--reject=${options.excludeFileTypes.join(',')}`);
      }

      // Download behavior
      if (options.noClobber) {
        flags.push("--no-clobber");
      }

      if (options.adjustExtension) {
        flags.push("--adjust-extension");
      }

      if (options.continueTransfer) {
        flags.push("--continue");
      }

      if (options.convertLinks) {
        flags.push("--convert-links");
      }

      // Advanced options
      if (options.userAgent) {
        flags.push(`--user-agent="${options.userAgent}"`);
      }

      if (options.limitRate) {
        flags.push(`--limit-rate=${options.limitRate}`);
      }

      if (options.timeout > 0) {
        flags.push(`--timeout=${options.timeout}`);
      }

      if (options.retries > 0) {
        flags.push(`--tries=${options.retries}`);
      }

      // Authentication
      if (options.username && options.password) {
        flags.push(`--user=${options.username}`);
        flags.push(`--password=${options.password}`);
      }

      // Spider mode
      if (options.spiderMode) {
        flags.push("--spider");
      }

      // Mirror options
      if (options.mirror) {
        flags.push("--mirror");
      }

      if (options.pageRequisites) {
        flags.push("--page-requisites");
      }

      // HTTPS options
      if (options.httpsOnly) {
        flags.push("--https-only");
      }

      // Additional features
      if (options.continueDownload) {
        flags.push("-c");
      }

      if (options.followFtp) {
        flags.push("--follow-ftp");
      }

      if (options.contentDisposition) {
        flags.push("--content-disposition");
      }

      // Directory options
      if (options.saveDirectory) {
        flags.push(`-P "${options.saveDirectory}"`);
      }

      return `wget ${flags.join(" ")} "${options.url}"`;
    }
    
    return "wget";
  };

  return {
    options,
    setOptions,
    loading,
    setLoading,
    generateCommand,
  };
};