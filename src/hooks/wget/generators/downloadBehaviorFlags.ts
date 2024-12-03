import { WgetOptions } from "@/types/wget";
import { FILE_TYPE_OPTIONS } from "@/types/wget";

export const generateDownloadBehaviorFlags = (options: WgetOptions): string[] => {
  const flags: string[] = [];
  
  if (options.mirror) {
    flags.push('--mirror');
  } else if (options.recursive) {
    flags.push('-r');
    if (options.maxDepth > 0) {
      flags.push(`--level=${options.maxDepth}`);
    }
  }

  // Handle file type selections
  if (options.fileTypes.length > 0) {
    // Check if all file types are selected
    const allFileTypes = FILE_TYPE_OPTIONS.flatMap(category => category.patterns);
    const isAllTypesSelected = allFileTypes.every(type => options.fileTypes.includes(type));

    if (isAllTypesSelected) {
      flags.push(`--accept='*'`);
    } else {
      // Check for complete categories
      const categories = FILE_TYPE_OPTIONS.map(category => ({
        ...category,
        isComplete: category.patterns.every(ext => options.fileTypes.includes(ext))
      }));

      const completeCategories = categories.filter(cat => cat.isComplete);
      const incompleteTypes = options.fileTypes.filter(type => 
        !completeCategories.some(cat => cat.patterns.includes(type))
      );

      if (completeCategories.length > 0 || incompleteTypes.length > 0) {
        const acceptPatterns = [
          ...completeCategories.map(cat => `*.{${cat.patterns.join(",")}}`),
          ...incompleteTypes.map(type => `*.${type}`)
        ];
        flags.push(`--accept=${acceptPatterns.join(",")}`);
      }
    }
  }

  // Handle exclude file types
  if (options.excludeFileTypes.length > 0) {
    const categories = FILE_TYPE_OPTIONS.map(category => ({
      ...category,
      isComplete: category.patterns.every(ext => options.excludeFileTypes.includes(ext))
    }));

    const completeCategories = categories.filter(cat => cat.isComplete);
    const incompleteTypes = options.excludeFileTypes.filter(type => 
      !completeCategories.some(cat => cat.patterns.includes(type))
    );

    if (completeCategories.length > 0 || incompleteTypes.length > 0) {
      const rejectPatterns = [
        ...completeCategories.map(cat => `*.{${cat.patterns.join(",")}}`),
        ...incompleteTypes.map(type => `*.${type}`)
      ];
      flags.push(`--reject=${rejectPatterns.join(",")}`);
    }
  }

  if (options.pageRequisites) flags.push('--page-requisites');
  if (!options.includeParents) flags.push('--no-parent');
  if (options.waitTime > 0) flags.push(`--wait=${options.waitTime}`);
  if (options.randomWait) flags.push('--random-wait');
  if (options.noClobber) flags.push('--no-clobber');
  if (options.adjustExtension) flags.push('--adjust-extension');
  if (options.continueTransfer) flags.push('--continue');
  if (options.convertLinks) flags.push('--convert-links');
  if (options.spiderMode) flags.push('--spider');
  if (options.pageRequisites) flags.push('--page-requisites');
  if (options.httpsOnly) flags.push('--https-only');
  if (options.followFtp) flags.push('--follow-ftp');
  if (options.contentDisposition) flags.push('--content-disposition');
  if (options.executeCommand) flags.push(`-e ${options.executeCommand}`);
  if (options.ignoreRobots) flags.push('--no-robots');
  
  // Advanced options flags
  if (options.followLinks) flags.push('--follow-links');
  if (options.userAgent) flags.push(`--user-agent="${options.userAgent}"`);
  if (options.limitRate) flags.push(`--limit-rate=${options.limitRate}`);
  if (options.httpsProxy) flags.push(`--https-proxy=${options.httpsProxy}`);
  if (options.backupConverted) flags.push('--backup-converted');
  if (options.deleteAfter) flags.push('--delete-after');
  if (options.tempFile) flags.push('--output-document=-');
  if (options.maxFileSize) flags.push(`--max-filesize=${options.maxFileSize}`);
  if (options.minFileSize) flags.push(`--min-filesize=${options.minFileSize}`);
  if (options.rejectRegex) flags.push(`--reject-regex="${options.rejectRegex}"`);
  if (options.caCertificate) flags.push(`--ca-certificate=${options.caCertificate}`);
  if (options.connectionLimit) flags.push(`--limit-rate=${options.connectionLimit}`);
  if (options.timestamping) flags.push('--timestamping');
  
  return flags;
};