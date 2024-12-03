import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WgetUrlInput } from "./WgetUrlInput";
import { WgetRecursiveOptions } from "./WgetRecursiveOptions";
import { WgetDirectoryInput } from "./WgetDirectoryInput";
import { WgetFileTypes } from "./WgetFileTypes";
import { useWgetCommand } from "@/hooks/useWgetCommand";
import { Terminal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const WgetForm = () => {
  const { toast } = useToast();
  const { options, setOptions, generateCommand, loading } = useWgetCommand();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="p-6 bg-zinc-900 border-zinc-800">
          <div className="space-y-6">
            <WgetUrlInput options={options} setOptions={setOptions} />
            <WgetDirectoryInput options={options} setOptions={setOptions} />
            <WgetRecursiveOptions options={options} setOptions={setOptions} />
            <WgetFileTypes options={options} setOptions={setOptions} />
          </div>
        </Card>

        <Button
          type="submit"
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-white"
          size="lg"
          disabled={loading}
        >
          {loading ? (
            "Processing..."
          ) : (
            <>
              <Terminal className="w-4 h-4 mr-2" />
              Open in Terminal
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default WgetForm;