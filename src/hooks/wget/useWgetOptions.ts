import { useState } from "react";
import { WgetOptions } from "@/types/wget";

const defaultOptions: WgetOptions = {
  url: "",
  recursive: true,
  maxDepth: 5,
  waitTime: 0,
  followLinks: true,
  includePattern: "",
  excludePattern: "",
  saveDirectory: "",
  fileTypes: [],
  excludeFileTypes: [],
  includeParents: false, // Removed from default preset
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
  convertLinks: true,
  adjustExtension: true,
  proxyEnabled: false,
  proxyUser: "",
  proxyPass: "",
  timestamping: true,
  randomWait: false,
  httpsOnly: false,
  ignoreRobots: false,
  backupConverted: false,
  deleteAfter: false,
  tempFile: false,
  maxFileSize: "",
  minFileSize: "",
  rejectRegex: "",
  recursionLevel: 5,
  sameDomain: false,
  domains: "",
  excludeDomains: "",
  httpsProxy: "",
  noCheckCertificate: false,
  caCertificate: "",
  parallelDownloads: 1,
  connectionLimit: "",
  logOnlyErrors: false,
  followFtp: true,
  contentDisposition: true,
  continueTransfer: true,
  mirror: true,
  spiderMode: false,
  pageRequisites: true,
  verifySSL: true,
};

export const useWgetOptions = () => {
  const [options, setOptions] = useState<WgetOptions>(defaultOptions);
  
  const resetOptions = () => {
    setOptions(defaultOptions);
  };

  return { options, setOptions, resetOptions };
};