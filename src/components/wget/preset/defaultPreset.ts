import { Preset } from "../types/preset";

export const defaultMirrorPreset: Preset = {
  name: "Mirror Website Locally",
  description: "Downloads a complete copy of a website for offline viewing",
  commands: [
    "--recursive",
    "--no-parent",
    "--convert-links",
    "--page-requisites"
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
    adjustExtension: false,
    continueTransfer: false,
    ignoreRobots: false
  }
};