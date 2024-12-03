import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WgetOptions } from "@/types/wget";
import { WgetAdvancedOptions } from "./WgetAdvancedOptions";
import { WgetDownloadBehavior } from "./WgetDownloadBehavior";
import { WgetFileTypes } from "./WgetFileTypes";
import { WgetRecursiveOptions } from "./WgetRecursiveOptions";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetTabs = ({ options, setOptions }: Props) => {
  return (
    <Tabs defaultValue="options" className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-transparent gap-2">
        <TabsTrigger 
          value="options" 
          className="bg-black border border-white/20 text-white data-[state=active]:bg-zinc-800 data-[state=active]:border-primary"
        >
          Options
        </TabsTrigger>
        <TabsTrigger 
          value="advanced" 
          className="bg-black border border-white/20 text-white data-[state=active]:bg-zinc-800 data-[state=active]:border-primary"
        >
          Advanced
        </TabsTrigger>
        <TabsTrigger 
          value="behavior" 
          className="bg-black border border-white/20 text-white data-[state=active]:bg-zinc-800 data-[state=active]:border-primary"
        >
          Download Behavior
        </TabsTrigger>
        <TabsTrigger 
          value="debugging" 
          className="bg-black border border-white/20 text-white data-[state=active]:bg-zinc-800 data-[state=active]:border-primary"
        >
          Debugging
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="options" className="mt-4">
        <Card className="p-6 bg-black border border-white/20">
          <div className="space-y-6">
            <WgetRecursiveOptions options={options} setOptions={setOptions} />
            <WgetFileTypes options={options} setOptions={setOptions} />
          </div>
        </Card>
      </TabsContent>
      
      <TabsContent value="advanced" className="mt-4">
        <WgetAdvancedOptions options={options} setOptions={setOptions} />
      </TabsContent>
      
      <TabsContent value="behavior" className="mt-4">
        <Card className="p-6 bg-black border border-white/20">
          <WgetDownloadBehavior options={options} setOptions={setOptions} />
        </Card>
      </TabsContent>
      
      <TabsContent value="debugging" className="mt-4">
        <Card className="p-6 bg-black border border-white/20">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Debugging Options</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-white">Log Only Errors</Label>
                <p className="text-sm text-zinc-400">Suppress non-error output</p>
              </div>
              <Switch
                checked={options.logOnlyErrors}
                onCheckedChange={(checked) => setOptions({ ...options, logOnlyErrors: checked })}
                className="bg-zinc-700 data-[state=checked]:bg-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-white">Debug Mode</Label>
                <p className="text-sm text-zinc-400">Show detailed debugging information</p>
              </div>
              <Switch
                checked={options.debug}
                onCheckedChange={(checked) => setOptions({ ...options, debug: checked })}
                className="bg-zinc-700 data-[state=checked]:bg-white"
              />
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};