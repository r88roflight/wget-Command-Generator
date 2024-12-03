import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WgetOptions } from "@/types/wget";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetPresets = ({ options, setOptions }: Props) => {
  const { toast } = useToast();

  const mirrorPreset = {
    recursive: true,
    pageRequisites: true,
    noClobber: true,
    convertLinks: true,
    adjustExtension: true,
    mirror: true,
    includeParents: true,
    followLinks: true,
    spiderMode: false,
    timestamping: true,
    continueTransfer: true
  };

  const handleApplyPreset = () => {
    setOptions({
      ...options,
      ...mirrorPreset
    });
    
    toast({
      title: "Preset Applied",
      description: "Mirror and Deploy Site Locally preset has been applied",
    });
  };

  return (
    <Card className="p-6 bg-black border border-white/20">
      <h3 className="text-lg font-medium text-white mb-4">Presets</h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="flex-1">
            <h4 className="text-base text-white">Mirror and Deploy Site Locally</h4>
            <p className="text-sm text-zinc-400">
              Optimized settings for creating a complete local copy of a website with all necessary resources
            </p>
          </div>
          <Button
            onClick={handleApplyPreset}
            className="bg-white text-black hover:bg-zinc-200"
          >
            Apply
          </Button>
        </div>
      </div>
    </Card>
  );
};