import { useWgetOptions } from "./wget/useWgetOptions";
import { useWgetCommandGenerator } from "./wget/useWgetCommandGenerator";

export const useWgetCommand = () => {
  const { options, setOptions, resetOptions } = useWgetOptions();
  const { generateCommand } = useWgetCommandGenerator();

  const invalidFlags = [
    '--level=0',
    '--level=',
  ];

  return {
    options,
    setOptions,
    resetOptions,
    generateCommand: () => generateCommand(options),
    invalidFlags,
  };
};