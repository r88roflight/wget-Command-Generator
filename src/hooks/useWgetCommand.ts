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
    adjustExtension: false,
    noClobber: false,
    continue: false,
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

      if (!options.verifySSL) {
        flags.push("--no-check-certificate");
      }

      if (options.pageRequisites) {
        flags.push("--page-requisites");
      }

      if (options.domains) {
        flags.push(`--domains=${options.domains}`);
      }

      if (options.excludeDomains) {
        flags.push(`--exclude-domains=${options.excludeDomains}`);
      }

      if (options.noParent) {
        flags.push("--no-parent");
      }

      if (options.relativePaths) {
        flags.push("--relative");
      }

      if (options.backupOriginal) {
        flags.push("--backup-converted");
      }

      if (options.strictComments) {
        flags.push("--strict-comments");
      }

      if (options.infiniteRecursion) {
        flags.push("--level=inf");
      }

      if (options.dontRemoveListings) {
        flags.push("--no-remove-listing");
      }

      if (options.quotaCommand) {
        flags.push(`--quota=${options.quotaCommand}`);
      }

      if (options.bindAddress) {
        flags.push(`--bind-address=${options.bindAddress}`);
      }

      if (options.cacheDir) {
        flags.push(`--cache=${options.cacheDir}`);
      }

      if (options.noCache) {
        flags.push("--no-cache");
      }

      if (options.noCheckCertificate) {
        flags.push("--no-check-certificate");
      }

      if (options.noVerbose) {
        flags.push("--no-verbose");
      }
      
      if (options.followFtp) {
        flags.push("--follow-ftp");
      }

      if (options.contentDisposition) {
        flags.push("--content-disposition");
      }

      if (options.adjustExtension) {
        flags.push("--adjust-extension");
      }

      if (options.noClobber) {
        flags.push("--no-clobber");
      }

      if (options.continue) {
        flags.push("--continue");
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
