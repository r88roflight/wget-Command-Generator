import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { WgetOptions } from "@/types/wget";
import { useToast } from "@/components/ui/use-toast";
import { Settings, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PresetCommand } from "./PresetCommand";
import { DeletePresetDialog } from "./DeletePresetDialog";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

interface Preset {
  name: string;
  description: string;
  commands: string[];
  options: Partial<WgetOptions>;
}

export const WgetPresets = ({ options, setOptions }: Props) => {
  const { toast } = useToast();
  const [presetName, setPresetName] = useState("");
  const [presetDescription, setPresetDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [expandedPresets, setExpandedPresets] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [presets, setPresets] = useState<Preset[]>([
    {
      name: "Mirror Website Locally",
      description: "Optimized settings for creating a complete local copy of a website",
      commands: ["wget --mirror", "wget --page-requisites"],
      options: {
        recursive: true,
        pageRequisites: true,
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
      name: presetName,
      description: presetDescription || "Custom preset",
      commands: [],
      options: {
        recursive: options.recursive,
        pageRequisites: options.pageRequisites,
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

  const handleApplyPreset = (preset: Preset) => {
    setOptions({
      ...options,
      ...preset.options,
    });

    toast({
      title: "Success",
      description: `${preset.name} preset has been applied`,
    });
  };

  const addCommand = (presetName: string) => {
    setPresets((prev) =>
      prev.map((preset) =>
        preset.name === presetName
          ? { ...preset, commands: [...preset.commands, "New Command"] }
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

  return (
    <Card className="p-6 bg-black border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Presets</h3>
        <Button
          onClick={() => setIsCreating(true)}
          variant="outline"
          size="sm"
          className="bg-black border-white/20 text-white hover:bg-zinc-900"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Preset
        </Button>
      </div>

      {isCreating && (
        <div className="space-y-4 mb-6 p-4 border border-white/20 rounded-md">
          <div className="space-y-2">
            <Label className="text-white">Preset Name</Label>
            <Input
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Enter preset name"
              className="bg-black border-white/20 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white">Description</Label>
            <Input
              value={presetDescription}
              onChange={(e) => setPresetDescription(e.target.value)}
              placeholder="Enter preset description"
              className="bg-black border-white/20 text-white"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => setIsCreating(false)}
              variant="outline"
              size="sm"
              className="bg-black border-white/20 text-white hover:bg-zinc-900"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePreset}
              variant="outline"
              size="sm"
              className="bg-black border-white/20 text-white hover:bg-zinc-900"
            >
              Save Preset
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {presets.map((preset) => (
          <ContextMenu key={preset.name}>
            <ContextMenuTrigger>
              <Collapsible
                open={expandedPresets.includes(preset.name)}
                onOpenChange={() => togglePresetExpansion(preset.name)}
                className="border border-white/20 rounded-md"
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <h4 className="text-base text-white">{preset.name}</h4>
                    <p className="text-sm text-zinc-400">{preset.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-zinc-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePresetExpansion(preset.name);
                      }}
                    >
                      <Settings className="h-4 w-4 text-white" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-zinc-900"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePreset(preset.name);
                      }}
                    >
                      <Minus className="h-4 w-4 text-white" />
                    </Button>
                    <Switch
                      checked={Object.entries(preset.options).every(
                        ([key, value]) => options[key as keyof WgetOptions] === value
                      )}
                      onCheckedChange={() => handleApplyPreset(preset)}
                      className="bg-zinc-700 data-[state=checked]:bg-white ml-4"
                    />
                  </div>
                </div>
                <CollapsibleContent>
                  <div className="p-4 border-t border-white/20">
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-white mb-2">Commands</h5>
                      <div className="space-y-2">
                        {preset.commands.map((command, index) => (
                          <PresetCommand
                            key={index}
                            command={command}
                            onDelete={() => removeCommand(preset.name, index)}
                            onAdd={() => addCommand(preset.name)}
                          />
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-black border-white/20 text-white hover:bg-zinc-900"
                          onClick={() => addCommand(preset.name)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Command
                        </Button>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </ContextMenuTrigger>
            <ContextMenuContent className="bg-black border border-white/20">
              <ContextMenuItem
                className="text-white hover:bg-zinc-900"
                onSelect={() => {
                  const newName = window.prompt("Enter new name", preset.name);
                  if (newName && newName !== preset.name) {
                    handleRenamePreset(preset.name, newName);
                  }
                }}
              >
                Rename
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>

      <DeletePresetDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDeletePreset}
        presetName={selectedPreset || ""}
      />
    </Card>
  );
};