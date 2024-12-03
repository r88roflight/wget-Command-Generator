import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Folder } from "lucide-react";
import { WgetOptions } from "@/types/wget";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetDirectoryInput = ({ options, setOptions }: Props) => {
  const handleDirectorySelect = async () => {
    try {
      // @ts-ignore - This is a webkit API that exists in desktop browsers
      const directoryHandle = await window.showDirectoryPicker();
      setOptions({ ...options, saveDirectory: directoryHandle.name });
    } catch (error) {
      console.error("Failed to select directory:", error);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="directory" className="text-white">Save Directory</Label>
      <div className="flex gap-2">
        <Input
          id="directory"
          value={options.saveDirectory}
          readOnly
          placeholder="/path/to/downloads"
          className="bg-zinc-800 border-white/20 text-white flex-1"
        />
        <Button 
          type="button"
          onClick={handleDirectorySelect}
          variant="outline"
          className="bg-zinc-800 border-white/20 text-white hover:bg-zinc-700"
        >
          <Folder className="w-4 h-4 mr-2" />
          Choose
        </Button>
      </div>
    </div>
  );
};