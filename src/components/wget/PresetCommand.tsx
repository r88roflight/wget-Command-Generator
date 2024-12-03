import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface PresetCommandProps {
  command: string;
  onDelete: () => void;
  onAdd: () => void;
}

export const PresetCommand = ({ command, onDelete, onAdd }: PresetCommandProps) => {
  return (
    <div className="flex items-center justify-between p-2 mb-2 border border-white/20 rounded-md bg-black/50">
      <span className="text-sm text-zinc-400">{command}</span>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-zinc-900"
          onClick={onAdd}
        >
          <Plus className="h-4 w-4 text-white" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-zinc-900"
          onClick={onDelete}
        >
          <Minus className="h-4 w-4 text-white" />
        </Button>
      </div>
    </div>
  );
};