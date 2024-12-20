import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, RotateCw, Minus, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { EditableText } from "../EditableText";
import { PresetCommands } from "./PresetCommands";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Preset } from "../types/preset";

interface PresetItemProps {
  preset: Preset;
  isExpanded: boolean;
  activePreset: string | null;
  onToggleExpansion: (name: string) => void;
  onRename: (oldName: string, newName: string) => void;
  onUpdateDescription: (name: string, description: string) => void;
  onDelete: (name: string) => void;
  onTogglePreset: (checked: boolean, preset: Preset) => void;
  onAddCommand: (presetName: string) => void;
  onUpdateCommand: (presetName: string, index: number, newCommand: string) => void;
  onRemoveCommand: (presetName: string, index: number) => void;
  onResetPreset?: (preset: Preset) => void;
}

export const PresetItem = ({
  preset,
  isExpanded,
  activePreset,
  onToggleExpansion,
  onRename,
  onUpdateDescription,
  onDelete,
  onTogglePreset,
  onAddCommand,
  onUpdateCommand,
  onRemoveCommand,
  onResetPreset,
}: PresetItemProps) => {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  const handleDeleteClick = () => {
    if (showDeleteIcon) {
      onDelete(preset.name);
    } else {
      setShowDeleteIcon(true);
    }
  };

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={() => onToggleExpansion(preset.name)}
      className="border border-white/20 rounded-md mb-4"
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <EditableText
              text={preset.name}
              onSave={(newName) => onRename(preset.name, newName)}
              className="text-base text-white block truncate"
            />
            <EditableText
              text={preset.description}
              onSave={(newDescription) =>
                onUpdateDescription(preset.name, newDescription)
              }
              className="text-sm text-zinc-400 block"
            />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-zinc-900"
              onClick={() => onToggleExpansion(preset.name)}
            >
              <Settings className="h-4 w-4 text-white" />
            </Button>
            {preset.name === "Mirror Website Locally" && onResetPreset && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-zinc-900"
                onClick={() => onResetPreset(preset)}
              >
                <RotateCw className="h-4 w-4 text-white" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-zinc-900"
              onClick={handleDeleteClick}
              onBlur={() => setShowDeleteIcon(false)}
            >
              {showDeleteIcon ? (
                <X className="h-4 w-4 text-white" />
              ) : (
                <Minus className="h-4 w-4 text-white" />
              )}
            </Button>
            <Switch
              checked={activePreset === preset.name}
              onCheckedChange={(checked) => onTogglePreset(checked, preset)}
              className="bg-zinc-700 data-[state=checked]:bg-white"
            />
          </div>
        </div>
      </div>
      <CollapsibleContent>
        <div className="p-4 border-t border-white/20">
          <PresetCommands
            preset={preset}
            onAddCommand={onAddCommand}
            onUpdateCommand={onUpdateCommand}
            onRemoveCommand={onRemoveCommand}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};