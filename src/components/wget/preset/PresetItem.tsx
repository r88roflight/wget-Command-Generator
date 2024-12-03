import React from "react";
import { Button } from "@/components/ui/button";
import { Settings, Minus, RefreshCw } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { EditableText } from "../EditableText";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { PresetCommands } from "./PresetCommands";
import { Preset } from "../types/preset";
import { WgetOptions } from "@/types/wget";
import { useToast } from "@/components/ui/use-toast";

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
  onResetPreset?: () => void;
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
  const { toast } = useToast();

  const handleResetPreset = () => {
    if (onResetPreset) {
      onResetPreset();
      toast({
        title: "Success",
        description: "Preset has been reset to default settings",
      });
    }
  };

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={() => onToggleExpansion(preset.name)}
      className="border border-white/20 rounded-md"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex-1">
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
        <div className="flex items-center space-x-2">
          {preset.name === "Mirror Website Locally" && onResetPreset && (
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-zinc-900"
              onClick={handleResetPreset}
            >
              <RefreshCw className="h-4 w-4 text-white" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-zinc-900"
            onClick={() => onToggleExpansion(preset.name)}
          >
            <Settings className="h-4 w-4 text-white" />
          </Button>
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