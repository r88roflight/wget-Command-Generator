import { useState } from "react";
import { useWgetOptions } from "./wget/useWgetOptions";
import { useWgetCommandGenerator } from "./wget/useWgetCommandGenerator";

export const useWgetCommand = () => {
  const [loading, setLoading] = useState(false);
  const { options, setOptions, resetOptions } = useWgetOptions();
  const { generateCommand } = useWgetCommandGenerator();

  // Flags that should be highlighted in red if they appear in the command
  const invalidFlags = [
    '--level=0',
    '--level=',
  ];

  return {
    options,
    setOptions,
    loading,
    setLoading,
    resetOptions,
    generateCommand: () => generateCommand(options),
    invalidFlags,
  };
};