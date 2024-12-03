import React, { useState, useEffect } from "react";
import { WgetOptions } from "@/types/wget";
import { useToast } from "@/components/ui/use-toast";
import { PresetHeader } from "./preset/PresetHeader";
import { PresetItem } from "./preset/PresetItem";
import { DeletePresetDialog } from "./DeletePresetDialog";
import { Preset } from "./types/preset";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetPresets = ({ options, setOptions }: Props) => {
  const { toast } = useToast();
  const [presetName, setPresetName] = useState("");
  const [presetDescription, setPresetDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [expandedPresets, setExpandedPresets] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [presets, setPresets] = useState<Preset[]>([
    {
      name: "Mirror Website Locally",
      description: "Optimized settings for creating a complete local copy of a website",
      commands: [
        "Mirror Website",
        "Follow Links",
        "Convert Links",
        "Adjust Extensions",
        "No Clobber",
        "Include Parents",
        "Follow FTP",
        "Content Disposition",
        "Continue Transfer",
      ],
      options: {
        recursive: true,
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
        verifySSL: true,
      },
    },
  ]);

  const togglePresetExpansion = (presetName: string) => {
    setExpandedPresets((prev) =>
      prev.includes(presetName)
        ? prev.filter((name) => name !== presetName)
        : [...prev, presetName]
    );
  };

  const handleSavePreset = () => {
    if (!presetName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a preset name",
        variant: "destructive",
      });
      return;
    }

    const newPreset: Preset = {
      name: "New Preset",
      description: "Description",
      commands: [],
      options: {
        recursive: options.recursive,
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
        verifySSL: options.verifySSL,
      },
    };

    setPresets([...presets, newPreset]);
    setPresetName("");
    setPresetDescription("");
    setIsCreating(false);

    toast({
      title: "Success",
      description: "Preset saved successfully",
    });
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

  const handleDeletePreset = (presetName: string) => {
    setSelectedPreset(presetName);
    setDeleteDialogOpen(true);
  };

  const confirmDeletePreset = () => {
    if (selectedPreset) {
      setPresets((prev) => prev.filter((preset) => preset.name !== selectedPreset));
      setDeleteDialogOpen(false);
      setSelectedPreset(null);
      toast({
        title: "Success",
        description: "Preset deleted successfully",
      });
    }
  };

  const addCommand = (presetName: string) => {
    setPresets((prev) =>
      prev.map((preset) =>
        preset.name === presetName
          ? { ...preset, commands: [...preset.commands, ""] }
          : preset
      )
    );
  };

  const updateCommand = (presetName: string, index: number, newCommand: string) => {
    setPresets((prev) =>
      prev.map((preset) =>
        preset.name === presetName
          ? {
              ...preset,
              commands: preset.commands.map((cmd, i) =>
                i === index ? newCommand : cmd
              ),
            }
          : preset
      )
    );
  };

  const removeCommand = (presetName: string, index: number) => {
    setPresets((prev) =>
      prev.map((preset) =>
        preset.name === presetName
          ? {
              ...preset,
              commands: preset.commands.filter((_, i) => i !== index),
            }
          : preset
      )
    );
  };

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

  // Watch for options changes and update active preset state
  useEffect(() => {
    if (activePreset) {
      const preset = presets.find((p) => p.name === activePreset);
      if (preset) {
        const isPresetActive = Object.entries(preset.options).every(
          ([key, value]) => options[key as keyof WgetOptions] === value
        );
        if (!isPresetActive) {
          setActivePreset(null);
          toast({
            title: "Preset Deactivated",
            description: "Options have been modified outside the preset.",
          });
        }
      }
    }
  }, [options, activePreset, presets]);

  return (
    <div className="space-y-4">
      <PresetHeader handleSavePreset={handleSavePreset} />
      {presets.map((preset) => (
        <PresetItem
          key={preset.name}
          preset={preset}
          isExpanded={expandedPresets.includes(preset.name)}
          activePreset={activePreset}
          onToggleExpansion={togglePresetExpansion}
          onRename={handleRenamePreset}
          onUpdateDescription={handleUpdatePresetDescription}
          onDelete={handleDeletePreset}
          onTogglePreset={handleTogglePreset}
          onAddCommand={addCommand}
          onUpdateCommand={updateCommand}
          onRemoveCommand={removeCommand}
        />
      ))}
      <DeletePresetDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDeletePreset}
        presetName={selectedPreset || ""}
      />
    </div>
  );
};