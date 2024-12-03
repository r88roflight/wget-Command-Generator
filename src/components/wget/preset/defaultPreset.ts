import { Preset } from "../types/preset";

export const defaultMirrorPreset: Preset = {
  name: "Mirror Website Locally",
  description: "Downloads a complete copy of a website for offline viewing",
  commands: [],
  options: {
    url: "",
    saveDirectory: "",
    recursive: false,
    level: 1,
    convertLinks: false,
    pageRequisites: false,
    spanHosts: false,
    includeDirectories: "",
    excludeDirectories: "",
    followFtp: false,
    waitRetry: "",
    limitRate: "",
    tries: "",
    userAgent: "",
    noParent: false,
    rejectFileTypes: "",
    acceptFileTypes: "",
    debug: false,
    quiet: false,
    showProgress: false,
    timestamping: false,
    mirror: false,
    infiniteRecursion: false,
    backupConverted: false,
    strictComments: false
  }
};