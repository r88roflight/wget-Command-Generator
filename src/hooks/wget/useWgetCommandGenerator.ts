const escapeValue = (value: string) => {
  // Escape special characters and wrap in quotes if contains spaces
  if (!value) return '';
  const needsQuotes = value.includes(' ') || value.includes('\t');
  const escaped = value.replace(/(["'$`\\])/g, '\\$1');
  return needsQuotes ? `"${escaped}"` : escaped;
};

export const useWgetCommandGenerator = () => {
  const generateCommand = (options: WgetOptions) => {
    const flags: string[] = [];
    
    // Helper to add a flag with optional value
    const addFlag = (flag: string, value?: string) => {
      if (value !== undefined && value !== '') {
        flags.push(`${flag}=${escapeValue(value)}`);
      }
    };

    // Helper to add a boolean flag
    const addBooleanFlag = (flag: string, value: boolean) => {
      if (value) flags.push(flag);
    };

    // URL validation
    if (!options.url && !options.inputFile) return "wget";
    
    // Input/Output flags
    if (options.inputFile) addFlag('-i', options.inputFile);
    if (options.directoryPrefix) addFlag('-P', options.directoryPrefix);
    if (options.outputDocument) addFlag('-O', options.outputDocument);
    if (options.appendOutput) addFlag('-a', options.appendOutput);

    // Directory options
    if (options.cutDirs > 0) addFlag('--cut-dirs', options.cutDirs.toString());
    addBooleanFlag('-nd', options.noDirectories === 'true');

    // Authentication
    if (options.basicUser) addFlag('--user', options.basicUser);
    if (options.basicPassword) addFlag('--password', options.basicPassword);
    
    // HTTP options
    if (options.httpUser) addFlag('--http-user', options.httpUser);
    if (options.httpPassword) addFlag('--http-password', options.httpPassword);
    if (options.postData) addFlag('--post-data', options.postData);

    // FTP options
    if (options.ftpUser) addFlag('--ftp-user', options.ftpUser);
    if (options.ftpPassword) addFlag('--ftp-password', options.ftpPassword);

    // Recursive and depth options
    addBooleanFlag('-r', options.recursive);
    if (options.recursive && options.maxDepth > 0) {
      addFlag('--level', options.maxDepth.toString());
    }

    // Parent directory handling
    if (!options.includeParents) flags.push('--no-parent');

    // Wait times
    if (options.waitTime > 0) addFlag('--wait', options.waitTime.toString());
    addBooleanFlag('--random-wait', options.randomWait);

    // File type handling
    if (options.fileTypes?.length > 0) {
      addFlag('--accept', options.fileTypes.join(','));
    }
    if (options.excludeFileTypes?.length > 0) {
      addFlag('--reject', options.excludeFileTypes.join(','));
    }

    // Various boolean flags
    addBooleanFlag('--no-clobber', options.noClobber);
    addBooleanFlag('--adjust-extension', options.adjustExtension);
    addBooleanFlag('--continue', options.continueTransfer);
    addBooleanFlag('-k', options.convertLinks);
    addBooleanFlag('--spider', options.spiderMode);
    addBooleanFlag('--mirror', options.mirror);
    addBooleanFlag('--page-requisites', options.pageRequisites);
    addBooleanFlag('--https-only', options.httpsOnly);
    addBooleanFlag('--follow-ftp', options.followFtp);
    addBooleanFlag('--content-disposition', options.contentDisposition);

    // Rate limiting and timeouts
    if (options.limitRate) addFlag('--limit-rate', options.limitRate);
    if (options.timeout > 0) addFlag('--timeout', options.timeout.toString());
    if (options.retries > 0) addFlag('--tries', options.retries.toString());

    // New options
    addBooleanFlag('--no-check-certificate', options.noCheckCert);
    addBooleanFlag('--retry-connrefused', options.retryConnRefused);
    addBooleanFlag('--progress=bar', options.progressBar);
    if (options.quota) addFlag('--quota', options.quota);
    if (options.dnsTimeout > 0) addFlag('--dns-timeout', options.dnsTimeout.toString());
    addBooleanFlag('--dns-cache', options.dnsCache);
    addBooleanFlag('--inet4-only', options.inet4Only);
    addBooleanFlag('--inet6-only', options.inet6Only);
    addBooleanFlag('--cache', options.useCache);
    addBooleanFlag('--no-cache', options.noCache);

    // Build final command
    const baseCommand = `wget ${flags.join(" ")}`;
    return options.inputFile ? baseCommand : `${baseCommand} ${escapeValue(options.url)}`;
  };

  return { generateCommand };
};