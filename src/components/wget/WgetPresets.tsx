import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { WgetOptions } from "@/types/wget";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

interface Preset {
  name: string;
  options: Partial<WgetOptions>;
}

export const WgetPresets = ({ options, setOptions }: Props) => {
  const { toast } = useToast();
  const [presetName, setPresetName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [presets, setPresets] = useState<Preset[]>([{
    name: "Mirror Website Locally",
    options: {
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
      continueTransfer: true,
      followFtp: true,
      contentDisposition: true,
      debug: false,
      logOnlyErrors: false,
      verifySSL: true
    }
  }]);

  const handleSavePreset = () => {
    if (!presetName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a preset name",
        variant: "destructive"
      });
      return;
    }

    const newPreset: Preset = {
      name: presetName,
      options: {
        recursive: options.recursive,
        pageRequisites: options.pageRequisites,
        noClobber: options.noClobber,
        convertLinks: options.convertLinks,
        adjustExtension: options.adjustExtension,
        mirror: options.mirror,
        includeParents: options.includeParents,
        followLinks: options.followLinks,
        spiderMode: options.spiderMode,
        timestamping: options.timestamping,
        continueTransfer: options.continueTransfer,
        followFtp: options.followFtp,
        contentDisposition: options.contentDisposition,
        debug: options.debug,
        logOnlyErrors: options.logOnlyErrors,
        verifySSL: options.verifySSL
      }
    };

    setPresets([...presets, newPreset]);
    setPresetName("");
    setIsCreating(false);
    
    toast({
      title: "Success",
      description: "Preset saved successfully"
    });
  };

  const handleApplyPreset = (preset: Preset) => {
    setOptions({
      ...options,
      ...preset.options
    });
    
    toast({
      title: "Success",
      description: `${preset.name} preset has been applied`
    });
  };

  return (
    <Card className="p-6 bg-black border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Presets</h3>
        <Button
          onClick={() => setIsCreating(true)}
          variant="outline"
          size="sm"
          className="bg-black border-white/20 text-white hover:bg-zinc-900"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Preset
        </Button>
      </div>

      {isCreating && (
        <div className="space-y-4 mb-6 p-4 border border-white/20 rounded-md">
          <div className="space-y-2">
            <Label className="text-white">Preset Name</Label>
            <Input
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Enter preset name"
              className="bg-black border-white/20 text-white"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => setIsCreating(false)}
              variant="outline"
              size="sm"
              className="bg-black border-white/20 text-white hover:bg-zinc-900"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePreset}
              variant="outline"
              size="sm"
              className="bg-black border-white/20 text-white hover:bg-zinc-900"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Preset
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {presets.map((preset, index) => (
          <div key={index} className="flex items-start space-x-3 p-4 border border-white/20 rounded-md">
            <div className="flex-1">
              <h4 className="text-base text-white">{preset.name}</h4>
              <p className="text-sm text-zinc-400">
                Optimized settings for creating a complete local copy of a website
              </p>
            </div>
            <Switch
              checked={Object.entries(preset.options).every(
                ([key, value]) => options[key as keyof WgetOptions] === value
              )}
              onCheckedChange={() => handleApplyPreset(preset)}
              className="bg-zinc-700 data-[state=checked]:bg-white"
            />
          </div>
        ))}
      </div>
    </Card>
  );
};