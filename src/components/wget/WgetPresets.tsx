import React from "react";
import { WgetOptions } from "@/types/wget";
import { PresetHeader } from "./preset/PresetHeader";
import { PresetList } from "./preset/PresetList";
import { DeletePresetDialog } from "./DeletePresetDialog";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetPresets = ({ options, setOptions }: Props) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedPreset, setSelectedPreset] = React.useState<string | null>(null);

  return (
    <div className="space-y-4">
      <PresetHeader />
      <PresetList
        options={options}
        setOptions={setOptions}
      />
      <DeletePresetDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => {
          if (selectedPreset) {
            setDeleteDialogOpen(false);
            setSelectedPreset(null);
          }
        }}
        presetName={selectedPreset || ""}
      />
    </div>
  );
};