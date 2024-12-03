import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { WgetOptions } from "@/types/wget";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetDownloadBehavior = ({ options, setOptions }: Props) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-white">Download Behavior</h3>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base text-white">Follow Links</Label>
          <p className="text-sm text-zinc-400">Follow and download linked content</p>
        </div>
        <Switch
          checked={options.followLinks}
          onCheckedChange={(checked) =>
            setOptions({ ...options, followLinks: checked })
          }
          className="bg-zinc-700 data-[state=checked]:bg-white"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base text-white">Include Parent Directories</Label>
          <p className="text-sm text-zinc-400">Download necessary parent directory components</p>
        </div>
        <Switch
          checked={options.includeParents}
          onCheckedChange={(checked) =>
            setOptions({ ...options, includeParents: checked })
          }
          className="bg-zinc-700 data-[state=checked]:bg-white"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base text-white">Convert Links</Label>
          <p className="text-sm text-zinc-400">Convert links for local viewing</p>
        </div>
        <Switch
          checked={options.convertLinks}
          onCheckedChange={(checked) =>
            setOptions({ ...options, convertLinks: checked })
          }
          className="bg-zinc-700 data-[state=checked]:bg-white"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base text-white">Follow Robots.txt Rules</Label>
          <p className="text-sm text-zinc-400">
            Respect website's robots.txt directives
          </p>
        </div>
        <Switch
          checked={!options.ignoreRobots}
          onCheckedChange={(checked) =>
            setOptions({ ...options, ignoreRobots: !checked })
          }
          className="bg-zinc-700 data-[state=checked]:bg-white"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base text-white">Follow FTP Links</Label>
          <p className="text-sm text-zinc-400">Follow links to FTP resources</p>
        </div>
        <Switch
          checked={options.followFtp}
          onCheckedChange={(checked) =>
            setOptions({ ...options, followFtp: checked })
          }
          className="bg-zinc-700 data-[state=checked]:bg-white"
        />
      </div>
    </div>
  );
};