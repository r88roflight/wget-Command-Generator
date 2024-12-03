import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Minus, X } from "lucide-react";

interface PresetCommandProps {
  command: string;
  onDelete: () => void;
}

export const PresetCommand = ({ command, onDelete }: PresetCommandProps) => {
  const [showX, setShowX] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setShowX(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    if (showX) {
      onDelete();
      setShowX(false);
    } else {
      setShowX(true);
    }
  };

  return (
    <Button
      ref={buttonRef}
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
  );
};