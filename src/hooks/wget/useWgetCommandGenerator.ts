import { WgetOptions } from "@/types/wget";
import { escapeValue } from "./utils/escapeValue";
import { generateAuthenticationFlags } from "./generators/authenticationFlags";
import { generateInputOutputFlags } from "./generators/inputOutputFlags";
import { generateDownloadBehaviorFlags } from "./generators/downloadBehaviorFlags";
import { generateDebuggingFlags } from "./generators/debuggingFlags";

export const useWgetCommandGenerator = () => {
  const generateCommand = (options: WgetOptions) => {
    // Return base command if no URL or input file
    if (!options.url && !options.inputFile) return "wget";
    
    const flags: string[] = [
      ...generateAuthenticationFlags(options),
      ...generateInputOutputFlags(options),
      ...generateDownloadBehaviorFlags(options),
      ...generateDebuggingFlags(options),
    ];

    // Build final command
    const baseCommand = `wget ${flags.join(" ")}`;
    return options.inputFile ? baseCommand : `${baseCommand} ${escapeValue(options.url)}`;
  };

  return { generateCommand };
};