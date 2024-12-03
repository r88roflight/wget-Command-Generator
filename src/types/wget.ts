export interface WgetOptions {
  url: string;
  recursive: boolean;
  maxDepth: number;
  waitTime: number;
  followLinks: boolean;
  includePattern: string;
  excludePattern: string;
  saveDirectory: string;
  fileTypes: string[];
  excludeFileTypes: string[];
  includeParents: boolean;
  userAgent: string;
  limitRate: string;
  outputFile: string;
  logFile: string;
  username: string;
  password: string;
  cookieFile: string;
  saveCookies: boolean;
  retries: number;
  timeout: number;
  continueDownload: boolean;
  noHostDirs: boolean;
  cutDirs: number;
  noClobber: boolean;
  debug: boolean;
  convertLinks: boolean;
  adjustExtension: boolean;
  proxyEnabled: boolean;
  proxyUser: string;
  proxyPass: string;
  timestamping: boolean;
  randomWait: boolean;
  httpsOnly: boolean;
  ignoreRobots: boolean;
  backupConverted: boolean;
  deleteAfter: boolean;
  verifySSL: boolean;
  spiderMode: boolean;
  mirror: boolean;
  pageRequisites: boolean;
  executeCommand: string;
  domains: string;
  excludeDomains: string;
  noParent: boolean;
  relativePaths: boolean;
  backupOriginal: boolean;
  strictComments: boolean;
  infiniteRecursion: boolean;
  dontRemoveListings: boolean;
  quotaCommand: string;
  bindAddress: string;
  cacheDir: string;
  noCache: boolean;
  noCheckCertificate: boolean;
  noVerbose: boolean;
  followFtp: boolean;
  contentDisposition: boolean;
}

export type FileTypeOption = {
  label: string;
  value: string;
  patterns: string[];
};

export const FILE_TYPE_OPTIONS: FileTypeOption[] = [
  {
    label: "Text Files",
    value: "text",
    patterns: ["*.txt", "*.html", "*.htm", "*.xml", "*.json", "*.md", "*.csv"]
  },
  {
    label: "Images",
    value: "images",
    patterns: ["*.jpg", "*.jpeg", "*.png", "*.gif", "*.bmp", "*.webp", "*.svg"]
  },
  {
    label: "Videos",
    value: "videos",
    patterns: ["*.mp4", "*.webm", "*.avi", "*.mov", "*.mkv"]
  },
  {
    label: "Audio",
    value: "audio",
    patterns: ["*.mp3", "*.wav", "*.ogg", "*.m4a", "*.flac"]
  },
  {
    label: "Documents",
    value: "documents",
    patterns: ["*.pdf", "*.doc", "*.docx", "*.xls", "*.xlsx", "*.ppt", "*.pptx"]
  }
];
