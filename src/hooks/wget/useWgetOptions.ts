import { useState } from "react";
import { WgetOptions } from "@/types/wget";

const defaultOptions: WgetOptions = {
  url: "",
  recursive: false,
  maxDepth: 0,
  waitTime: 0,
  followLinks: false,
  includePattern: "",
  excludePattern: "",
  saveDirectory: "",
  fileTypes: [],
  excludeFileTypes: [],
  includeParents: true, // Changed to true so --no-parent won't show
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
  continueDownload: false,
  noHostDirs: false,
  cutDirs: 0,
  noClobber: false,
  debug: false,
  convertLinks: false,
  adjustExtension: false,
  proxyEnabled: false,
  proxyUser: "",
  proxyPass: "",
  timestamping: false,
  randomWait: false,
  httpsOnly: false,
  ignoreRobots: false,
  backupConverted: false,
  deleteAfter: false,
  tempFile: false,
  maxFileSize: "",
  minFileSize: "",
  rejectRegex: "",
  recursionLevel: 0,
  sameDomain: false,
  domains: "",
  excludeDomains: "",
  httpsProxy: "",
  noCheckCertificate: false, // Changed to false so --no-check-certificate won't show
  caCertificate: "",
  parallelDownloads: 1,
  connectionLimit: "",
  logOnlyErrors: false,
  followFtp: false,
  contentDisposition: false,
  continueTransfer: false,
  mirror: false,
  spiderMode: false,
  pageRequisites: false,
  verifySSL: false,
  inputFile: "",
  directoryPrefix: "",
  outputDocument: "", // This will store the "Save As" filename
  appendOutput: "",
  noDirectories: "false",
  httpUser: "",
  httpPassword: "",
  postData: "",
  ftpUser: "",
  ftpPassword: "",
  executeCommand: "",
  basicUser: "",
  basicPassword: "",
  noCheckCert: false,
  retryConnRefused: false,
  progressBar: false,
  quota: "",
  dnsTimeout: 0,
  dnsCache: false,
  inet4Only: false,
  inet6Only: false,
  useCache: false,
  noCache: false
};

export const useWgetOptions = () => {
  const [options, setOptions] = useState<WgetOptions>(defaultOptions);
  
  const resetOptions = () => {
    setOptions(defaultOptions);
  };

  return { options, setOptions, resetOptions };
};