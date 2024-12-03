import React from "react";
import { WgetOptions } from "@/types/wget";
import { PresetProvider } from "./preset/PresetContext";
import { PresetHeader } from "./preset/PresetHeader";
import { PresetList } from "./preset/PresetList";
import { usePresetActions } from "./preset/usePresetActions";
import { DeletePresetDialog } from "./DeletePresetDialog";
import { usePresetContext } from "./preset/PresetContext";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetPresets = ({ options, setOptions }: Props) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedPreset, setSelectedPreset] = React.useState<string | null>(null);
  const { presets } = usePresetContext();

  const { handleDeletePreset, handleRestorePresets, handleResetPreset } = 
    usePresetActions(options, setOptions);

  const confirmDeletePreset = () => {
    if (selectedPreset) {
      handleDeletePreset(selectedPreset);
      setDeleteDialogOpen(false);
      setSelectedPreset(null);
    }
  };

  const handleSavePreset = () => {
    // This will be implemented later
    console.log("Save preset");
  };

  return (
    <PresetProvider>
      <div className="space-y-4">
        <PresetHeader 
          handleSavePreset={handleSavePreset}
          onRestorePresets={handleRestorePresets}
          presets={presets}
        />
        <PresetList
          options={options}
          setOptions={setOptions}
        />
        <DeletePresetDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={confirmDeletePreset}
          presetName={selectedPreset || ""}
        />
      </div>
    </PresetProvider>
  );
};