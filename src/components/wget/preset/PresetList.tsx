import React from 'react';
import { PresetItem } from './PresetItem';
import { usePresetContext } from './PresetContext';
import { WgetOptions } from '@/types/wget';
import { useToast } from '@/components/ui/use-toast';
import { Preset } from '../types/preset';

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const PresetList = ({ options, setOptions }: Props) => {
  const { toast } = useToast();
  const {
    presets,
    setPresets,
    activePreset,
    setActivePreset,
    expandedPresets,
  } = usePresetContext();

  const handleTogglePreset = (checked: boolean, preset: Preset) => {
    if (checked) {
      setOptions({
        ...options,
        ...preset.options,
      });
      setActivePreset(preset.name);
      toast({
        title: "Success",
        description: `${preset.name} preset has been applied`,
      });
    } else {
      setActivePreset(null);
    }
  };

  const handleRenamePreset = (oldName: string, newName: string) => {
    setPresets((prev) =>
      prev.map((preset) =>
        preset.name === oldName ? { ...preset, name: newName } : preset
      )
    );
  };

  const handleUpdatePresetDescription = (presetName: string, newDescription: string) => {
    setPresets((prev) =>
      prev.map((preset) =>
        preset.name === presetName ? { ...preset, description: newDescription } : preset
      )
    );
  };

  return (
    <div className="space-y-4">
      {presets.map((preset) => (
        <PresetItem
          key={preset.name}
          preset={preset}
          isExpanded={expandedPresets.includes(preset.name)}
          activePreset={activePreset}
          onTogglePreset={handleTogglePreset}
          onRename={handleRenamePreset}
          onUpdateDescription={handleUpdatePresetDescription}
        />
      ))}
    </div>
  );
};