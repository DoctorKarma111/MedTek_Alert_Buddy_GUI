import { GuideSection } from "@/components/guide/guide-section";

export function UserGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Guide</h1>
      
      <GuideSection title="Getting Started">
        <div className="space-y-4">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80" 
            alt="Medical emergency response"
            className="rounded-lg w-full mb-4"
          />
          <p className="text-lg">
            Welcome to the Medrunner LED Control System. This guide will help you understand how to use the system effectively for emergency response coordination.
          </p>
        </div>
      </GuideSection>

      <GuideSection title="Dashboard Overview">
        <div className="space-y-4">
          <img 
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80" 
            alt="Control center dashboard"
            className="rounded-lg w-full mb-4"
          />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="border-l-4 border-secondary p-4 bg-secondary/10">
              <h3 className="font-bold mb-2">Status Indicators</h3>
              <p>Monitor backend connectivity and alert status in real-time</p>
            </div>
            <div className="border-l-4 border-primary p-4 bg-primary/10">
              <h3 className="font-bold mb-2">Light Presets</h3>
              <p>Quick access to predefined emergency light patterns</p>
            </div>
          </div>
        </div>
      </GuideSection>

      <GuideSection title="Emergency Protocols">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-destructive/10 p-4 rounded-lg">
              <h3 className="font-bold text-destructive mb-2">Emergency Response</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Rapid red flashing for critical situations</li>
                <li>Automatic alert dispatch</li>
                <li>Team coordination protocols</li>
              </ul>
            </div>
            <div className="bg-secondary/10 p-4 rounded-lg">
              <h3 className="font-bold text-secondary mb-2">Standard Operations</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Default patterns for routine missions</li>
                <li>Status monitoring</li>
                <li>Communication protocols</li>
              </ul>
            </div>
          </div>
        </div>
      </GuideSection>
    </div>
  );
}