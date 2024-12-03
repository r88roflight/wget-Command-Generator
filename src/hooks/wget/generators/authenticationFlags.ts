import { WgetOptions } from "@/types/wget";
import { escapeValue } from "../utils/escapeValue";

export const generateAuthenticationFlags = (options: WgetOptions): string[] => {
  const flags: string[] = [];
  
  if (options.basicUser) flags.push(`--user=${escapeValue(options.basicUser)}`);
  if (options.basicPassword) flags.push(`--password=${escapeValue(options.basicPassword)}`);
  if (options.httpUser) flags.push(`--http-user=${escapeValue(options.httpUser)}`);
  if (options.httpPassword) flags.push(`--http-password=${escapeValue(options.httpPassword)}`);
  if (options.ftpUser) flags.push(`--ftp-user=${escapeValue(options.ftpUser)}`);
  if (options.ftpPassword) flags.push(`--ftp-password=${escapeValue(options.ftpPassword)}`);
  
  return flags;
};