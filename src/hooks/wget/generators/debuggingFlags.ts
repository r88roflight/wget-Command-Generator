import { WgetOptions } from "@/types/wget";

export const generateDebuggingFlags = (options: WgetOptions): string[] => {
  const flags: string[] = [];

  if (options.debug) flags.push('--debug');
  if (options.verbose) flags.push('--verbose');
  if (options.logOnlyErrors) flags.push('--quiet');
  if (options.progressBar) flags.push('--show-progress');
  if (options.retryConnRefused) flags.push('--retry-connrefused');
  if (options.retries > 0) flags.push(`--tries=${options.retries}`);
  if (options.timeout > 0) flags.push(`--timeout=${options.timeout}`);
  if (options.dnsTimeout > 0) flags.push(`--dns-timeout=${options.dnsTimeout}`);
  if (options.dnsCache) flags.push('--dns-cache=yes');
  if (options.inet4Only) flags.push('--inet4-only');
  if (options.inet6Only) flags.push('--inet6-only');
  if (options.useCache) flags.push('--cache=yes');
  if (options.noCache) flags.push('--no-cache');
  if (options.background) flags.push('--background');

  return flags;
};