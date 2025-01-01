import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface SettingsFormProps {
  onSave: (settings: { apiToken: string; wledIp: string }) => void;
  initialSettings?: { apiToken: string; wledIp: string };
}

export function SettingsForm({ onSave, initialSettings }: SettingsFormProps) {
  const [settings, setSettings] = useState({
    apiToken: initialSettings?.apiToken || "",
    wledIp: initialSettings?.wledIp || "",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Configure your Light Buddy connection settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apiToken">Your Unique Medrunner API Token</Label>
          <Input
            id="apiToken"
            value={settings.apiToken}
            onChange={(e) =>
              setSettings({ ...settings, apiToken: e.target.value })
            }
            placeholder="Enter your API token"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="wledIp">WLED IP Address</Label>
          <Input
            id="wledIp"
            value={settings.wledIp}
            onChange={(e) => setSettings({ ...settings, wledIp: e.target.value })}
            placeholder="e.g., 192.168.1.100"
          />
        </div>
        <Button onClick={() => onSave(settings)} className="w-full">
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
}