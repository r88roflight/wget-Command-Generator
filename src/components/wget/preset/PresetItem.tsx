import React from "react";
import { Button } from "@/components/ui/button";
import { Settings, Minus, RotateCw } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { EditableText } from "../EditableText";
import { PresetCommands } from "./PresetCommands";
import { Preset } from "../types/preset";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

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
  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={() => onToggleExpansion(preset.name)}
      className="border border-white/20 rounded-md"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div>
            <EditableText
              text={preset.name}
              onSave={(newName) => onRename(preset.name, newName)}
              className="text-base text-white block mb-1"
            />
            <EditableText
              text={preset.description}
              onSave={(newDescription) =>
                onUpdateDescription(preset.name, newDescription)
              }
              className="text-sm text-zinc-400 block"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
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
            onClick={() => onDelete(preset.name)}
          >
            <Minus className="h-4 w-4 text-white" />
          </Button>
          <Switch
            checked={activePreset === preset.name}
            onCheckedChange={(checked) => onTogglePreset(checked, preset)}
            className="bg-zinc-700 data-[state=checked]:bg-white ml-4"
          />
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