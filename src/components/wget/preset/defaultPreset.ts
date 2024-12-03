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
    "--random-wait",
    "-P ~/Downloads/ExampleSite"
  ],
  options: {
    url: "",
    saveDirectory: "~/Downloads/ExampleSite",
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