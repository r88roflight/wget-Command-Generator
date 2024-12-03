import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WgetOptions } from "@/types/wget";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetPatternOptions = ({ options, setOptions }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="includePattern" className="text-white">Include Pattern</Label>
        <Input
          id="includePattern"
          placeholder="*.pdf,*.doc"
          value={options.includePattern}
          onChange={(e) =>
            setOptions({ ...options, includePattern: e.target.value })
          }
          className="bg-zinc-800 border-zinc-700 text-white"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="excludePattern" className="text-white">Exclude Pattern</Label>
        <Input
          id="excludePattern"
          placeholder="*.jpg,*.png"
          value={options.excludePattern}
          onChange={(e) =>
            setOptions({ ...options, excludePattern: e.target.value })
          }
          className="bg-zinc-800 border-zinc-700 text-white"
        />
      </div>
    </div>
  );
};