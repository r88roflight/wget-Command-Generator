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

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetTabs = ({ options, setOptions }: Props) => {
  return (
    <Tabs defaultValue="presets" className="w-full">
      <div className="flex flex-col gap-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-6 bg-transparent gap-2">
          <TabsTrigger 
            value="presets" 
            className="bg-black border border-white/20 text-white data-[state=active]:bg-zinc-800 data-[state=active]:border-primary text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4"
          >
            Presets
          </TabsTrigger>
          <TabsTrigger 
            value="flags" 
            className="bg-black border border-white/20 text-white data-[state=active]:bg-zinc-800 data-[state=active]:border-primary text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4"
          >
            Flags
          </TabsTrigger>
          <TabsTrigger 
            value="options" 
            className="bg-black border border-white/20 text-white data-[state=active]:bg-zinc-800 data-[state=active]:border-primary text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4"
          >
            Options
          </TabsTrigger>
          <TabsTrigger 
            value="advanced" 
            className="bg-black border border-white/20 text-white data-[state=active]:bg-zinc-800 data-[state=active]:border-primary text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4"
          >
            Advanced
          </TabsTrigger>
          <TabsTrigger 
            value="behavior" 
            className="bg-black border border-white/20 text-white data-[state=active]:bg-zinc-800 data-[state=active]:border-primary text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4"
          >
            Download Behavior
          </TabsTrigger>
          <TabsTrigger 
            value="debugging" 
            className="bg-black border border-white/20 text-white data-[state=active]:bg-zinc-800 data-[state=active]:border-primary text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4"
          >
            Debugging
          </TabsTrigger>
        </TabsList>

        <div className="mt-0">
          <TabsContent value="presets" className="m-0">
            <WgetPresets options={options} setOptions={setOptions} />
          </TabsContent>

          <TabsContent value="flags" className="m-0">
            <WgetFlags options={options} setOptions={setOptions} />
          </TabsContent>

          <TabsContent value="options" className="m-0">
            <Card className="p-6 bg-black border border-white/20">
              <div className="space-y-6">
                <WgetRecursiveOptions options={options} setOptions={setOptions} />
                <WgetFileTypes options={options} setOptions={setOptions} />
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="m-0">
            <WgetAdvancedOptions options={options} setOptions={setOptions} />
          </TabsContent>
          
          <TabsContent value="behavior" className="m-0">
            <Card className="p-6 bg-black border border-white/20">
              <WgetDownloadBehavior options={options} setOptions={setOptions} />
            </Card>
          </TabsContent>
          
          <TabsContent value="debugging" className="m-0">
            <WgetDebuggingOptions options={options} setOptions={setOptions} />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
};