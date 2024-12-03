import React from "react";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";

interface PresetCommandProps {
  command: string;
  onDelete: () => void;
}

export const PresetCommand = ({ command, onDelete }: PresetCommandProps) => {
  return (
    <div className="flex items-center justify-between p-2 mb-2 border border-white/20 rounded-md bg-black/50">
      <span className="text-sm text-zinc-400">{command}</span>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-zinc-900"
        onClick={onDelete}
      >
        <Minus className="h-4 w-4 text-white" />
      </Button>
    </div>
  );
};