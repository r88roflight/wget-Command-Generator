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
            <Label className="text-base text-white">Verify SSL</Label>
            <p className="text-sm text-zinc-400">Verify SSL certificates</p>
          </div>
          <Switch
            checked={options.verifySSL}
            onCheckedChange={(checked) => setOptions({ ...options, verifySSL: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">Content Disposition</Label>
            <p className="text-sm text-zinc-400">Use server's suggested filename</p>
          </div>
          <Switch
            checked={options.contentDisposition}
            onCheckedChange={(checked) => setOptions({ ...options, contentDisposition: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">Adjust Extension</Label>
            <p className="text-sm text-zinc-400">Add appropriate extensions to files</p>
          </div>
          <Switch
            checked={options.adjustExtension}
            onCheckedChange={(checked) => setOptions({ ...options, adjustExtension: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">No Clobber</Label>
            <p className="text-sm text-zinc-400">Don't overwrite existing files</p>
          </div>
          <Switch
            checked={options.noClobber}
            onCheckedChange={(checked) => setOptions({ ...options, noClobber: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">Continue Downloads</Label>
            <p className="text-sm text-zinc-400">Resume getting a partially-downloaded file</p>
          </div>
          <Switch
            checked={options.continueTransfer}
            onCheckedChange={(checked) => setOptions({ ...options, continueTransfer: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">Spider Mode</Label>
            <p className="text-sm text-zinc-400">Preview files without downloading</p>
          </div>
          <Switch
            checked={options.spiderMode}
            onCheckedChange={(checked) => setOptions({ ...options, spiderMode: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base text-white">Mirror Website</Label>
            <p className="text-sm text-zinc-400">Create complete offline copy</p>
          </div>
          <Switch
            checked={options.mirror}
            onCheckedChange={(checked) => setOptions({ ...options, mirror: checked })}
            className="bg-zinc-700 data-[state=checked]:bg-white"
          />
        </div>
      </div>
    </Card>
  );
};
