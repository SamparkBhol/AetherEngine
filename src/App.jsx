
import React from 'react';
import AetherEngineIDE from '@/components/AetherEngineIDE';
import { Toaster } from '@/components/ui/toaster'; // Assuming you might want toasts later

function App() {
  return (
    <div className="h-screen w-screen bg-background text-foreground overflow-hidden">
      <AetherEngineIDE />
      <Toaster />
    </div>
  );
}

export default App;
