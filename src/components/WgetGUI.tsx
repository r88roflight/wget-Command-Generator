import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { WgetTabs } from "./wget/WgetTabs";
import { useWgetCommand } from "@/hooks/useWgetCommand";

const WgetGUI = () => {
  const { toast } = useToast();
  const { options, setOptions, loading, generateCommand } = useWgetCommand();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!options.url) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Started downloading from " + options.url,
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        Wget GUI
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Command Preview */}
        <Card className="p-4 bg-black border border-white/20">
          <pre className="whitespace-pre-wrap break-all text-white font-mono text-sm">
            {generateCommand()}
          </pre>
        </Card>

        {/* Basic Options */}
        <Card className="p-6 bg-black border border-white/20">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-lg font-medium text-white">
                URL
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={options.url}
                onChange={(e) =>
                  setOptions({ ...options, url: e.target.value })
                }
                className="bg-black border-white/20 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="saveDirectory" className="text-lg font-medium text-white">
                Save Directory
              </Label>
              <Input
                id="saveDirectory"
                placeholder="/path/to/directory"
                value={options.saveDirectory}
                onChange={(e) =>
                  setOptions({ ...options, saveDirectory: e.target.value })
                }
                className="bg-black border-white/20 text-white"
              />
            </div>
          </div>
        </Card>

        {/* Tabs Section */}
        <WgetTabs options={options} setOptions={setOptions} />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={loading}
        >
          {loading ? "Processing..." : "Start Download"}
        </Button>
      </form>
    </div>
  );
};

export default WgetGUI;