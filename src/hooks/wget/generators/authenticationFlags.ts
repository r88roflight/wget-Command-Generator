import { WgetOptions } from "@/types/wget";
import { escapeValue } from "../utils/escapeValue";

export const generateAuthenticationFlags = (options: WgetOptions): string[] => {
  const flags: string[] = [];

  if (options.httpUser) flags.push(`--http-user=${escapeValue(options.httpUser)}`);
  if (options.httpPassword) flags.push(`--http-password=${escapeValue(options.httpPassword)}`);
  if (options.ftpUser) flags.push(`--ftp-user=${escapeValue(options.ftpUser)}`);
  if (options.ftpPassword) flags.push(`--ftp-password=${escapeValue(options.ftpPassword)}`);
  if (options.noCheckCertificate) flags.push('--no-check-certificate');
  if (options.caCertificate) flags.push(`--ca-certificate=${escapeValue(options.caCertificate)}`);

  return flags;
};