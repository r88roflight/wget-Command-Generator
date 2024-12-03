import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, X } from "lucide-react";

interface PresetCommandProps {
  command: string;
  onDelete: () => void;
}

export const PresetCommand = ({ command, onDelete }: PresetCommandProps) => {
  const [showX, setShowX] = useState(false);

  const handleClick = () => {
    if (showX) {
      onDelete();
    } else {
      setShowX(true);
    }
  };

  return (
    <div className="flex items-center justify-between p-2 mb-2 border border-white/20 rounded-md bg-black/50">
      <span className="text-sm text-zinc-400">{command}</span>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-zinc-900"
        onClick={handleClick}
      >
        {showX ? (
          <X className="h-4 w-4 text-white" />
        ) : (
          <Minus className="h-4 w-4 text-white" />
        )}
      </Button>
    </div>
  );
};