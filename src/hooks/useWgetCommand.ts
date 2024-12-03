import { useState } from "react";
import { useWgetOptions } from "./wget/useWgetOptions";
import { useWgetCommandGenerator } from "./wget/useWgetCommandGenerator";

export const useWgetCommand = () => {
  const [loading, setLoading] = useState(false);
  const { options, setOptions, resetOptions } = useWgetOptions();
  const { generateCommand } = useWgetCommandGenerator();

  return {
    options,
    setOptions,
    loading,
    setLoading,
    resetOptions,
    generateCommand: () => generateCommand(options),
  };
};