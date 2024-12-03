import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WgetOptions } from "@/types/wget";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

const EXECUTE_COMMANDS = [
  { value: "robots=off", label: "Ignore robots.txt" },
  { value: "wait=1", label: "Wait 1 second between requests" },
  { value: "no-check-certificate", label: "Skip SSL verification" },
  { value: "no-cache", label: "Disable caching" },
  { value: "no-cookies", label: "Disable cookies" },
  { value: "keep-session-cookies", label: "Keep session cookies" },
  { value: "no-parent", label: "Don't follow parent directories" },
  { value: "no-host-directories", label: "Don't create host directories" },
  { value: "no-directories", label: "Don't create directories" },
];

export const WgetFlags = ({ options, setOptions }: Props) => {
  const executeCommands = options.executeCommand ? options.executeCommand.split(';').filter(Boolean) : [];

  const handleAddCommand = (command: string) => {
    const newCommands = [...executeCommands, command];
    setOptions({
      ...options,
      executeCommand: newCommands.join(';')
    });
  };

  const handleRemoveCommand = (indexToRemove: number) => {
    const newCommands = executeCommands.filter((_, index) => index !== indexToRemove);
    setOptions({
      ...options,
      executeCommand: newCommands.join(';')
    });
  };

  const handleCustomCommand = (value: string, index: number) => {
    const newCommands = [...executeCommands];
    newCommands[index] = value;
    setOptions({
      ...options,
      executeCommand: newCommands.join(';')
    });
  };

  return (
    <Card className="p-6 bg-black border border-white/20">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white mb-4">Command Flags</h2>
        
        {/* Basic Download Flags */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Download Flags</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">Mirror Website (-m)</Label>
              <p className="text-sm text-zinc-400">Download website recursively with proper settings</p>
            </div>
            <Switch
              checked={options.mirror}
              onCheckedChange={(checked) => setOptions({ ...options, mirror: checked })}
              className="bg-zinc-700 data-[state=checked]:bg-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">Convert Links (-k)</Label>
              <p className="text-sm text-zinc-400">Convert links for offline viewing</p>
            </div>
            <Switch
              checked={options.convertLinks}
              onCheckedChange={(checked) => setOptions({ ...options, convertLinks: checked })}
              className="bg-zinc-700 data-[state=checked]:bg-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">Download Prerequisites (-p)</Label>
              <p className="text-sm text-zinc-400">Get all files needed to display HTML page</p>
            </div>
            <Switch
              checked={options.pageRequisites}
              onCheckedChange={(checked) => setOptions({ ...options, pageRequisites: checked })}
              className="bg-zinc-700 data-[state=checked]:bg-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">Execute Command (-e)</Label>
              <p className="text-sm text-zinc-400">Additional wget commands</p>
            </div>
            <Select
              onValueChange={(value) => handleAddCommand(value)}
            >
              <SelectTrigger className="w-[200px] bg-black border-white/20 text-white">
                <SelectValue placeholder="Add command" />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/20">
                {EXECUTE_COMMANDS.map((command) => (
                  <SelectItem 
                    key={command.value} 
                    value={command.value}
                    className="text-white hover:bg-zinc-900"
                  >
                    {command.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {executeCommands.map((command, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={command}
                  onChange={(e) => handleCustomCommand(e.target.value, index)}
                  placeholder="e.g., robots=off"
                  className="bg-black border-white/20 text-white flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveCommand(index)}
                  className="hover:bg-zinc-900"
                >
                  <X className="h-4 w-4 text-white" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Input/Output Flags */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Input/Output Flags</h3>
          <div className="space-y-2">
            <Label className="text-white">Output Document (-O)</Label>
            <Input
              value={options.outputDocument}
              onChange={(e) => setOptions({ ...options, outputDocument: e.target.value })}
              placeholder="Output filename"
              className="bg-black border-white/20 text-white"
            />
            <p className="text-sm text-zinc-400">Save all output to this filename</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">No Directories (-nd)</Label>
              <p className="text-sm text-zinc-400">Don't create directories</p>
            </div>
            <Switch
              checked={options.noDirectories === "true"}
              onCheckedChange={(checked) => setOptions({ ...options, noDirectories: checked ? "true" : "false" })}
              className="bg-zinc-700 data-[state=checked]:bg-white"
            />
          </div>
        </div>

        {/* Additional Flags */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Additional Flags</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">Recursive (-r)</Label>
              <p className="text-sm text-zinc-400">Basic recursive download (use with caution)</p>
            </div>
            <Switch
              checked={options.recursive}
              onCheckedChange={(checked) => setOptions({ ...options, recursive: checked })}
              className="bg-zinc-700 data-[state=checked]:bg-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">Continue (-c)</Label>
              <p className="text-sm text-zinc-400">Resume partially downloaded files</p>
            </div>
            <Switch
              checked={options.continueTransfer}
              onCheckedChange={(checked) => setOptions({ ...options, continueTransfer: checked })}
              className="bg-zinc-700 data-[state=checked]:bg-white"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
