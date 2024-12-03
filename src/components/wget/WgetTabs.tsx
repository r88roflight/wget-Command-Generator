import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WgetOptions } from "@/types/wget";
import { WgetAdvancedOptions } from "./WgetAdvancedOptions";
import { WgetFileTypes } from "./WgetFileTypes";
import { WgetRecursiveOptions } from "./WgetRecursiveOptions";
import { Card } from "@/components/ui/card";
import { WgetDebuggingOptions } from "./WgetDebuggingOptions";
import { WgetDownloadBehavior } from "./WgetDownloadBehavior";
import { WgetPresets } from "./WgetPresets";
import { WgetFlags } from "./WgetFlags";
import { PresetProvider } from "./preset/PresetContext";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetTabs = ({ options, setOptions }: Props) => {
  const [activeTab, setActiveTab] = React.useState<string | undefined>(undefined);

  const handleTabClick = (value: string) => {
    setActiveTab(prev => prev === value ? undefined : value);
  };

  return (
    <PresetProvider>
      <Tabs 
        value={activeTab} 
        className="w-full mt-6 sm:mt-0"
      >
        <div className="flex flex-col gap-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 bg-transparent gap-2 px-2 sm:px-0">
            <TabsTrigger 
              value="presets"
              onClick={() => handleTabClick("presets")}
              className="bg-black border border-white/20 text-white data-[state=active]:bg-zinc-800 data-[state=active]:border-primary text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4 py-2"
            >
              Presets
            </TabsTrigger>
            <TabsTrigger 
              value="options"
              onClick={() => handleTabClick("options")}
              className="bg-black border border-white/20 text-white data-[state=active]:bg-zinc-800 data-[state=active]:border-primary text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4 py-2"
            >
              Options
            </TabsTrigger>
            <TabsTrigger 
              value="advanced"
              onClick={() => handleTabClick("advanced")}
              className="bg-black border border-white/20 text-white data-[state=active]:bg-zinc-800 data-[state=active]:border-primary text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4 py-2"
            >
              Advanced
            </TabsTrigger>
            <TabsTrigger 
              value="flags"
              onClick={() => handleTabClick("flags")}
              className="bg-black border border-white/20 text-white data-[state=active]:bg-zinc-800 data-[state=active]:border-primary text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4 py-2"
            >
              Flags
            </TabsTrigger>
            <TabsTrigger 
              value="behavior"
              onClick={() => handleTabClick("behavior")}
              className="bg-black border border-white/20 text-white data-[state=active]:bg-zinc-800 data-[state=active]:border-primary text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4 py-2"
            >
              Behavior
            </TabsTrigger>
            <TabsTrigger 
              value="debugging"
              onClick={() => handleTabClick("debugging")}
              className="bg-black border border-white/20 text-white data-[state=active]:bg-zinc-800 data-[state=active]:border-primary text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4 py-2"
            >
              Debug
            </TabsTrigger>
          </TabsList>

          <div className="mt-16 sm:mt-6 px-2 sm:px-0">
            <TabsContent value="presets" className="m-0">
              <WgetPresets options={options} setOptions={setOptions} />
            </TabsContent>

            <TabsContent value="options" className="m-0">
              <Card className="p-4 sm:p-6 bg-black border border-white/20">
                <div className="space-y-6">
                  <WgetRecursiveOptions options={options} setOptions={setOptions} />
                  <WgetFileTypes options={options} setOptions={setOptions} />
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="advanced" className="m-0">
              <WgetAdvancedOptions options={options} setOptions={setOptions} />
            </TabsContent>

            <TabsContent value="flags" className="m-0">
              <WgetFlags options={options} setOptions={setOptions} />
            </TabsContent>
            
            <TabsContent value="behavior" className="m-0">
              <Card className="p-4 sm:p-6 bg-black border border-white/20">
                <WgetDownloadBehavior options={options} setOptions={setOptions} />
              </Card>
            </TabsContent>
            
            <TabsContent value="debugging" className="m-0">
              <WgetDebuggingOptions options={options} setOptions={setOptions} />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </PresetProvider>
  );
};