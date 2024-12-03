import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { WgetOptions } from "@/types/wget";
import { Card } from "@/components/ui/card";

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

      {/* Security and Authentication */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Security and Authentication</h3>

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
    </Card>
  );
};