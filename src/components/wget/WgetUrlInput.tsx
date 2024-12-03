import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WgetOptions } from "@/types/wget";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetUrlInput = ({ options, setOptions }: Props) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="url" className="text-lg font-medium text-white">
        URL
      </Label>
      <Input
        id="url"
        type="url"
        placeholder="https://example.com"
        value={options.url}
        onChange={(e) =>
          setOptions({ ...options, url: e.target.value })
        }
        className="w-full bg-zinc-800 border-zinc-700 text-white"
      />
    </div>
  );
};