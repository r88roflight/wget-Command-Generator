import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { Info } from "lucide-react";

interface WgetOptions {
  url: string;
  recursive: boolean;
  maxDepth: number;
  waitTime: number;
  followLinks: boolean;
  includePattern: string;
  excludePattern: string;
}

const WgetGUI = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<WgetOptions>({
    url: "",
    recursive: false,
    maxDepth: 5,
    waitTime: 1,
    followLinks: true,
    includePattern: "",
    excludePattern: "",
  });

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

    setLoading(true);
    // Here you would typically make an API call to your backend
    // that would execute wget with the specified options
    toast({
      title: "Success",
      description: "Started downloading from " + options.url,
    });
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        Wget GUI
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="p-6">
          <div className="space-y-6">
            {/* URL Input */}
            <div className="space-y-2">
              <Label htmlFor="url" className="text-lg font-medium">
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
                className="w-full"
              />
            </div>

            {/* Recursive Download */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Recursive Download</Label>
                <p className="text-sm text-muted-foreground">
                  Download all linked pages
                </p>
              </div>
              <Switch
                checked={options.recursive}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, recursive: checked })
                }
              />
            </div>

            {/* Max Depth */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="maxDepth">Maximum Depth</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>How many levels deep to follow links</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select
                value={options.maxDepth.toString()}
                onValueChange={(value) =>
                  setOptions({ ...options, maxDepth: parseInt(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select depth" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 10].map((depth) => (
                    <SelectItem key={depth} value={depth.toString()}>
                      {depth}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Wait Time */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Wait Time (seconds)</Label>
                <span className="text-sm text-muted-foreground">
                  {options.waitTime}s
                </span>
              </div>
              <Slider
                value={[options.waitTime]}
                min={0}
                max={10}
                step={1}
                onValueChange={(value) =>
                  setOptions({ ...options, waitTime: value[0] })
                }
              />
            </div>

            {/* Follow Links */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Follow Links</Label>
                <p className="text-sm text-muted-foreground">
                  Follow links to other domains
                </p>
              </div>
              <Switch
                checked={options.followLinks}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, followLinks: checked })
                }
              />
            </div>

            {/* Include/Exclude Patterns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="includePattern">Include Pattern</Label>
                <Input
                  id="includePattern"
                  placeholder="*.pdf,*.doc"
                  value={options.includePattern}
                  onChange={(e) =>
                    setOptions({ ...options, includePattern: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excludePattern">Exclude Pattern</Label>
                <Input
                  id="excludePattern"
                  placeholder="*.jpg,*.png"
                  value={options.excludePattern}
                  onChange={(e) =>
                    setOptions({ ...options, excludePattern: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </Card>

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