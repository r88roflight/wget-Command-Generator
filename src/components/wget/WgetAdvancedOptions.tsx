import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { WgetOptions } from "@/types/wget";
import { Card } from "@/components/ui/card";
import { WgetSpiderOptions } from "./WgetSpiderOptions";
import { WgetMirrorOptions } from "./WgetMirrorOptions";
import { WgetDownloadBehavior } from "./WgetDownloadBehavior";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetAdvancedOptions = ({ options, setOptions }: Props) => {
  return (
    <Card className="p-6 bg-black border border-white/20 space-y-6">
      <h2 className="text-xl font-semibold text-white mb-4">Advanced Options</h2>
      
      {/* Network Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Network Settings</h3>
        
        <div className="space-y-2">
          <Label className="text-white">User Agent</Label>
          <Input
            value={options.userAgent}
            onChange={(e) => setOptions({ ...options, userAgent: e.target.value })}
            placeholder="e.g., Mozilla/5.0..."
            className="bg-black border-white/20 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Download Speed Limit</Label>
          <Input
            value={options.limitRate}
            onChange={(e) => setOptions({ ...options, limitRate: e.target.value })}
            placeholder="e.g., 200k"
            className="bg-black border-white/20 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Wait Time (seconds)</Label>
          <Input
            type="text"
            value={options.waitTime || ""}
            onChange={(e) => {
              const value = e.target.value === "" ? 0 : parseInt(e.target.value);
              setOptions({ ...options, waitTime: value });
            }}
            placeholder="e.g., 1"
            className="bg-black border-white/20 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">HTTPS Proxy</Label>
          <Input
            value={options.httpsProxy}
            onChange={(e) => setOptions({ ...options, httpsProxy: e.target.value })}
            placeholder="e.g., http://proxy:8080"
            className="bg-black border-white/20 text-white"
          />
        </div>
      </div>

      {/* File Handling */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">File Handling</h3>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">Backup Converted Files</Label>
            <p className="text-sm text-zinc-400">Create .bak files before converting</p>
          </div>
          <Switch
            checked={options.backupConverted}
            onCheckedChange={(checked) => setOptions({ ...options, backupConverted: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">Delete After Download</Label>
            <p className="text-sm text-zinc-400">Remove files after downloading</p>
          </div>
          <Switch
            checked={options.deleteAfter}
            onCheckedChange={(checked) => setOptions({ ...options, deleteAfter: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">Use Temporary Files</Label>
            <p className="text-sm text-zinc-400">Save partial downloads with .tmp extension</p>
          </div>
          <Switch
            checked={options.tempFile}
            onCheckedChange={(checked) => setOptions({ ...options, tempFile: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>
      </div>

      {/* File Filters */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">File Filters</h3>
        
        <div className="space-y-2">
          <Label className="text-white">Maximum File Size</Label>
          <Input
            value={options.maxFileSize}
            onChange={(e) => setOptions({ ...options, maxFileSize: e.target.value })}
            placeholder="e.g., 1M"
            className="bg-black border-white/20 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Minimum File Size</Label>
          <Input
            value={options.minFileSize}
            onChange={(e) => setOptions({ ...options, minFileSize: e.target.value })}
            placeholder="e.g., 1K"
            className="bg-black border-white/20 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Reject Pattern (regex)</Label>
          <Input
            value={options.rejectRegex}
            onChange={(e) => setOptions({ ...options, rejectRegex: e.target.value })}
            placeholder="e.g., \.tmp$"
            className="bg-black border-white/20 text-white"
          />
        </div>
      </div>

      {/* Recursion and Mirroring */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Recursion and Mirroring</h3>
        
        <div className="space-y-2">
          <Label className="text-white">Recursion Level</Label>
          <Input
            type="number"
            value={options.recursionLevel || ""}
            onChange={(e) => setOptions({ ...options, recursionLevel: parseInt(e.target.value) || 0 })}
            placeholder="e.g., 5"
            className="bg-black border-white/20 text-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">Same Domain Only</Label>
            <p className="text-sm text-zinc-400">Restrict to current domain</p>
          </div>
          <Switch
            checked={options.sameDomain}
            onCheckedChange={(checked) => setOptions({ ...options, sameDomain: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Include Domains</Label>
          <Input
            value={options.domains}
            onChange={(e) => setOptions({ ...options, domains: e.target.value })}
            placeholder="e.g., domain1.com,domain2.com"
            className="bg-black border-white/20 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Exclude Domains</Label>
          <Input
            value={options.excludeDomains}
            onChange={(e) => setOptions({ ...options, excludeDomains: e.target.value })}
            placeholder="e.g., ads.com,tracking.com"
            className="bg-black border-white/20 text-white"
          />
        </div>
      </div>

      {/* Security and Authentication */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Security and Authentication</h3>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">Ignore Robots.txt</Label>
            <p className="text-sm text-zinc-400">Bypass robots.txt restrictions</p>
          </div>
          <Switch
            checked={options.ignoreRobots}
            onCheckedChange={(checked) => setOptions({ ...options, ignoreRobots: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">Skip Certificate Check</Label>
            <p className="text-sm text-zinc-400">Disable HTTPS certificate validation</p>
          </div>
          <Switch
            checked={options.noCheckCertificate}
            onCheckedChange={(checked) => setOptions({ ...options, noCheckCertificate: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">CA Certificate</Label>
          <Input
            value={options.caCertificate}
            onChange={(e) => setOptions({ ...options, caCertificate: e.target.value })}
            placeholder="Path to CA certificate file"
            className="bg-black border-white/20 text-white"
          />
        </div>
      </div>

      {/* Performance Tuning */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Performance Tuning</h3>

        <div className="space-y-2">
          <Label className="text-white">Connection Limit</Label>
          <Input
            value={options.connectionLimit}
            onChange={(e) => setOptions({ ...options, connectionLimit: e.target.value })}
            placeholder="e.g., 10"
            className="bg-black border-white/20 text-white"
          />
        </div>
      </div>

      {/* Debugging */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Debugging</h3>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">Log Only Errors</Label>
            <p className="text-sm text-zinc-400">Suppress non-error output</p>
          </div>
          <Switch
            checked={options.logOnlyErrors}
            onCheckedChange={(checked) => setOptions({ ...options, logOnlyErrors: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">Debug Mode</Label>
            <p className="text-sm text-zinc-400">Show detailed debugging information</p>
          </div>
          <Switch
            checked={options.debug}
            onCheckedChange={(checked) => setOptions({ ...options, debug: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>
      </div>

      {/* Existing components */}
      <WgetDownloadBehavior options={options} setOptions={setOptions} />
      <WgetSpiderOptions options={options} setOptions={setOptions} />
      <WgetMirrorOptions options={options} setOptions={setOptions} />
    </Card>
  );
};
