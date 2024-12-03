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
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-white">Download Options</h3>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base text-white">Spider Mode</Label>
          <p className="text-sm text-zinc-400">
            Check links without downloading
          </p>
        </div>
        <Switch
          checked={options.spiderMode}
          onCheckedChange={(checked) =>
            setOptions({ ...options, spiderMode: checked })
          }
          className="bg-zinc-700 data-[state=checked]:bg-white"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 space-y-0.5">
            <Label className="text-base text-white">Recursive Download</Label>
            <p className="text-sm text-zinc-400">
              Download subdirectories recursively
            </p>
          </div>
          <div className="flex items-center gap-4">
            {options.recursive && (
              <Input
                type="number"
                min="0"
                value={options.maxDepth}
                onChange={(e) =>
                  setOptions({ ...options, maxDepth: parseInt(e.target.value) || 0 })
                }
                placeholder="Max Depth"
                className="w-24 bg-black border-white/20 text-white"
              />
            )}
            <Switch
              checked={options.recursive}
              onCheckedChange={(checked) =>
                setOptions({ ...options, recursive: checked })
              }
              className="bg-zinc-700 data-[state=checked]:bg-white"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base text-white">Mirror Website</Label>
          <p className="text-sm text-zinc-400">
            Create a mirror of the website
          </p>
        </div>
        <Switch
          checked={options.mirror}
          onCheckedChange={(checked) =>
            setOptions({ ...options, mirror: checked })
          }
          className="bg-zinc-700 data-[state=checked]:bg-white"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base text-white">Use Timestamping</Label>
          <p className="text-sm text-zinc-400">Only download newer files</p>
        </div>
        <Switch
          checked={options.timestamping}
          onCheckedChange={(checked) =>
            setOptions({ ...options, timestamping: checked })
          }
          className="bg-zinc-700 data-[state=checked]:bg-white"
        />
      </div>
    </div>
  );
};