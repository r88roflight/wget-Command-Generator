import React from "react";
import { Label } from "@/components/ui/label";
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
          
          <div className="space-y-2">
            <Label className="text-white">Input File (-i)</Label>
            <Input
              value={options.inputFile}
              onChange={(e) => setOptions({ ...options, inputFile: e.target.value })}
              placeholder="Path to file containing URLs"
              className="bg-black border-white/20 text-white"
            />
            <p className="text-sm text-zinc-400">Read URLs from a local or external file</p>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Directory Prefix (-P)</Label>
            <Input
              value={options.directoryPrefix}
              onChange={(e) => setOptions({ ...options, directoryPrefix: e.target.value })}
              placeholder="Directory prefix for all files"
              className="bg-black border-white/20 text-white"
            />
            <p className="text-sm text-zinc-400">Set directory prefix for all files</p>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Output Document (-O)</Label>
            <Input
              value={options.outputDocument}
              onChange={(e) => setOptions({ ...options, outputDocument: e.target.value })}
              placeholder="Write documents to FILE"
              className="bg-black border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Append Output (-a)</Label>
            <Input
              value={options.appendOutput}
              onChange={(e) => setOptions({ ...options, appendOutput: e.target.value })}
              placeholder="Append to LOG"
              className="bg-black border-white/20 text-white"
            />
          </div>
        </div>

        {/* Directory Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Directory Options</h3>
          
          <div className="space-y-2">
            <Label className="text-white">Cut Directories (--cut-dirs)</Label>
            <Input
              type="number"
              min="0"
              value={options.cutDirs}
              onChange={(e) => setOptions({ ...options, cutDirs: parseInt(e.target.value) || 0 })}
              placeholder="Number of directory components to cut"
              className="bg-black border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Directory Prefix (-nd, --no-directories)</Label>
            <Input
              value={options.noDirectories}
              onChange={(e) => setOptions({ ...options, noDirectories: e.target.value })}
              placeholder="Don't create directories"
              className="bg-black border-white/20 text-white"
            />
          </div>
        </div>

        {/* HTTP Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">HTTP Options</h3>
          
          <div className="space-y-2">
            <Label className="text-white">HTTP User (-U, --user)</Label>
            <Input
              value={options.httpUser}
              onChange={(e) => setOptions({ ...options, httpUser: e.target.value })}
              placeholder="Set HTTP user"
              className="bg-black border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">HTTP Password (--password)</Label>
            <Input
              type="password"
              value={options.httpPassword}
              onChange={(e) => setOptions({ ...options, httpPassword: e.target.value })}
              placeholder="Set HTTP password"
              className="bg-black border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Post Data (--post-data)</Label>
            <Input
              value={options.postData}
              onChange={(e) => setOptions({ ...options, postData: e.target.value })}
              placeholder="Use POST method; send string"
              className="bg-black border-white/20 text-white"
            />
          </div>
        </div>

        {/* FTP Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">FTP Options</h3>
          
          <div className="space-y-2">
            <Label className="text-white">FTP User</Label>
            <Input
              value={options.ftpUser}
              onChange={(e) => setOptions({ ...options, ftpUser: e.target.value })}
              placeholder="Set FTP user"
              className="bg-black border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">FTP Password</Label>
            <Input
              type="password"
              value={options.ftpPassword}
              onChange={(e) => setOptions({ ...options, ftpPassword: e.target.value })}
              placeholder="Set FTP password"
              className="bg-black border-white/20 text-white"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};