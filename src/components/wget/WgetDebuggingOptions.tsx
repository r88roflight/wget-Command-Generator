import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { WgetOptions } from "@/types/wget";
import { Card } from "@/components/ui/card";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetDebuggingOptions = ({ options, setOptions }: Props) => {
  return (
    <Card className="p-6 bg-black border border-white/20 space-y-6">
      <h2 className="text-xl font-semibold text-white mb-4">Debugging Options</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">Skip Certificate Check</Label>
            <p className="text-sm text-zinc-400">Skip certificate validation (use with caution)</p>
          </div>
          <Switch
            checked={options.noCheckCertificate}
            onCheckedChange={(checked) => setOptions({ ...options, noCheckCertificate: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

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

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">Progress Bar</Label>
            <p className="text-sm text-zinc-400">Show download progress</p>
          </div>
          <Switch
            checked={options.progressBar}
            onCheckedChange={(checked) => setOptions({ ...options, progressBar: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">DNS Cache</Label>
            <p className="text-sm text-zinc-400">Enable DNS caching</p>
          </div>
          <Switch
            checked={options.dnsCache}
            onCheckedChange={(checked) => setOptions({ ...options, dnsCache: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">IPv4 Only</Label>
            <p className="text-sm text-zinc-400">Use only IPv4</p>
          </div>
          <Switch
            checked={options.inet4Only}
            onCheckedChange={(checked) => setOptions({ ...options, inet4Only: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">IPv6 Only</Label>
            <p className="text-sm text-zinc-400">Use only IPv6</p>
          </div>
          <Switch
            checked={options.inet6Only}
            onCheckedChange={(checked) => setOptions({ ...options, inet6Only: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>
      </div>
    </Card>
  );
};