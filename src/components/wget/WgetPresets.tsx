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

const defaultMirrorPreset: Preset = {
  name: "Mirror Website Locally",
  description: "Optimized settings for creating a complete local copy of a website",
  commands: [
    "Mirror Website",
    "Follow Links",
    "Convert Links",
    "Adjust Extensions",
    "No Clobber",
    "Follow FTP",
    "Content Disposition",
    "Continue Transfer",
    "Random Wait",
    "Wait 5 Seconds"
  ],
  options: {
    recursive: true,
    noClobber: true,
    convertLinks: true,
    adjustExtension: true,
    mirror: true,
    followLinks: true,
    spiderMode: false,
    timestamping: true,
    continueTransfer: true,
    followFtp: true,
    contentDisposition: true,
    debug: false,
    logOnlyErrors: false,
    verifySSL: true,
    waitTime: 5,
    randomWait: true,
    maxDepth: 0  // Set to 0 to not include --level flag
  },
};

export const WgetPresets = ({ options, setOptions }: Props) => {
  const { toast } = useToast();
  const [presetName, setPresetName] = useState("");
  const [presetDescription, setPresetDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [expandedPresets, setExpandedPresets] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [presets, setPresets] = useState<Preset[]>([defaultMirrorPreset]);
  const [deletedPresets, setDeletedPresets] = useState<Preset[]>([]);

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
    const presetToDelete = presets.find(p => p.name === presetName);
    if (presetToDelete) {
      setDeletedPresets(prev => [...prev, presetToDelete]);
    }
    setSelectedPreset(presetName);
    setDeleteDialogOpen(true);
  };

  const handleRestorePresets = () => {
    if (deletedPresets.length > 0) {
      setPresets(prev => [...prev, ...deletedPresets]);
      setDeletedPresets([]);
    }
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

  const handleResetPreset = (preset: Preset) => {
    if (preset.name === "Mirror Website Locally") {
      setPresets((prev) =>
        prev.map((p) =>
          p.name === preset.name ? { ...defaultMirrorPreset } : p
        )
      );
      if (activePreset === preset.name) {
        setOptions({
          ...options,
          ...defaultMirrorPreset.options,
        });
      }
      toast({
        title: "Success",
        description: "Preset has been reset to default settings",
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
      <PresetHeader 
        handleSavePreset={handleSavePreset} 
        onRestorePresets={handleRestorePresets}
        presets={presets}
      />
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
          onResetPreset={handleResetPreset}
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
