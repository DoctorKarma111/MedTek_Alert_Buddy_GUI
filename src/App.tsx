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

function App() {
  const [selectedPreset, setSelectedPreset] = useState(1);
  const mockUser = { name: "John Doe", rank: "Administrator" };

  const handleBrightnessChange = (value: number) => {
    console.log("Brightness changed:", value);
    // Add your brightness control logic here
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
                      onPresetSelect={setSelectedPreset}
                    />
                    <BrightnessControl onBrightnessChange={handleBrightnessChange} />
                  </div>
                }
              />
              <Route path="/stats" element={<Stats />} />
              <Route
                path="/settings"
                element={
                  <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Settings</h1>
                    <SettingsForm
                      onSave={console.log}
                      initialSettings={{
                        apiToken: "",
                        wledIp: "",
                      }}
                    />
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

export default App;