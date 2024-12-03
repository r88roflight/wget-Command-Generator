import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
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
  const needsParameter = (command: string) => {
    return command.includes("=");
  };

  const getCommandTitle = (command: string) => {
    // First, handle commands with parameters by removing the parameter part
    const baseCommand = command.split("=")[0] + (command.includes("=") ? "=" : "");
    // Look up the command in our flagToCommand mapping
    return flagToCommand[baseCommand] || command;
  };

  return (
    <div className="space-y-4">
      <h5 className="text-sm font-medium text-white mb-2">Commands</h5>
      <div className="space-y-2">
        {preset.commands.map((command, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-1/4 text-sm text-white">
              {getCommandTitle(command)}
            </div>
            <div className="flex-1 flex items-center gap-2">
              <code className="px-2 py-1 bg-zinc-800 rounded text-sm text-white">
                {command.split("=")[0]}
              </code>
              {needsParameter(command) && (
                <Input
                  className="flex-1 h-8 bg-black border-white/20 text-white"
                  placeholder="Parameter value"
                  value={command.split("=")[1] || ""}
                  onChange={(e) => {
                    const baseCommand = command.split("=")[0];
                    onUpdateCommand(
                      preset.name,
                      index,
                      `${baseCommand}=${e.target.value}`
                    );
                  }}
                />
              )}
            </div>
            <Select
              value={command}
              onValueChange={(value) => {
                onUpdateCommand(preset.name, index, value);
              }}
            >
              <SelectTrigger className="w-8 h-8 bg-black border-white/20 p-0">
                <ChevronDown className="h-4 w-4 text-white" />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/20">
                {AVAILABLE_COMMANDS.map((cmd) => (
                  <SelectItem 
                    key={cmd} 
                    value={cmd}
                    className="text-white hover:bg-zinc-900"
                  >
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