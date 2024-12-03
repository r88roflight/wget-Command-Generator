export const escapeValue = (value: string) => {
  if (!value) return '';
  const needsQuotes = value.includes(' ') || value.includes('\t');
  const escaped = value.replace(/(["'$`\\])/g, '\\$1');
  return needsQuotes ? `"${escaped}"` : escaped;
};