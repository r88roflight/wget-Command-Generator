import React from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { WgetOptions } from "@/types/wget";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetRequirementsList = ({ options, setOptions }: Props) => {
  const requirements = [
    {
      id: "recursive",
      label: "Download Recursively",
      description: "Download all linked pages and their resources",
      defaultChecked: true
    },
    {
      id: "pageRequisites",
      label: "Download Page Requirements",
      description: "Get all images, CSS, JS files needed to display the page properly",
      defaultChecked: true
    },
    {
      id: "noClobber",
      label: "No Overwriting",
      description: "Don't overwrite existing files",
      defaultChecked: true
    },
    {
      id: "convertLinks",
      label: "Convert Links",
      description: "Convert links to make them suitable for local viewing",
      defaultChecked: true
    },
    {
      id: "adjustExtension",
      label: "Adjust File Extensions",
      description: "Add appropriate extensions to files (.html, .css, etc.)",
      defaultChecked: true
    },
    {
      id: "mirror",
      label: "Mirror Website",
      description: "Create an exact mirror of the website structure",
      defaultChecked: true
    },
    {
      id: "includeParents",
      label: "Include Parent Directories",
      description: "Download necessary parent directory components",
      defaultChecked: true
    },
    {
      id: "followLinks",
      label: "Follow Links",
      description: "Follow and download linked content within the same domain",
      defaultChecked: true
    },
    {
      id: "spiderMode",
      label: "Spider Mode",
      description: "Check links and structure before downloading",
      defaultChecked: false
    },
    {
      id: "timestamping",
      label: "Use Timestamping",
      description: "Only download newer files than local copies",
      defaultChecked: true
    },
    {
      id: "continueTransfer",
      label: "Continue Interrupted Downloads",
      description: "Resume partially downloaded files",
      defaultChecked: true
    }
  ];

  const handleRequirementChange = (checked: boolean, id: string) => {
    setOptions({
      ...options,
      [id]: checked
    });
  };

  // Set default values on component mount
  React.useEffect(() => {
    const defaultOptions = requirements.reduce((acc, req) => {
      if (req.defaultChecked) {
        acc[req.id] = true;
      }
      return acc;
    }, {} as Record<string, boolean>);

    setOptions(prev => ({
      ...prev,
      ...defaultOptions
    }));
  }, []);

  return (
    <Card className="p-6 bg-black border border-white/20">
      <h3 className="text-lg font-medium text-white mb-4">Required Settings for Website Mirroring</h3>
      <div className="space-y-4">
        {requirements.map((requirement) => (
          <div key={requirement.id} className="flex items-start space-x-3">
            <Checkbox
              id={requirement.id}
              checked={options[requirement.id as keyof WgetOptions] as boolean}
              onCheckedChange={(checked) => handleRequirementChange(checked as boolean, requirement.id)}
              className="mt-1 border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
            />
            <div className="space-y-1">
              <Label
                htmlFor={requirement.id}
                className="text-base text-white cursor-pointer"
              >
                {requirement.label}
              </Label>
              <p className="text-sm text-zinc-400">{requirement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};