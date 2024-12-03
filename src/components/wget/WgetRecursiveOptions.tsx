import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
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

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label className="text-white">Maximum Depth</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-zinc-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>How many levels deep to follow links</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select
          value={options.maxDepth.toString()}
          onValueChange={(value) =>
            setOptions({ ...options, maxDepth: parseInt(value) })
          }
        >
          <SelectTrigger className="bg-zinc-800 border-white/20 text-white">
            <SelectValue placeholder="Select depth" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-white/20">
            {[1, 2, 3, 4, 5, 10].map((depth) => (
              <SelectItem key={depth} value={depth.toString()} className="text-white">
                {depth}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-white">Wait Time (seconds)</Label>
          <span className="text-sm text-zinc-400">
            {options.waitTime}s
          </span>
        </div>
        <Slider
          value={[options.waitTime]}
          min={0}
          max={60}
          step={1}
          onValueChange={(value) =>
            setOptions({ ...options, waitTime: value[0] })
          }
          className="[&>[role=slider]]:bg-white [&>[role=slider]]:border-white [&>div]:bg-white"
        />
      </div>
    </>
  );
};