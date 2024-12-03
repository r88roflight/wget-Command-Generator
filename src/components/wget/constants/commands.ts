export const AVAILABLE_COMMANDS = [
  "Mirror Website",
  "Convert Links",
  "Adjust Extension",
  "Page Requisites",
  "No Parent",
  "Limit Rate",
  "Wait",
  "Random Wait",
  "Follow Links",
  "Follow FTP",
  "Content Disposition",
  "Continue Transfer",
  "Spider Mode",
  "Use Timestamping",
  "Debug Mode",
  "HTTPS Only",
  "Ignore Robots",
  "Backup Converted",
  "Delete After",
  "Same Domain Only",
  "Log Only Errors",
  "Verify SSL",
  "No Verbose",
  "Show Progress",
  "Retry Connection Refused",
  "No Clobber",
  "Input File",
  "Tries",
  "Timeout",
  "Background",
  "Directory Prefix",
  "No Host Directories",
  "Skip Directory Levels"
];

export const commandToFlag: { [key: string]: string } = {
  "Mirror Website": "--mirror",
  "Convert Links": "--convert-links",
  "Adjust Extension": "--adjust-extension",
  "Page Requisites": "--page-requisites",
  "No Parent": "--no-parent",
  "Limit Rate": "--limit-rate",
  "Wait": "--wait",
  "Random Wait": "--random-wait",
  "Follow Links": "--follow-links",
  "Follow FTP": "--follow-ftp",
  "Content Disposition": "--content-disposition",
  "Continue Transfer": "--continue",
  "Spider Mode": "--spider",
  "Use Timestamping": "--timestamping",
  "Debug Mode": "--debug",
  "HTTPS Only": "--https-only",
  "Ignore Robots": "--ignore-robots",
  "Backup Converted": "--backup-converted",
  "Delete After": "--delete-after",
  "Same Domain Only": "--span-hosts",
  "Log Only Errors": "--quiet",
  "Verify SSL": "--secure-protocol",
  "No Verbose": "--no-verbose",
  "Show Progress": "--show-progress",
  "Retry Connection Refused": "--retry-connrefused",
  "No Clobber": "--no-clobber",
  "Input File": "--input-file",
  "Tries": "--tries",
  "Timeout": "--timeout",
  "Background": "--background",
  "Directory Prefix": "--directory-prefix",
  "No Host Directories": "--no-host-directories",
  "Skip Directory Levels": "--cut-dirs"
};

export const flagToCommand = Object.entries(commandToFlag).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {} as { [key: string]: string });