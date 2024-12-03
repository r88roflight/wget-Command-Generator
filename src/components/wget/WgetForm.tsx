import React from "react";
import { Card } from "@/components/ui/card";
import { WgetUrlInput } from "./WgetUrlInput";
import { WgetRecursiveOptions } from "./WgetRecursiveOptions";
import { WgetDirectoryInput } from "./WgetDirectoryInput";
import { WgetFileTypes } from "./WgetFileTypes";
import { useWgetCommand } from "@/hooks/useWgetCommand";
import { Clipboard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const WgetForm = () => {
  const { toast } = useToast();
  const { options, setOptions, generateCommand } = useWgetCommand();

  const handleCopyCommand = async () => {
    const command = generateCommand();
    await navigator.clipboard.writeText(command);
    toast({
      title: "Success",
      description: "Command copied to clipboard",
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl dark">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Wget GUI
      </h1>

      <Card className="p-4 mb-8 bg-black border border-white/20">
        <div className="flex items-center gap-2">
          <code className="flex-1 text-white font-mono text-sm overflow-x-auto p-2">
            {generateCommand()}
          </code>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopyCommand}
            className="border-white/20 hover:bg-zinc-900 bg-black"
          >
            <Clipboard className="h-4 w-4 text-white" />
          </Button>
        </div>
      </Card>
      
      <form className="space-y-8">
        <Card className="p-6 bg-black border border-white/20">
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