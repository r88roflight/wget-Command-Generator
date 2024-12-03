import { Preset } from "../types/preset";

export const defaultMirrorPreset: Preset = {
  name: "Mirror Website Locally",
  description: "Downloads a complete copy of a website for offline viewing",
  commands: [
    "--mirror",
    "--convert-links",
    "--adjust-extension",
    "--page-requisites",
    "--no-parent",
    "--limit-rate=1m",
    "--wait=1",
    "--random-wait"
  ],
  options: {
    url: "",
    saveDirectory: "",
    recursive: true,
    convertLinks: true,
    pageRequisites: true,
    includeParents: false,
    followLinks: false,
    followFtp: false,
    contentDisposition: false,
    adjustExtension: true,
    continueTransfer: false,
    ignoreRobots: false,
    mirror: true,
    waitTime: 1,
    randomWait: true,
    limitRate: "1m"
  }
};

export const allPresets: Preset[] = [
  defaultMirrorPreset,
  {
    name: "Download a File",
    description: "Downloads a single file from a URL",
    commands: [
      "--no-verbose",
      "--show-progress",
      "--content-disposition"
    ],
    options: {
      url: "",
      saveDirectory: "",
      outputDocument: "",
      contentDisposition: true,
      verbose: false
    }
  },
  {
    name: "Download Multiple Files",
    description: "Downloads multiple files from a list",
    commands: [
      "--input-file=",
      "--continue",
      "--retry-connrefused",
      "--no-clobber"
    ],
    options: {
      inputFile: "",
      continueTransfer: true,
      retryConnRefused: true,
      noClobber: true
    }
  },
  {
    name: "Resume a Download",
    description: "Continues a partially downloaded file",
    commands: [
      "--continue",
      "--retry-connrefused",
      "--tries=0",
      "--timeout=60"
    ],
    options: {
      continueTransfer: true,
      retryConnRefused: true,
      retries: 0,
      timeout: 60
    }
  },
  {
    name: "Download Files in Background",
    description: "Downloads files in the background",
    commands: [
      "--background",
      "--no-verbose",
      "--continue"
    ],
    options: {
      background: true,
      verbose: false,
      continueTransfer: true
    }
  },
  {
    name: "Limit the Download Speed",
    description: "Restricts bandwidth usage",
    commands: [
      "--limit-rate=100k",
      "--wait=1",
      "--random-wait"
    ],
    options: {
      limitRate: "100k",
      waitTime: 1,
      randomWait: true
    }
  },
  {
    name: "Download to Specific Directory",
    description: "Saves files to a specified location",
    commands: [
      "--directory-prefix=",
      "--no-host-directories",
      "--cut-dirs=0"
    ],
    options: {
      directoryPrefix: "",
      saveDirectory: "",
      noHostDirs: true,
      cutDirs: 0
    }
  },
  {
    name: "Download HTTP Protected Files",
    description: "Downloads files requiring HTTP authentication",
    commands: [
      "--http-user=",
      "--http-password=",
      "--auth-no-challenge"
    ],
    options: {
      httpUser: "",
      httpPassword: "",
      executeCommand: "auth-no-challenge"
    }
  },
  {
    name: "Download FTP Protected Files",
    description: "Downloads files requiring FTP authentication",
    commands: [
      "--ftp-user=",
      "--ftp-password=",
      "--no-remove-listing"
    ],
    options: {
      ftpUser: "",
      ftpPassword: ""
    }
  },
  {
    name: "Download URL Playlist",
    description: "Downloads files from a list of URLs",
    commands: [
      "--input-file=",
      "--continue",
      "--no-clobber",
      "--wait=1"
    ],
    options: {
      inputFile: "",
      continueTransfer: true,
      noClobber: true,
      waitTime: 1
    }
  },
  {
    name: "Backup Website Public Files",
    description: "Downloads all public files from a website",
    commands: [
      "--recursive",
      "--no-parent",
      "--reject=index.html*",
      "--level=1"
    ],
    options: {
      recursive: true,
      includeParents: false,
      rejectRegex: "index.html*",
      maxDepth: 1
    }
  },
  {
    name: "Download Website Content",
    description: "Downloads website content with proper settings",
    commands: [
      "--recursive",
      "--page-requisites",
      "--html-extension",
      "--convert-links",
      "--restrict-file-names=windows",
      "--domains=",
      "--no-parent"
    ],
    options: {
      recursive: true,
      pageRequisites: true,
      adjustExtension: true,
      convertLinks: true,
      includeParents: false
    }
  },
  {
    name: "Download All Images",
    description: "Downloads all image files from a website",
    commands: [
      "--recursive",
      "--no-parent",
      "--accept=jpg,jpeg,png,gif,bmp,webp,svg",
      "--level=1",
      "--no-directories"
    ],
    options: {
      recursive: true,
      includeParents: false,
      maxDepth: 1,
      fileTypes: ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"]
    }
  },
  {
    name: "Download All Audio",
    description: "Downloads all audio files from a website",
    commands: [
      "--recursive",
      "--no-parent",
      "--accept=mp3,wav,ogg,m4a,flac",
      "--level=1",
      "--no-directories"
    ],
    options: {
      recursive: true,
      includeParents: false,
      maxDepth: 1,
      fileTypes: ["mp3", "wav", "ogg", "m4a", "flac"]
    }
  },
  {
    name: "Download All Videos",
    description: "Downloads all video files from a website",
    commands: [
      "--recursive",
      "--no-parent",
      "--accept=mp4,webm,avi,mov,mkv",
      "--level=1",
      "--no-directories"
    ],
    options: {
      recursive: true,
      includeParents: false,
      maxDepth: 1,
      fileTypes: ["mp4", "webm", "avi", "mov", "mkv"]
    }
  }
];