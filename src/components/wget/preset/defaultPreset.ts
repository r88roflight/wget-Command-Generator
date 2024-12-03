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
    commands: [],
    options: {
      url: "",
      saveDirectory: "",
      outputDocument: ""
    }
  },
  {
    name: "Download Multiple Files",
    description: "Downloads multiple files from a list",
    commands: [
      "--input-file=",
      "--continue",
      "--retry-connrefused"
    ],
    options: {
      inputFile: "",
      continueTransfer: true,
      retryConnRefused: true
    }
  },
  {
    name: "Resume a Download",
    description: "Continues a partially downloaded file",
    commands: [
      "--continue",
      "--retry-connrefused"
    ],
    options: {
      continueTransfer: true,
      retryConnRefused: true
    }
  },
  {
    name: "Download Files in Background",
    description: "Downloads files in the background",
    commands: [
      "--background",
      "--no-verbose"
    ],
    options: {
      background: true,
      verbose: false
    }
  },
  {
    name: "Limit the Download Speed",
    description: "Restricts bandwidth usage",
    commands: [
      "--limit-rate=100k"
    ],
    options: {
      limitRate: "100k"
    }
  },
  {
    name: "Download to Specific Directory",
    description: "Saves files to a specified location",
    commands: [
      "--directory-prefix="
    ],
    options: {
      directoryPrefix: "",
      saveDirectory: ""
    }
  },
  {
    name: "Download HTTP Protected Files",
    description: "Downloads files requiring HTTP authentication",
    commands: [
      "--http-user=",
      "--http-password="
    ],
    options: {
      httpUser: "",
      httpPassword: ""
    }
  },
  {
    name: "Download FTP Protected Files",
    description: "Downloads files requiring FTP authentication",
    commands: [
      "--ftp-user=",
      "--ftp-password="
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
      "--continue"
    ],
    options: {
      inputFile: "",
      continueTransfer: true
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
  }
];