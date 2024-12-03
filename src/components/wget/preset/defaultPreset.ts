import { Preset } from "../types/preset";

export const defaultMirrorPreset: Preset = {
  name: "Mirror Website Locally",
  description: "Optimized settings for creating a complete local copy of a website",
  commands: [
    "Mirror Website",
    "Follow Links",
    "Convert Links",
    "Adjust Extensions",
    "No Clobber",
    "Follow FTP",
    "Content Disposition",
    "Continue Transfer",
    "Random Wait",
    "Wait 5 Seconds"
  ],
  options: {
    recursive: true,
    noClobber: true,
    convertLinks: true,
    adjustExtension: true,
    mirror: true,
    followLinks: true,
    spiderMode: false,
    timestamping: true,
    continueTransfer: true,
    followFtp: true,
    contentDisposition: true,
    debug: false,
    logOnlyErrors: false,
    verifySSL: true,
    waitTime: 5,
    randomWait: true,
    maxDepth: 0
  },
};