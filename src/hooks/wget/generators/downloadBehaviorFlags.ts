import { WgetOptions } from "@/types/wget";

export const generateDownloadBehaviorFlags = (options: WgetOptions): string[] => {
  const flags: string[] = [];
  
  if (options.recursive) flags.push('-r');
  if (options.recursive && options.maxDepth > 0) {
    flags.push(`--level=${options.maxDepth}`);
  }
  if (!options.includeParents) flags.push('--no-parent');
  if (options.waitTime > 0) flags.push(`--wait=${options.waitTime}`);
  if (options.randomWait) flags.push('--random-wait');
  if (options.noClobber) flags.push('--no-clobber');
  if (options.adjustExtension) flags.push('--adjust-extension');
  if (options.continueTransfer) flags.push('--continue');
  if (options.convertLinks) flags.push('-k');
  if (options.spiderMode) flags.push('--spider');
  if (options.mirror) flags.push('--mirror');
  if (options.pageRequisites) flags.push('--page-requisites');
  if (options.httpsOnly) flags.push('--https-only');
  if (options.followFtp) flags.push('--follow-ftp');
  if (options.contentDisposition) flags.push('--content-disposition');
  
  return flags;
};