import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { WgetOptions } from "@/types/wget";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetMirrorOptions = ({ options, setOptions }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base text-white">Mirror Website</Label>
          <p className="text-sm text-zinc-400">Create complete offline copy</p>
        </div>
        <Switch
          checked={options.mirror}
          onCheckedChange={(checked) =>
            setOptions({ ...options, mirror: checked })
          }
          className="bg-zinc-700 data-[state=checked]:bg-primary"
        />
      </div>
    </div>
  );
};