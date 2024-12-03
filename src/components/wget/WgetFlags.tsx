import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { WgetOptions } from "@/types/wget";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetFlags = ({ options, setOptions }: Props) => {
  return (
    <Card className="p-6 bg-black border border-white/20">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white mb-4">Command Flags</h2>
        
        {/* Basic Download Flags */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Download Flags</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">Mirror Website (-m)</Label>
              <p className="text-sm text-zinc-400">Download website recursively with proper settings</p>
            </div>
            <Switch
              checked={options.mirror}
              onCheckedChange={(checked) => setOptions({ ...options, mirror: checked })}
              className="bg-zinc-700 data-[state=checked]:bg-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">Convert Links (-k)</Label>
              <p className="text-sm text-zinc-400">Convert links for offline viewing</p>
            </div>
            <Switch
              checked={options.convertLinks}
              onCheckedChange={(checked) => setOptions({ ...options, convertLinks: checked })}
              className="bg-zinc-700 data-[state=checked]:bg-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">Download Prerequisites (-p)</Label>
              <p className="text-sm text-zinc-400">Get all files needed to display HTML page</p>
            </div>
            <Switch
              checked={options.pageRequisites}
              onCheckedChange={(checked) => setOptions({ ...options, pageRequisites: checked })}
              className="bg-zinc-700 data-[state=checked]:bg-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">Execute Command (-e)</Label>
              <p className="text-sm text-zinc-400">Additional wget commands</p>
            </div>
            <Input
              value={options.executeCommand || ""}
              onChange={(e) => setOptions({ ...options, executeCommand: e.target.value })}
              placeholder="e.g., robots=off"
              className="bg-black border-white/20 text-white w-[200px]"
            />
          </div>
        </div>

        {/* Input/Output Flags */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Input/Output Flags</h3>
          
          <div className="space-y-2">
            <Label className="text-white">Output Document (-O)</Label>
            <Input
              value={options.outputDocument}
              onChange={(e) => setOptions({ ...options, outputDocument: e.target.value })}
              placeholder="Output filename"
              className="bg-black border-white/20 text-white"
            />
            <p className="text-sm text-zinc-400">Save all output to this filename</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">No Directories (-nd)</Label>
              <p className="text-sm text-zinc-400">Don't create directories</p>
            </div>
            <Switch
              checked={options.noDirectories === "true"}
              onCheckedChange={(checked) => setOptions({ ...options, noDirectories: checked ? "true" : "false" })}
              className="bg-zinc-700 data-[state=checked]:bg-white"
            />
          </div>
        </div>

        {/* Additional Flags */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Additional Flags</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">Recursive (-r)</Label>
              <p className="text-sm text-zinc-400">Basic recursive download (use with caution)</p>
            </div>
            <Switch
              checked={options.recursive}
              onCheckedChange={(checked) => setOptions({ ...options, recursive: checked })}
              className="bg-zinc-700 data-[state=checked]:bg-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">Continue (-c)</Label>
              <p className="text-sm text-zinc-400">Resume partially downloaded files</p>
            </div>
            <Switch
              checked={options.continueTransfer}
              onCheckedChange={(checked) => setOptions({ ...options, continueTransfer: checked })}
              className="bg-zinc-700 data-[state=checked]:bg-white"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};