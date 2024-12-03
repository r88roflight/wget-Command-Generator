import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WgetOptions } from "@/types/wget";
import { WgetAdvancedOptions } from "./WgetAdvancedOptions";
import { WgetDownloadBehavior } from "./WgetDownloadBehavior";
import { WgetFileTypes } from "./WgetFileTypes";
import { WgetRecursiveOptions } from "./WgetRecursiveOptions";
import { Card } from "@/components/ui/card";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetTabs = ({ options, setOptions }: Props) => {
  return (
    <Tabs defaultValue="options" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="options">Options</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
        <TabsTrigger value="behavior">Download Behavior</TabsTrigger>
        <TabsTrigger value="additional">Additional Features</TabsTrigger>
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
      
      <TabsContent value="additional" className="mt-4">
        <Card className="p-6 bg-black border border-white/20">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Additional Features</h3>
            {/* Additional features will be added in future updates */}
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};