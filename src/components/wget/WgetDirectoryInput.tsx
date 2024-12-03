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
  const handleDirectorySelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const path = files[0].webkitRelativePath.split('/')[0];
        setOptions({ ...options, saveDirectory: path });
      }
    };
    
    input.click();
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
          className="bg-black border-white/20 text-white flex-1"
        />
        <Button 
          type="button"
          onClick={handleDirectorySelect}
          variant="outline"
          className="bg-black border-white/20 text-white hover:bg-zinc-900"
        >
          <Folder className="w-4 h-4 mr-2" />
          Choose
        </Button>
      </div>
    </div>
  );
};