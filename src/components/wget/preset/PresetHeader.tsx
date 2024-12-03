import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, RotateCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { WgetOptions } from "@/types/wget";
import { Preset } from "../types/preset";

interface PresetHeaderProps {
  handleSavePreset: () => void;
  onRestorePresets: () => void;
  presets: Preset[];
}

export const PresetHeader = ({ handleSavePreset, onRestorePresets, presets }: PresetHeaderProps) => {
  const { toast } = useToast();
  const [lastClickTime, setLastClickTime] = useState(0);
  const DOUBLE_CLICK_DELAY = 300; // 300ms between clicks

  const handleRestoreClick = () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < DOUBLE_CLICK_DELAY) {
      // Double click detected
      const hasMirrorPreset = presets.some(preset => preset.name === "Mirror Website Locally");
      if (!hasMirrorPreset) {
        onRestorePresets();
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
    } else {
      // Single click
      onRestorePresets();
      toast({
        title: "Success",
        description: "Deleted presets have been restored",
      });
    }
    setLastClickTime(currentTime);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium text-white">Presets</h3>
      <div className="flex gap-2">
        <Button
          onClick={handleRestoreClick}
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