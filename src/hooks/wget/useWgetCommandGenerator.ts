import { WgetOptions } from "@/types/wget";

export const useWgetCommandGenerator = () => {
  const generateCommand = (options: WgetOptions) => {
    const flags = [];
    
    if (!options.url && !options.inputFile) return "wget";
    
    if (options.inputFile) {
      flags.push(`-i "${options.inputFile}"`);
    }

    if (options.directoryPrefix) {
      flags.push(`-P "${options.directoryPrefix}"`);
    }

    if (options.recursive) {
      flags.push("-r");
      if (options.maxDepth > 0) {
        flags.push(`--level=${options.maxDepth}`);
      }
    }

    // Handle parent directory option independently of recursive
    if (!options.includeParents) {
      flags.push("--no-parent");
    }

    if (options.waitTime > 0) {
      flags.push(`--wait=${options.waitTime}`);
    }

    if (options.randomWait) {
      flags.push("--random-wait");
    }

    if (options.fileTypes?.length > 0) {
      flags.push(`--accept=${options.fileTypes.join(',')}`);
    }

    if (options.excludeFileTypes?.length > 0) {
      flags.push(`--reject=${options.excludeFileTypes.join(',')}`);
    }

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

    if (options.username && options.password) {
      flags.push(`--user=${options.username}`);
      flags.push(`--password=${options.password}`);
    }

    if (options.spiderMode) {
      flags.push("--spider");
    }

    if (options.mirror) {
      flags.push("--mirror");
    }

    if (options.pageRequisites) {
      flags.push("--page-requisites");
    }

    if (options.httpsOnly) {
      flags.push("--https-only");
    }

    if (options.followFtp) {
      flags.push("--follow-ftp");
    }

    if (options.contentDisposition) {
      flags.push("--content-disposition");
    }

    if (options.saveDirectory) {
      flags.push(`-P "${options.saveDirectory}"`);
    }

    if (options.backupConverted) {
      flags.push("--backup-converted");
    }

    if (options.deleteAfter) {
      flags.push("--delete-after");
    }

    if (options.tempFile) {
      flags.push("--output-document=.tmp");
    }

    if (options.maxFileSize) {
      flags.push(`--max-filesize=${options.maxFileSize}`);
    }

    if (options.minFileSize) {
      flags.push(`--min-filesize=${options.minFileSize}`);
    }

    if (options.rejectRegex) {
      flags.push(`--reject-regex="${options.rejectRegex}"`);
    }

    if (options.recursionLevel > 0) {
      flags.push(`--level=${options.recursionLevel}`);
    }

    if (options.sameDomain) {
      flags.push("--span-hosts=off");
    }

    if (options.domains) {
      flags.push(`--domains=${options.domains}`);
    }

    if (options.excludeDomains) {
      flags.push(`--exclude-domains=${options.excludeDomains}`);
    }

    if (options.ignoreRobots) {
      flags.push("--execute robots=off");
    }

    if (options.httpsProxy) {
      flags.push(`--https-proxy=${options.httpsProxy}`);
    }

    if (options.noCheckCertificate) {
      flags.push("--no-check-certificate");
    }

    if (options.caCertificate) {
      flags.push(`--ca-certificate=${options.caCertificate}`);
    }

    if (options.connectionLimit) {
      flags.push(`--limit-rate=${options.connectionLimit}`);
    }

    if (options.logOnlyErrors) {
      flags.push("--quiet");
    }

    if (options.debug) {
      flags.push("--debug");
    }

    if (options.timestamping) {
      flags.push("--timestamping");
    }

    const baseCommand = `wget ${flags.join(" ")}`;
    return options.inputFile ? baseCommand : `${baseCommand} "${options.url}"`;
  };

  return { generateCommand };
};
