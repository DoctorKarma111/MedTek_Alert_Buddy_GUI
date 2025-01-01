import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/layout/sidebar";
import { Header } from "./components/layout/header";
import { StatusIndicator } from "./components/dashboard/status-indicator";
import { PresetSelector } from "./components/dashboard/preset-selector";
import { BrightnessControl } from "./components/dashboard/brightness-control";
import { SettingsForm } from "./components/settings/settings-form";
import { UserGuide } from "./pages/user-guide";
import { Stats } from "./pages/stats";
import { useState } from "react";
import { NotificationProvider } from "./providers/notification-provider";
import { useNotification } from "./providers/notification-provider";

function AppContent() {
  const [selectedPreset, setSelectedPreset] = useState(1);
  const mockUser = { name: "John Doe", rank: "Administrator" };
  const { showNotification } = useNotification();

  const handlePresetSelect = (preset: number) => {
    setSelectedPreset(preset);
    showNotification(`Default preset set to #${preset}`);
  };

  const handleSettingsSave = (settings: { apiToken: string; wledIp: string }) => {
    console.log("Settings saved:", settings);
    showNotification("Settings saved successfully");
  };

  const handleBrightnessChange = (value: number) => {
    console.log("Brightness changed:", value);
  };

  return (
    <Router>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header user={mockUser} />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="space-y-6">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <StatusIndicator
                      isBackendRunning={true}
                      alertStatus="standby"
                    />
                    <PresetSelector
                      selectedPreset={selectedPreset}
                      onPresetSelect={handlePresetSelect}
                    />
                    <BrightnessControl onBrightnessChange={handleBrightnessChange} />
                  </div>
                }
              />
              <Route path="/stats" element={<Stats />} />
              <Route
                path="/settings"
                element={
                  <div className="space-y-6">
                    <h1 className="text-3xl font-bold">Settings</h1>
                    <div className="max-w-2xl">
                      <SettingsForm
                        onSave={handleSettingsSave}
                        initialSettings={{
                          apiToken: "",
                          wledIp: "",
                        }}
                      />
                    </div>
                  </div>
                }
              />
              <Route path="/guide" element={<UserGuide />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
}

export default App;