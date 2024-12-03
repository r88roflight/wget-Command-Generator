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
    setExpandedPresets,
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
    setPresets(presets.map((preset) =>
      preset.name === oldName ? { ...preset, name: newName } : preset
    ));
  };

  const handleUpdatePresetDescription = (presetName: string, newDescription: string) => {
    setPresets(presets.map((preset) =>
      preset.name === presetName ? { ...preset, description: newDescription } : preset
    ));
  };

  const handleToggleExpansion = (name: string) => {
    if (expandedPresets.includes(name)) {
      setExpandedPresets(expandedPresets.filter(p => p !== name));
    } else {
      setExpandedPresets([...expandedPresets, name]);
    }
  };

  const handleDelete = (name: string) => {
    setPresets(presets.filter(p => p.name !== name));
    if (activePreset === name) {
      setActivePreset(null);
    }
  };

  const handleAddCommand = (presetName: string) => {
    setPresets(presets.map(p => 
      p.name === presetName 
        ? { ...p, commands: [...p.commands, ''] }
        : p
    ));
  };

  const handleUpdateCommand = (presetName: string, index: number, newCommand: string) => {
    setPresets(presets.map(p => 
      p.name === presetName 
        ? { 
            ...p, 
            commands: p.commands.map((cmd, i) => i === index ? newCommand : cmd)
          }
        : p
    ));
  };

  const handleRemoveCommand = (presetName: string, index: number) => {
    setPresets(presets.map(p => 
      p.name === presetName 
        ? { 
            ...p, 
            commands: p.commands.filter((_, i) => i !== index)
          }
        : p
    ));
  };

  return (
    <div className="space-y-4">
      {presets.map((preset) => (
        <PresetItem
          key={preset.name}
          preset={preset}
          isExpanded={expandedPresets.includes(preset.name)}
          activePreset={activePreset}
          onToggleExpansion={handleToggleExpansion}
          onRename={handleRenamePreset}
          onUpdateDescription={handleUpdatePresetDescription}
          onDelete={handleDelete}
          onTogglePreset={handleTogglePreset}
          onAddCommand={handleAddCommand}
          onUpdateCommand={handleUpdateCommand}
          onRemoveCommand={handleRemoveCommand}
        />
      ))}
    </div>
  );
};