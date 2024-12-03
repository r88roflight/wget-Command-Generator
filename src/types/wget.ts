export interface WgetOptions {
  url: string;
  recursive: boolean;
  maxDepth: number;
  waitTime: number;
  followLinks: boolean;
  includePattern: string;
  excludePattern: string;
}