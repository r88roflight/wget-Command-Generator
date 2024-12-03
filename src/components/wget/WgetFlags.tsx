import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { WgetOptions } from "@/types/wget";

interface Props {
  options: WgetOptions;
  setOptions: (options: WgetOptions) => void;
}

export const WgetFlags = ({ options, setOptions }: Props) => {
  return (
    <Card className="p-6 bg-black border border-white/20">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white mb-4">Command Flags</h2>

        {/* Input/Output Flags */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Input/Output Flags</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">Input File (-i)</Label>
              <p className="text-sm text-zinc-400">Read URLs from a file</p>
            </div>
            <Input
              value={options.inputFile}
              onChange={(e) => setOptions({ ...options, inputFile: e.target.value })}
              placeholder="Path to file containing URLs"
              className="bg-black border-white/20 text-white w-[200px]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">Directory Prefix (-P)</Label>
              <p className="text-sm text-zinc-400">Set directory prefix for all files</p>
            </div>
            <Input
              value={options.directoryPrefix}
              onChange={(e) => setOptions({ ...options, directoryPrefix: e.target.value })}
              placeholder="Directory prefix"
              className="bg-black border-white/20 text-white w-[200px]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">Output Document (-O)</Label>
              <p className="text-sm text-zinc-400">Write documents to FILE</p>
            </div>
            <Input
              value={options.outputDocument}
              onChange={(e) => setOptions({ ...options, outputDocument: e.target.value })}
              placeholder="Output filename"
              className="bg-black border-white/20 text-white w-[200px]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">No Directories (-nd)</Label>
              <p className="text-sm text-zinc-400">Don't create directories</p>
            </div>
            <Switch
              checked={options.noDirectories === "true"}
              onCheckedChange={(checked) => setOptions({ ...options, noDirectories: checked ? "true" : "false" })}
              className="bg-zinc-700 data-[state=checked]:bg-white"
            />
          </div>
        </div>

        {/* HTTP Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">HTTP Options</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">HTTP User</Label>
              <p className="text-sm text-zinc-400">Set HTTP user</p>
            </div>
            <Input
              value={options.httpUser}
              onChange={(e) => setOptions({ ...options, httpUser: e.target.value })}
              placeholder="HTTP username"
              className="bg-black border-white/20 text-white w-[200px]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">HTTP Password</Label>
              <p className="text-sm text-zinc-400">Set HTTP password</p>
            </div>
            <Input
              type="password"
              value={options.httpPassword}
              onChange={(e) => setOptions({ ...options, httpPassword: e.target.value })}
              placeholder="HTTP password"
              className="bg-black border-white/20 text-white w-[200px]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">Post Data</Label>
              <p className="text-sm text-zinc-400">Use POST method; send string</p>
            </div>
            <Input
              value={options.postData}
              onChange={(e) => setOptions({ ...options, postData: e.target.value })}
              placeholder="POST data"
              className="bg-black border-white/20 text-white w-[200px]"
            />
          </div>
        </div>

        {/* FTP Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">FTP Options</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">FTP User</Label>
              <p className="text-sm text-zinc-400">Set FTP user</p>
            </div>
            <Input
              value={options.ftpUser}
              onChange={(e) => setOptions({ ...options, ftpUser: e.target.value })}
              placeholder="FTP username"
              className="bg-black border-white/20 text-white w-[200px]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base text-white">FTP Password</Label>
              <p className="text-sm text-zinc-400">Set FTP password</p>
            </div>
            <Input
              type="password"
              value={options.ftpPassword}
              onChange={(e) => setOptions({ ...options, ftpPassword: e.target.value })}
              placeholder="FTP password"
              className="bg-black border-white/20 text-white w-[200px]"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};