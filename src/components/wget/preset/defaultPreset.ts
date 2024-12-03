import { Preset } from "../types/preset";

export const defaultMirrorPreset: Preset = {
  name: "Mirror Website Locally",
  description: "Downloads a complete copy of a website for offline viewing",
  commands: ["--no-parent"],
  options: {
    url: "",
    saveDirectory: "",
    recursive: false,
    convertLinks: false,
    pageRequisites: false,
    includeParents: false,
    followLinks: false,
    followFtp: false,
    contentDisposition: false,
    adjustExtension: false,
    continueTransfer: false,
    ignoreRobots: false
  }
};