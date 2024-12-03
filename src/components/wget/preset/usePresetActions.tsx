import { useToast } from '@/components/ui/use-toast';
import { usePresetContext } from './PresetContext';
import { defaultMirrorPreset } from './defaultPreset';
import { WgetOptions } from '@/types/wget';

export const usePresetActions = (options: WgetOptions, setOptions: (options: WgetOptions) => void) => {
  const { toast } = useToast();
  const {
    presets,
    setPresets,
    deletedPresets,
    setDeletedPresets,
    activePreset,
    setActivePreset,
  } = usePresetContext();

  const handleDeletePreset = (presetName: string) => {
    const presetToDelete = presets.find(p => p.name === presetName);
    if (presetToDelete) {
      setDeletedPresets(prev => [...prev, presetToDelete]);
      setPresets(prev => prev.filter(preset => preset.name !== presetName));
      toast({
        title: "Success",
        description: "Preset deleted successfully",
      });
    }
  };

  const handleRestorePresets = () => {
    if (deletedPresets.length > 0) {
      setPresets(prev => [...prev, ...deletedPresets]);
      setDeletedPresets([]);
      toast({
        title: "Success",
        description: "Deleted presets have been restored",
      });
    }
  };

  const handleResetPreset = (preset: Preset) => {
    if (preset.name === "Mirror Website Locally") {
      setPresets((prev) =>
        prev.map((p) =>
          p.name === preset.name ? { ...defaultMirrorPreset } : p
        )
      );
      if (activePreset === preset.name) {
        setOptions({
          ...options,
          ...defaultMirrorPreset.options,
        });
      }
      toast({
        title: "Success",
        description: "Preset has been reset to default settings",
      });
    }
  };

  return {
    handleDeletePreset,
    handleRestorePresets,
    handleResetPreset,
  };
};