import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { WgetOptions } from "@/types/wget";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetRecursiveOptions = ({ options, setOptions }: Props) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base text-white">Recursive Download</Label>
          <p className="text-sm text-zinc-400">
            Download all linked pages
          </p>
        </div>
        <Switch
          checked={options.recursive}
          onCheckedChange={(checked) =>
            setOptions({ ...options, recursive: checked })
          }
          className="bg-zinc-700 data-[state=checked]:bg-white"
        />
      </div>

      {options.recursive && (
        <>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">Include Parent Directories</Label>
              <p className="text-sm text-zinc-400">
                Download parent directory content
              </p>
            </div>
            <Switch
              checked={options.includeParents}
              onCheckedChange={(checked) =>
                setOptions({ ...options, includeParents: checked })
              }
              className="bg-zinc-700 data-[state=checked]:bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Maximum Depth</Label>
            <Input
              type="number"
              value={options.maxDepth}
              onChange={(e) =>
                setOptions({ ...options, maxDepth: parseInt(e.target.value) || 0 })
              }
              min="0"
              className="bg-black border-white/20 text-white"
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-white">Wait Time (seconds)</Label>
          <span className="text-sm text-zinc-400">
            {options.waitTime}s
          </span>
        </div>
        <Input
          type="number"
          value={options.waitTime}
          onChange={(e) =>
            setOptions({ ...options, waitTime: parseInt(e.target.value) || 0 })
          }
          min="0"
          max="60"
          className="bg-black border-white/20 text-white"
        />
      </div>
    </>
  );
};