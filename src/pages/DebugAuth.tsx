import { AuthDebugger } from "@/components/AuthDebugger";

const DebugAuth = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Authentication Debug Page</h1>
      <AuthDebugger />
    </div>
  );
};

export default DebugAuth; 