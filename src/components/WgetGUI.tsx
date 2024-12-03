import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { WgetTabs } from "./wget/WgetTabs";
import { useWgetCommand } from "@/hooks/useWgetCommand";
import { Clipboard, RotateCw } from "lucide-react";

const WgetGUI = () => {
  const { toast } = useToast();
  const { options, setOptions, generateCommand, resetOptions, invalidFlags } = useWgetCommand();

  const handleCopyCommand = async () => {
    const command = generateCommand();
    await navigator.clipboard.writeText(command);
    toast({
      title: "Success",
      description: "Command copied to clipboard",
    });
  };

  const handleResetAll = () => {
    resetOptions();
    toast({
      title: "Success",
      description: "All options have been reset to default values",
    });
  };

  return (
    <div className="container mx-auto p-2 sm:p-4 max-w-4xl">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-8 text-white">wget</h1>
      
      <div className="space-y-4 sm:space-y-8">
        <Card className="p-2 sm:p-4 bg-black border border-white/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <pre className="flex-1 w-full sm:w-auto whitespace-pre-wrap break-all font-mono text-xs sm:text-sm overflow-x-auto max-w-full">
              {generateCommand().split(' ').map((part, index) => (
                <span
                  key={index}
                  className={`${part.startsWith('--level=0') ? 'text-red-500' : 'text-white'}`}
                >
                  {part}{' '}
                </span>
              ))}
            </pre>
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopyCommand}
                className="border-white/20 hover:bg-zinc-900 bg-black"
              >
                <Clipboard className="h-4 w-4 text-white" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleResetAll}
                className="border-white/20 hover:bg-zinc-900 bg-black"
              >
                <RotateCw className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 bg-black border border-white/20">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-base sm:text-lg font-medium text-white">URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={options.url}
                onChange={(e) => setOptions({ ...options, url: e.target.value })}
                className="bg-black border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="saveDirectory" className="text-base sm:text-lg font-medium text-white">Save Directory</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  id="saveDirectory"
                  placeholder="/path/to/directory"
                  value={options.saveDirectory}
                  onChange={(e) => setOptions({ ...options, saveDirectory: e.target.value })}
                  className="bg-black border-white/20 text-white flex-1"
                />
                <Button 
                  type="button"
                  variant="outline"
                  className="bg-black border-white/20 text-white hover:bg-zinc-900 w-full sm:w-auto"
                >
                  Choose
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <WgetTabs options={options} setOptions={setOptions} />
      </div>
    </div>
  );
};

export default WgetGUI;