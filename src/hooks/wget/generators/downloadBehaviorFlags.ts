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
      // Group by categories
      const selectedByCategory = FILE_TYPE_OPTIONS.map(category => ({
        ...category,
        isComplete: category.patterns.every(ext => options.fileTypes.includes(ext)),
        selectedPatterns: category.patterns.filter(ext => options.fileTypes.includes(ext))
      }));

      const acceptPatterns: string[] = [];

      selectedByCategory.forEach(category => {
        if (category.isComplete && category.selectedPatterns.length > 0) {
          // If all extensions in a category are selected, use the grouped format
          acceptPatterns.push(`*.{${category.selectedPatterns.join(',')}}`);
        } else if (category.selectedPatterns.length > 0) {
          // If only some extensions are selected, list them individually
          category.selectedPatterns.forEach(ext => {
            acceptPatterns.push(`*.${ext}`);
          });
        }
      });

      if (acceptPatterns.length > 0) {
        flags.push(`--accept='${acceptPatterns.join(',')}'`);
      }
    }
  }

  // Handle exclude file types similarly
  if (options.excludeFileTypes.length > 0) {
    const selectedByCategory = FILE_TYPE_OPTIONS.map(category => ({
      ...category,
      isComplete: category.patterns.every(ext => options.excludeFileTypes.includes(ext)),
      selectedPatterns: category.patterns.filter(ext => options.excludeFileTypes.includes(ext))
    }));

    const rejectPatterns: string[] = [];

    selectedByCategory.forEach(category => {
      if (category.isComplete && category.selectedPatterns.length > 0) {
        rejectPatterns.push(`*.{${category.selectedPatterns.join(',')}}`);
      } else if (category.selectedPatterns.length > 0) {
        category.selectedPatterns.forEach(ext => {
          rejectPatterns.push(`*.${ext}`);
        });
      }
    });

    if (rejectPatterns.length > 0) {
      flags.push(`--reject='${rejectPatterns.join(',')}'`);
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
