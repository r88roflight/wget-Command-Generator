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

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base text-white">Download Page Requirements</Label>
          <p className="text-sm text-zinc-400">
            Download all page requisites (CSS, images, etc.)
          </p>
        </div>
        <Switch
          checked={options.pageRequisites}
          onCheckedChange={(checked) =>
            setOptions({ ...options, pageRequisites: checked })
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

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base text-white">Content Disposition</Label>
          <p className="text-sm text-zinc-400">Use server's suggested filename</p>
        </div>
        <Switch
          checked={options.contentDisposition}
          onCheckedChange={(checked) =>
            setOptions({ ...options, contentDisposition: checked })
          }
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
          onCheckedChange={(checked) =>
            setOptions({ ...options, adjustExtension: checked })
          }
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
          onCheckedChange={(checked) =>
            setOptions({ ...options, noClobber: checked })
          }
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
          onCheckedChange={(checked) =>
            setOptions({ ...options, continueTransfer: checked })
          }
          className="bg-zinc-700 data-[state=checked]:bg-white"
        />
      </div>
    </div>
  );
};