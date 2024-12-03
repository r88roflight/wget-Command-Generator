import React, { createContext, useContext, useState } from 'react';
import { Preset } from '../types/preset';
import { defaultMirrorPreset } from './defaultPreset';

interface PresetContextType {
  presets: Preset[];
  setPresets: (presets: Preset[]) => void;
  activePreset: string | null;
  setActivePreset: (preset: string | null) => void;
  expandedPresets: string[];
  setExpandedPresets: (presets: string[]) => void;
  deletedPresets: Preset[];
  setDeletedPresets: (presets: Preset[]) => void;
}

const PresetContext = createContext<PresetContextType | undefined>(undefined);

export const PresetProvider = ({ children }: { children: React.ReactNode }) => {
  const [presets, setPresets] = useState<Preset[]>([defaultMirrorPreset]);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [expandedPresets, setExpandedPresets] = useState<string[]>([]);
  const [deletedPresets, setDeletedPresets] = useState<Preset[]>([]);

  return (
    <PresetContext.Provider
      value={{
        presets,
        setPresets,
        activePreset,
        setActivePreset,
        expandedPresets,
        setExpandedPresets,
        deletedPresets,
        setDeletedPresets,
      }}
    >
      {children}
    </PresetContext.Provider>
  );
};

export const usePresetContext = () => {
  const context = useContext(PresetContext);
  if (context === undefined) {
    throw new Error('usePresetContext must be used within a PresetProvider');
  }
  return context;
};