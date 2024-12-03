import { WgetOptions } from "@/types/wget";
import { escapeValue } from "../utils/escapeValue";

export const generateInputOutputFlags = (options: WgetOptions): string[] => {
  const flags: string[] = [];
  
  if (options.inputFile) flags.push(`-i ${escapeValue(options.inputFile)}`);
  if (options.directoryPrefix) flags.push(`-P ${escapeValue(options.directoryPrefix)}`);
  if (options.outputDocument) flags.push(`-O ${escapeValue(options.outputDocument)}`);
  if (options.appendOutput) flags.push(`-a ${escapeValue(options.appendOutput)}`);
  if (options.cutDirs > 0) flags.push(`--cut-dirs=${options.cutDirs}`);
  if (options.noDirectories === 'true') flags.push('-nd');
  
  return flags;
};