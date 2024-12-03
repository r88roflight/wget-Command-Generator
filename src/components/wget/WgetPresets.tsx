import React from "react";
import { WgetOptions } from "@/types/wget";
import { PresetProvider } from "./preset/PresetContext";
import { PresetHeader } from "./preset/PresetHeader";
import { PresetList } from "./preset/PresetList";
import { usePresetActions } from "./preset/usePresetActions";
import { DeletePresetDialog } from "./DeletePresetDialog";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetPresets = ({ options, setOptions }: Props) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedPreset, setSelectedPreset] = React.useState<string | null>(null);

  const { handleDeletePreset, handleRestorePresets, handleSavePreset } = 
    usePresetActions(options, setOptions);

  const confirmDeletePreset = () => {
    if (selectedPreset) {
      handleDeletePreset(selectedPreset);
      setDeleteDialogOpen(false);
      setSelectedPreset(null);
    }
  };

  return (
    <PresetProvider>
      <div className="space-y-4">
        <PresetHeader 
          handleSavePreset={handleSavePreset}
          onRestorePresets={handleRestorePresets}
          presets={[]}
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