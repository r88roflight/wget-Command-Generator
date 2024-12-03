import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, RotateCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { usePresetContext } from "./PresetContext";
import { defaultMirrorPreset } from "./defaultPreset";

export const PresetHeader = () => {
  const { toast } = useToast();
  const { presets, setPresets } = usePresetContext();
  const [lastClickTime, setLastClickTime] = React.useState(0);
  const DOUBLE_CLICK_DELAY = 300;

  const handleSavePreset = () => {
    const newPreset = {
      ...defaultMirrorPreset,
      name: `Preset ${presets.length + 1}`,
      description: 'New preset description',
    };
    
    setPresets([...presets, newPreset]);
    toast({
      title: "Success",
      description: "New preset has been created",
    });
  };

  const handleRestorePresets = () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < DOUBLE_CLICK_DELAY) {
      const hasMirrorPreset = presets.some(preset => preset.name === "Mirror Website Locally");
      if (!hasMirrorPreset) {
        setPresets([defaultMirrorPreset]);
        toast({
          title: "Success",
          description: "Mirror Website Locally preset has been restored",
        });
      } else {
        toast({
          title: "Info",
          description: "Mirror Website Locally preset already exists",
        });
      }
    }
    setLastClickTime(currentTime);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium text-white">Presets</h3>
      <div className="flex gap-2">
        <Button
          onClick={handleRestorePresets}
          variant="outline"
          size="icon"
          className="bg-black border-white/20 text-white hover:bg-zinc-900"
        >
          <RotateCw className="h-4 w-4" />
        </Button>
        <Button
          onClick={handleSavePreset}
          variant="outline"
          size="sm"
          className="bg-black border-white/20 text-white hover:bg-zinc-900"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Preset
        </Button>
      </div>
    </div>
  );
};