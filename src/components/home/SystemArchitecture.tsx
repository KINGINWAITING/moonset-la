import { motion, useInView } from "framer-motion";
import { Brain, Shield, Users, Cpu, Database, ChartBar } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { memo, useRef, useMemo } from "react";
import { SystemComponent } from "./SystemComponent";
import { ConnectionNetwork } from "./ConnectionNetwork";
import { ParticleSystem } from "./ParticleSystem";
import { SystemMonitor } from "./SystemMonitor";

export const SystemArchitecture = memo(() => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  // Define system components with their positions and connections
  const systemComponents = useMemo(() => [
    {
      id: "community",
      title: "Community-Driven & Rewarded",
      description: "User interaction layer for data contribution and peer review participation",
      icon: <Users className="w-8 h-8" />,
      position: { layer: 1, column: 2 },
      type: "interface",
      status: "active",
      connections: ["mare"]
    },
    {
      id: "mare",
      title: "MoonSet AI Research Engine (MARE)",
      description: "Central processing hub for AI-powered analysis and coordination",
      icon: <Brain className="w-8 h-8" />,
      position: { layer: 2, column: 1 },
      type: "processing",
      status: "active",
      connections: ["pattern-recognition", "del", "community"]
    },
    {
      id: "pattern-recognition",
      title: "Advanced Pattern Recognition",
      description: "Specialized processing module for detecting subtle patterns and inconsistencies",
      icon: <Cpu className="w-8 h-8" />,
      position: { layer: 2, column: 3 },
      type: "processing",
      status: "active",
      connections: ["mare", "data-archive"]
    },
    {
      id: "del",
      title: "Decentralized Evidence Ledger (DEL)",
      description: "Blockchain storage layer for cryptographically secured evidence",
      icon: <Shield className="w-8 h-8" />,
      position: { layer: 3, column: 1 },
      type: "storage",
      status: "active",
      connections: ["mare", "data-archive"]
    },
    {
      id: "data-archive",
      title: "Immutable Data Archive",
      description: "Persistent storage layer with cryptographic verification",
      icon: <Database className="w-8 h-8" />,
      position: { layer: 3, column: 3 },
      type: "storage",
      status: "active",
      connections: ["del", "pattern-recognition"]
    },
    {
      id: "analytics",
      title: "Transparent Analytics",
      description: "System monitoring overlay providing real-time insights",
      icon: <ChartBar className="w-8 h-8" />,
      position: { layer: 0, column: 2 }, // Overlay layer
      type: "monitoring",
      status: "active",
      connections: ["community", "mare", "pattern-recognition", "del", "data-archive"]
    }
  ], []);

  return (
    <div ref={sectionRef} id="architecture" className="relative min-h-screen py-20">
      {/* Circuit Board Background */}
      <div className={`absolute inset-0 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(${isDark ? '#334155' : '#e2e8f0'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDark ? '#334155' : '#e2e8f0'} 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Diagonal Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="circuit" patternUnits="userSpaceOnUse" width="10" height="10">
              <path 
                d="M0,5 L10,5 M5,0 L5,10" 
                stroke={isDark ? "rgba(139, 69, 255, 0.1)" : "rgba(59, 130, 246, 0.1)"} 
                strokeWidth="0.1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.8 }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center px-4 py-2 rounded-full border mb-6 font-mono text-sm ${
            isDark 
              ? 'border-purple-500/30 bg-purple-500/10 text-purple-400' 
              : 'border-blue-500/30 bg-blue-500/10 text-blue-600'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${isDark ? 'bg-green-400' : 'bg-green-500'}`} />
            SYSTEM ARCHITECTURE v2.0.1
          </div>

          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-mono ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            MoonSet{" "}
            <span className={isDark ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400" : "text-blue-600"}>
              Truth Protocol
            </span>
          </h2>

          <p className={`max-w-3xl mx-auto text-lg font-mono ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Distributed architecture for evidence-based truth discovery through AI-powered analysis and blockchain verification
          </p>
        </motion.div>

        {/* Architecture Diagram Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* CSS Grid Layout for Architecture Layers */}
          <div 
            className="grid grid-cols-3 gap-8 lg:gap-12"
            style={{
              gridTemplateRows: 'auto auto auto auto',
              minHeight: '600px'
            }}
          >
            {/* Analytics Overlay - Layer 0 (Top) */}
            <div className="col-span-3 flex justify-center mb-8">
              <SystemComponent
                component={systemComponents.find(c => c.id === "analytics")!}
                isInView={isInView}
                prefersReducedMotion={prefersReducedMotion}
                isDark={isDark}
                delay={0}
              />
            </div>

            {/* Community Interface - Layer 1 */}
            <div className="col-span-3 flex justify-center mb-8">
              <SystemComponent
                component={systemComponents.find(c => c.id === "community")!}
                isInView={isInView}
                prefersReducedMotion={prefersReducedMotion}
                isDark={isDark}
                delay={0.2}
              />
            </div>

            {/* Processing Layer - Layer 2 */}
            <div className="flex justify-center">
              <SystemComponent
                component={systemComponents.find(c => c.id === "mare")!}
                isInView={isInView}
                prefersReducedMotion={prefersReducedMotion}
                isDark={isDark}
                delay={0.4}
              />
            </div>
            <div></div> {/* Empty center column */}
            <div className="flex justify-center">
              <SystemComponent
                component={systemComponents.find(c => c.id === "pattern-recognition")!}
                isInView={isInView}
                prefersReducedMotion={prefersReducedMotion}
                isDark={isDark}
                delay={0.6}
              />
            </div>

            {/* Data Layer - Layer 3 */}
            <div className="flex justify-center">
              <SystemComponent
                component={systemComponents.find(c => c.id === "del")!}
                isInView={isInView}
                prefersReducedMotion={prefersReducedMotion}
                isDark={isDark}
                delay={0.8}
              />
            </div>
            <div></div> {/* Empty center column */}
            <div className="flex justify-center">
              <SystemComponent
                component={systemComponents.find(c => c.id === "data-archive")!}
                isInView={isInView}
                prefersReducedMotion={prefersReducedMotion}
                isDark={isDark}
                delay={1.0}
              />
            </div>
          </div>

          {/* Connection Network */}
          <ConnectionNetwork
            components={systemComponents}
            isInView={isInView}
            prefersReducedMotion={prefersReducedMotion}
            isDark={isDark}
          />

          {/* Particle System for Data Flow */}
          {!prefersReducedMotion && (
            <ParticleSystem
              components={systemComponents}
              isInView={isInView}
              isDark={isDark}
            />
          )}

          {/* System Monitor */}
          <SystemMonitor
            isInView={isInView}
            prefersReducedMotion={prefersReducedMotion}
            isDark={isDark}
          />
        </div>
      </div>
    </div>
  );
});

SystemArchitecture.displayName = 'SystemArchitecture'; 