import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { WgetOptions } from "@/types/wget";
import { Preset } from "../types/preset";

interface PresetHeaderProps {
  handleSavePreset: () => void;
}

export const PresetHeader = ({ handleSavePreset }: PresetHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium text-white">Presets</h3>
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
  );
};