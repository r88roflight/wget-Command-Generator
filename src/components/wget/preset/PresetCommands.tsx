import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PresetCommand } from "../PresetCommand";
import { Preset } from "../types/preset";
import { AVAILABLE_COMMANDS, flagToCommand } from "../constants/commands";

interface PresetCommandsProps {
  preset: Preset;
  onAddCommand: (presetName: string) => void;
  onUpdateCommand: (presetName: string, index: number, newCommand: string) => void;
  onRemoveCommand: (presetName: string, index: number) => void;
}

export const PresetCommands = ({
  preset,
  onAddCommand,
  onUpdateCommand,
  onRemoveCommand,
}: PresetCommandsProps) => {
  const getCommandTitle = (command: string) => {
    return flagToCommand[command] || command;
  };

  return (
    <div className="mb-4">
      <h5 className="text-sm font-medium text-white mb-2">Commands</h5>
      <div className="space-y-2">
        {preset.commands.map((command, index) => (
          <div key={index} className="flex items-center gap-2">
            <Select
              value={command}
              onValueChange={(value) => onUpdateCommand(preset.name, index, value)}
            >
              <SelectTrigger className="flex-1 bg-black border-white/20 text-white">
                <SelectValue placeholder="Select a command">
                  {getCommandTitle(command)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-black border-white/20">
                {AVAILABLE_COMMANDS.map((cmd) => (
                  <SelectItem key={cmd} value={cmd} className="text-white hover:bg-zinc-800">
                    {cmd}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <PresetCommand
              command={command}
              onDelete={() => onRemoveCommand(preset.name, index)}
            />
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          className="w-full bg-black border-white/20 text-white hover:bg-zinc-900"
          onClick={() => onAddCommand(preset.name)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Command
        </Button>
      </div>
    </div>
  );
};