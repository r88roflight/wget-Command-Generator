import React, { createContext, useContext, useState } from 'react';
import { Preset } from '../types/preset';
import { defaultMirrorPreset } from './defaultPreset';

interface PresetContextType {
  presets: Preset[];
  setPresets: (presets: Preset[]) => void;
  deletedPresets: Preset[];
  setDeletedPresets: (presets: Preset[]) => void;
  activePreset: string | null;
  setActivePreset: (preset: string | null) => void;
  expandedPresets: string[];
  setExpandedPresets: (presets: string[]) => void;
}

const PresetContext = createContext<PresetContextType | undefined>(undefined);

export const PresetProvider = ({ children }: { children: React.ReactNode }) => {
  const [presets, setPresets] = useState<Preset[]>([defaultMirrorPreset]);
  const [deletedPresets, setDeletedPresets] = useState<Preset[]>([]);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [expandedPresets, setExpandedPresets] = useState<string[]>([]);

  return (
    <PresetContext.Provider
      value={{
        presets,
        setPresets,
        deletedPresets,
        setDeletedPresets,
        activePreset,
        setActivePreset,
        expandedPresets,
        setExpandedPresets,
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