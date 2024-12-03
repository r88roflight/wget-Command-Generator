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
          <Label className="text-white">Timeout (seconds)</Label>
          <Input
            type="number"
            value={options.timeout || ""}
            onChange={(e) => setOptions({ ...options, timeout: parseInt(e.target.value) || 0 })}
            placeholder="e.g., 30"
            className="bg-black border-white/20 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Retries</Label>
          <Input
            type="number"
            value={options.retries || ""}
            onChange={(e) => setOptions({ ...options, retries: parseInt(e.target.value) || 0 })}
            placeholder="e.g., 3"
            className="bg-black border-white/20 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Wait Time (seconds)</Label>
          <Input
            type="number"
            value={options.waitTime || ""}
            onChange={(e) => setOptions({ ...options, waitTime: parseInt(e.target.value) || 0 })}
            placeholder="e.g., 1"
            className="bg-black border-white/20 text-white"
          />
        </div>
      </div>

      {/* Authentication */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Authentication</h3>
        
        <div className="space-y-2">
          <Label className="text-white">Username</Label>
          <Input
            value={options.username}
            onChange={(e) => setOptions({ ...options, username: e.target.value })}
            className="bg-black border-white/20 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Password</Label>
          <Input
            type="password"
            value={options.password}
            onChange={(e) => setOptions({ ...options, password: e.target.value })}
            className="bg-black border-white/20 text-white"
          />
        </div>
      </div>

      {/* Download Behavior */}
      <WgetDownloadBehavior options={options} setOptions={setOptions} />

      {/* Additional Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Additional Features</h3>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">Continue Interrupted Downloads</Label>
            <p className="text-sm text-zinc-400">Resume partial downloads</p>
          </div>
          <Switch
            checked={options.continueDownload}
            onCheckedChange={(checked) => setOptions({ ...options, continueDownload: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">Convert Links</Label>
            <p className="text-sm text-zinc-400">Make links work offline</p>
          </div>
          <Switch
            checked={options.convertLinks}
            onCheckedChange={(checked) => setOptions({ ...options, convertLinks: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">HTTPS Only</Label>
            <p className="text-sm text-zinc-400">Force HTTPS connections</p>
          </div>
          <Switch
            checked={options.httpsOnly}
            onCheckedChange={(checked) => setOptions({ ...options, httpsOnly: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">Random Wait</Label>
            <p className="text-sm text-zinc-400">Add random delays between requests</p>
          </div>
          <Switch
            checked={options.randomWait}
            onCheckedChange={(checked) => setOptions({ ...options, randomWait: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>
      </div>

      <WgetSpiderOptions options={options} setOptions={setOptions} />
      <WgetMirrorOptions options={options} setOptions={setOptions} />
    </Card>
  );
};
