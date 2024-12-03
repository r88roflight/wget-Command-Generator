import { WgetOptions } from "@/types/wget";

export const generateDebuggingFlags = (options: WgetOptions): string[] => {
  const flags: string[] = [];
  
  if (options.logOnlyErrors) flags.push('--quiet');
  if (options.debug) flags.push('--debug');
  if (options.noCheckCertificate) flags.push('--no-check-certificate');
  if (options.noCheckCert) flags.push('--no-check-certificate');
  if (options.retryConnRefused) flags.push('--retry-connrefused');
  if (options.progressBar) flags.push('--progress=bar');
  if (options.quota) flags.push(`--quota=${options.quota}`);
  if (options.dnsTimeout > 0) flags.push(`--dns-timeout=${options.dnsTimeout}`);
  if (options.dnsCache) flags.push('--dns-cache=yes');
  if (options.inet4Only) flags.push('--inet4-only');
  if (options.inet6Only) flags.push('--inet6-only');
  if (options.useCache) flags.push('--cache=yes');
  if (options.noCache) flags.push('--no-cache');
  
  return flags;
};