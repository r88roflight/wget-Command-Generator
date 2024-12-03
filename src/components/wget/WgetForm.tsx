import React from "react";
import { Card } from "@/components/ui/card";
import { WgetUrlInput } from "./WgetUrlInput";
import { WgetRecursiveOptions } from "./WgetRecursiveOptions";
import { WgetDirectoryInput } from "./WgetDirectoryInput";
import { WgetFileTypes } from "./WgetFileTypes";
import { useWgetCommand } from "@/hooks/useWgetCommand";
import { Clipboard, Terminal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const WgetForm = () => {
  const { toast } = useToast();
  const { options, setOptions, generateCommand, loading } = useWgetCommand();

  const handleCopyCommand = async () => {
    const command = generateCommand();
    await navigator.clipboard.writeText(command);
    toast({
      title: "Success",
      description: "Command copied to clipboard",
    });
  };

  const handleRunInTerminal = async () => {
    if (!options.url) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    if (!options.saveDirectory) {
      toast({
        title: "Error",
        description: "Please select a save directory",
        variant: "destructive",
      });
      return;
    }

    const command = generateCommand();
    const script = `
      tell application "Terminal"
        activate
        do script "cd ${options.saveDirectory} && ${command}"
      end tell
    `;
    
    try {
      // @ts-ignore - This is a webkit API that exists in desktop browsers
      await window.webkit.messageHandlers.runAppleScript.postMessage(script);
      toast({
        title: "Success",
        description: "Command sent to Terminal",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open Terminal. Make sure you're on macOS.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl dark">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Wget GUI
      </h1>

      <Card className="p-4 mb-8 bg-zinc-900 border border-white/20">
        <div className="flex items-center gap-2">
          <code className="flex-1 text-white font-mono text-sm overflow-x-auto p-2">
            {generateCommand()}
          </code>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopyCommand}
            className="border-white/20 hover:bg-zinc-800"
          >
            <Clipboard className="h-4 w-4 text-white" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRunInTerminal}
            className="border-white/20 hover:bg-zinc-800"
          >
            <Terminal className="h-4 w-4 text-white" />
          </Button>
        </div>
      </Card>
      
      <form className="space-y-8">
        <Card className="p-6 bg-zinc-900 border border-white/20">
          <div className="space-y-6">
            <WgetUrlInput options={options} setOptions={setOptions} />
            <WgetDirectoryInput options={options} setOptions={setOptions} />
            <WgetRecursiveOptions options={options} setOptions={setOptions} />
            <WgetFileTypes options={options} setOptions={setOptions} />
          </div>
        </Card>
      </form>
    </div>
  );
};

export default WgetForm;